<script setup lang="ts">
import addFriends from '@/modal/add-friends.vue'
import editInfo from '@/modal/edit-info.vue'

import { onMounted } from 'vue'
import user from './chat-components/user.vue'
import { RouterView } from 'vue-router'
import { useEmitSocket } from '@/hooks/useEmitSocket'
const { emitJoinSocket } = useEmitSocket()
import socket from '@/socket/index'
import '@/socket/reciveSocket'
socket.connect()
onMounted(() => {
  setTimeout(() => {
    emitJoinSocket()
  }, 1000)
})
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
  <add-friends />
  <edit-info />
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
