import { useRouter } from 'vue-router'

import type { Post } from '@/interfaces'
import { tokenStorage } from '@/storage'
import { useState } from '@/states'
import { api } from '@/services/api'

export const usePostsArea = () => {
  const [showCreateNewPost, setShowCreateNewPost] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])

  const router = useRouter()
  api.posts.get().then((data) => setPosts(data.sort((a, b) => b.id - a.id)))

  const onLogout = () => {
    tokenStorage.remove()
    router.push({ name: 'login' })
  }

  if (!tokenStorage.get()) router.push({ name: 'login' })

  return { setShowCreateNewPost, showCreateNewPost, onLogout, posts }
}
