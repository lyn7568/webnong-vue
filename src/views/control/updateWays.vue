<template>
  <div>
    <el-dialog class="dialogClass" title="添加执行方案" :visible.sync="dialogFormVisible" :close-on-click-modal="false"
               width="90%">
      <el-form :model="formObject.model" :ref="formObject.ref" :rules="formObject.rules" label-width="3.8rem">
        <el-row>
          <el-col :span="16">
            <el-form-item class="split-con">
              <div class="split-tit"><span>方案基本信息</span></div>
            </el-form-item>
            <el-form-item label="执行方案名称：" prop="name">
              <el-input v-model="formObject.model.name"></el-input>
            </el-form-item>
            <el-form-item label="方案启用：" prop="switch">
              <el-switch v-model="formObject.model.switch" active-color="#13ce66"
                         inactive-color="#ff4949" active-text="启用" inactive-text="停用"></el-switch>
            </el-form-item>
            <el-form-item prop="checked">
              <el-checkbox v-model="formObject.model.checked">仅有限期内执行</el-checkbox>
              <el-date-picker v-show="formObject.model.checked" v-model="formObject.model.validTime" type="date"
                              placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item class="split-con">
              <div class="split-tit clearfix">
                <span class="float-l">方案执行条件</span>
                <div class="float-r right-btn">
                </div>
              </div>
              <div class="split-con-show">
                <div class="con-list-li clearfix">
                  <div class="plan_condition margin-right-10 float-l">
                    <template>
                      <div class="n_status_icon n_status_normal float-l" @click="batchAddShebei(0)"><i
                        class="icon-shebei"></i>
                        <p>{{showCgqName}}</p></div>
                      <div class="float-l margin-right-10"><span class="fontSiz">输入框1：</span>
                        <el-input style="width: 120px" v-model="inputOne"></el-input>
                      </div>
                      <div class="n_status_icon n_status_normal float-l" @click="batchAddShebei(2)"><i
                        class="icon-shebei"></i>
                        <p>{{showInputTwoName}}</p></div>
                      <div class="float-l margin-right-10"><span class="fontSiz">输入框3：</span>
                        <el-input style="width: 120px" v-model="inputThree"></el-input>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item class="split-con">
              <div class="split-tit clearfix">
                <span class="float-l">方案执行内容</span>
                <div class="float-r right-btn">
                  <!--<el-button>添加</el-button>-->
                  <!--<el-button>批量添加</el-button>-->
                </div>
              </div>
              <div class="split-con-show">
                <div class="con-list-li clearfix">
                  <!--<span class="svg-container margin-right-10 float-l" @click="OperDelete">-->
                  <!--<svg-icon icon-class="delete"/>-->
                  <!--</span>-->
                  <!--<el-radio-group class="float-l margin-right-10" v-model="tabTwoSelect">-->
                  <!--<el-radio-button label="1">智控</el-radio-button>-->
                  <!--<el-radio-button label="2">保护</el-radio-button>-->
                  <!--<el-radio-button label="3">预警</el-radio-button>-->
                  <!--</el-radio-group>-->
                  <div class="plan_condition margin-right-10 float-l">
                    <template v-if="tabTwoSelect==='1'">
                      <div class="n_status_icon n_status_normal float-l" @click="batchAddShebei(1)"><i
                        class="icon-shebei"></i>
                        <p>{{showEsnName}}</p></div>
                      <el-time-picker class="float-l"
                                      v-model="executeTime"
                                      format="HH:mm"
                                      value-format="HH:mm"
                                      placeholder="选择时间">
                      </el-time-picker>
                    </template>
                  </div>
                </div>
                <!--<div class="def-tip">暂无执行条件，请添加</div>-->
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button @click="deleteClk">删除</el-button>
        <el-button type="primary" @click="saveSubmitInfo">保存并应用</el-button>
      </div>
    </el-dialog>
    <batch-add ref="batchAddDialog" v-on:checkCgqEvent="checkCgqEvent"></batch-add>
  </div>
