import type { HttpClient, HttpResponse } from '../httpClient'

interface UserAuthData {
  email: string
  password: string
}

interface CreateUserAuthData extends UserAuthData {
  password_confirmation: string
}

export interface AuthApi {
  signUp: (auth: CreateUserAuthData) => Promise<string>
  signIn: (auth: UserAuthData) => Promise<string>
}

type AuthApiFactory = (httpClient: HttpClient) => AuthApi

const getTokenFromResponse = (response: HttpResponse<unknown>) => {
  const authorization = response.headers['authorization']
  return authorization.split('Bearer ')[1]
}

export const makeAuthApi: AuthApiFactory = (httpClient) => ({
  signIn: async (user: UserAuthData) => {
    const response = await httpClient.post('/users/sign_in', { user })
    return getTokenFromResponse(response)
  },
  signUp: async (user: CreateUserAuthData) => {
    const response = await httpClient.post('/users', { user })
    return getTokenFromResponse(response)
  }
})
