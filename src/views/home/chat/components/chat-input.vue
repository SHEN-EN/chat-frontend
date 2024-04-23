<script setup lang="ts">
import { useDragResize } from '@/hooks/useDragResize'
import { onMounted, ref } from 'vue'
import { Promotion } from '@element-plus/icons-vue'
import { useEmitSocket } from '@/hooks/useEmitSocket'
import { useChatStore } from '@/stores/modules/chat'
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores/modules/global'
const { getUserInfo } = useGlobalStore()
const { chatData } = storeToRefs(useChatStore())
const senderValue = ref('')
const { emitPrivateSocket } = useEmitSocket()

const props = defineProps({
  user: {
    type: Object,
    default: {},
  },
})

const handleSendMessage = async () => {
  const messsgae = {
    data: senderValue.value,
    time: Date.now(),
    senderId: getUserInfo().uuid,
    avatar: props.user.avatar,
    reciverId: props.user.uuid,
  }
  chatData

  emitPrivateSocket(messsgae)
  senderValue.value = ''
}
const dragInstance = ref<HTMLElement | null>(null)
const targetInstance = ref<HTMLElement | null>(null)
onMounted(() => {
  useDragResize(
    dragInstance.value as HTMLElement,
    targetInstance.value as HTMLElement,
    {
      max: 400,
      min: 120,
    }
  )
})
</script>
<template>
  <div class="chat-drag" ref="dragInstance"></div>
  <div ref="targetInstance" class="chat-panel__container">
    <div class="chat-tool">
      <i class="iconfont icon-biaoqing"></i>
      <i class="iconfont icon-cut"></i>
      <i class="iconfont icon-zhaopian"></i>
      <i class="iconfont icon-yuyin"></i>
    </div>
    <div class="chat-panel__input">
      <textarea v-model="senderValue" />
      <!-- <rich-text-editor></rich-text-editor> -->
      <div class="send-area">
        <el-button type="primary" :disabled="!senderValue" class="send" size="small" @click="handleSendMessage">
          发送
          <el-icon>
            <Promotion />
          </el-icon>
        </el-button>
      </div>
    </div>
  </div>

</template>
<style lang="scss" scoped>
.chat-drag {
  width: 100%;
  height: 4px;
  cursor: n-resize;
}
.chat-panel__container {
  height: 160px;
  .chat-tool {
    padding: 5px;
    .iconfont {
      font-size: 18px;
      color: #333;
      cursor: pointer;
      margin-left: 13px;
    }
  }
  .chat-panel__input {
    display: flex;
    flex-direction: column;
    height: 100%;
    textarea {
      background-color: #f8eded;
      box-shadow: none;
      resize: none;
      outline: none;
      border: none;
      padding: 0 18px;
      height: calc(100% - 70px);
    }
    .send-area {
      display: flex;
      justify-content: flex-end;
      padding: 2px 11px;
    }
  }
}
</style>
