<template>
  <div class="ntt_navbox">
    <el-menu
      mode="horizontal"
      :show-timeout="200"
      :default-active="$route.path"
      text-color="#fff"
      class="ntt_nav"
    >
      <sidebar-item v-for="route in routes" :key="route.name" :item="route" :base-path="route.path"></sidebar-item>
      <!-- <sidebar-item v-for="route in routes" :key="route.name" :item="route" :base-path="'/'+route.path"></sidebar-item> -->
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
      var routerList = this.$router.options.routes
      var rLlen = routerList.length
      for (let i = 0; i < rLlen; i++){
        if(routerList[i].children){
          if(!this.hasMenu(routerList[i].children[0].name)) {
            routerList[i].hidden = true
          }
        }
      }
      console.log(this.$router)
      return this.$router.options.routes
    }
  },
  methods: {
    hasMenu(curName){
      var menuArr = []
      var menuList = this.$store.getters.menuList
      menuList.filter(item => {
        menuArr.push(item.path)
      })
      if (menuArr.indexOf(curName) > -1) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss">
  .ntt_navbox {
    width: 26rem;
    height: 1.35rem;
    position: absolute;
    left: 3.1rem;
    top: 54%;
    transform: translateY(-50%);
    background:rgba(0,0,0,.3);
    .ntt_nav {
      position: absolute;
      padding-left: 1.5rem;
      left: 0;
      top: 0;
      height: 1.35rem;
      background: transparent;
      border: 1px solid transparent;
      border-right: 0;
      &.el-menu{
        overflow: hidden;
        .menu-wrapper{
          float: left;
        }
      }
      .el-menu-item{
        height: auto;
        font-size: 0.4rem;
        line-height: 0.9rem;
        border-radius: 0.15rem;
        margin: 0.2rem 0.05rem;
        padding: 0 0.25rem;
        &.is-active{
          background: $--color-primary;
          color:#fff;
        }
        &:hover{
          background: $--color-primary;
          color:#fff; 
        }
      }
    }
    .addArrow {
      position: absolute;
      top: 0;
      right: -.7rem;
      width: .7rem;
      height: 1.35rem;
      background: url('/static/img/nav_bg2.png') 0 0 no-repeat;
      -webkit-background-size: 100%;
      background-size: 100%;
    }
  }
</style>
