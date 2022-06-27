<template>
  <div>
    <input @change="handleBindFile($event)" type="file">
    <div v-if="data != null" class="apk_info">

      <div style="margin: 24px">
        <div v-if="data.icon != null" style="margin: 24px 0; display:flex;">
          <div>
            <appIconVue :width="120" :height="120" :data="data.icon" :border-radius="24"/>
          </div>
          <div style="width: 24px"></div>
          <div>
            <h1 style="font-size: 1.8em">{{ data['applicationName'] }}</h1>
            <p>{{ data.packageName }}</p>
            <p style="color: rgb(136 132 132);font-size:12px">{{ data.versionName }}({{ data.versionCode }})</p>
            <p style="color: rgb(136 132 132);font-size:12px">targetSdkVersion {{ data.targetSdkVersion }},minSdkVersion {{ data.minSdkVersion }}</p>
            <p style="margin-top: 6px" v-if="arch.length >= 1">
              <span style="background: rgb(97 95 95); color: #fff; border-radius: 6px; display: inline-block; margin: 2px; padding: 4px 12px" v-for="(item, index) in arch" :key="index" :title="item[1]">{{ item[0] }} </span>
            </p>
          </div>
        </div>

        <div v-if="technology.length">
          <ul>
            <li :title="item.desc" style="display: flex; align-items: center; margin-top: 6px" v-for="(item, index) in technology" :key="index">
              <div v-if="item.icon.startsWith('http')">
                <img style="vertical-align:middle;" width="32" height="32" :src="item.icon" />
              </div>
              <svgIcon v-else :width="32" :name="item.icon" />
              <div style="margin-left: 12px">
                <a target="_blank" :href="item.link" style="text-decoration: none; color: #333">该项目使用了 <span>{{ item.id }}</span></a>
              </div>
            </li>
          </ul>
        </div>

      </div>

      <div class="bar">
        <ul style="display: flex; font-size: 1.2em; background: #ececec; color: #787878; border-radius: 0.25rem; padding: 6px;">
          <li @click="apkMenuBarCurrent = index" :class="[ index == apkMenuBarCurrent ? 'active shadow' : '' ]" v-for="(item, index) in apkMenuBar" :key="index">
            {{ item.label }}
          </li>
        </ul>
      </div>

      <ul v-if="apkMenuBarCurrent == apkMenuBarAction.permission">
        <li style="border: 1px solid rgb(190 190 190); margin: 12px; border-radius: 12px; font-size: .8rem; text-align: left;padding: 12px 24px;" v-for="(item, index) in permissions" :key="index">
          <h4 style="font-size: 16px;font-weight: bold;">{{ item.permission }}</h4>
          <p>{{ item.desc }}</p>
        </li>
      </ul>

      <ul v-else-if="apkMenuBarCurrent == apkMenuBarAction.native">
        <div v-if="libIsEmpty" style="display: flex; justify-content:center; align-items: center; margin: 12vh 0 0">
          <svgIcon name="empty" :width="42" style="position: relative;top: -2px; opacity: .8  ;" />
          <div style="width: .8rem;"></div>
          <p style="font-size: 18px; font-weight: bold">无原生库 :)</p>
        </div>
        <li v-else :title="item.label" style="border: 1px solid rgb(190 190 190); margin: 12px; border-radius: 6px; display: flex; justify-content: space-between; padding: 12px;align-items: center;" v-for="(item, index) in libs" :key="index">
          <div>{{ item.name }}</div>
          <div v-if="item.label" style="border: 1px solid #333;padding: 6px;border-radius: 12px;cursor: pointer;" @click="handleClickNativeLib(item)">{{ item.label }}</div>
        </li>
      </ul>

      <div v-else>
        <treeMenu :model="apkFileTree" />
      </div>

    </div>

    <div v-show="isParsing" style="display: flex;align-items: center;justify-content: center; margin-top: 24px">
      <div class="vue-loading" style="fill: #333;width: 50px;height: 50px;">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
          <path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
          <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>
          </path>
        </svg>
      </div>
      <div style="width: 24px"></div>
      <div>
        正在解析文件...
      </div>
    </div>

    <div style="margin: 24px;
    color: rgb(245, 108, 108);
    font-size: 14px;
    background-color: rgb(254, 240, 240);
    display: flex;
    text-align: left;
    padding: 24px;
    border-radius: 4px;
    align-items: center;" v-if="!!parsingError && !isParsing">
      <div>
        <svg t="1654940109714" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2137" width="28" height="28"><path d="M512 0a512 512 0 0 0-512 512 512 512 0 0 0 512 512 512 512 0 0 0 512-512 512 512 0 0 0-512-512z" fill="#FD6B6D" p-id="2138"></path><path d="M513.755429 565.540571L359.277714 720.018286a39.058286 39.058286 0 0 1-55.296-0.073143 39.277714 39.277714 0 0 1 0.073143-55.442286l154.331429-154.331428-155.062857-155.136a36.571429 36.571429 0 0 1 51.712-51.785143l365.714285 365.714285a36.571429 36.571429 0 1 1-51.785143 51.785143L513.755429 565.540571z m157.549714-262.582857a35.254857 35.254857 0 1 1 49.737143 49.737143l-106.057143 108.982857a35.254857 35.254857 0 1 1-49.883429-49.810285l106.203429-108.982858z" fill="#FFFFFF" p-id="2139"></path></svg>
      </div>
      <div style="margin-left: 12px">
        <p style="font-weight: bold;">解析Apk失败</p>
        <p style="font-size: 12px">{{ parsingError }}</p>
      </div>
    </div>
  </div>

  <bottomModal :data="bottomModalData" ref="bottomModalVue" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ApkManifest, ApkUtilsImpl } from '@/apk';
