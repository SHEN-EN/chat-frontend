<script setup lang="ts" >
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import userRequestModel from '@/api/modules/user'
import { useGlobalStore } from '@/stores/modules/global'
import uploadFile from '@/util/uploadFile'
import convertBase64 from '@/util/convertBase64'
const { globalModal, getUserInfo, setGlobalModal } = useGlobalStore()

const userInfo = ref({
  username: '',
  avatar: '',
  dec: '',
  sex: '',
  birthday: 0,
})

const handleUpload = () => {
  uploadFile('image/*').then(async (res) => {
    userInfo.value.avatar = (await convertBase64(res.target.files[0])) as string
  })
}

const handleSave = async () => {
  const params = {
    ...userInfo.value,
    birthday: +userInfo.value.birthday,
  }
  try {
    await userRequestModel.editUserInfo(params)
    ElMessage({
      type: 'success',
      message: '修改成功',
    })
  } catch (error) {
    console.log(error)
  }

  setGlobalModal('editInfo', false)
}
onMounted(() => {
  const { avatar, birthday, description, sex, username } = getUserInfo()
  userInfo.value.avatar = avatar
  userInfo.value.birthday = +birthday
  userInfo.value.dec = description
  userInfo.value.sex = sex
  userInfo.value.username = username
})
</script>
<template>
  <el-dialog draggable title="编辑资料" v-model="globalModal.editInfo" width="50%">
    <div class="avatar">
      <img :src="userInfo.avatar" alt="">
      <div class="mark" @click="handleUpload">
        <i class="iconfont icon-xiangji2"></i>
      </div>
    </div>
    <div class="form">
      <el-form label-position="right" label-width="50px">
        <el-form-item label="昵称">
          <el-input v-model="userInfo.username" maxlength="18" show-word-limit placeholder="请输入你的昵称" />
        </el-form-item>
        <el-form-item label="个签">
          <el-input v-model="userInfo.dec" maxlength="80" show-word-limit placeholder="编辑个签" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select placeholder="请选择性别" v-model="userInfo.sex">
            <el-option key="0" label="女" value="0" />
            <el-option key="1" label="男" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="userInfo.birthday" type="date" placeholder="请选择你的生日" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <el-button type="primary" @click="handleSave">保存</el-button>
      <el-button @click="setGlobalModal('editInfo',false)">取消</el-button>
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
  .el-select {
    width: 100%;
  }
  ::v-deep .el-date-editor {
    width: 100%;
  }
}
</style>