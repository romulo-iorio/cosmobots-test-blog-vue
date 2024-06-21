import { useRouter } from 'vue-router'

import type { Post } from '@/interfaces'
import { api } from '@/services/api/index'
import { tokenStorage } from '@/storage'
import { useState } from '@/states'

export const usePostsArea = () => {
  const [showCreateNewPost, setShowCreateNewPost] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])

  const router = useRouter()

  api.posts
    .get()
    .then((data) =>
      setPosts(
        data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      )
    )
    .catch((error) => {
      console.error(error)
      tokenStorage.remove()
      router.push({ name: 'login' })
    })

  const onLogout = () => {
    tokenStorage.remove()
    router.push({ name: 'login' })
  }

  return { showCreateNewPost, setShowCreateNewPost, posts, setPosts, onLogout }
}