import { ApkAnalyzeImpl } from '@/apk/analyze';
import { ApkNativeLibItemModel, ApkRuleItemModel, ApkRules, ReApkRuleItemModel } from '@/apk/rules';
import bottomModal from '@/components/bottom_modal.vue'
import appIconVue from '@/components/appicon.vue'
import * as PermissionsData from '@/apk/permission'
import { ZipTree } from '@/apk/tree';
import treeMenu from '@/components/tree_menu.vue';
import { ApkTechnologyModel } from '@/apk/platform';
import svgIcon from '@/components/svg_icon.vue';

const apkRules = new ApkRules();

onMounted(async ()=> {
  await apkRules.init()
})

enum apkMenuBarAction {
  permission,
  native,
  files
}

const apkMenuBar = [
  {
    label: '权限',
    action: apkMenuBarAction.permission
  },
  {
    label: '原生库',
    action: apkMenuBarAction.native
  },
  {
    label: '文件',
    action: apkMenuBarAction.files
  },
]

const apkMenuBarCurrent = ref<apkMenuBarAction>(apkMenuBarAction.permission)

const bottomModalVue = ref<InstanceType<typeof bottomModal>>()

const data = ref<ApkManifest | null>()

const bottomModalData = ref<ApkNativeLibItemModel | null>(null)

const technology = ref<ApkTechnologyModel[]>([])

const arch = ref<string[][]>([])

const libs = ref<ApkRuleItemModel[]>([])

const isParsing = ref<boolean>(false)

const parsingError = ref<string>('')

const apkFileTree = ref<ZipTree[]>([])

const libIsEmpty = computed(()=> {
  return libs.value.length <= 0
})

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
  isParsing.value = true
  parsingError.value = ''
  try {
    data.value = null;
    await apk.init()
    if (!apk.isApk()) return
    const analyze = new ApkAnalyzeImpl(apk)
    apkFileTree.value = await analyze.getFileTree()
    const apkManifest = await apk.getApkManifest()
    arch.value = analyze.getArchAsString()
    const rawLibs = await analyze.getLibs()
    const _libs = rawLibs.map(item=> {
      const lib = apkRules.find(item)
      if (!lib) return <ApkRuleItemModel>{
        name: item,
        label: '',
      }
      return lib
    })
    libs.value = _libs
    technology.value = await analyze.getTechnology(rawLibs)
    data.value = apkManifest
  } catch (error) {
    const msg = (error as Error).message
    parsingError.value = msg
  }
  isParsing.value = false
}

async function handleClickNativeLib(item: ApkRuleItemModel) {
  const data = await ApkRules.getLibInfo(item as ReApkRuleItemModel)
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
.shadow {
  --tw-shadow: 0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow);
}

.bar li {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0.42rem;
  border-radius: 0.25rem;
}

.bar .active {
  background: #fff;
}
</style>