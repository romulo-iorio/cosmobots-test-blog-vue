import type { PostApi } from './posts'
import type { AuthApi } from './auth'
import { httpClient } from '../httpClient'
import { makePostsApi } from './posts'
import { makeAuthApi } from './auth'

interface API {
  posts: PostApi
  auth: AuthApi
}

export const api: API = {
  posts: makePostsApi(httpClient),
  auth: makeAuthApi(httpClient)
}
