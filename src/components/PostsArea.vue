<script setup lang="ts">
import type { Post } from '@/interfaces'
// import { toast } from '@/services/toast'
import { tokenStorage } from '@/storage'
import { api } from '@/services/api/index'
import { useState } from '@/states'

import CreateNewPostButton from './CreateNewPostButton.vue'
import PostDisplay from './PostDisplay/PostDisplay.vue'
import NewPost from './NewPost/NewPost.vue'

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
</script>

<template>
  <CreateNewPostButton v-if="!showCreateNewPost" @create-new-post="setShowCreateNewPost(true)" />

  <NewPost v-if="showCreateNewPost" :setPosts="setPosts" @close="setShowCreateNewPost(false)" />

  <hr class="w-full border-t-1 border-gray-300/50 my-2" />

  <div
    class="flex flex-col gap-4 w-full p-10 overflow-y-auto flex-1 h-auto transition-height duration-200"
  >
    <div v-if="posts.length === 0">
      <h1 class="text-white text-2xl font-bold text-center">Nenhuma postagem encontrada</h1>
    </div>

    <div v-if="posts.length > 0" class="flex flex-col gap-5 w-full">
      <PostDisplay v-for="post in posts" :key="post.id" :post="post" :setPosts="setPosts" />
    </div>
  </div>
</template>

<style scoped></style>
