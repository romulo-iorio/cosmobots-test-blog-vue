<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'

import NewCommentInput from '@/components/NewCommentInput/NewCommentInput.vue'
import CommentDisplay from '@/components/CommentDisplay/CommentDisplay.vue'

import type { Props } from './useComments'
import { useComments } from './useComments'

const props = defineProps<Props>()
const { post } = props

const { toggleComments, showComments, comments, setComments } = useComments(props)
</script>

<template>
  <span
    class="flex items-center gap-2 cursor-pointer bg-blue-500 hover:bg-blue-600 active:bg-blue-700 w-fit p-3 rounded-lg transition duration-200 text-white select-none"
    @click="toggleComments"
  >
    <FontAwesomeIcon :icon="faComment" />

    <span class="text-sm italic">{{ post.comments.length }} comentários</span>
  </span>

  <div class="bg-gray-800 p-5 rounded-lg mt-4 flex flex-col gap-4" v-if="showComments">
    <div class="flex flex-col gap-4 max-h-80 overflow-y-auto">
      <CommentDisplay
        v-for="comment in comments"
        :setComments="setComments"
        :comment="comment"
        :key="comment.id"
      />
    </div>

    <NewCommentInput :post-id="post.id" :setComments="setComments" />
  </div>
</template>

<style scoped></style>
