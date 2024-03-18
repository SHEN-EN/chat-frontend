<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores/modules/global'
import newFriend from './new-friend.vue'
import friendInfo from './friend-info.vue'

import mainWrapper from '@/components/main-wrapper.vue'
const { getFriendsList } = useGlobalStore()
const { characterMap } = storeToRefs(useGlobalStore())

const getFriendList = async () => {
  await getFriendsList()
}

getFriendList()
const activeRoute = ref()
const navigatorComponents = (name: any) => {
  activeRoute.value = name
  console.log(activeRoute)
}
const uuid = ref()
const handleClick = (id: string) => {
  uuid.value = id
  navigatorComponents(friendInfo)
}
</script>

<template>
  <main-wrapper>
    <template #list>
      <div class="contact">
        <el-scrollbar>
          <div class="classification">
            <div class="title">新的朋友</div>
            <div class="classification-item" @click="navigatorComponents(newFriend)">
              <i class="iconfont icon-a-Addfriends"></i>
              <div class="name">新的朋友</div>
            </div>
          </div>
          <div class="classification">
            <div class="title">新的群聊</div>
            <div class="classification-item">
              <i class="iconfont icon-qunliao"></i>
              <div class="name">新的群聊</div>
            </div>
          </div>

          <div class="classification" v-for="item,key in characterMap" :key="key">
            <div class="title">{{ key }}</div>
            <div class="classification-item" v-for="friend in item" @click="handleClick(friend.uuid)">
              <el-avatar :size="40" :src="friend.avatar" />
              <div class="name">{{ friend.username }}</div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </template>
    <template #right>
      <div class="contact-detail" :style="{'background':activeRoute?.__name==='friend-info' ? '#fff' : '#ffefef'}">
        <component :is="activeRoute" @refresh="getFriendList" :uuid="uuid"></component>
      </div>
    </template>
  </main-wrapper>
</template>

<style lang="scss" scoped>
.contact {
  .classification {
    position: relative;
    margin-bottom: 10px;
    .title {
      padding: 0 15px;
      font-size: 12px;
      margin-bottom: 5px;
      color: #626262;
    }
    .classification-item {
      cursor: pointer;
      height: 60px;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 0 15px;
      box-sizing: border-box;
      &:hover {
        background: #dedede;
      }
      .name {
        margin-left: 10px;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 90%;
      }
      .iconfont {
        font-size: 28px;
      }
    }
    &::after {
      content: '';
      width: 100%;
      position: absolute;
      background: #ffefef;
      height: 1px;
      bottom: 0;
      right: 0;
    }
  }
}
.contact-detail {
  flex: 1;
  background: #f8eded;
  padding-top: 20px;
}
</style>
