<template>
  <div id="app" class="fog">
    <div class="absolute-bg"></div>
    <div class="fog__container">
        <div class="fog__img fog__img--first"></div>
        <div class="fog__img fog__img--second"></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>
<style>
  @import './styles/cloud.css';
</style>

