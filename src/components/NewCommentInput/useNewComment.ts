import { toast } from 'vue3-toastify'

import type { Comment } from '@/interfaces'
import type { Dispatch } from '@/states'
import { api } from '@/services/api'
import { useState } from '@/states'

export interface Props {
  setComments: Dispatch<Comment[]>
  postId: number
}

export const useNewComment = ({ setComments, postId }: Props) => {
  const [newComment, setNewComment] = useState('')

  const onChangeComment = (event: Event) => {
    const target = event.target as HTMLTextAreaElement
    setNewComment(target.value)
  }

  const onComment = async () => {
    if (!newComment.value) return toast.error('Comentário não pode ser vazio...')

    try {
      const comment = await api.comments.create({ content: newComment.value, post_id: postId })
      setComments((prev) => [comment, ...prev])
      setNewComment('')
    } catch (e) {
      console.error(e)
      toast.error('Erro ao criar comentário...')
    }
  }

  const isDisabled = () => {
    return !newComment.value
  }

  return { newComment, onChangeComment, onComment, isDisabled }
}
