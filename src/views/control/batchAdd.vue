<template>
  <el-dialog class="dialogClass" title="设备选择" :visible.sync="dialogShebeiVisible" :close-on-click-modal="false" width="550px">
    <div class="list-tabs-show">
      <el-tabs v-model="activeName" type="card" @tab-click="esnTabClk()">
        <el-tab-pane :lazy="true" v-for="item in tabList" :label="item.name" :name="item.ip" :key="item.ip">
          <div class="n_kuang">
            <div class="n_status_icon n_status_normal">
              <i class="icon-gufengji"></i><p>1234</p>
            </div>
            <div class="n_status_icon n_status_normal">
              <i class="icon-gufengji"></i><p>1234</p>
            </div>
            <div class="n_status_icon n_status_normal">
              <i class="icon-gufengji"></i><p>1234</p>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="n_xuan_tit">选中项目</div>
      <div class="n_xuan">
        <div class="n_status_icon n_status_normal">
          <i class="icon-gufengji"></i><p>1234</p>
        </div>
        <div class="n_status_icon n_status_normal">
          <i class="icon-gufengji"></i><p>1234</p>
        </div>
        <div class="n_status_icon n_status_normal">
          <i class="icon-gufengji"></i><p>1234</p>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogShebeiVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveShebeiSubmitInfo">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogShebeiVisible: false,
      activeName: '1',
      tabList: [
        {
          ip: '1',
          name: '展示区'
        }
      ]
    };
  },
  computed: {
    UID() {
      return this.$store.getters.userid
    }
  },
  created() {
  },
  methods: {
    openShebeiDiag() {
      var that = this
      setTimeout(() => {
        that.dialogShebeiVisible = true
      }, 1)
    },
    saveShebeiSubmitInfo() {
      var that = this
      this.$refs[that.formObject.ref].validate(valid => {
        if (valid) {
        }
      })
    }
  }
};
</script>
<style lang="scss">
  .n_kuang, .n_xuan{
    border: 1px solid $--color-primary;
    overflow: hidden;
    height: 5rem;
    padding: 0.5rem;
    .n_status_icon{
      float: left;
    }
  }
  .n_xuan_tit{
    margin: 1rem 0 0.25rem;
  }
</style>
