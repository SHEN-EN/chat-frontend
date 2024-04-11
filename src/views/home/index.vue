<script setup lang="ts">
import addFriends from '@/modal/add-friends.vue'
import editInfo from '@/modal/edit-info.vue'
import user from '@/components/user.vue'
import { useGlobalStore } from '@/stores/modules/global'
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useEmitSocket } from '@/hooks/useEmitSocket'
const { emitJoinSocket } = useEmitSocket()
const { globalModal, fetchUserInfo } = useGlobalStore()
import socket from '@/socket/index'
socket.connect()
import '@/socket/reciveSocket'

onMounted(async () => {
  await fetchUserInfo()
  setTimeout(() => {
    emitJoinSocket()
  }, 5000)
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
  <add-friends v-if="globalModal.addFriends" />
  <edit-info v-if="globalModal.editInfo" />
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
