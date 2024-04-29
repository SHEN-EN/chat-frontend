<script setup lang="ts">
import { defineProps } from 'vue'
import { imageSuffix } from '@/util/commonFileType'
const props = defineProps({
  isSender: {
    type: Boolean,
    default: true,
  },
  message: {
    type: String || File,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    default:
      'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
  },
  username: {
    type: String,
    required: true,
    default: '1',
  },
  messageType: {
    type: String,
    required: true,
    default: 'text',
  },
  fileInfo: {
    type: Object,
    default: {},
  },
})
</script>

<template>
  <div class="chat-bubble" :class="{ 'left': isSender, 'right': !isSender }">
    <img :src="avatar" alt="Avatar" class="avatar">
    <div :class="{ 'sender': isSender, 'reciver': !isSender }">
      <div class="username">{{ username }}</div>
      <!-- 文字消息 -->
      <template v-if="messageType==='text'">
        <div class="message" :class="{ 'left': isSender, 'right': !isSender }">
          {{ message }}
        </div>
      </template>
      <!-- 文字消息 -->
      <template v-else>
        <!-- 文件消息 -->
        <template v-if="!imageSuffix.includes(fileInfo.name.split('.').at(-1))">
          <div class="message file" :class="{ 'left': isSender, 'right': !isSender }">
            <div class="file-info">
              <div class="file-name">
                2023软件工程转身本一班
              </div>
              <div class="file-status">
                <div class="file-size">10</div>
              </div>
            </div>
            <svg class="iconfont" aria-hidden="true">
              <use :xlink:href="`#icon-doc`"></use>
            </svg>
          </div>
        </template>

        <!-- 文件消息 -->

        <!-- 图片消息 -->
        <template v-else>
          <div class="message image" :class="{ 'left': isSender, 'right': !isSender }">
            <el-image fit="contain" :src="message" />
          </div>
        </template>
        <!-- 图片消息 -->
      </template>

    </div>

  </div>
</template>
  

  
  <style scoped lang="scss">
.chat-bubble {
  display: flex;
  align-items: flex-start;
  max-width: 100%;
  margin-bottom: 10px;
  font-size: 14px;

  &.left {
    flex-direction: row-reverse;
    .username {
      text-align: right;
    }
    .sender {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }

  &.right {
    .reciver {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .avatar {
      margin-left: 10px;
    }
  }

  &.left .avatar {
    margin-right: 10px;
  }

  .avatar {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
  }

  .message {
    padding: 8px 10px;
    border-radius: 10px;

    &.left {
      background-color: #2e90ff;
      color: #fff;
    }

    &.right {
      background-color: #fff;
      color: #333;
    }
  }

  .file {
    width: 200px;
    height: 70px;
    color: #000 !important;
    display: flex;
    &.left {
      background-color: #fff;
    }

    &.right {
      background-color: #fff;
    }
    .iconfont {
      flex: 0.5;
      width: 70px;
    }
    &-info {
      flex: 1;
      position: relative;
      .file-name {
        font-size: 14px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .file-status {
        position: absolute;
        bottom: 0;
        color: #bcbcbc;
        .file-size {
          font-size: 12px;
        }
      }
    }
  }

  .image {
    width: 50%;
  }
}
</style>