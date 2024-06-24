<script setup lang="ts">
import { faSignOut } from '@fortawesome/free-solid-svg-icons'

import type { Post } from '@/interfaces'
import IconButton from '@/components/IconButton.vue'

import { usePostsArea } from './usePostsArea'
import CreateNewPostButton from '../CreateNewPostButton.vue'
import PostDisplay from '../PostDisplay/PostDisplay.vue'
import NewPost from '../NewPost/NewPost.vue'

const { showCreateNewPost, setShowCreateNewPost, posts, onLogout } = usePostsArea()
console.log(posts)

const onAddPost = (post: Post) => posts.value.push(post)
const onDeletePost = (id: number) => {
  posts.value = posts.value.filter((post) => post.id !== id)
}
const onUpdatePost = (post: Post) => {
  posts.value = posts.value.map((p) => {
    if (p.id === post.id) return { ...p, ...post }
    return p
  })
}
</script>

<template>
  <IconButton
    class="absolute top-6 right-6 opacity-50 hover:opacity-100"
    :base-color="'red'"
    :icon="faSignOut"
    @click="onLogout"
  />

  <CreateNewPostButton v-if="!showCreateNewPost" @create-new-post="setShowCreateNewPost(true)" />

  <NewPost v-if="showCreateNewPost" @close="setShowCreateNewPost(false)" @add-post="onAddPost" />

  <hr class="w-full border-t-1 border-gray-300/50 my-2" />

  <div
    class="flex flex-col gap-4 w-full p-10 overflow-y-auto flex-1 h-auto transition-height duration-200"
  >
    <div v-if="posts.length === 0">
      <h1 class="text-white text-2xl font-bold text-center">Nenhuma postagem encontrada</h1>
    </div>

    <div v-if="posts.length > 0" class="flex flex-col gap-5 w-full">
      <PostDisplay
        @delete-post="onDeletePost"
        @update-post="onUpdatePost"
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </div>
  </div>
</template>

<style scoped></style>
