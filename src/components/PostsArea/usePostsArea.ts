import type { Post } from '@/interfaces'
import { api } from '@/services/api/index'
import { tokenStorage } from '@/storage'
import { useState } from '@/states'

export const usePostsArea = () => {
  const [showCreateNewPost, setShowCreateNewPost] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])

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
      window.location.href = '/'
    })

  const onLogout = () => {
    tokenStorage.remove()
    window.location.href = '/'
  }

  return { showCreateNewPost, setShowCreateNewPost, posts, setPosts, onLogout }
}
