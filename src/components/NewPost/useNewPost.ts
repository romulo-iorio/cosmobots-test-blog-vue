import { toast } from 'vue3-toastify'

import type { CreatePostData } from '@/interfaces'

import { useState } from '@/states'
import { api } from '@/services/api'

export type EventTypes = 'add-post' | 'close'

export const useNewPost = (emit: (event: EventTypes, ...args: any[]) => void) => {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const resetForm = () => {
    setContent('')
    setTitle('')
  }

  const isDisabled = () => !title.value || !content.value

  const onChangeTitle = (event: Event) => {
    const target = event.target as HTMLInputElement
    setTitle(target.value)
  }

  const onChangeContent = (event: Event) => {
    const target = event.target as HTMLTextAreaElement
    setContent(target.value)
  }

  const createPost = async () => {
    if (isDisabled()) return

    const newPostData: CreatePostData = {
      content: content.value,
      title: title.value
    }

    setIsLoading(true)

    try {
      const newPost = await api.posts.create(newPostData)
      emit('add-post', newPost)
    } catch (e) {
      console.error(e)
      toast.error('Erro ao criar post...')
    }

    setIsLoading(false)
    resetForm()
  }

  return { title, content, isLoading, onChangeTitle, onChangeContent, createPost, isDisabled }
}
