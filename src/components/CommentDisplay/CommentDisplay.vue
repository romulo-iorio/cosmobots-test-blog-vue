<script setup lang="ts">
import { faTrash, faPencil, faCheck, faX } from '@fortawesome/free-solid-svg-icons'

import { formatDate } from '@/utils'
import IconButton from '@/components/IconButton.vue'

import type { Props } from './useComment'
import { useComment } from './useComment'

const props = defineProps<Props>()

const {
  onDelete,
  onEdit,
  isEditing,
  setIsEditing,
  setIsHovered,
  isHovered,
  onChangeComment,
  newCommentValue,
  comment
} = useComment(props)
</script>

<template>
  <div
    class="flex items-center gap-2 bg-gray-700 p-2 rounded-lg relative"
    @mouseover="setIsHovered(true)"
    @mouseleave="setIsHovered(false)"
  >
    <span>
      <b class="text-gray-400 text-md italic">{{ comment.user.email }}</b>
      <b class="text-gray-400 text-md"> comentou:</b>
    </span>

    <p
      class="text-white break-words whitespace-pre-line text-sm font-light flex-1"
      v-if="!isEditing"
    >
      {{ comment.content }}
    </p>

    <input
      class="text-white break-words whitespace-pre-line text-sm font-light bg-black/20 rounded-lg pl-2 flex-1"
      v-model="newCommentValue"
      @input="onChangeComment"
      v-if="isEditing"
    />

    <span class="text-gray-400 text-xs italic">{{ formatDate(comment.created_at) }}</span>

    <div
      class="absolute top-1/2 transform -translate-y-1/2 right-2 flex gap-2 opacity-80"
      v-if="isHovered"
    >
      <IconButton
        size="sm"
        :base-color="'green'"
        @click="onEdit"
        v-if="isEditing"
        :icon="faCheck"
      />

      <IconButton
        size="sm"
        @click="setIsEditing(false)"
        :base-color="'red'"
        v-if="isEditing"
        :icon="faX"
      />

      <IconButton size="sm" @click="setIsEditing(true)" v-if="!isEditing" :icon="faPencil" />

      <IconButton size="sm" :base-color="'red'" @click="onDelete" :icon="faTrash" />
    </div>
  </div>
</template>

<style scoped></style>
