<script setup lang="ts">
import { ref } from 'vue'
import { pinyin } from 'pinyin-pro'
import { useGlobalStore } from '@/stores/modules/global'
import friendRequestModel from '@/api/modules/friends'
import mainWrapper from '@/components/main-wrapper.vue'
const characterMap = ref({}) as any
const { getUserInfo } = useGlobalStore()

const classifyCharacters = () => {
  for (const character of ['小明', '大红', 'pqs', 'aa']) {
    const firstLetter = pinyin(character)[0][0].toUpperCase()

    if (/^[A-Z]$/.test(firstLetter)) {
      if (characterMap.value[firstLetter]) {
        characterMap.value[firstLetter].push(character)
      } else {
        characterMap.value[firstLetter] = [character]
      }
    }
  }
}
const getFriendList = async () => {
  const uuid = (await getUserInfo()).uuid
  friendRequestModel.getList(uuid).then((res) => {})
}
getFriendList()
// classifyCharacters()
</script>

<template>
  <main-wrapper>
    <template #list>
      <div class="contact">
        <el-scrollbar>
          <div class="classification">
            <div class="title">新的朋友</div>
            <div class="classification-item">
              <i class="iconfont icon-a-Addfriends"></i>
              <!-- <el-avatar :size="40" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" /> -->
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
        </el-scrollbar>
      </div>
    </template>
    <template #right>
      <div class="contact-detail">

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
