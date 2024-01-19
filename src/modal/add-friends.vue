<script setup lang="ts">
import { useGlobalStore } from '@/stores/modules/global'
const { globalModal } = useGlobalStore()
</script>
<template>
  <el-dialog draggable title="添加好友/群" v-model="globalModal.addFriends" width="30%">
    <div class="container">
      <el-input>
        <template #append>
          <el-button type="primary">搜索</el-button>
        </template>
      </el-input>
      <div class="tips">
        <i class="iconfont icon-icon_tab_contact_on"></i>
        <div>
          快来发现更多新朋友！
        </div>
      </div>

    </div>
  </el-dialog>
</template>
<style lang="scss" scoped>
.container {
  height: 280px;

  .tips {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .icon-icon_tab_contact_on {
      font-size: 80px;
      margin-bottom: 10px;
    }
  }
  .el-input-group {
    height: 25px;
  }
}
</style>