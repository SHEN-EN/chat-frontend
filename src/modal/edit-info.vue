<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useGlobalStore } from '@/stores/modules/global'
import uploadFile from '@/util/uploadFile'
const { globalModal } = useGlobalStore()
const handleUpload = () => {
  uploadFile('image/*').then((res) => {
    console.log(res)
  })
}
</script>
<template>
  <el-dialog draggable title="编辑资料" v-model="globalModal.editInfo" width="50%">
    <div class="avatar">
      <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt="">
      <div class="mark" @click="handleUpload">
        <i class="iconfont icon-xiangji2"></i>
      </div>
    </div>
    <div class="form">
      <el-form label-position="right" label-width="50px">
        <el-form-item label="昵称">
          <el-input maxlength="18" show-word-limit />
        </el-form-item>
        <el-form-item label="个签">
          <el-input maxlength="80" show-word-limit />
        </el-form-item>
        <el-form-item label="性别">
          <el-select />
        </el-form-item>
        <el-form-item label="生日">
          <el-input />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <el-button type="primary">保存</el-button>
      <el-button>取消</el-button>
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped>
.avatar {
  display: flex;
  justify-content: center;
  position: relative;
  img {
    border-radius: 50%;
    width: 80px;
  }
  .mark {
    background: #000;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    opacity: 0;
    transition: opacity 0.3s ease;
    cursor: pointer;
    text-align: center;
    line-height: 80px;
    &:hover {
      opacity: 0.8;
    }
    .iconfont {
      font-size: 50px;
    }
  }
}
.form {
  margin-top: 30px;
}
</style>