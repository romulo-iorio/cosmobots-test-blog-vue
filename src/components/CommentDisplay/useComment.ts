import { toast } from 'vue3-toastify'

import type { Comment } from '@/interfaces'
import type { Dispatch } from '@/states'

import { getLoggedUserId } from '@/utils'
import { useState } from '@/states'
import { api } from '@/services/api'

export interface Props {
  setComments: Dispatch<Comment[]>
  comment: Comment
}

export const useComment = ({ setComments, comment }: Props) => {
  const [newCommentValue, setNewCommentValue] = useState(comment.content)
  const [isEditing, setIsEditing] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [commentState, setComment] = useState(comment)

  const onChangeComment = (event: Event) => {
    const target = event.target as HTMLTextAreaElement
    setNewCommentValue(target.value)
  }

  const onEdit = async () => {
    try {
      const updatedComment = await api.comments.update({
        content: newCommentValue.value,
        id: comment.id
      })

      setComment((prev) => ({ ...prev, ...updatedComment }))

      setIsEditing(false)
    } catch (error) {
      console.error(error)
      toast.error('Erro ao editar comentário')
    }
  }

  const onDelete = async () => {
    try {
      await api.comments.delete(comment.id)

      setComments((prev) => prev.filter((c) => c.id !== comment.id))
    } catch (error) {
      console.error(error)
      toast.error('Erro ao deletar comentário')
    }
  }

  const loggedUserCanChangeComment = () => {
    return `${getLoggedUserId()}` === `${comment.user_id}`
  }

  return {
    comment: commentState,
    newCommentValue,
    onChangeComment,
    setIsEditing,
    setIsHovered,
    isEditing,
    isHovered,
    onDelete,
    onEdit,
    loggedUserCanChangeComment
  }
}
