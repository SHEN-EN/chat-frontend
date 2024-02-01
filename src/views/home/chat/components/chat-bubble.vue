<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  isSender: {
    type: Boolean,
    default: true,
  },
  message: {
    type: String,
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
})
</script>

<template>
  <div class="chat-bubble" :class="{ 'left': isSender, 'right': !isSender }">
    <img :src="avatar" alt="Avatar" class="avatar">
    <div>
      <div class="username">{{ username }}</div>
      <div class="message" :class="{ 'left': isSender, 'right': !isSender }">
        {{ message }}
      </div>
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
    .username{
        text-align: right;
    }
  }

  &.right .avatar {
    margin-left: 10px;
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
}
</style>