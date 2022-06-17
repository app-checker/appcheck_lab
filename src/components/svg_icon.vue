<template>
  <svg :width="width" :height="height" aria-hidden="true">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  color: {
    type: String,
    default: '#333',
  },
  name: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    default: 24,
  },
  height: {
    type: Number,
    default: 24,
  }
})

const symbolId = computed(()=> {
  return `#${props.prefix}-${props.name}`
})
</script>