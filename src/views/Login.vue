<script setup lang="ts">
import { useContextmenu } from '@/hooks/useContextmenu'
import { useIpcRenderer } from '@/hooks/useIpcRenderer'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useGlobalStore } from '@/stores/modules/global'
import userRequestModel from '@/api/modules/user'
import JSEncrypt from 'jsencrypt'

const crypt = new JSEncrypt()
const { invokeEvent } = useIpcRenderer()

const { setAuthorization, setUserInfo } = useGlobalStore()
const router = useRouter()
const isLogin = ref(true)
const text = ref<string>('')

const account = ref<string>('')
const password = ref<string>('')
const username = ref<string>('')

const print = async (printInfo: string) => {
  let printText = printInfo
  for (let i = 0; i < printText.length; i++) {
    let str = printText.slice(i, i + 1)
    if (str === '\n') {
      text.value = text.value + '<br>'
    } else {
      await new Promise((resolve) => {
        setTimeout(() => {
          text.value = text.value + str
          resolve(null)
        }, 80)
      })
    }
  }
  text.value = text.value
}

const handleLogin = () => {
  if (!account.value || !password.value) {
    ElMessage({
      type: 'warning',
      message: '请输入账号或密码',
    })
    return
  }

  const params = {
    account: account.value,
    password: crypt.encrypt(password.value),
  }

  userRequestModel
    .login(params)
    .then((res) => {
      initBase(res.data.uuid)
      setAuthorization(res.token)
      setUserInfo(res.data)
      router.push({
        name: 'chat',
      })
    })
    .catch((err) => {
      ElMessage({
        type: 'warning',
        message: err.msg,
      })
    })
}

const handleRegister = () => {
  if (!account.value || !password.value || !username.value) {
    ElMessage({
      type: 'warning',
      message: '请输入账号 密码 昵称',
    })
    return
  }

  const params = {
    account: account.value,
    password: crypt.encrypt(password.value),
    username: username.value,
  }

  userRequestModel
    .register(params)
    .then((res) => {
      initBase(res.data.uuid)

      setAuthorization(res.token)
      setUserInfo(res.data)
      router.push({
        name: 'chat',
      })
    })
    .catch((err) => {
      ElMessage({
        type: 'warning',
        message: err.msg,
      })
    })
}

const publicKey = ref('')
const getPublicKey = async () => {
  publicKey.value = (await userRequestModel.getPublicKey()).data
  crypt.setPublicKey(atob(publicKey.value))
  localStorage.setItem('public-key', publicKey.value)
}
const initBase = (uuid: string) => {
  invokeEvent('init-basedir', {
    image: `${uuid}/images`,
    chatMsg: `${uuid}/msg/`,
    video: `${uuid}/video`,
    file: `${uuid}/file`,
  })

  invokeEvent('initdb', uuid)
}
print('WELCOME')
getPublicKey()
const cb = (e) => {
  console.log(e)
}
onMounted(() => {
  useContextmenu([
    {
      name: '打开',
      icon: 'icon-chat',
      callback: cb,
    },
    {
      name: '关闭',
      icon: null,
      callback: cb,
    },
  ])
})
</script>
<template>
  <div class="login">
    <div class="left">
      <div class="title" v-html="text"></div>
    </div>
    <div class="right">
      <template v-if="isLogin">
        <el-input size="large" type="text" v-model="account" placeholder="请输入账号" />
        <el-input size="large" type="password" v-model="password" placeholder="请输入密码" show-password />
        <div class="tips">
          <div>还没有账号?<span @click="()=>isLogin = false">去注册</span></div>
        </div>
        <el-button round color="#626aef" @click="handleLogin" @keydown.enter="handleLogin">登录</el-button>
      </template>
      <template v-else>
        <el-input size="large" type="text" v-model="account" placeholder="请输入账号" />
        <el-input size="large" type="text" v-model="username" placeholder="请输入昵称" />
        <el-input size="large" type="password" v-model="password" placeholder="请输入密码" show-password />
        <div class="tips">
          <div>已有账号<span @click="()=>isLogin = true">去登录</span></div>
        </div>
        <el-button round color="#626aef" @click="handleRegister" @keydown.enter="handleRegister">注册</el-button>
      </template>
    </div>
  </div>
</template>
  

  
  <style scoped lang="scss">
.login {
  width: 100%;
  height: calc(100% - 20px);
  display: flex;

  .left {
    width: 100%;
    height: 100%;
    flex: 16;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &::before {
      content: '';
      position: absolute;
      top: 40%;
      left: 30%;
      width: 280px;
      height: 100px;
      background: linear-gradient(to right, #79bbff, #c471ed, #f64f59);
      filter: blur(70px);
      transition: all 0.5s;
    }

    .title {
      width: 100%;
      font-size: 40px;
      font-weight: bold;
      font-family: Regular;
      color: #333;
      text-align: center;
      z-index: 2;
    }
  }

  .right {
    padding: 50px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    .el-input {
      margin-bottom: 20px;
    }
    .tips {
      margin-bottom: 10px;
      width: 290px;
      text-align: right;
      color: #aaacb0;
      font-size: 12px;

      span {
        color: rgb(68, 96, 241);
        cursor: pointer;
      }
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>@/stores/modules/global