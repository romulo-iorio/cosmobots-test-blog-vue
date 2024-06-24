import { toast } from 'vue3-toastify'

import type { Post } from '@/interfaces'

import { api } from '@/services/api'
import { useState } from '@/states'
import { getLoggedUserId } from '@/utils'

export interface Props {
  post: Post
}

export type EventTypes = 'delete-post' | 'update-post'

export const usePostDisplay = (
  { post }: Props,
  emit: (event: EventTypes, ...args: any[]) => void
) => {
  const [isEditing, setIsEditing] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [newContent, setNewContent] = useState(post.content)
  const [newTitle, setNewTitle] = useState(post.title)

  const onDelete = async () => {
    try {
      await api.posts.delete(post.id)
      emit('delete-post', post.id)
    } catch (e) {
      console.error(e)
      toast.error('Erro ao deletar post...')
    }
  }

  const onEdit = async () => {
    const newPost = { ...post, content: newContent.value, title: newTitle.value }

    try {
      const updatedPost = await api.posts.update(newPost)

      emit('update-post', updatedPost)

      setIsEditing(false)
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

  const loggedUserCanChangePost = () => {
    return `${getLoggedUserId()}` === `${post.user_id}`
  }

  return {
    hovered,
    setHovered,
    onDelete,
    isEditing,
    setIsEditing,
    onEdit,
    newContent,
    newTitle,
    onChangeTitle,
    onChangeContent,
    loggedUserCanChangePost
  }
}
