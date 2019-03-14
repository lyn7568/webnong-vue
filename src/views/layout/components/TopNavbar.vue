<template>
  <div class="ntt_logo">
    <div class="logo" @click="logoClk">
      <img src="/src/assets/logo_bg.png" width="80%">
      <div class="ntt_arrow" :class="{animate:isPopup0}"></div>
    </div>
    <sidebar class="sidebar-container" :class="isPopup0 ? 'animateSlideTo' : 'animateSlide'"></sidebar>
  </div>
</template>

<script>
import sidebar from './Sidebar'

export default {
  data() {
    return {
      isPopup0: true
    }
  },
  components: {
    sidebar
  },
  methods: {
    logoClk() {
      this.isPopup0 = !this.isPopup0
    }
  }
}
</script>

<style lang="scss">
  .ntt_logo {
    position: relative;
    overflow: hidden;
    .logo {
      margin-left: .8rem;
      width: 3.5rem;
      height: 3.6rem;
      z-index: 3;
      position: relative;
      cursor: pointer;
    }
    .ntt_arrow {
      width: 2rem;
      height: 1.375rem;
      position: absolute;
      left: 2.625rem;
      top: 50%;
      transform: translateY(-50%);
      background: url('/src/assets/ntt-arrorw.png');
      background-size: 100% 100%;
      z-index: -1;
      cursor: pointer;
      opacity: 1;
      animation: arrow2 2s linear;
      animation-fill-mode: forwards;
    }
    .animate{
      animation:arrow 2s linear;
      animation-fill-mode:forwards;
    }
    .animateSlide{
      animation:menunav 1s linear;
      animation-fill-mode:forwards;
    }
    .animateSlideTo{
      animation:menunavto 1s linear;
      animation-fill-mode:forwards;
    }
  }
  @keyframes arrow{
    0%{ left:2.625rem }
    100%{ left:.625rem }
  }
  @keyframes arrow2{
    0%{ left:.625rem }
    100%{ left:2.625rem }
  }
  @keyframes menunav{
    0%{ left: 3.1rem; opacity: 1; }
    100%{ left: -23rem; opacity: 0; }
  }
  @keyframes menunavto{
    0%{ left: -23rem; opacity: 0; }
    100%{ left: 3.1rem; opacity: 1; }
  }
</style>

