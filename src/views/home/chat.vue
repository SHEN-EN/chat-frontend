<script setup lang="ts">
import { ref } from 'vue'
import chatBubble from './components/chat-bubble.vue'
import chatInput from './components/chat-input.vue'
import searchPlugn from './components/search-plugin.vue'
const drawer = ref(false)
const handleSelectChat = () => {}
const chats = [
  { isLeft: true, message: 'Hello, how are you?' },
  { isLeft: false, message: "I'm good, thank you!" },
  { isLeft: true, message: "That's great!" },
  { isLeft: true, message: "That's great!" },
  { isLeft: true, message: "That's great!" },
  { isLeft: true, message: "That's great!" },
  { isLeft: true, message: "That's great!" },
  { isLeft: true, message: "That's great!" },
  { isLeft: true, message: "That's great!" },
  { isLeft: true, message: "That's great!" },
]
</script>

<template>
  <div class="chat-container">
    <div class="chat-list">
      <div class="top">
        <searchPlugn />
      </div>
      <div class="list">
        <div class="item" @click="handleSelectChat">
          <div>
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          </div>
          <div class="content">
            <div class="item-title">Electron 吹牛群</div>
            <div class="item-text">你好呀</div>
          </div>
        </div>
      </div>
    </div>
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
          <chat-bubble v-for="(chat, index) in chats" :isLeft="chat.isLeft" :message="chat.message" :key="index"></chat-bubble>
        </el-scrollbar>
      </div>
      <div class="chat-input">
        <chat-input></chat-input>
      </div>
    </div>
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
    .list {
      display: flex;
      flex-direction: column;
      .item {
        display: flex;
        align-items: center;
        max-width: 260px;
        height: 75px;
        padding: 10px;
        box-sizing: border-box;
        .content {
          margin-left: 10px;
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
          }
        }
        &:hover {
          background: #dedede;
        }
      }
    }
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
}
</style>
