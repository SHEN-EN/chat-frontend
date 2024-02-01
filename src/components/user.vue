<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores/modules/global'
import { useRouter } from 'vue-router'
const router = useRouter()
const { setGlobalModal } = useGlobalStore()
const { user, globalStatus } = storeToRefs(useGlobalStore())
const itemList = computed<
  { name: string; path: string; hiddenBadge: boolean }[]
>(() => {
  return [
    {
      name: 'chat',
      path: 'icon-chat',
      hiddenBadge: globalStatus.value.notificationNum < 1,
    },
    {
      name: 'friend',
      path: 'icon-mn_pengyou_fill',
      hiddenBadge: !globalStatus.value.hasNewFriends,
    },
  ]
})

const activeRoute = ref('')
const handleClick = (name: string) => {
  activeRoute.value = name

  router.push({
    path: `/${name}`,
  })
}
</script>

<template>
  <div class="user">
    <div class="avatar">
      <el-popover placement="right-start" :width="260" trigger="click">
        <template #reference>
          <img :src="user.avatar" alt="">
        </template>
        <div class="userInfo">
          <el-avatar :size="50" :src="user.avatar" />
          <div class="info">
            <div class="name">{{ user.username }}</div>
            <div class="account">账号:{{ user.account }}</div>
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
        <el-badge :value="0" :max="10" :hidden="item.hiddenBadge" :is-dot="item.name === 'friend'">
          <svg class="iconfont" aria-hidden="true">
            <use :xlink:href="`#${item.path}`"></use>
          </svg>
        </el-badge>
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
