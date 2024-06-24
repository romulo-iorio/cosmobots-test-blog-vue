import type { Post } from '@/interfaces'
import { api } from '@/services/api'
import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [] as Post[]
  }),
  actions: {
    fetchPosts() {
      api.posts.get().then((data) => (this.posts = data))
    },
    setPosts(posts: Post[] | ((prev: Post[]) => Post[])) {
      this.posts = typeof posts === 'function' ? posts(this.posts) : posts
    },
    setPost(id: number, post: Post) {
      this.posts = this.posts.map((p) => (p.id === id ? post : p))
    },
    addPost(post: Post) {
      this.posts = [post, ...this.posts]
    },
    removePost(id: number) {
      this.posts = this.posts.filter((p) => p.id !== id)
    }
  }
})
