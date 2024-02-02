<script setup lang="ts">
import { ref } from 'vue'
import friendRequestModel from '@/api/modules/friends'
const list = ref([])
const getList = () => {
  friendRequestModel.getApplyList().then((res) => {
    list.value = res.data
  })
}
getList()
</script>

<template>
  <div class="container">
    <div class="header">
      <div class="title">好友通知</div>
      <i class="iconfont icon-delete"></i>
    </div>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.uuid">
        <div class="info">
          <img class="avatar" :src="item.friendAvatar" alt="">
          <div class="block">
            <div class="name">
              {{item.friendUsername}}
              <span>请求加为好友</span>
            </div>
            <div class="time">{{ item.time }}</div>
          </div>
        </div>
        <template v-if="item.isAgree == 0">
          <el-button size="small" type="primary">同意</el-button>
        </template>
        <template v-else>
          <div class="ispass">已通过</div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 20px;
  .header {
    display: flex;
    align-content: center;
    justify-content: space-between;
    .iconfont {
      font-size: 18px;
      cursor: pointer;
    }
  }
  .list {
    .item {
      height: 70px;
      margin-top: 16px;
      border-radius: 8px;
      background: #fff;
      display: flex;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      justify-content: space-between;
      .info {
        display: flex;
        .avatar {
          border-radius: 50%;
          height: 40px;
        }
        .block {
          margin-left: 5px;
          height: 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          .name {
            font-size: 12px;
            color: #377cef;
            span {
              color: #000;
            }
          }
          .time {
            font-size: 10px;
            color: #a79f9f;
          }
        }
      }
      .ispass {
        color: #a79f9f;
        font-size: 14px;
      }
    }
  }
}
</style>