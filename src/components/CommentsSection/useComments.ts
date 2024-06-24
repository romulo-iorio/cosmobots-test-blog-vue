import type { Post } from '@/interfaces'

import { useState } from '@/states'

export interface Props {
  post: Post
}

export const useComments = ({ post }: Props) => {
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState(post.comments.reverse())

  const toggleComments = () => setShowComments((prev) => !prev)

  return { showComments, toggleComments, comments, setComments }
}
