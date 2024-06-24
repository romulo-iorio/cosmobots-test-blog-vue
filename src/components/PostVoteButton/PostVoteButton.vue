<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { defineProps, defineEmits } from 'vue'

import type { Props } from './usePostVoteButton'
import { usePostVoteButton } from './usePostVoteButton'

const props = defineProps<Props>()
const emit = defineEmits(['update-post'])

const { onInteraction, icon, interactionsCount, iconColor } = usePostVoteButton(props, emit)
console.log(props)
</script>

<template>
  <span
    :class="`flex items-center gap-2 cursor-pointer bg-blue-500 hover:bg-blue-600 active:bg-blue-700 w-fit p-3 rounded-lg transition duration-200 select-none ${iconColor()}`"
    @click="onInteraction"
  >
    <FontAwesomeIcon :icon="icon" />

    <span class="text-sm italic">{{ interactionsCount }}</span>
  </span>
</template>

<style scoped></style>
