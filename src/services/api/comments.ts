import type { Comment } from '@/interfaces'

import type { HttpClient } from '../httpClient'

interface CreateCommentData {
  content: string
  post_id: number
}

export interface CommentApi {
  get: () => Promise<Comment[]>
  getById: (id: number) => Promise<Comment>
  create: (comment: CreateCommentData) => Promise<Comment>
  update: (comment: Partial<Comment>) => Promise<Comment>
  delete: (id: number) => Promise<void>
}

type CommentsApiFactory = (httpClient: HttpClient) => CommentApi

interface Response {
  comments: Comment[]
}

interface SingularResponse {
  comment: Comment
}

export const makeCommentsApi: CommentsApiFactory = (httpClient) => ({
  get: async () => {
    const response = await httpClient.get<Response>('/comments')
    return response.data.comments
  },
  getById: async (id: number) => {
    const response = await httpClient.get<SingularResponse>(`/comments/${id}`)
    return response.data.comment
  },
  create: async (comment: CreateCommentData) => {
    const response = await httpClient.post<SingularResponse>('/comments', { comment })
    return response.data.comment
  },
  update: async (comment: Partial<Comment>) => {
    const response = await httpClient.put<SingularResponse>(`/comments/${comment.id}`, { comment })
    return response.data.comment
  },
  delete: async (id: number) => {
    await httpClient.delete<void>(`/comments/${id}`)
  }
})
