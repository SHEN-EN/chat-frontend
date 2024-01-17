<script setup lang="ts">
import { Promotion } from '@element-plus/icons-vue'
</script>
<template>
  <div class="chat-tool">
    <i class="iconfont icon-biaoqing"></i>
    <i class="iconfont icon-cut"></i>
    <i class="iconfont icon-zhaopian"></i>
    <i class="iconfont icon-yuyin"></i>
  </div>
  <div class="input">
    <el-input type="textarea" :rows="4" />
    <div class="send-area">
      <el-button type="primary" class="send" size="small">
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
  height: 100%;
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