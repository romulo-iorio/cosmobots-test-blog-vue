<script setup lang="ts">
import { tokenStorage } from '@/storage'

import LoginArea from './components/LoginArea/LoginArea.vue'
import PostsArea from './components/PostsArea.vue'

const token = tokenStorage.get()
</script>

<template>
  <div class="flex flex-col w-full items-center justify-start h-[100vh]">
    <PostsArea v-if="token" />

    <LoginArea v-else />
  </div>
</template>

<style scoped></style>
