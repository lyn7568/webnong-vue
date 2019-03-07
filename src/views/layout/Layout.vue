<template>
  <div class="app-wrapper">
    <TopNavbar></TopNavbar>
    <div class="main-container">
      <app-main></app-main>
    </div>
    <Copyright></Copyright>
  </div>
</template>

<script>
import { TopNavbar, Copyright, AppMain } from './components'

export default {
  name: 'layout',
  data() {
    return {

    }
  },
  components: {
    TopNavbar,
    Copyright,
    AppMain
  },
  methods: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }

</style>
