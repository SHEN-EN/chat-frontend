<script setup lang="ts">
import { useDragResize } from '@/hooks/useDragResize'
import { onMounted, ref } from 'vue'
import searchPlugin from './search-plugin.vue'

const dragInstance = ref<HTMLElement | null>(null)
const targetInstance = ref<HTMLElement | null>(null)

onMounted(() => {
  useDragResize(
    dragInstance.value as HTMLElement,
    targetInstance.value as HTMLElement,
    {
      resizeType: 'width',
      max: 360,
      min: 170,
    }
  )
})
</script>
<template>
  <div class="chat-container">
    <div class="chat-list" ref="targetInstance">
      <div class="top">
        <search-plugin />
      </div>
      <slot name="list"></slot>
      <div class="drag" ref="dragInstance"></div>
    </div>
    <slot name="right"></slot>
  </div>
</template>
<style lang="scss" scoped>
.chat-container {
  display: flex;
  height: 100vh;

  .chat-list {
    width: 260px;
    background: #fff;
    border-right: 1px solid #f8eded;
    padding-top: 20px;
    position: relative;

    .top {
      padding: 0 15px 10px 15px;
      display: flex;
      align-items: center;
    }
    .drag {
      height: 100%;
      width: 4px;
      position: absolute;
      right: 0;
      top: 0;
      cursor: e-resize;
    }
  }
}
</style>