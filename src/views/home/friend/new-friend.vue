<script setup lang="ts">
</script>

<template>
  <div class="container">
    <div class="header">
      <div class="title">好友通知</div>
      <i class="iconfont icon-delete"></i>
    </div>
    <div class="list">
      <div class="item">
        <div class="info">
          <img class="avatar" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt="">
          <div class="block">
            <div class="name">
              陈
              <span>请求加为好友</span>
            </div>
            <div class="time">2023/3/2</div>
          </div>
        </div>
        <el-button size="small" type="primary">同意</el-button>
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
    }
  }
}
</style>
