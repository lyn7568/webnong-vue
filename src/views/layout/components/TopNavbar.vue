<template>
  <div class="topnavbar">
    <div class="logo-container">
      <div class="logo-wrapper"></div>
    </div>
    <div class="name-box">
      <div class="avatar-wrapper"><span>您好，{{name}}</span></div>
      <div class="exit-btn" @click="logout">退出登录</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    logout() {
      this.$confirm('您确认要退出登录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()
        })
      }).catch(() => {})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.topnavbar {
  .name-box{
    display: inline-block;
    position: absolute;
    right: 20px;
    font-size:14px;
    overflow: hidden;
    color:#fff;
    .avatar-wrapper {
      color:#fff;
      cursor:pointer;
      float:left;
    }
    .exit-btn {
      margin-left:30px;
      cursor: pointer;
      float:left;
    }
  }
}
.drop-menu-list{
  .el-dropdown-menu__item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    &.is-disabled{
      background: #f3f5f7;
    }
    .el-icon-check{
      font-weight: bold;
    }
  }
}
</style>

