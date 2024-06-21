<script setup lang="ts">
import type { Post } from '../interfaces'
import { useState } from '../states'

defineProps<{ post: Post }>()

const formatDate = (date: string) => new Date(date).toLocaleString('pt-BR')

const [hovered, setHovered] = useState(false)
</script>

<template>
  <div
    :key="post.id"
    class="flex flex-col gap-4 w-full p-5 bg-gray-700 rounded-lg transition duration-200 hover:bg-gray-800 cursor-pointer"
  >
    <h1 class="text-white text-2xl font-bold">{{ post.title }}</h1>

    <p class="text-white break-words whitespace-pre-line text-lg font-light">
      {{ post.content }}
    </p>

    <span>
      <span class="text-gray-400 text-sm">Postado por {{ post.user_id }} em </span>
      <span class="text-gray-400 text-sm">{{ formatDate(post.created_at) }}</span>
    </span>
  </div>
</template>

<style scoped></style>
