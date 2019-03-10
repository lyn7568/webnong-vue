<template>
  <div class="app-wrapper">
    <TopNavbar></TopNavbar>
    <app-main></app-main>
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
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }

</style>
