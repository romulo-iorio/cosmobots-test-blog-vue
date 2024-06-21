import type { HttpClient } from '../httpClient'

interface UserAuthData {
  email: string
  password: string
}

export interface AuthApi {
  signIn: (auth: UserAuthData) => Promise<string>
}

type AuthApiFactory = (httpClient: HttpClient) => AuthApi

export const makeAuthApi: AuthApiFactory = (httpClient) => ({
  signIn: async (user: UserAuthData) => {
    const response = await httpClient.post('/users/sign_in', { user })
    const authorization = response.headers['authorization']
    const token = authorization.split('Bearer ')[1]
    return token
  }
})
