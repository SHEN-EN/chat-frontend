<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGlobalStore } from '@/stores/modules/global'
import { useRouter } from 'vue-router'
const router = useRouter()
const { getUserInfo, setGlobalModal } = useGlobalStore()
const userInfo = ref({})
const itemList = ref<{ name: string; path: string }[]>([
  {
    name: 'chat',
    path: 'icon-chat',
  },
  {
    name: 'friend',
    path: 'icon-mn_pengyou_fill',
  },
])
const activeRoute = ref('')
const handleClick = (name: string) => {
  activeRoute.value = name

  router.push({
    path: `/${name}`,
  })
}
onMounted(async () => {
  userInfo.value =  getUserInfo()
})
</script>

<template>
  <div class="user">
    <div class="avatar">
      <el-popover placement="right-start" :width="260" trigger="click">
        <template #reference>
          <img src="@/assets/user.jpg" alt="">
        </template>
        <div class="userInfo">
          <el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <div class="info">
            <div class="name">SHEN</div>
            <div class="account">账号:916862952</div>
          </div>
        </div>
        <div class="event">
          <el-button size="small">我的动态</el-button>
          <el-button type="primary" size="small" @click="setGlobalModal('editInfo',true)">编辑资料</el-button>
        </div>
      </el-popover>
    </div>
    <div class="tool-list">
      <div :class="['tool-item',item.name === activeRoute && 'actived']" @click="handleClick(item.name)" v-for="item in itemList">
        <svg class="iconfont" aria-hidden="true">
          <use :xlink:href="`#${item.path}`"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.userInfo {
  display: flex;
  align-items: center;
  .info {
    margin-left: 20px;
    .name {
      color: #000;
      font-size: 16px;
    }
    .account {
      font-size: 12px;
    }
  }
}
.event {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  position: relative;
  &::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 1px;
    background: #dedbdb;
    top: -18px;
  }
}
.user {
  display: flex;
  flex-direction: column;
  align-items: center;
  .avatar {
    margin: 20px 0;
    cursor: pointer;
    img {
      width: 35px;
      border-radius: 40px;
    }
  }
  .tool-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    .tool-item {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 5px;
      margin-bottom: 5px;
      fill: #333333;
      transition: fill linear 0.3s;

      &:hover {
        background: #dedede;
      }
      .iconfont {
        width: 24px;
        height: 24px;
      }
    }
    .actived {
      background: #dedede;
      fill: #377cef;
    }
  }
}
</style>
