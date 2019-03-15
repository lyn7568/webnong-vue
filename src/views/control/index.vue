<template>
  <div class="app-container">
    <div class="n_group_content">
      <div class="n_dapengL" style="width:3.2rem">
        <el-dropdown trigger="click">
          <el-button type="primary">
            展示区<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in videoList" :key="item.index">{{item.type}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="n_plan n_right_plan">
          <div class="n_planbox">
            <h3>编组信息</h3>
            <div class="n_jiaoshui no-groupright">
              <div class="n_jiaoshuibox">

              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="n_dapeng_status n_dapeng_status_contol">
        <div class="n_dapeng_switch">
          <div class="n_left">
            <div class="n_light_color normal_color">正常</div>
            <div class="n_light_color run_color">运行</div>
            <div class="n_light_color close_color">断开</div>
            <div class="n_light_color danger_color">预警</div>
          </div>
          <div class="n_right">
            <span>远程控制</span>
            <el-switch v-model="lightSwitch" active-text="开" inactive-text="关"></el-switch>
          </div>
        </div>
        <div class="n_dapeng_statusbox">
          <div class="n_left">
            <el-row>
              <el-col class="n_status_icon n_status_normal">
                <i class="icon-gufengji"></i><p>1#风机</p>
              </el-col>
              <el-col class="n_status_icon n_status_run">
                <i class="icon-ylql"></i><p>1号点</p>
              </el-col>
            </el-row>
          </div>
          <div class="n_right">
            <el-row>
              <el-col class="n_status_icon n_status_normal">
                <i class="icon-gufengji"></i><p>1#风机</p>
              </el-col>
              <el-col class="n_status_icon n_status_run">
                <i class="icon-ylql"></i><p>1号点</p>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <!-- <div class="n_plan">
        <div class="n_planbox">
          <h3>编组信息</h3>
          <div class="n_jiaoshui no-groupright">
            <div class="n_jiaoshuibox">

            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lightSwitch: true,
      videoList: [],
      formObject: {
        model: {
          Logs_Date: '',
          Control_Type: ''
        },
        arr: [
          {
            prop: 'Logs_Date',
            tit: '设备名称',
            date: true,
          },
          {
            prop: 'Control_Type',
            tit: '所属企业'
          }
        ],
        oFun: [
          {
            name: '新增',
            event: 'editOpenDialogFun'
          },
          {
            name: '查询',
            event: 'edit'
          }
        ]
      }
    };
  },
  created() {
    this.queryInfoList()
  },
  methods: {
    queryInfoList() {
      var that = this;
      // this.$http.get(
      //   "/static/json/video.txt?t=" + new Date().getTime(),
      //   {},
      //   function(res) {
      //     var $data = res.rows;
      //     that.videoList = $data;
      //   }
      // );
    },
    handelTapBtn(val) {
      this.btnActive = val
    }
  }
};
</script>
