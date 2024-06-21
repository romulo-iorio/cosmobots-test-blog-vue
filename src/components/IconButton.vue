<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'

interface Props {
  baseColor?: string
  icon: IconDefinition
}

const { icon, baseColor = 'gray' } = defineProps<Props>()

const colorClasses = `bg-${baseColor}-500 text-white hover:bg-${baseColor}-600 active:bg-${baseColor}-700`
</script>

<template>
  <button :class="`p-2 rounded-lg w-10 h-10 transition duration-200 ${colorClasses}`">
    <FontAwesomeIcon :icon="icon" />
  </button>
</template>

<style scoped></style>
