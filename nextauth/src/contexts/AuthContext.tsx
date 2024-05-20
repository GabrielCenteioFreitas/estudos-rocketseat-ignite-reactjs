import { api } from "@/services/api";
import { setCookie, parseCookies } from 'nookies'
import Router from "next/router";
import { ReactNode, createContext, useEffect, useState } from "react"

type User = {
  email: string;
  permissions: string[];
  roles: string[];
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  user: User | undefined;
  isAuthenticated: boolean
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()
    // pegando os cookies atuais e renomeando o "nextauth.token" para "token"

    if (token) {
      api.get('/me').then(response => {
        const { email, permissions, roles } = response.data

        setUser({ email, permissions, roles })
      })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('sessions', {
        email,
        password
      })

      const { token, refreshToken, permissions, roles } = response.data

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/', // quais caminhos vão ter acesso ao cookie, nesse caso, todos
      })
      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })
      // "undefined" pq to executando no client-side
      // "nextauth.token" pq sim, é só um nome
      // "token" é a variável

      setUser({
        email,
        permissions,
        roles,
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      Router.push('/dashboard')
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}