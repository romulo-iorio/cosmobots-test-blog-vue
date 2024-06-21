<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrash, faPencil, faCheck, faX } from '@fortawesome/free-solid-svg-icons'

import type { Props } from './usePostDisplay'
import { usePostDisplay } from './usePostDisplay'

const props = defineProps<Props>()
const {
  formatDate,
  hovered,
  setHovered,
  onDelete,
  isEditing,
  setIsEditing,
  onEdit,
  newContent,
  newTitle,
  onChangeContent,
  onChangeTitle
} = usePostDisplay(props)
const { post } = props
</script>

<template>
  <div
    class="flex flex-col gap-4 w-full p-5 bg-gray-700 rounded-lg transition duration-200 hover:bg-gray-800 cursor-pointer relative"
    @mouseleave="setHovered(false)"
    @mouseover="setHovered(true)"
    :key="post.id"
  >
    <h1 class="text-white text-2xl font-bold w-fit p-2" v-if="!isEditing">{{ post.title }}</h1>

    <input
      class="text-white text-2xl font-bold w-fit rounded-lg p-2 bg-black/20"
      v-if="isEditing"
      v-model="newTitle"
      @input="onChangeTitle"
    />

    <p class="text-white break-words whitespace-pre-line text-lg font-light p-2" v-if="!isEditing">
      {{ post.content }}
    </p>

    <textarea
      class="text-white bg-transparent break-words whitespace-pre-line text-lg font-light p-2 bg-black/20"
      v-if="isEditing"
      v-model="newContent"
      @input="onChangeContent"
    />

    <span>
      <span class="text-gray-400 text-sm">Postado por {{ post.user_id }} em </span>
      <span class="text-gray-400 text-sm">{{ formatDate(post.created_at) }}</span>
    </span>

    <div class="absolute top-4 right-4 flex gap-4" v-if="hovered">
      <button
        class="bg-green-500 text-white p-2 rounded-lg w-10 h-10 hover:bg-green-600 active:bg-green-700 transition duration-200"
        @click="onEdit"
        v-if="isEditing"
      >
        <FontAwesomeIcon :icon="faCheck" />
      </button>

      <button
        class="bg-red-500 text-white p-2 rounded-lg w-10 h-10 hover:bg-red-600 active:bg-red-700 transition duration-200"
        @click="setIsEditing(false)"
        v-if="isEditing"
      >
        <FontAwesomeIcon :icon="faX" />
      </button>

      <button
        class="bg-gray-500 text-white p-2 rounded-lg w-10 h-10 hover:bg-gray-600 active:bg-gray-700 transition duration-200"
        @click="setIsEditing(true)"
        v-if="!isEditing"
      >
        <FontAwesomeIcon :icon="faPencil" />
      </button>

      <button
        class="bg-red-500 text-white p-2 rounded-lg w-10 h-10 hover:bg-red-600 active:bg-red-700 transition duration-200"
        @click="onDelete"
      >
        <FontAwesomeIcon :icon="faTrash" />
      </button>
    </div>
  </div>
</template>

<style scoped></style>
