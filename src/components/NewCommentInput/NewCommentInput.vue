<script setup lang="ts">
import { faComment } from '@fortawesome/free-solid-svg-icons'

import IconButton from '@/components/IconButton.vue'

import type { Props } from './useNewComment'
import { useNewComment } from './useNewComment'

const props = defineProps<Props>()

const { newComment, onChangeComment, onComment, isDisabled } = useNewComment(props)
</script>

<template>
  <div class="flex items-center gap-4 bg-gray-700 p-2 rounded-lg">
    <input
      class="text-white break-words whitespace-pre-line text-sm font-light flex-1 bg-black/20 p-2 rounded-lg"
      placeholder="Escreva um comentário..."
      @input="onChangeComment"
      @onEnter="onComment"
      :value="newComment"
    />

    <IconButton :icon="faComment" base-color="blue" @click="onComment" :isDisabled="isDisabled()" />
  </div>
</template>

<style scoped></style>
