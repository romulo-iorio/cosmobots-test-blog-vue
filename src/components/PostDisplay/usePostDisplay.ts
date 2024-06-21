import type { Post } from '@/interfaces'
import type { Dispatch } from '@/states'

import { useState } from '@/states'
import { api } from '@/api'

export interface Props {
  setPosts: Dispatch<Post[]>
  post: Post
}

export const usePostDisplay = ({ setPosts, post }: Props) => {
  const formatDate = (date: string) => new Date(date).toLocaleString('pt-BR')

  const [hovered, setHovered] = useState(false)

  const onDelete = async () => {
    await api.posts.delete(post.id)
    setPosts((prev) => prev.filter((p) => p.id !== post.id))
  }

  return { formatDate, hovered, setHovered, onDelete }
}
