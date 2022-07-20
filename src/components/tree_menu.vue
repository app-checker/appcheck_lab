<template>

  <ul v-if="isArray(model)">
    <tree-menu v-for="item in model" :key="item.id" :model="item" @click-file="handleClick" />
  </ul>

  <li v-else @click.stop="toggle(model)">
    <div style="display: flex; align-items: center; cursor: pointer; justify-content: space-between;">
      <div style="display: flex; align-items: center; cursor: pointer">
        <svg-icon :style="{
        transform: `rotate(${open ? '90' : '0'}deg)`,
          transition: `all .3s`,
        }" class="svg_icon" v-if="hasChild(model)" name="arrow" :width="14" :height="14" />
        <svg-icon v-else :name="icon" />
        <div style="width: 6px"></div>
        <p>
          {{ model.filename }}
        </p>
      </div>
      <div style="font-size: 14px">{{ model.size }}</div>
    </div>
    <ul @click.stop="" v-if="hasChild(model) && open" style="margin-left: 12px">
      <tree-menu :model="model.children" @click-file="handleClick"/>
    </ul>
  </li>

</template>

<script lang="ts" setup>
import { isArray } from '@vue/shared';
import { ref } from 'vue'
import treeMenu from './tree_menu.vue'
import svgIcon from './svg_icon.vue'
import { computed } from '@vue/reactivity';
import { ZipTree } from '@/apk/tree';

const emit = defineEmits<{
  (event: 'clickFile', value: ZipTree): void
}>()

const props = defineProps({
  model: {
    type: Object,
    default: () => ({})
  },
})

const open = ref(false)

const icon = computed<string>(()=> {
  const model = props.model as ZipTree[] | ZipTree
  if (isArray(model)) return 'default';
  const file = model.filename
  let ext = file.split('.').pop()?.toLocaleLowerCase()
  const includes = [
    'css',
    'html',
    'json',
    'xml',
    'yml',
  ]
  if (ext == 'js') {
    ext = 'javascript'
  } else if (ext == 'md') {
    ext = 'markdown'
  } else if (!includes.includes(ext ?? "")) {
    ext = 'default'
  }
  return ext ?? 'default'
  // return Object.assign({}, model, { ext }) as any
})

const hasChild = (item: any) => {
  return item.hasOwnProperty('children') && item.children.length > 0
}

async function toggle(item: any) {
  const _has = hasChild(item)
  if (_has) {
    open.value = !open.value
    return
  }
  emit('clickFile', item)
}

function handleClick(item: ZipTree) {
  emit('clickFile', item)
}
</script>

<style>
ul {
  list-style: none;
  margin: 10px 0;
  margin-top: 1px;
}

/* li {
  padding: 3px 0;
} */

li>span {
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
}

.svg_icon {
  display: inline-block;
  margin-right: 5px;
  background-repeat: no-repeat;
  vertical-align: middle;
}

.tree-menu li {
  line-height: 1.5;
}
</style>
