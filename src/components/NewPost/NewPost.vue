<script setup lang="ts">
import type { Props } from './useNewPost'
import { useNewPost } from './useNewPost'

const props = defineProps<Props>()

const { title, content, isLoading, onChangeTitle, onChangeContent, createPost, isDisabled } =
  useNewPost(props)
</script>

<template>
  <div class="flex flex-col gap-5 w-full p-10">
    <input
      class="p-2 bg-gray-700 max-w-[20rem] rounded-lg text-white"
      placeholder="Título da postagem"
      @input="onChangeTitle"
      :value="title"
    />

    <textarea
      class="p-2 bg-gray-700 w-full rounded-lg text-white min-h-[10rem] resize-none"
      placeholder="Crie uma nova postagem"
      @input="onChangeContent"
      :value="content"
    />

    <button
      class="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600 active:bg-blue-700 transition duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
      :disabled="isDisabled()"
      @click="createPost"
    >
      {{ isLoading ? 'Carregando...' : 'Postar' }}
    </button>

    <button
      class="bg-red-500 text-white p-2 rounded-lg w-full hover:bg-red-600 active:bg-red-700 transition duration-200"
      @click="$emit('close')"
    >
      Cancelar
    </button>
  </div>
</template>

<style scoped></style>
