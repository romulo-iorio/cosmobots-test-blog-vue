import axios from 'axios'

import { tokenStorage } from '@/storage'

export interface HttpError<T = any> extends Error {
  response: { data: T }
}

export interface HttpResponse<T> {
  data: T
  headers: Record<string, string>
}

export interface HttpClient {
  get: <T>(url: string) => Promise<HttpResponse<T>>
  post: <T>(url: string, data?: any) => Promise<HttpResponse<T>>
  put: <T>(url: string, data?: any) => Promise<HttpResponse<T>>
  patch: <T>(url: string, data?: any) => Promise<HttpResponse<T>>
  delete: <T>(url: string) => Promise<HttpResponse<T>>
}

export const httpClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + tokenStorage.get()
  }
})

httpClient.interceptors.request.use((config) => {
  config.headers.Authorization = 'Bearer ' + tokenStorage.get()
  return config
})

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      tokenStorage.remove()
      window.location.reload()
    }

    return Promise.reject(error)
  }
)
