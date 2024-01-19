<script setup lang="ts">
import { useGlobalStore } from '@/stores/modules/global'
const { setGlobalModal } = useGlobalStore()
import { ref } from 'vue'
import { Search, Plus } from '@element-plus/icons-vue'
const searchValue = ref('')
</script>
<template>
  <el-input v-model="searchValue" placeholder="搜索" :prefix-icon="Search" />
  <div class="addEvent">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link"><el-icon>
          <Plus />
        </el-icon></span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="setGlobalModal('addFriends',true)">添加好友</el-dropdown-item>
          <el-dropdown-item>发起群聊</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<style lang="scss" scoped>
.el-input {
  max-width: 190px;
  ::v-deep .el-input__wrapper {
    background-color: #f8eded;
  }
}
.addEvent {
  margin-left: 7px;
  width: 30px;
  border-radius: 5px;
  background: #f8eded;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>