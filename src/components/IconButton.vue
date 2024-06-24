<script setup lang="ts">
import { defineProps } from 'vue'

import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

type Colors = 'gray' | 'red' | 'green' | 'blue'
type Size = 'sm' | 'md' | 'lg'

interface Props {
  size?: Size
  isDisabled?: boolean
  baseColor?: Colors
  icon: IconDefinition
}

const { icon, baseColor = 'gray', isDisabled, size = 'md' } = defineProps<Props>()

const colorClassesMapping: Record<Colors, string> = {
  gray: 'bg-gray-500 hover:bg-gray-600 active:bg-gray-700',
  red: 'bg-red-500 hover:bg-red-600 active:bg-red-700',
  green: 'bg-green-500 hover:bg-green-600 active:bg-green-700',
  blue: 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
}
const colorClasses = colorClassesMapping[baseColor]

const sizeClassesMapping: Record<Size, string> = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10 p-2',
  lg: 'w-12 h-12 p-3'
}

const sizeClasses = sizeClassesMapping[size]
</script>

<template>
  <button
    :class="`rounded-lg transition duration-200 text-white disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 ${colorClasses} ${sizeClasses}`"
    :disabled="isDisabled"
  >
    <FontAwesomeIcon :icon="icon" size="sm" />
  </button>
</template>

<style scoped></style>
