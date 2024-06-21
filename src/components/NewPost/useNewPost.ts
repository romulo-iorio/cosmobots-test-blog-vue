import type { Post, CreatePostData } from '../../interfaces'
import type { Dispatch } from '../../states'

import { useState } from '../../states'
import { api } from '../../api'

export interface Props {
  setPosts: Dispatch<Post[]>
}

export const useNewPost = ({ setPosts }: Props) => {
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

    const newPost = await api.posts.create(newPostData)

    setIsLoading(false)

    setPosts((prev) => [newPost, ...prev])

    resetForm()
  }

  return { title, content, isLoading, onChangeTitle, onChangeContent, createPost, isDisabled }
}
