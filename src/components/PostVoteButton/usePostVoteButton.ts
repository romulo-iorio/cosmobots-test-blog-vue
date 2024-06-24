import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'vue3-toastify'

import type { Post, LikeOrDislike } from '@/interfaces'
import { getLoggedUserId } from '@/utils'
import { api } from '@/services/api'
import { useState } from '@/states'

type PostVote = 'like' | 'dislike'

export interface Props {
  type: PostVote
  post: Post
}

const compareIdCallback = (i: LikeOrDislike) => {
  const interactionUserId = `${i.user_id}`
  const loggedUserId = `${getLoggedUserId()}`
  return interactionUserId === loggedUserId
}

export const usePostVoteButton = (
  { post, type }: Props,
  emit: (event: 'update-post', payload: any) => void
) => {
  const interactionKey = `${type}s` as 'likes' | 'dislikes'
  const interactions = post[interactionKey]

  const userInteractedWithPostInitialValue = interactions.some(compareIdCallback)

  const [userInteractedWithPost, setUserInteractedWithPost] = useState<boolean>(
    userInteractedWithPostInitialValue
  )
  const [interactionsCount, setInteractionsCount] = useState<number>(interactions.length)

  const changeInteractionCount = (userInteractedWithPost: { value: boolean }) => {
    if (userInteractedWithPost.value) return setInteractionsCount((prev) => prev - 1)
    setInteractionsCount((prev) => prev + 1)
  }

  const onInteraction = async () => {
    try {
      const newInteraction = await api.posts[type](post.id)

      changeInteractionCount(userInteractedWithPost)

      const newInteractions = userInteractedWithPost.value
        ? interactions.filter((i) => !compareIdCallback(i))
        : [...interactions, newInteraction]
      emit('update-post', { ...post, [interactionKey]: newInteractions })

      setUserInteractedWithPost((prev) => !prev)
    } catch (error) {
      console.error(error)
      toast.error('Erro ao curtir postagem')
    }
  }

  const userInteractedColor = type === 'like' ? 'text-blue-800' : 'text-red-800'
  const iconColor = () => (userInteractedWithPost.value ? userInteractedColor : 'text-gray-100')
  const icon = type === 'like' ? faThumbsUp : faThumbsDown

  return { icon, iconColor, interactionsCount, onInteraction }
}
