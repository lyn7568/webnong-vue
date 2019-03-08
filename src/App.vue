<template>
  <div id="app" class="fog">
    <div class="absolute-bg" :style="{backgroundImage:'url('+ bg + ')'}"></div>
    <div class="fog__container">
        <div class="fog__img fog__img--first"></div>
        <div class="fog__img fog__img--second"></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import imgs from './assets/home_bg.jpg'
  import imgs2 from './assets/page_bg.jpg'
  export default {
    name: 'App',
    data() {
      return {
        bg: imgs
      }
    },
    watch: {
      '$router'(to, from) {
        console.log(to.path)
        if (to.path === 'login' || to.path === 'home') {
          this.bg = imgs
        } else {
          this.bg = imgs2
        }
      }
    }
  }
</script>
<style>
  @import './styles/cloud.css';
</style>

