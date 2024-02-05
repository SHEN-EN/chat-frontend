<script setup lang="ts">
import { ref, computed } from 'vue'
import { useChatStore } from '@/stores/modules/chat'
import { useGlobalStore } from '@/stores/modules/global'
import type { chatDataType } from '@/types/global'

import chatBubble from './components/chat-bubble.vue'
import chatInput from './components/chat-input.vue'
import mainWrapper from '@/components/main-wrapper.vue'
const drawer = ref(false)
import { useRouter } from 'vue-router'
const { chatData, chatList } = useChatStore()
const { getUserInfo } = useGlobalStore()

const handleSelectChat = () => {}

const userUuid = ref('')
userUuid.value = getUserInfo().uuid

const rebuildChatData = computed(
  (): {
    message: any
    isSender: boolean
  }[] => {
    return chatData.map((item: chatDataType) => {
      return {
        isSender: item.senderId === userUuid.value ? true : false,
        message: item.data,
      }
    })
  }
)
const timestampToDateString = (timestamp: number): string => {
  const currentDate = new Date()
  const targetDate = new Date(timestamp)
  const diffTime = currentDate.getTime() - timestamp

  if (diffTime < 86400000) {
    const hours = String(targetDate.getHours()).padStart(2, '0')
    const minutes = String(targetDate.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  } else if (diffTime < 86400000 * 2) {
    return '昨天'
  } else {
    const year = targetDate.getFullYear()
    const month = String(targetDate.getMonth() + 1).padStart(2, '0')
    const day = String(targetDate.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
}
</script>

<template>
  <main-wrapper>
    <template #list>
      <div class="list" v-if="chatList.length > 0">
        <div class="item" @click="handleSelectChat(item.reciverId)" v-for="item in chatList" :key="item.senderId">
          <div>
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          </div>
          <div class="content">
            <div class="item-title">{{ item.username }}</div>
            <div class="item-text">{{ item.data  || '112313'}}</div>
          </div>
          <div class="time">{{ timestampToDateString(item.time)  }}</div>
        </div>
      </div>
      <div class="not-message" v-else>
        暂时没有新消息
      </div>
    </template>
    <template #right>
      <div class="chat">
        <div class="top">
          <div class="name">
            Electron 吹牛群
          </div>
          <div class="event">
            <i class="iconfont icon-dianhua"></i>
            <i class="iconfont icon-video-camera"></i>
            <i class="iconfont icon-Icon-line-more" @click="drawer = true"></i>

          </div>
        </div>
        <div class="chat-content">
          <el-drawer v-model="drawer" title="I am the title" :with-header="false" :modal="false">
            <span>Hi there!</span>
          </el-drawer>
          <el-scrollbar>
            <chat-bubble v-for="(chat, index) in rebuildChatData" :isSender="chat.isSender" :message="chat.message" :key="index"></chat-bubble>
          </el-scrollbar>
        </div>
        <div class="chat-input">
          <chat-input></chat-input>
        </div>
      </div>
    </template>
  </main-wrapper>

</template>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;

  .item {
    display: flex;
    align-items: center;
    max-width: 260px;
    height: 65px;
    padding: 10px;
    box-sizing: border-box;

    .content {
      margin-left: 10px;
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-evenly;
      .item-title {
        font-size: 14px;
        margin-bottom: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 70%;
      }

      .item-text {
        width: 70%;
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #b1acac;
      }
    }
    .time {
      font-size: 10px;
      color: #b1acac;
    }
    &:hover {
      background: #dedede;
    }
  }
}
.not-message {
  font-size: 12px;
  display: flex;
  height: 100%;
  color: #c6b7b7;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.chat {
  flex: 1;
  background: #f8eded;
  padding-top: 20px;

  .top {
    padding: 0 20px;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    &::after {
      position: absolute;
      bottom: 0;
      left: 0;
      background: #dedbdb;
      content: '';
      height: 1px;
      width: 100%;
    }

    .name {
      font-size: 14px;
    }

    .event {
      .iconfont {
        font-size: 22px;
        cursor: pointer;
        margin-left: 18px;
      }
    }
  }

  .chat-content {
    height: calc(100% - 210px);
    padding-top: 10px;
  }

  .chat-input {
    height: 160px;
    border-top: 1px solid #ebdbdb;
  }
}
</style>
