<script setup lang="ts">
import { ref } from 'vue'
import { Promotion } from '@element-plus/icons-vue'
import { useEmitSocket } from '@/hooks/useEmitSocket'
import { useChatStore } from '@/stores/modules/chat'
import { useGlobalStore } from '@/stores/modules/global'
const { getUserInfo } = useGlobalStore()
const { setChatData } = useChatStore()
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
  setChatData(messsgae)

  emitPrivateSocket(messsgae)
  senderValue.value = ''
}
</script>
<template>
  <div class="chat-tool">
    <i class="iconfont icon-biaoqing"></i>
    <i class="iconfont icon-cut"></i>
    <i class="iconfont icon-zhaopian"></i>
    <i class="iconfont icon-yuyin"></i>
  </div>
  <div class="input">
    <el-input type="textarea" v-model="senderValue" :rows="4" />
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
</template>
<style lang="scss" scoped>
.chat-tool {
  padding: 5px;
  .iconfont {
    font-size: 18px;
    color: #333;
    cursor: pointer;
    margin-left: 13px;
  }
}
.input {
  .el-textarea ::v-deep .el-textarea__inner {
    background-color: #f8eded;
    box-shadow: none;
    resize: none;
  }
  .send-area {
    display: flex;
    justify-content: flex-end;
    padding: 2px 11px;
  }
}
</style>