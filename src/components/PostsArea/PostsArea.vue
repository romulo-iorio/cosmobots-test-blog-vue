<script setup lang="ts">
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import IconButton from '@/components/IconButton.vue'
import CreateNewPostButton from '../CreateNewPostButton.vue'
import PostDisplay from '../PostDisplay/PostDisplay.vue'
import NewPost from '../NewPost/NewPost.vue'

import { usePostsArea } from './usePostsArea'

const { showCreateNewPost, setShowCreateNewPost, posts, setPosts, onLogout } = usePostsArea()
</script>

<template>
  <IconButton
    class="absolute top-6 right-6 opacity-50 hover:opacity-100"
    :base-color="'red'"
    :icon="faSignOut"
    @click="onLogout"
  />

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
