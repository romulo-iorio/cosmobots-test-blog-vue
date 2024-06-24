import type { Comment } from './comments'
import type { User } from './user'

export interface Post {
  id: number
  title: string
  content: string
  user_id: 8
  created_at: '2024-06-21T00:30:18.559Z'
  updated_at: '2024-06-21T00:30:18.559Z'
  user: User
  comments: Comment[]
}

export interface CreatePostData {
  title: string
  content: string
}
