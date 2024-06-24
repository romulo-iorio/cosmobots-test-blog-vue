import { httpClient } from '../httpClient'

import type { CommentApi } from './comments'
import type { PostApi } from './posts'
import type { AuthApi } from './auth'
import { makeCommentsApi } from './comments'
import { makePostsApi } from './posts'
import { makeAuthApi } from './auth'

interface API {
  comments: CommentApi
  posts: PostApi
  auth: AuthApi
}

export const api: API = {
  comments: makeCommentsApi(httpClient),
  posts: makePostsApi(httpClient),
  auth: makeAuthApi(httpClient)
}
