<template>
  <div>
    <input @change="handleBindFile($event)" type="file">
    <div v-if="data != null" class="apk_info">
      <div v-if="appIcon != null" style="margin-top: 24px">
        <img width="120" :src="appIcon" style="border-radius: 24px" />
      </div>
      <div>
        <p v-if="isUsedKotlin != null && isUsedKotlin">该软件使用了 Kotlin</p>
        <p v-if="arch.length >= 1">
          架构: <span v-for="(item, index) in arch" :key="index">{{ item }} {{ (index < arch.length - 1) ? '| ' : ''  }} </span>
        </p>
      </div>
      <ul>
        <li v-for="(v, k) in data">
          <p v-if="!isArray(v)">
            <template v-if="k != 'icon'">
              {{ k }} : {{ v }}
            </template>
          </p>
          <ul v-else>
            <p>权限: </p>
            <li style="border: 1px solid rgb(190 190 190); margin: 12px; border-radius: 6px" v-for="(item, index) in v">
              {{ item }}
            </li>
          </ul>
        </li>
      </ul>
      <p v-if="libs.length >= 1">使用的库: </p>
      <ul>
        <li :title="item.label" style="border: 1px solid rgb(190 190 190); margin: 12px; border-radius: 6px" v-for="(item, index) in libs" :key="index">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isArray } from '@vue/shared';
import { ref, computed, onMounted } from 'vue'
import { ApkManifest, ApkUtilsImpl } from '@/apk';
import { ApkAnalyzeImpl } from '@/apk/analyze';
import { arrayBufferToImage } from '@/apk/browser';
import { ApkRuleItemModel, ApkRules } from '@/apk/rules';

const apkRules = new ApkRules();

onMounted(async ()=> {
  await apkRules.init()
})

const data = ref<ApkManifest | null>()

const appIcon = computed(()=> {
  const value = data.value
  if (!value) return
  return arrayBufferToImage(value.icon)
})

const isUsedKotlin = ref<boolean | null>(null)

const arch = ref<string[]>([])

const libs = ref<ApkRuleItemModel[]>([])

async function handleBindFile(event: Event) {
  const _event = event as any
  const file = _event.target.files
  if (!file) return
  if (file?.length <= 0) return
  const _file = file[0]
  const apk = new ApkUtilsImpl(_file)
  try {
    await apk.init()
    if (!apk.isApk()) return
    const analyze = new ApkAnalyzeImpl(apk)
    const apkManifest = await apk.getApkManifest()
    arch.value = analyze.getArchAsString()
    const _libs = (await analyze.getLibs()).map(item=> {
      const lib = apkRules.find(item)
      if (!lib) return <ApkRuleItemModel>{
        name: item,
        label: '',
      }
      return lib
    })
    // debugger
    libs.value = _libs
    isUsedKotlin.value = analyze.isUsedKotlin()
    data.value = apkManifest
  } catch (error) {
    alert(error)
  }
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