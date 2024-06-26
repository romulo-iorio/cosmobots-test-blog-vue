<script setup lang="ts">
import { faTrash, faPencil, faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { defineProps, computed, watchEffect } from 'vue'

import { formatDate } from '@/utils'
import CommentsSection from '@/components/CommentsSection/CommentsSection.vue'
import PostVoteButton from '@/components/PostVoteButton/PostVoteButton.vue'
import IconButton from '@/components/IconButton.vue'

import type { Props } from './usePostDisplay'
import { usePostDisplay } from './usePostDisplay'

const emit = defineEmits(['delete-post', 'update-post'])
const props = defineProps<Props>()
const {
  hovered,
  setHovered,
  onDelete,
  isEditing,
  setIsEditing,
  onEdit,
  newContent,
  newTitle,
  onChangeContent,
  onChangeTitle,
  loggedUserCanChangePost
} = usePostDisplay(props, emit)

const post = computed(() => props.post)

watchEffect(() => {
  console.log(post.value)
})
</script>

<template>
  <div
    class="flex flex-col gap-4 w-full p-5 bg-gray-700 rounded-lg transition duration-200 hover:bg-gray-600 relative"
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
      class="text-white break-words whitespace-pre-line text-lg font-light p-2 bg-black/20"
      v-if="isEditing"
      v-model="newContent"
      @input="onChangeContent"
    />

    <span>
      <span class="text-gray-400 text-sm italic">Postado por {{ post.user.email }} em </span>
      <span class="text-gray-400 text-sm">{{ formatDate(post.created_at) }}</span>
    </span>

    <CommentsSection :post="post" @update-post="$emit('update-post', $event)" />

    <div class="absolute top-4 right-4 flex gap-4" v-if="hovered && loggedUserCanChangePost()">
      <IconButton :base-color="'green'" @click="onEdit" v-if="isEditing" :icon="faCheck" />

      <IconButton @click="setIsEditing(false)" :base-color="'red'" v-if="isEditing" :icon="faX" />

      <IconButton @click="setIsEditing(true)" v-if="!isEditing" :icon="faPencil" />

      <IconButton :base-color="'red'" @click="onDelete" :icon="faTrash" />
    </div>
  </div>
</template>

<style scoped></style>
