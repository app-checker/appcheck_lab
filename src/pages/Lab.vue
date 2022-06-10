<template>
  <div>
    <input @change="handleBindFile($event)" type="file">
    <div v-if="data != null" class="apk_info">

      <div style="margin: 24px">
        <div v-if="data.icon != null" style="margin: 24px 0; display:flex;">
          <div>
            <appIconVue :width="120" :height="120" :data="data.icon" :border-radius="24"/>
            <!-- <img width="120" :src="appIcon" style="border-radius: 24px" /> -->
          </div>
          <div style="width: 24px"></div>
          <div>
            <h1 style="font-size: 1.8em">{{ data['applicationName'] }}</h1>
            <p>{{ data.packageName }}</p>
            <p style="color: rgb(136 132 132);font-size:12px">{{ data.versionName }}({{ data.versionCode }})</p>
            <p style="color: rgb(136 132 132);font-size:12px">targetSdkVersion {{ data.targetSdkVersion }},minSdkVersion {{ data.minSdkVersion }}</p>
            <p style="margin-top: 6px" v-if="arch.length >= 1">
              <span style="background: rgb(97 95 95); color: #fff; border-radius: 6px; display: inline-block; margin: 2px; padding: 4px 12px" v-for="(item, index) in arch" :key="index">{{ item }} </span>
            </p>
          </div>
        </div>

        <div v-if="isUsedKotlin != null && isUsedKotlin" style="display: flex;align-items: center;">
          <div>
            <kotlinIcon :width="42" :height="42" />
          </div>
          <span style="width: 3px"></span>
          <div>
            该项目使用了 Kotlin
          </div>
        </div>

      </div>

      <h2 class="subtitle"># 权限 </h2>
      <ul>
        <li style="border: 1px solid rgb(190 190 190); margin: 12px; border-radius: 12px; font-size: .8rem; text-align: left;padding: 12px 24px;" v-for="(item, index) in permissions" :key="index">
          <h4 style="font-size: 16px;font-weight: bold;">{{ item.permission }}</h4>
          <p>{{ item.desc }}</p>
        </li>
      </ul>

      <h2 class="subtitle" v-if="libs.length >= 1"># 原生库 </h2>
      <ul>
        <li :title="item.label" style="border: 1px solid rgb(190 190 190); margin: 12px; border-radius: 6px; display: flex; justify-content: space-between; padding: 12px;align-items: center;" v-for="(item, index) in libs" :key="index">
          <div>{{ item.name }}</div>
          <div v-if="item.label" style="border: 1px solid #333;padding: 6px;border-radius: 12px;cursor: pointer;" @click="handleClickNativeLib(item)">{{ item.label }}</div>
        </li>
      </ul>

    </div>
  </div>

  <bottomModal :data="bottomModalData" ref="bottomModalVue" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ApkManifest, ApkUtilsImpl } from '@/apk';
import { ApkAnalyzeImpl } from '@/apk/analyze';
import { arrayBufferToImage } from '@/apk/browser';
import { ApkNativeLibItemModel, ApkRuleItemModel, ApkRules } from '@/apk/rules';
import bottomModal from '@/components/bottom_modal.vue'
import kotlinIcon from '@/components/kotlin_icon.vue'
import appIconVue from '@/components/appicon.vue'
import * as PermissionsData from '@/apk/permission'

const apkRules = new ApkRules();

onMounted(async ()=> {
  await apkRules.init()
})

const bottomModalVue = ref<InstanceType<typeof bottomModal>>()

const data = ref<ApkManifest | null>()

const bottomModalData = ref<ApkNativeLibItemModel | null>(null)

const isUsedKotlin = ref<boolean | null>(null)

const arch = ref<string[]>([])

const libs = ref<ApkRuleItemModel[]>([])

const permissions = computed<PermissionsData.permissionModal[]>(()=> {
  const value = data.value
  if (!value) return []
  return value.permissionList.map(item=> {
    const _sp = item.split('.')
    const _const = _sp[_sp.length - 1]
    const desc = PermissionsData.getPermissionDesc(_const)
    let permission = item
    if (!!desc) permission = _const
    return <PermissionsData.permissionModal>{
      permission,
      desc,
    }
  }) as PermissionsData.permissionModal[]
})

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

async function handleClickNativeLib(item: ApkRuleItemModel) {
  const data = await ApkRules.getLibInfo(item)
  bottomModalData.value = data
  bottomModalVue.value?.showModal()
}
</script>

<style scoped>
ul li {
  list-style: none;
}
.apk_info {
  width: 88vw;
  height: auto;
  border-radius: 12px;
  margin: 24px;
  text-align: left;
}

.subtitle {
  font-size: 24px;
  font-weight: bold;
  margin: 12px 24px;
}

</style>