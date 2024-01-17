<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useIpcRenderer } from '@/hooks/useIpcRenderer'
const route = useRoute()
const { sendEvent, invokeEvent } = useIpcRenderer()
const isMaximized = ref<Boolean>(false)

const handleMin = () => {
  sendEvent('minimize')
}
const handleMax = () => {
  sendEvent('maximize')
  invokeEvent('get-is-maximized').then((res: Boolean) => {
    isMaximized.value = res
  })
}
const handleClose = () => {
  sendEvent('quit')
}
const handleDrag = () => {}
</script>
<template>
  <div class="app-header" @mousedown="handleDrag">
    <div class="control-item" @click="handleMin">
      <i class="iconfont icon-minus"></i>
    </div>
    <div class="control-item" @click="handleMax">
      <i :class="['iconfont',!isMaximized ? 'icon-zuidahua' : 'icon-zuixiaohua']"></i>
    </div>
    <div class="control-item close" @click="handleClose">
      <i class="iconfont icon-close"></i>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.app-header {
  z-index: 2;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 20px;
  .control-item {
    height: 20px;
    width: 20px;
    margin-right: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    .iconfont {
      font-size: 14px;
    }
    &:hover {
      background: #cecaca;
    }
  }
  .close {
    margin-right: 0;
    &:hover {
      background: rgb(249, 68, 68);
      color: #fff;
    }
  }
}
</style>

