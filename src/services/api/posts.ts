import type { CreatePostData, LikeOrDislike, Post } from '@/interfaces'
import type { HttpClient } from '../httpClient'

export interface PostApi {
  get: () => Promise<Post[]>
  getById: (id: number) => Promise<Post>
  create: (post: CreatePostData) => Promise<Post>
  update: (post: Partial<Post>) => Promise<Post>
  delete: (id: number) => Promise<void>
  like: (id: number) => Promise<LikeOrDislike>
  dislike: (id: number) => Promise<LikeOrDislike>
}

type PostsApiFactory = (httpClient: HttpClient) => PostApi

interface Response {
  posts: Post[]
}

interface SingularResponse {
  post: Post
}

export const makePostsApi: PostsApiFactory = (httpClient) => ({
  get: async () => {
    const response = await httpClient.get<Response>('/posts')
    return response.data.posts
  },
  getById: async (id: number) => {
    const response = await httpClient.get<SingularResponse>(`/posts/${id}`)
    return response.data.post
  },
  create: async (post: CreatePostData) => {
    const response = await httpClient.post<SingularResponse>('/posts', post)
    return response.data.post
  },
  update: async (post: Partial<Post>) => {
    const response = await httpClient.put<SingularResponse>(`/posts/${post.id}`, post)
    return response.data.post
  },
  delete: async (id: number) => {
    await httpClient.delete<void>(`/posts/${id}`)
  },
  like: async (id: number): Promise<LikeOrDislike> => {
    const response = await httpClient.patch<LikeOrDislike>(`/posts/${id}/like`)
    return response.data
  },
  dislike: async (id: number): Promise<LikeOrDislike> => {
    const response = await httpClient.patch<LikeOrDislike>(`/posts/${id}/dislike`)
    return response.data
  }
})
