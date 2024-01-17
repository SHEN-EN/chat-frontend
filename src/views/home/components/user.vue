<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
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
</script>

<template>
  <div class="user">
    <div class="avatar">
      <img src="@/assets/user.jpg" alt="">
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
.user {
  display: flex;
  flex-direction: column;
  align-items: center;
  .avatar {
    margin: 20px 0;
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
