<template>
  <div class="app-container">
    <div class="n_group_content">
      <div class="n_dapengL" style="width:3.2rem">
        <drop-down :options="{list: videoList, cur: showName}" :width="'96px'" @chooseFun="chooseQyCck"></drop-down>
        <div class="n_plan n_left_plan">
          <div class="n_planbox">
            <h3>编组信息</h3>
            <div v-show="groupList.length==0" class="n_jiaoshui no-groupright"><!--  <div class="n_jiaoshuibox"></div>--></div>
            <div v-show="groupList.length!=0" class="n_jiaoshui">
              <el-tooltip placement="right" v-for="(groupItem,index) in groupList" :key="groupItem.id">
                <div slot="content">{{groupItem.name}}</div>
                <el-button type="primary" @click="showGroupInfo(index)">{{groupItem.name}}</el-button>
              </el-tooltip>
              <!--<el-button type="primary" @click="save">保存</el-button>-->
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
            <!--<span>远程控制</span>-->
            <!--<el-switch v-model="lightSwitch" active-text="开" inactive-text="关"></el-switch>-->
          </div>
        </div>
        <div class="n_dapeng_statusbox">
          <div class="n_left">
            <el-row>
              <el-popover placement="bottom-start" width="300" trigger="click" v-for="cgqEsnItem in userCgqEsnList" :key="cgqEsnItem.id">
                <el-row class="emf-control">
                  <el-col :span="12" class="emf-eq">
                    <div class="eq-status-discon n_status_normal emf-eq-status">
                      <i class="icon-status1 guangzhao"></i>
                      <div class="status-txt">
                        <p>{{cgqEsnItem.name}}</p>
                      </div>
                    </div>
                    <div class="emf-run">设备连接正常</div>
                    <div class="emf-btn">
                      {{cgqEsnItem.nowData}} {{cgqEsnItem.unit}}
                    </div>
                  </el-col>
                  <el-col :span="12" class="emf-tooltip">
                    <div class="emf-toolbar">
                      <a href="/#/logs">
                        <svg-icon icon-class="logs" /><em>日志</em>
                      </a>
                      <a href="/#/chart">
                        <svg-icon icon-class="chart-line" /><em>图表</em>
                      </a>
                      <a href="http://help.nongtt.com/help">
                        <svg-icon icon-class="help" /><em>帮助</em>
                      </a>
                      <a href="/#/group">
                        <svg-icon icon-class="setting" /><em>设置</em>
                      </a>
                    </div>
                    <div class="emf-content">
                      <div class="emf-databox"></div>
                    </div>
                  </el-col>
                </el-row>
                <el-col slot="reference" class="eq-status-discon n_status_normal">
                  <i class="icon-status1 guangzhao"></i>
                  <div class="status-txt">
                    <p>{{cgqEsnItem.name}}</p>
                    <p>{{cgqEsnItem.nowData}} {{cgqEsnItem.unit}}</p>
                  </div>
                </el-col>
              </el-popover>
              <!--<el-col class="eq-status-discon">-->
                <!--<i class="icon-status2 tuwen"></i>-->
                <!--<div class="status-txt">-->
                  <!--<p>土温</p>-->
                  <!--<p>17.1 ℃</p>-->
                <!--</div>-->
              <!--</el-col>-->
            </el-row>
          </div>
          <div class="n_right">
            <el-row>
              <el-popover placement="bottom-start" width="300" trigger="click" v-for="items in userColEsnList" :key="items.id">
                <el-row class="emf-control">
                  <el-col :span="12" class="emf-eq">
                    <div class="n_status_icon n_status_normal emf-eq-status">
                      <i class="icon-gufengji"></i>
                      <p>{{items.name}}</p>
                    </div>
                    <div class="emf-run">设备连接正常</div>
                    <div class="emf-btn">
                      <div class="eq-status-btn" v-if="items.nowData === '0'">
                        <span>关闭</span>
                        <div class="eq-play" @click="esnColClk(items.ip,items.cip,2)">
                          <svg-icon icon-class="play" />
                        </div>
                      </div>
                      <div class="eq-status-btn" v-if="items.nowData === '1'">
                        <span>打开</span>
                        <div class="eq-pause" @click="esnColClk(items.ip,items.cip,3)">
                          <svg-icon icon-class="pause" />
                        </div>
                      </div>
                      <!-- <span class="eq-percent-control on" @click="SwitchPercentButton(IconControl.equ,'on',$event,IconControl.type)"></span>
                      <span class="eq-percent-control off" @click="SwitchPercentButton(IconControl.equ,'off',$event,IconControl.type)"></span>
                      <span class="eq-percent-control stop" @click="SwitchPercentButton(IconControl.equ,'stop',$event,IconControl.type)"></span> -->
                    </div>
                  </el-col>
                  <el-col :span="12" class="emf-tooltip">
                    <div class="emf-toolbar">
                      <a href="/#/logs">
                        <svg-icon icon-class="logs" /><em>日志</em>
                      </a>
                      <a href="/#/chart">
                        <svg-icon icon-class="chart-line" /><em>图表</em>
                      </a>
                      <a href="http://help.nongtt.com/help">
                        <svg-icon icon-class="help" /><em>帮助</em>
                      </a>
                <!--      <a href="/#/group">
                        <svg-icon icon-class="setting" /><em>设置</em>
                      </a>-->
                    </div>
                    <div class="emf-content">
                      <div class="emf-databox"></div>
                      <span class="bianzu">该设备不属于任何编组</span>
                    </div>
                  </el-col>
                </el-row>
                <el-col slot="reference" class="n_status_icon n_status_normal">
                  <i v-show="items.cgData=='鼓风机'" class="icon-gufengji"></i>
                  <i v-show="items.cgData=='水泵'" class="icon-shuibeng"></i>
                  <i v-show="items.cgData=='内遮阳'" class="icon-neizheyang"></i>
                  <i v-show="items.cgData=='天窗'" class="icon-tianchuang"></i>
                  <i v-show="items.cgData=='外遮阳'" class="icon-waizheyang"></i>
                  <i v-show="items.cgData=='雨量清零'" class="icon-ylql"></i>
                  <i v-show="items.cgData=='远程控制开关'" class="icon-yckz"></i>
                  <i v-show="items.cgData=='继电器'" class="icon-yckz"></i>
                  <p>{{items.name}}</p>
                </el-col>
              </el-popover>
              <!--<el-col class="n_status_icon n_status_normal">-->
                <!--<i class="icon-gufengji"></i><p>1#风机</p>-->
              <!--</el-col>-->
              <!--<el-col class="n_status_icon n_status_run">-->
                <!--<i class="icon-ylql"></i><p>1号点</p>-->
              <!--</el-col>-->
            </el-row>
          </div>
        </div>
      </div>
      <div class="n_plan n_right_plan">
        <div class="n_mouse_move"></div>
        <div class="n_planbox">
          <h3 class="n_planbox_btn" @click="ExecutionScheme()"></h3>
          <div class="addpan" @click="addPlan()"></div>
          <div class="n_playShow">
            <div class="planlist" style="height: 13.5rem">
              <div class="n_jiaoshui" style="height: 13.5rem">
                <el-tooltip placement="left" v-for="(planItem,index) in userPlanList" :key="planItem.id">
                  <div slot="content">{{planItem.name}}</div>
                  <el-button type="primary" @click="updatePlan(index)">{{planItem.name}}</el-button>
                </el-tooltip>
              </div>
                <!--<el-popover placement="left" width="300" trigger="hover">-->
                <!--<el-row class="runninglist_li">-->
                  <!--<el-col class="n_status_icon n_status_normal">-->
                    <!--<i class="icon-gufengji"></i><p>1#风机</p>-->
                  <!--</el-col>-->
                  <!--<el-col class="n_status_icon n_status_normal">-->
                    <!--<i class="icon-gufengji"></i><p>1#风机</p>-->
                  <!--</el-col>-->
                  <!--<el-col class="n_status_icon n_status_normal">-->
                    <!--<i class="icon-gufengji"></i><p>1#风机</p>-->
                  <!--</el-col>-->
                  <!--<el-col class="n_status_icon n_status_normal">-->
                    <!--<i class="icon-gufengji"></i><p>1#风机</p>-->
                  <!--</el-col>-->
                <!--</el-row>-->
                <!--<div class="planlist_li" slot="reference">-->
                  <!--<div class="n_planIcon">-->
                    <!--<span class="activePlan"></span>-->
                    <!--<span class="character360"></span>-->
                    <!--<span></span>   &lt;!&ndash;:click="Copy(ap)" &ndash;&gt;-->
                    <!--<span></span>  &lt;!&ndash;:click="Show(ap)"  &ndash;&gt;-->
                  <!--</div>-->
                  <!--<div class="n_planTitle">test</div>-->
                  <!--<div class="n_planTerm"><span>条件</span><i>1</i></div>-->
                  <!--<div class="n_planlight">-->
                      <!--<span class="zhi">智</span>-->
                      <!--<i>1</i>-->
                      <!--<span class="bao">保</span>-->
                      <!--<i>0</i>-->
                      <!--<span class="jing">警</span>-->
                      <!--<i>0</i>-->
                  <!--</div>-->
                  <!--<p class="eq-status-normal"><i>有 效 期：永久有效</i></p>-->
                  <!--<p>上次执行：04-08 11:01</p>-->
                <!--</div>-->
              <!--</el-popover>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <add-ways ref="addRunWaysDialog"></add-ways>
    <update-ways ref="updateRunWaysDialog"></update-ways>
  </div>
