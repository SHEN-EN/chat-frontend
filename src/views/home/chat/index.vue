<script setup lang="ts">
import { imageSuffix } from '@/util/commonFileType'
import { useIpcRenderer } from '@/hooks/useIpcRenderer'
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { useChatStore } from '@/stores/modules/chat'
import { useGlobalStore } from '@/stores/modules/global'
import type { chatDataType, fileInfo } from '@/types/global'
import chatBubble from './components/chat-bubble.vue'
import chatInput from './components/chat-input.vue'
import mainWrapper from '@/components/main-wrapper.vue'
import { storeToRefs } from 'pinia'
const { invokeEvent } = useIpcRenderer()
const drawer = ref(false)
const { getUserInfo } = useGlobalStore()
const { chatList, chatData } = storeToRefs(useChatStore())

const { chatUser } = storeToRefs(useGlobalStore())

const route = useRoute()

const uuid = route.query?.uuid || ''

const rebuildChatData = computed(
  (): {
    message: any
    isSender: boolean
    messageType: string
    fileInfo?: fileInfo
  }[] => {
    return chatData.value.map((item: chatDataType) => {
      return {
        isSender: item.uuid === getUserInfo().uuid ? true : false,
        message:
          item.messageType === 'file'
            ? convertBufferToFile(item.data, item.fileInfo)
            : item.data,
        messageType: item.messageType,
        ...(item.messageType === 'file' ? { fileInfo: item.fileInfo } : {}),
      }
    })
  }
)

const convertBufferToFile = (fileBuffer: ArrayBuffer, fileInfo: fileInfo) => {
  const { type, name } = fileInfo
  const blob = new Blob([fileBuffer], { type })
  const file = new File([blob], name, { type })
  if (imageSuffix.includes(name.split('.').at(-1) as string)) {
    return URL.createObjectURL(blob)
  }
  return file
}
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
    return `${year}/${month}/${day}`
  }
}

const fetchChatList = async () => {
  // 获取用户聊天的列表
  invokeEvent('rundb', { query: `select * from tb_chatList` }).then(
    (result) => {
      chatList.value = result.map((item) => {
        const { lastmessage, lasttime, username, uuid, avatar, unreadnums } =
          item
        return {
          data: lastmessage,
          time: Number(lasttime),
          uuid,
          username,
          avatar,
          unreadnums: Number(unreadnums),
        }
      })
    }
  )
}

const handleSelectChat = async (user: chatDataType, index: number) => {
  chatUser.value = user

  chatList.value[index].unreadnums = 0

  invokeEvent('rundb', {
    query: `update tb_chatlist set unreadnums = 0 where uuid = ?`,
    params: [chatUser.value.uuid],
  })

  //   chatData.value = await invokeEvent('rundb', {
  //     query: `select * from tb_chatMsg where uuid = ?`,
  //     params: [chatUser.value.uuid],
  //   })
}

fetchChatList()

const fetchChatDetail = (uuid: string) => {}
uuid && fetchChatDetail(uuid as string)
</script>

<template>
  <main-wrapper>
    <template #list>
      <div class="list" v-if="chatList.length > 0">
        <div :class="['item', uuid == item?.uuid ? 'active' : '']" @click="handleSelectChat(item,index)" v-for="item,index in chatList" :key="item.senderId">
          <div>
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          </div>
          <div class="content">
            <div class="item-title">{{ item!.username }}</div>
            <div class="item-text">{{ item!.data }}</div>
          </div>
          <div class="status">
            <div class="time">{{ timestampToDateString(item!.time) }}</div>
            <div class="unread-nums" v-show="item!.unreadnums">{{ item!.unreadnums > 99 ? '99+' : item!.unreadnums}}</div>
          </div>
        </div>
      </div>
      <div class="not-message" v-else>
        暂时没有新消息
      </div>
    </template>
    <template #right>
      <div class="chat" v-if="chatUser.uuid">
        <div class="top">
          <div class="name">
            {{ chatUser.username }}
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
            <chat-bubble v-for="(chat, index) in rebuildChatData" :isSender="chat.isSender" :message="chat.message" :messageType="chat.messageType" :fileInfo="chat?.fileInfo"
              :key="index"></chat-bubble>
          </el-scrollbar>
        </div>
        <div class="chat-input">
          <chat-input :user="chatUser"></chat-input>
        </div>
      </div>
    </template>
  </main-wrapper>

</template>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;

  .active {
    background-color: #cfcccb !important;

    &:hover {
      @extend .active;
    }
  }

  .item {
    display: flex;
    align-items: center;
    height: 65px;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;

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

    .status {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .time {
        font-size: 10px;
        color: #b1acac;
      }

      .unread-nums {
        font-size: 10px;
        margin-top: 5px;
        text-align: center;
        line-height: 15px;
        max-width: 18px;
        padding: 0 4px;
        height: 15px;
        border-radius: 15px;
        background-color: red;
        color: #fff;
      }
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
  display: flex;
  flex-direction: column;

  .top {
    padding: 0 20px;
    min-height: 43px;
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
    height: 100%;
    padding-top: 10px;
  }

  .chat-input {
    border-top: 1px solid #ebdbdb;
  }
}
</style>
