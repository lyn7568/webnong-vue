<template>
  <div class="app-wrapper">
    <TopNavbar></TopNavbar>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { TopNavbar, Navbar, Sidebar, AppMain } from './components'

export default {
  name: 'layout',
  components: {
    TopNavbar,
    Navbar,
    Sidebar,
    AppMain
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
