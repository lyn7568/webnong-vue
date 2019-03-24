 <template>
  <div class="n_bottom">
    <div class="n_copyrightbtn" @click="copyMove"></div>
    <div class="n_copyright" :class="isPopup?'moveRight':'moveLeft'">
      <div class="n_icon">
        <div class="n-i"><svg-icon icon-class="help" /></div>
        <div class="n-i"><svg-icon icon-class="reset_password" /></div>
        <div class="n-i" @click="logOut"><svg-icon icon-class="close" /></div>
      </div>
      <p>版权所有：上海田韵物联网科技有限公司</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPopup: false
    }
  },
  methods: {
    copyMove() {
      this.isPopup = !this.isPopup
    },
    logOut() {
      console.log(1111)
      this.$confirm('您确认退出系统吗?', '温馨提示', {
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut', {}).then(() => {
          location.reload()
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss">
  .n_bottom {
    position: absolute;
    bottom: .25rem;
    left: 0;
    width: 100%;
    height: 1.35rem;
    .n_copyrightbtn {
      position: absolute;
      bottom: 0;
      left: 0;
      width: .725rem;
      height: 1.35rem;
      z-index: 10;
      background: url('/static/img/copyright-btn.png') 0 0 no-repeat;
      background-size: 100%;
      cursor: pointer;
    }
    .n_copyright{
      padding: 0.2rem 0.475rem;
      position: absolute;
      top: 0.25rem;
      left: 0.5rem;
      overflow: hidden;
      border: 1px solid $--color-primary;
      border-left-color: transparent; 
      border-radius: 0 0.25rem 0.25rem 0;
      background: rgba(0,0,0,0.3);
      line-height: 0.5rem;
      font-size: 0.4rem;
      &.moveRight{
        animation:move-right 1s linear;
        animation-fill-mode:forwards;
      }
      &.moveLeft{
        animation:move-left 1s linear;
        animation-fill-mode:forwards;
      }
      .n_icon{
        float: left;
      }
      .n-i{
        float: left;
        .svg-icon{
          margin-right: 0.25rem;
          border: 1px solid $--color-primary;
          border-radius: 50%;
          color: $--color-primary;
          padding: 0.025rem;
          width: 0.5rem;
          height: 0.5rem;
          cursor: pointer;
          &:hover{
            background: $--color-primary;
            color: #fff;
          }
        }
      }
      p {
        float:left;
        margin-left: 0.1rem;
        color: #fff;
      }
    }

  }
  @keyframes move-right{
    0%{ left: 0.5rem; }
    100%{ left: -10.6rem; }
  }
  @keyframes move-left{
    0%{ left: -10.6rem; }
    100%{ left: 0.5rem; }
  }
</style>

