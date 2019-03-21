<template>
  <div id="app" class="fog">
    <div class="absolute-bg" :style="{backgroundImage:'url('+ $store.getters.bg + ')'}"></div>
    <div class="fog__container" v-if="show">
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
        show: false
      }
    },
    watch: {
      '$route'(to, from) {
        if (to.name === 'login' || to.name === 'home') {
          this.show = true
          this.$store.dispatch('ToggleBG', imgs)
        } else {
          this.show = false
          this.$store.dispatch('ToggleBG', imgs2)
        }
      }
    }
  }
</script>
<style>
  @import './styles/cloud.css';
</style>