</template>

<script>
import dropDown from '@/components/DropDown'
import addWays from './addWays'
import updateWays from './updateWays'
export default {
  data() {
    return {
      lightSwitch: true,
      showName: '1区',
      userAreaId:'',
      groupList:[],//编组列表
      userCgqEsnList:[],//传感器设备列表
      userColEsnList:[],//控制设备列表
      userPlanList:[],//执行方案列表
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
  components: {
    dropDown,
    addWays,
    updateWays
  },
  computed: {
    UID() {
      return this.$store.getters.userid
    }
  },
  created() {
    this.queryUserAreaList()
  },
  methods: {
    queryUserAreaList(){//用户区域列表
      var that = this;
      this.$http.post('/esnController/getUserAreaByUserId', {
        userId: that.UID,
      }, function (res) {
        const obj = res.data
        if (obj.length != 0) {
          that.videoList = obj
          that.chooseQyCck(obj[0])
        }
      })
    },
    queryUserGroupList(){//用户编组列表
      var that = this;
      this.$http.post('/esnController/getGroupList', {
        userAreaId: that.userAreaId,
      }, function (res) {
        const obj = res.data
        that.groupList=[]
        if (obj.length != 0) {
          that.groupList = obj
        }
      })
    },
    queryUserCgqEsnList(){//获取用户传感器设备
      var that = this;
      this.$http.post('/esnController/getUserEsnByUserAreaId', {
        userAreaId: that.userAreaId,
        userId: that.UID,
        type:'485类型传感器;CAN类型传感器;232类型传感器;开关量传感器;模拟量传感器',
        // type:'NTT无线传感器',
      }, function (res) {
        const obj = res.data
        that.userCgqEsnList=[]
        if (obj.length != 0) {
          that.userCgqEsnList = obj
        }
      })
    },
    queryUserColEsnList(){//获取用户控制设备
      var that = this;
      this.$http.post('/esnController/getUserEsnByUserAreaId', {
        userAreaId: that.userAreaId,
        userId: that.UID,
        type:'单点控制器',
        // type:'PLC行程手动控制器;PLC单点控制器',
      }, function (res) {
        const obj = res.data
        that.userColEsnList =[]
        if (obj.length != 0) {
          that.userColEsnList = obj
        }
      })
    },
    queryUserPlanList(){//获取区域执行方案
      var that = this;
      this.$http.post('/esnController/getUserPlanListByUserAreaIdAndUserId', {
        userAreaId: that.userAreaId,
        userId:that.UID
      }, function (res) {
        const obj = res.data
        if (obj.length != 0) {
          that.userPlanList = obj
        }
      })
    },
    esnColClk(ip,cip,value){//控制设备
      var that = this;
      this.$http.post('/esnController/send', {
        ip: ip,
        cip:cip,
        value:value
      }, function (res) {
        if (res.success) {
          that.$message({
            message: "操作成功",
            type: 'success'
          })
          that.queryUserAreaList()
        }
      })
    },
    chooseQyCck(val) {
      this.showName = val.name
      this.userAreaId = val.id
      this.queryUserGroupList()
      this.queryUserCgqEsnList()
      this.queryUserColEsnList()
      this.queryUserPlanList()
      // this.queryUserEsnListByUserAreaId(val.id)
    },
    handelTapBtn(val) {
      this.btnActive = val
    },
    ExecutionScheme() {

    },
    addPlan() {
      this.$refs.addRunWaysDialog.openDiag(this.userAreaId,this.showName,this.userColEsnList,this.userCgqEsnList)
    },
    updatePlan(index) {
      this.$refs.updateRunWaysDialog.openDiag(this.userAreaId,this.showName,this.userColEsnList,this.userCgqEsnList,this.userPlanList[index])
    }
  }
};
</script>
