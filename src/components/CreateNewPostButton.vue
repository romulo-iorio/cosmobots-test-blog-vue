<script setup lang="ts"></script>

<template>
  <div class="flex flex-col w-full p-10">
    <button
      class="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600 active:bg-blue-700 transition-height duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
      @click="$emit('create-new-post')"
    >
      Criar nova postagem
    </button>
  </div>
</template>

<style scoped></style>
