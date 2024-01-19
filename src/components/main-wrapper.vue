<script setup lang="ts">
import searchPlugin from './search-plugin.vue'
</script>
<template>
  <div class="chat-container">
    <div class="chat-list">
      <div class="top">
        <search-plugin />
      </div>
      <slot name="list"></slot>
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
    padding-top: 20px;

    .top {
      padding: 0 15px 10px 15px;
      display: flex;
      align-items: center;

    }
  }
}
</style>