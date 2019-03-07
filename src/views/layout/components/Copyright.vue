 <template>
  <div class="ntt_bottom first_bottom" :class="{first_bottom: selectedMeun == 'home',otherpage_bottom: selectedMeun != 'home'}">
    <div class="ntt_copyrightbtn" @click="copy"></div>
    <div class="ntt_copyright">
        <div class="ntt_copyrighttxt LeftRoll ng-scope" v-if="isrighttxt">
            <div class="ntt_service">
                <span><a href="http://help.nongtt.com" style="display:inline-block;width:100%;height:100%;"></a></span>
                <span @click="SetPwd"></span>
                <span @click="SignOut"></span>
            </div>
            <p>版权所有：上海田韵物联网科技有限公司</p>
        </div>
    </div>
  </div>
</template>

<script>

export default {

}
</script>

<style lang="scss">
  .ntt_bottom {
    position: absolute;
    bottom: .25rem;
    left: 0;
    width: 11.35rem;
    height: 1.35rem;
    .ntt_copyrightbtn {
        position: absolute;
        bottom: 0;
        left: 0;
        width: .725rem;
        height: 1.35rem;
        z-index: 10;
        background: url('/src/assets/copyright-btn.png') 0 0 no-repeat;
        background-size: 100%;
        cursor: pointer;
    }
    .first_bottom .ntt_copyrighttxt {
        padding-right: 10px;
        height: 100%;
        position: absolute;
        left: 0;
        bottom: -.125rem;
        overflow: hidden;
        border: 1px solid #ff8019;
        border-radius: 8px;
        background: rgba(0,0,0,0.3);
        // background: url(../Image/copyright-bg.png) 0 0 no-repeat;
        // background-size: 100%;
        padding-top: .125rem;
        padding-left: .475rem;
    }
  }
</style>

