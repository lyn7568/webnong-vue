 <template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <hamburger class="hamburger-container"></hamburger>
      <breadcrumb></breadcrumb>
    </el-menu>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  padding: 0 12px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
}
.message-box{
  color: #303133;
  background: #c7e3ff;
  padding: 0 20px;
  font-size: 14px;
}
</style>

