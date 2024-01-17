<script setup lang="ts">
import user from './components/user.vue'
import { RouterView } from 'vue-router'
import socket from '@/socket/index'
socket.connect()
</script>

<template>
  <div class="container">
    <div class="user-container">
      <user></user>
    </div>
    <div class="message-list-container">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100vh;
  margin-top: -20px;
  .user-container {
    width: 60px;
    background: #f8eded;
    height: 100vh;
  }
  .message-list-container {
    flex: 1;
  }
}
</style>
