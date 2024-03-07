<script setup lang="ts">
import addFriends from '@/modal/add-friends.vue'
import editInfo from '@/modal/edit-info.vue'
import userRequestModel from '@/api/modules/user'
import user from '@/components/user.vue'
import { useGlobalStore } from '@/stores/modules/global'
import { useChatStore } from '@/stores/modules/chat'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterView } from 'vue-router'
import { useEmitSocket } from '@/hooks/useEmitSocket'
const { emitJoinSocket } = useEmitSocket()
const { setUserInfo, globalModal } = useGlobalStore()
const { chatList } = storeToRefs(useChatStore())

import { get } from '@/indexDB'

import socket from '@/socket/index'
import '@/socket/reciveSocket'
socket.connect()

const fetchUserInfo = () => {
  userRequestModel.getUserInfo().then((res: { data: { uuid: string } }) => {
    setUserInfo(res.data)
    fetchChatList(res.data.uuid)
  })
}
const fetchChatList = async (uuid: string) => {
  get('tb_chatList', 'uuid', uuid).then((res: any[]) => {
    for (const iterator of res) {
      const {
        lastmessage,
        lasttime,
        sendername,
        senderuuid,
        unreadnums,
        uuid,
        avatar,
      } = iterator

      chatList.value.push({
        time: lasttime,
        uuid: senderuuid,
        username: sendername,
        data: lastmessage,
        avatar,
      })
    }
  })
}
onMounted(() => {
  fetchUserInfo()
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
