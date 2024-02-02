<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useEmitSocket } from '@/hooks/useEmitSocket'
import friendRequestModel from '@/api/modules/friends'
import { useGlobalStore } from '@/stores/modules/global'
const { globalModal } = useGlobalStore()
const { emitAddFriend } = useEmitSocket()
const searchValue = ref('')
const showTips = ref(true)
const friends = ref<
  Partial<
    {
      uuid: string
      username: string
      avatar: string
      account: string
      isFriend: boolean
    }[]
  >
>([])
const handleSearch = async () => {
  if (!searchValue.value) {
    friends.value = []
    showTips.value = true
    return
  }
  friends.value = (
    await friendRequestModel.findFriends(searchValue.value)
  )?.data
  showTips.value = false
}
const handleClick = async (iFriend: boolean, friendAccount: string) => {
  if (!iFriend) {
    // 添加

    const params = {
      account: friendAccount,
    }

    try {
      await friendRequestModel.addFriend(params)

      ElMessage({
        type: 'success',
        message: '申请成功',
      })

      emitAddFriend(friends.value[0]!.uuid)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
<template>
  <el-dialog draggable title="添加好友/群" v-model="globalModal.addFriends" width="30%">
    <div class="container">
      <el-input v-model="searchValue" clearable>
        <template #append>
          <el-button @click="handleSearch">搜索</el-button>
        </template>
      </el-input>
      <template v-if="showTips">
        <div class="tips">
          <i class="iconfont icon-icon_tab_contact_on"></i>
          <div>
            快来发现更多新朋友！
          </div>
        </div>
      </template>
      <template v-else>
        <el-scrollbar v-if="friends.length">
          <div class="friend-list">
            <div class="title">查找人</div>
            <div class="item" v-for="item in friends" :key="item?.uuid">
              <el-avatar :src="item?.avatar" />
              <div class="userInfo">
                <div class="name">{{ item?.username }}</div>
                <div class="account">{{ item?.account }}</div>
              </div>
              <el-button type="primary" size="small" @click="handleClick(item?.isFriend,item?.account)">{{ 
                item?.isFriend ? '发送消息' : '添加'
            }}</el-button>
            </div>
          </div>
        </el-scrollbar>
        <div class="tips" v-else>
          <i class="iconfont icon-a-bianzu2"></i>
          <div>
            无搜索结果
          </div>
        </div>
      </template>

    </div>
  </el-dialog>
</template>
<style lang="scss" scoped>
.container {
  height: 280px;

  .tips {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .iconfont {
      font-size: 80px;
      margin-bottom: 10px;
    }
  }
  .el-input-group {
    height: 25px;
    ::v-deep .el-input__inner {
      height: 25px;
    }
  }
  .friend-list {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 12px;
    }
    .item {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .userInfo {
        margin-left: 5px;
        flex: 1;
        .name {
          color: #000;
        }
        .account {
          color: #377cef;
          font-size: 12px;
          margin-top: 3px;
        }
      }
    }
  }
}
</style>