<template>
  <div>
    <template v-if="!showDefaultImage">
      <img :src="appIcon" :width="width" :height="height" :style="{
        borderRadius: `${borderRadius}px`,
      }" />
    </template>
    <appDefaultIcon :width="width" :height="height" v-else />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { arrayBufferToImage } from '@/apk/browser';
import appDefaultIcon from '@/components/appicon_default.vue'

const props = defineProps<{
  width: number,
  height: number,
  data: ArrayBuffer,
  borderRadius: number,
}>()

const showDefaultImage = computed(()=> {
  return props.data.byteLength == 0
})

const appIcon = computed(()=> {
  const data = props.data
  return arrayBufferToImage(data)
})
</script>