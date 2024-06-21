import { toast } from 'vue3-toastify'

import type { Post } from '@/interfaces'
import type { Dispatch } from '@/states'

import { useState } from '@/states'
import { api } from '@/services/api'

export interface Props {
  setPosts: Dispatch<Post[]>
  post: Post
}

export const usePostDisplay = ({ setPosts, post }: Props) => {
  const formatDate = (date: string) => new Date(date).toLocaleString('pt-BR')

  const [isEditing, setIsEditing] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [newContent, setNewContent] = useState(post.content)
  const [newTitle, setNewTitle] = useState(post.title)

  const onDelete = async () => {
    try {
      await api.posts.delete(post.id)
      setPosts((prev) => prev.filter((p) => p.id !== post.id))
    } catch (e) {
      console.error(e)
      toast.error('Erro ao deletar post...')
    }
  }

  const onEdit = async () => {
    const newPost = { ...post, content: newContent.value, title: newTitle.value }

    try {
      const updatedPost = await api.posts.update(newPost)
      setPosts((prev) =>
        prev.map((p) => {
          const isUpdatedPost = p.id === updatedPost.id
          if (isUpdatedPost) return updatedPost
          return p
        })
      )
    } catch (e) {
      console.error(e)
      toast.error('Erro ao editar post...')
    }
  }

  const onChangeTitle = (event: Event) => {
    const target = event.target as HTMLInputElement
    setNewTitle(target.value)
  }

  const onChangeContent = (event: Event) => {
    const target = event.target as HTMLTextAreaElement
    setNewContent(target.value)
  }

  return {
    formatDate,
    hovered,
    setHovered,
    onDelete,
    isEditing,
    setIsEditing,
    onEdit,
    newContent,
    newTitle,
    onChangeTitle,
    onChangeContent
  }
}
