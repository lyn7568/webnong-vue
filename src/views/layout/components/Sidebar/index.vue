<template>
  <div class="ntt_navbox">
    <el-menu
      mode="horizontal"
      :show-timeout="200"
      :default-active="$route.path"
      background-color="rgba(0,0,0,.3)"
      text-color="#fff"
      class="ntt_nav"
    >
      <sidebar-item v-for="route in routes" :key="route.name" :item="route" :base-path="route.path"></sidebar-item>
    </el-menu>
    <div class="addArrow"></div>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    routes() {
      return this.$router.options.routes
    }
  }
}
</script>

<style lang="scss">
  .ntt_navbox {
    width: 28rem;
    height: 1.35rem;
    position: absolute;
    left: 3.1rem;
    top: 50%;
    transform: translateY(-50%);
    overflow: hidden;
    .ntt_nav {
      width: 200px;
      position: absolute;
      padding-left: 1rem;
      left: 0;
      top: 0;
      height: 1.35rem;
      background-color: rgba(0,0,0,.3);
      border: 1px solid transparent;
      border-right: 0;
      .el-menu-item{
        height: auto;
        line-height: 1.35rem;
      }
    }
    .addArrow {
      position: absolute;
      top: -1px;
      right: -.7rem;
      width: .7rem;
      height: 1.35rem;
      background: url('/src/assets/nav_bg2.png') 0 0 no-repeat;
      -webkit-background-size: 100%;
      background-size: 100%;
    }
  }
</style>
