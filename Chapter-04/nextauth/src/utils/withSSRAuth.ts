import { AuthTokenError } from "@/services/errors/AuthTokenError"
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { destroyCookie, parseCookies } from "nookies"
import { jwtDecode } from 'jwt-decode'
import { validateUserPermissions } from "./validateUserPermissions"

type WithSSRAuthOptions = {
  permissions?: string[];
  roles?: string[];
}

export function withSSRAuth<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>,
  options?: WithSSRAuthOptions
) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P> | undefined> => {
    const cookies = parseCookies(ctx)
    // agora tem q passar o "ctx"(contexto) pq estamos no server-side
    const token = cookies['nextauth.token']

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }

    if (options) {
      const user = jwtDecode<{ permissions: string[]; roles: string[] }>(token)
      const { permissions, roles } = options

      const userHasValidPermissions = validateUserPermissions({
        user,
        permissions,
        roles
      })

      if (!userHasValidPermissions) {
        return {
          redirect: {
            destination: '/dashboard',
            permanent: false,
          }
        }
      }
    }
      
    try {
      return await fn(ctx)
    } catch(error) {
      if (error instanceof AuthTokenError) {
        destroyCookie(ctx, 'nextauth.token')
        destroyCookie(ctx, 'nextauth.refreshToken')

        return {
          redirect: {
            destination: '/',
            permanent: false,
          }
        }
      }
    }
  }
}