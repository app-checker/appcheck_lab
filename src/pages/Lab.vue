<template>
  <div>
    <input @change="handleBindFile($event)" type="file">
    <div v-if="data != null" class="apk_info">
      <ul>
        <li v-for="(v, k) in data">
          <p v-if="!isArray(v)">{{ k }} : {{ v }}</p>
          <ul v-else>
            <li style="border: 1px solid rgb(190 190 190); margin: 12px; border-radius: 6px" v-for="(item, index) in v">
              {{ item }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isArray } from '@vue/shared';
import { ref } from 'vue'
import { ApkManifest, ApkUtilsImpl } from '@/apk';

const data = ref<ApkManifest | null>()

async function handleBindFile(event: Event) {
  const _event = event as any
  const file = _event.target.files
  if (!file) return
  if (file?.length <= 0) return
  const _file = file[0]
  const apk = new ApkUtilsImpl(_file)
  await apk.init()
  if (!apk.isApk()) return
  const apkManifest = await apk.getApkManifest()
  data.value = apkManifest
}
</script>

<style scoped>
ul li {
  list-style: none;
}
.apk_info {
  width: 88vw;
  height: auto;
  border: 1px solid #333;
  border-radius: 12px;
  margin: 24px;
}
</style>