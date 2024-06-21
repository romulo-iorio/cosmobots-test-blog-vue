<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import type { Props } from './usePostDisplay'
import { usePostDisplay } from './usePostDisplay'

const props = defineProps<Props>()
const { formatDate, hovered, setHovered, onDelete } = usePostDisplay(props)
const { post } = props
</script>

<template>
  <div
    class="flex flex-col gap-4 w-full p-5 bg-gray-700 rounded-lg transition duration-200 hover:bg-gray-800 cursor-pointer relative"
    @mouseleave="setHovered(false)"
    @mouseover="setHovered(true)"
    :key="post.id"
  >
    <h1 class="text-white text-2xl font-bold">{{ post.title }}</h1>

    <p class="text-white break-words whitespace-pre-line text-lg font-light">
      {{ post.content }}
    </p>

    <span>
      <span class="text-gray-400 text-sm">Postado por {{ post.user_id }} em </span>
      <span class="text-gray-400 text-sm">{{ formatDate(post.created_at) }}</span>
    </span>

    <button
      class="bg-red-500 text-white p-2 rounded-lg w-10 h-10 hover:bg-red-600 active:bg-red-700 transition duration-200 absolute top-4 right-4"
      @click="onDelete"
      v-if="hovered"
    >
      <FontAwesomeIcon :icon="faTrash" />
    </button>
  </div>
</template>

<style scoped></style>
