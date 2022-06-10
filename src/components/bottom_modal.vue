<template>
  <div v-show="show" class="mask" @click="show = false"></div>
  <div @click.stop="" class="modal" :style="modalStyle">
    <template v-if="data != null">
      <h1 style="font-size: 1.8em; margin-bottom: 42px;">{{ data.team }}</h1>
      <p>{{ data.description }}</p>
      <a :href="data.relativeUrl" target="_blank">{{ data.label }}</a>
    </template>
    <p v-else>未知错误</p>
  </div>
</template>

<script setup lang="ts">
import { ApkNativeLibItemModel } from '@/apk/rules';
import { computed, ref } from 'vue';

defineProps<{
  data: ApkNativeLibItemModel | null
}>()

const show = ref<boolean>(false)

function trigger() {
  console.log('what happend?')
  show.value = false
}

defineExpose({
  showModal,
  hideModal,
  toggleModal
})

const modalStyle = computed(()=> {
  const _show = show.value
  return {
    transform: `translateY(${ _show ? '0vh' : '40vh' })`,
  }
})

function showModal() {
  show.value = true
}

function hideModal() {
  show.value = false
}

function toggleModal() {
  show.value = !show.value
}


</script>

<style scoped>
.modal {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 40vh;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  text-align: center;
  color: #fff;
  box-sizing: border-box;
  padding: 8vw;
  transition: all .4s;
}
a {
  color: pink;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 4299;
}
</style>