<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { insert, get } from '@/indexDB'
import friendRequestModel from '@/api/modules/friends'
const router = useRouter()
const props = defineProps({
  friend: {
    type: Object,
    default: '',
  },
})
const user = ref<
  Partial<{
    account: string
    avatar: string
    birthday: number
    description: string
    notes: string
    sex: number
    username: string
    uuid: string
  }>
>()

user.value = props.friend

const isEditNotes = ref(false)
const editUserNotes = ref('')
const handleSetUserNotes = () => {
  isEditNotes.value = !isEditNotes.value

  if (editUserNotes.value && !isEditNotes.value) {
    modifyUserNotes()
  }
}
const modifyUserNotes = () => {
  friendRequestModel
    .updateFriendNotes(user.value!.uuid, editUserNotes.value)
    .then((res) => {})
}
const handleSend = () => {
  const { uuid, username, notes, avatar } = user.value
  get('tb_chatList', 'uuid', uuid!).then((res: any[]) => {
    if (res.findIndex((item) => item.uuid == user.value.uuid) == -1) {
      // 判断是否有重复的聊天记录
      // 没有则插入记录
      insert('tb_chatList', {
        lastmessage: '',
        lasttime: Date.now(),
        username: notes || username,
        uuid: user.value.uuid,
        unreadnums: 0,
        avatar,
      })
    }

    router.push({
      name: 'chat',
      query: {
        uuid,
      },
    })
  })
}
</script>

<template>
  <div class="container">
    <div class="account-view">
      <div class="avatar">
        <img :src="user.avatar">
      </div>
      <div class="content">
        <div class="username">{{ user.username }}</div>
        <div class="account">账号:{{ user.account }}</div>
        <div class="description">个性签名:{{ user.description }}</div>
        <div></div>
      </div>
    </div>
    <div class="account-otherinfo">
      <div class="item notes">
        <div class="key">
          <i class="iconfont icon-edit"></i>
          备注
        </div>
        <div class="value">
          <template v-if="!isEditNotes">
            <div @click="handleSetUserNotes">
              {{ user.notes || '设置好友备注' }}
            </div>
          </template>
          <el-input v-model="editUserNotes" v-else @blur="handleSetUserNotes" autofocus></el-input>
        </div>
      </div>

      <div class="item dynamic">
        <div class="key">
          <i class="iconfont icon-kongjianpu"></i>
          动态
        </div>
        <div class="value">
          <i class="iconfont icon-arrow"></i>
        </div>
      </div>
    </div>
    <div class="account-action">
      <el-button>音视频通话</el-button>
      <el-button type="primary" @click="handleSend">发消息</el-button>
    </div>
    <div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 100px 20px 20px 50px;

  .account-view {
    display: flex;
    position: relative;

    .avatar img {
      border-radius: 50%;
      width: 80px;
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 10px;

      .username {
        font-size: 20px;
      }

      .account {
        font-size: 12px;
        color: #9e9797;
      }

      .description {
        font-size: 12px;
        color: #9e9797;
      }
    }

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      background: #ffefef;
      bottom: -15px;
    }
  }

  .account-otherinfo {
    margin-top: 30px;
    color: #9e9797;
    padding-left: 20px;

    .item {
      position: relative;
      display: flex;
      font-size: 14px;
      line-height: 50px;
      height: 50px;

      .key {
        flex: 1;
      }

      .value {
        flex: 1;
        justify-content: end;
        display: flex;
        cursor: pointer;
        align-items: center;

        .el-input {
          height: 30px;
        }
      }

      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        background: #ffefef;
        bottom: 0;
      }
    }
  }

  .account-action {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>
