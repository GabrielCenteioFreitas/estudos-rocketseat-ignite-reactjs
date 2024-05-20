import { signOut } from '@/contexts/AuthContext';
import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'

type failedRequest = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}

let cookies = parseCookies()
let isRefreshing = false
let failedRequestsQueue: failedRequest[] = []

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['nextauth.token']}`
  }
})

api.interceptors.response.use(response => {
  return response
}, (error: any) => {
  if (error.response?.status === 401) {
    if (error.response.data?.code === 'token.expired') {
      cookies = parseCookies()

      const { 'nextauth.refreshToken': refreshToken } = cookies
      const originalConfig = error.config

      if (!isRefreshing) {
        isRefreshing = true

        api.post('/refresh', {
          refreshToken,
        }).then(response => {
          const { token } = response.data;
  
          setCookie(undefined, 'nextauth.token', token, {
            getMaxAge: 60 * 60 * 24 * 30, // 30 days
          })
  
          setCookie(undefined, 'nextauth.refreshToken', response.data.refreshToken, {
            getMaxAge: 60 * 60 * 24 * 30, // 30 days
          })
  
          api.defaults.headers['Authorization'] = `Bearer ${token}`

          failedRequestsQueue.forEach(request => request.onSuccess(token))
          failedRequestsQueue = []
        }).catch(error => {
          failedRequestsQueue.forEach(request => request.onFailure(error))
          failedRequestsQueue = []
        }).finally(() => {
          isRefreshing = false
        })
      } 
      
      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          onSuccess: (token: string) => {
            originalConfig.headers['Authorization'] = `Bearer ${token}`

            resolve(api(originalConfig))
          },
          onFailure: (error: AxiosError) => {
            reject(error)
          }
        })
      })
    } else {
      signOut();
    }
  }

  return Promise.reject(error);
})