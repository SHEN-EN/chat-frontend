<script setup lang="ts">
import { ref } from 'vue'
import { useEmitSocket } from '@/hooks/useEmitSocket'
import { ElMessageBox } from 'element-plus'
import friendRequestModel from '@/api/modules/friends'
import userRequestModel from '@/api/modules/user'
import { useGlobalStore } from '@/stores/modules/global'

const { emitAgreeFriendApply } = useEmitSocket()
const { getUserInfo } = useGlobalStore()

const emit = defineEmits(['refresh'])
const list = ref([])
const getList = () => {
  friendRequestModel.getApplyList().then(async (res) => {
    list.value = await Promise.all(
      res.data.map(async (item) => {
        const { avatar, username } = (
          await userRequestModel.getInfo(item.frienduuid)
        ).data

        return {
          ...item,
          avatar,
          username,
        }
      })
    )
  })
}
const handleAgree = async (uuid: string, avatar: string) => {
  try {
    await friendRequestModel.agreeApply(uuid)
    emitAgreeFriendApply({ reciverId: uuid, avatar }) // 同意好友申请
    emit('refresh')
    getList()
  } catch (error) {
    console.log(error)
  }
}
const handleClear = () => {
  ElMessageBox.confirm('你确定要删除记录吗？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    await friendRequestModel.clearApplyList()
    getList()
  })
}
getList()
</script>

<template>
  <div class="container">
    <div class="header">
      <div class="title">好友通知</div>
      <i class="iconfont icon-delete" @click="handleClear"></i>
    </div>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.uuid">
        <div class="info">
          <img class="avatar" :src="item.avatar" alt="">
          <div class="block">
            <div class="name">
              {{item.username}}

              <span>{{!item.isapplyUser ? '请求加为好友' : '正在验证你的邀请'}}</span>
            </div>
            <div class="time">{{ item.time }}</div>
          </div>
        </div>

        <template v-if="item.isAgree == 0">
          <template v-if="!item.isapplyUser">
            <el-button size="small" type="primary" @click="handleAgree(item.frienduuid,item.friendAvatar)">同意</el-button>
          </template>
          <template v-else>
            <div class="tips">等待验证</div>
          </template>
        </template>

        <template v-else>
          <div class="tips">已通过</div>
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
      .tips {
        color: #a79f9f;
        font-size: 14px;
      }
    }
  }
}
</style>
