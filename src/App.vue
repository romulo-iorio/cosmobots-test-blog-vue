<script setup lang="ts">
import type { Post } from './interfaces'
import { useState } from './states'
import { api } from './api'

import PostDisplay from './components/PostDisplay.vue'
import NewPost from './components/NewPost/NewPost.vue'

const [posts, setPosts] = useState<Post[]>([])
const [showCreateNewPost, setShowCreateNewPost] = useState(false)

api.posts
  .get()
  .then((data) =>
    setPosts(
      data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    )
  )
</script>

<template>
  <div class="flex flex-col w-full items-center justify-start h-[100vh]">
    <div class="flex flex-col w-full p-10" v-if="!showCreateNewPost">
      <button
        class="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600 active:bg-blue-700 transition-height duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
        @click="setShowCreateNewPost(true)"
      >
        Criar nova postagem
      </button>
    </div>

    <NewPost v-if="showCreateNewPost" :setPosts="setPosts" @close="setShowCreateNewPost(false)" />

    <hr class="w-full border-t-1 border-gray-300/50 my-2" />

    <div
      class="flex flex-col gap-4 w-full p-10 overflow-y-auto flex-1 h-auto transition-height duration-200"
    >
      <div v-if="posts.length === 0">
        <h1 class="text-white text-2xl font-bold">Nenhuma postagem encontrada</h1>
      </div>

      <div v-if="posts.length > 0" class="flex flex-col gap-5 w-full">
        <PostDisplay v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
