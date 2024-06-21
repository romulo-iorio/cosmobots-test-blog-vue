import axios from 'axios'

import { tokenStorage } from '@/storage'

import type { PostApi } from './posts'
import { makePostsApi } from './posts'

interface HttpResponse<T> {
  data: T
}

export interface HttpClient {
  get: <T>(url: string) => Promise<HttpResponse<T>>
  post: <T>(url: string, data: any) => Promise<HttpResponse<T>>
  put: <T>(url: string, data: any) => Promise<HttpResponse<T>>
  patch: <T>(url: string, data: any) => Promise<HttpResponse<T>>
  delete: <T>(url: string) => Promise<HttpResponse<T>>
}

const httpClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + tokenStorage.get()
  }
})

interface API {
  posts: PostApi
}

export const api: API = {
  posts: makePostsApi(httpClient)
}