</template>

<script>
  import batchAdd from './batchAdd'

  export default {
    data() {
      return {
        timeRanger: '',
        checkAll: false,
        userAreaId: '',
        id:'',
        showName: '',
        executeTime: '',
        inputOne:'',
        inputThree:'',
        showCgqName: '请选择设备',
        checkedCgqList: [],
        showEsnName: '请选择设备',
        checkedEsnList: [],
        showInputTwoName: '请选择设备',
        checkedInputTwoList: [],
        userColEsnList: [],
        userCgqEsnList: [],
        checkedWeeks: [],
        // weekdays: ['日', '一', '二', '三', '四', '五', '六'],
        weekdays: [
          {id: 1, name: '日'},
          {id: 64, name: '一'},
          {id: 32, name: '二'},
          {id: 16, name: '三'},
          {id: 8, name: '四'},
          {id: 4, name: '五'},
          {id: 2, name: '六'},
        ],
        isIndeterminate: true,
        tabOneSelect: '1',
        tabTwoSelect: '1',
        showType: '1',
        delayTime: '',
        delayshow: false,
        dialogFormVisible: false,
        formObject: {
          ref: 'formName',
          model: {
            name: '',
            state: '',
            type: [],
            show: [],
            showFlag: true,
            isIndeterminate: [],
            checkAll: [],//周全选
            checkedWeeks: [],//选择周
            planTime: [],//开始结束时间
            planEsnLogic: [],
            planEsnValue: [],
            planEsnHysValue: [],
            tabOneSelect: [],
            checkCgqList: [],

            switch: false,
            checked: false,
            time: '',
            validTime: '2099-12-31'
          },
          rules: {}
        }
      };
    },
    computed: {
      UID() {
        return this.$store.getters.userid
      }
    },
    components: {
      batchAdd
    },
    created() {
    },
    methods: {
      openDiag(userAreaId, userAreaName, userColEsnList, userCgqEsnList,userPlan) {
        var that = this
        this.id=userPlan.id
        this.userAreaId = userAreaId
        this.showName = userAreaName
        this.userColEsnList = userColEsnList
        this.userCgqEsnList = userCgqEsnList
        this.formObject.model.name=userPlan.name
        this.inputOne=userPlan.inputOne
        this.inputThree=userPlan.inputThree
        this.executeTime=userPlan.executeTime
        this.formObject.model.validTime=userPlan.validTime
        for (let i = 0; i <userCgqEsnList.length ; i++) {
          if(userCgqEsnList[i].cip==userPlan.cgqCip){
            this.$set(this.checkedCgqList,0,{})
            this.$set(this.checkedCgqList,0,userCgqEsnList[i])
            this.showCgqName=userCgqEsnList[i].name;
          }
          if(userCgqEsnList[i].cip==userPlan.inputTwo){
            this.$set(this.checkedInputTwoList,0,{})
            this.$set(this.checkedInputTwoList,0,userCgqEsnList[i])
            this.showInputTwoName=userCgqEsnList[i].name;
          }
        }
        for (let i = 0; i <userColEsnList.length ; i++) {
          if(userColEsnList[i].cip==userPlan.jdqCip){
            this.$set(this.checkedEsnList,0,{})
            this.$set(this.checkedEsnList,0,userColEsnList[i])
            this.showEsnName=userColEsnList[i].name;
          }
        }
        if(userPlan.status==0){
          this.formObject.model.switch=true
        }else {
          this.formObject.model.switch=false
        }
        if(userPlan.validTime!='2099-12-31'){
          this.formObject.model.checked=true
          this.formObject.model.validTime=userPlan.validTime
        }
        setTimeout(() => {
          that.dialogFormVisible = true
        }, 1)
      },
      saveSubmitInfo() {
        var that = this
        let statusValue=1
        if(that.formObject.model.switch){
          statusValue=0
        }
        // this.$refs[that.formObject.ref].validate(valid => {
        //   if (valid) {
            const paramsData = {
              userId: that.UID,
              id:that.id,
              name: that.formObject.model.name,
              cgqIp: that.checkedCgqList[0].ip,
              cgqCip: that.checkedCgqList[0].cip,
              inputOne: that.inputOne,
              inputTwo: that.checkedInputTwoList[0].cip,
              inputThree: that.inputThree,
              jdqIp: that.checkedEsnList[0].ip,
              jdqCip: that.checkedEsnList[0].cip,
              executeTime: that.executeTime,
              status:statusValue,
              validTime:that.formObject.model.validTime,
              userAreaId:that.userAreaId
            }
            that.$http.post('/esnController/update', paramsData, function(res) {
              if (res.success) {
                that.$message({
                  message: '修改成功',
                  type: 'success'
                })
                that.closeDialog()
                that.$parent.queryUserPlanList()
              }
            })
        //   }
        // })
      },
      deleteClk(){
        var that=this
        this.$http.post('/esnController/delete', {
          id: that.id
        }, function(res) {
          if (res.success) {
            that.$message({
              message: "删除成功",
              type: 'success'
            })
            that.closeDialog()
            that.$parent.queryUserPlanList()
          }
        })
      },
      saveToDraft() {

      },
      OperDelete(index) {
        // this.formObject.model.show[index]=false;
        this.$set(this.formObject.model.show, index, false)
        let vflag = true
        for (let i = 0; i < this.formObject.model.show.length; i++) {
          if (this.formObject.model.show[i] == true) {
            vflag = false
          }
        }
        if (vflag) {
          this.formObject.model.showFlag == true
        } else {
          this.formObject.model.showFlag == false
        }
      },
      OperDelay() {
        this.delayshow = !this.delayshow
      },
      closeDialog() {
        this.$refs[this.formObject.ref].resetFields()
        this.dialogFormVisible = false
      },
      handleTimeChange(val) {
        console.log(val)
      },
      handleCheckAllChange(index) {
        // this.checkedWeeks = val ? this.weekdays : [];
        // this.isIndeterminate = false;
      },
      handleCheckedWeeksChange(index) {
        let value = this.formObject.model.checkedWeeks[index]
        // alert(value.length)
        if (value.length == 7) {
          this.$set(this.formObject.model.checkAll, index, true)
          this.$set(this.formObject.model.isIndeterminate, index, false)
        } else {
          this.$set(this.formObject.model.checkAll, index, false)
          this.$set(this.formObject.model.isIndeterminate, index, true)
        }
      },
      chooseTypeClk(val) {
        console.log(val)
      },
      batchAddShebei(index) {
        this.$refs.batchAddDialog.openShebeiDiag(this.userAreaId, this.showName, this.userColEsnList, this.userCgqEsnList, index)
      },
      addClk() {
        this.formObject.model.type.push(0)
        this.formObject.model.tabOneSelect.push(0)
        this.formObject.model.planEsnLogic.push(">=")
        this.formObject.model.checkAll.push(false)
        this.formObject.model.isIndeterminate.push(false)
        this.formObject.model.checkedWeeks.push([])
        this.formObject.model.checkCgqList.push({id: '1', name: "请选择设备"}),
          this.formObject.model.show.push(true)
      },
      changeTjClk(index) {
        let val = this.formObject.model.type[index]
        this.$set(this.formObject.model.tabOneSelect, index, val)
      },
      checkCgqEvent(checkCgqList, index) {
        this.$set(this.formObject.model.checkCgqList, index, checkCgqList[0])
        if (index == 0) {//传感器设备
          this.showCgqName = this.formObject.model.checkCgqList[0].name
          this.checkedCgqList = checkCgqList
        } else if (index == 1) {//电磁阀设备
          this.showEsnName = this.formObject.model.checkCgqList[1].name
          this.checkedEsnList = checkCgqList
        } else if (index == 2) {//第二个输入框值
          this.showInputTwoName = this.formObject.model.checkCgqList[2].name
          this.checkedInputTwoList = checkCgqList
        }
      }
    }
  };
</script>
