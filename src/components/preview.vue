<template>
  <div id="preview" :class="{
    hide: !isShow
  }" @click="handleClickBackdrop">
    <div @click.stop class="center-box" :class="{
      active: isShow,
    }">
      <div class="toolbar">
        <div class="tabbar">
          <a :class="{
            active: currentTab == index
          }" @click.stop.prevent="handleClickTab(index)" href="#" v-for="(item, index) in tabs">
            <SvgIcon :width="20" :name="item.icon" />
            <div style="width: 4px"></div>
            <p>{{ item.title }}</p>
          </a>
        </div>
        <div @click="isShow = false" class="close-icon">
          <svg width="24px" height="24px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 8L40 40"  stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8 40L40 8"  stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
      <div class="content">
        <div v-if="currentTab == 0" class="tab-item">
          <div style="display: flex; justify-content: center; align-items: center" v-if="apkPreview?.fileType == FileType.BINARY">
            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 25C14 19.4772 18.4772 15 24 15C29.5228 15 34 19.4772 34 25V41H14V25Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/><path d="M24 5V8" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M35.8918 9.32823L33.9634 11.6264" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M42.2187 20.2873L39.2642 20.8083" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.78116 20.2874L8.73558 20.8083" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.1086 9.32802L14.037 11.6262" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 41H43" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <p style="margin-left: 12px">二进制文件不支持预览:(</p>
          </div>
          <div v-else-if="apkPreview?.fileType == FileType.IMAGE">
            <img ref="previewImageRef" :src="image" alt="预览图片" />
            <div v-if="!imageIsGIF">
              <button @click="handleExportImage">导出图片</button>
            </div>
          </div>
          <div style="text-align: left" v-else>
            {{  text }}
          </div>
        </div>
        <div v-else class="tab-item">
          {{ apkPreview?.fileType }} | {{ apkPreview?.fileAttr.size }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import JSZip from 'jszip';
import { ref, computed } from 'vue'
import { ApkPreview } from '@/apk/preview'
import { FileType } from '@/apk/filetypes'
import SvgIcon from './svg_icon.vue';

const isShow = ref<boolean>(false)

const props = defineProps<{
  /**
   * 点击 `backdrop` 是否默认关闭
   */
  backdropClose: boolean
}>()

defineExpose({
  show,
  hide,
})


const tabs = [
  {
    title: '预览',
    icon: 'preview',
  },
  {
    title: '属性',
    icon: 'topic',
  }
]

const previewImageRef = ref()
const currentTab = ref<number>(0)
const apkPreview = ref<ApkPreview | null>(null)
const text = ref<string>("")
const imageFilename = computed<string>(()=> {
  return apkPreview.value?.file.name.replace(/^.*[\\\/]/, '') ?? ""
})
// NOTE: gif 手动保存呗
const imageIsGIF = computed<boolean>(()=> {
  return imageFilename.value.split('.').pop()?.toLocaleLowerCase() == 'gif'
})
const image = computed<string>(()=> {
  const _text = text.value
  const ext = imageFilename.value.split('.').pop()
  // FIXME: 默认图片
  if (!_text) return ""
  // FIXME: `gif` 不支持
  return `data:image/${ ext };base64,${ _text }`
})

async function show(file: JSZip.JSZipObject) {
  currentTab.value = 0
  const _ = new ApkPreview(file)
  apkPreview.value = _
  let _buffer = 'string'
  if (_.fileType == FileType.IMAGE) {
    _buffer = 'base64'
  }
  text.value = await file.async(_buffer as any)
  isShow.value = true
}

function hide() {
  isShow.value = false
}

function handleClickBackdrop() {
  if (props.backdropClose) {
    hide()
  }
}

function handleClickTab(index: number) {
  currentTab.value = index
}

function handleExportImage() {
  const _imageFilename = imageFilename.value
  const image = previewImageRef.value as HTMLImageElement
  if (!image) return
  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height

  const context = canvas.getContext('2d')
  if (!context) return
  context.drawImage(image, 0, 0, image.width, image.height)
  const url = canvas.toDataURL('image/png')
  const a = document.createElement('a')
  const event = new MouseEvent('click')
  a.download = _imageFilename ?? "default.png"
  a.href = url
  a.dispatchEvent(event)
}
</script>

<style scoped>
#preview {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background: rgba(0, 0, 0, .4);
  transition: all .4s;
}

#preview.hide {
  z-index: -100;
  opacity: 0;
}

.center-box {
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 72vh;
  border-radius: 24px;
  pointer-events: none;
  transform: scale(.2) translateY(20vh);
  opacity: 0;
  background-color: #fff;
  box-shadow: 3px 3px 4px rgb(0 102 204 / 20%);
  transition: all .3s;
}

.center-box.active {
  pointer-events: all;
  opacity: 1;
  transform: scale(1) translateY(0);
}

.toolbar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 75px;
  padding: 24px;
  box-sizing: border-box;
}

.toolbar .tabbar {
  display: flex;
}

.toolbar a {
  display: flex;
  align-items: center;
  position: relative;
  color: #333;
  font-size: 18px;
  margin: 0 12px;
  text-decoration: none;
}

.toolbar a::before {
  content: "";
  position: absolute;
  bottom: -18px;
  opacity: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #414141;
  border-radius: 8px;
  transition: all .1s;
}

/* .toolbar a:hover:before */
.toolbar a.active::before {
  bottom: -9px;
  height: 3px;
  opacity: 1;
}

.content {
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  height: calc(100% - 75px);
  padding: 12px;
}

.content .tab-item div,
.content .tab-item {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.content .tab-item div {
  overflow: auto;
}

.close-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.close-icon path {
  stroke: #333
}

.close-icon:hover path {
  stroke: red;
}

button {
  position: relative;
  border: 0px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 12px 30px;
  line-height: 1;
  text-align: center;
  text-decoration: none;
  overflow: visible;
  margin-left: 0;
  transform: translate(0px,0px);
  margin-right: 0;
  border-radius: 12px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  margin-top: 12px;
}
</style>