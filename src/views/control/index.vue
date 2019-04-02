<template>
  <div class="app-container">
    <div class="n_group_content">
      <div class="n_dapengL" style="width:3.2rem">
        <drop-down :options="{list: videoList, cur: showName}" :width="'96px'" @chooseFun="chooseQyCck"></drop-down>
        <div class="n_plan n_left_plan">
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
      <div class="n_plan n_right_plan">
        <div class="n_mouse_move"></div>
        <div class="n_planbox">
          <h3 class="n_planbox_btn" @click="ExecutionScheme()"></h3>
          <div class="addpan" @click="addPlan()"></div>
        </div>
      </div>
    </div>
    <add-ways ref="addRunWaysDialog"></add-ways>
  </div>
</template>

<script>
import dropDown from '@/components/DropDown'
import addWays from './addWays'
export default {
  data() {
    return {
      lightSwitch: true,
      showName: '1区',
      videoList: [
        {
          id: '1',
          name: '1区'
        },
        {
          id: '2',
          name: '2区'
        },
        {
          id: '3',
          name: '3区'
        },
        {
          id: '4',
          name: '4区'
        }
      ],
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
  components: {
    dropDown,
    addWays
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
    },
    chooseQyCck(val) {
      console.log(val)
    },
    ExecutionScheme() {

    },
    addPlan() {
      this.$refs.addRunWaysDialog.openDiag()
    }
  }
};
</script>
