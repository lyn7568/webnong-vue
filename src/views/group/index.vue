<template>
  <div class="app-container">
    <div class="n_group_content">
      <div class="n_dapengL">
        <drop-down :options="{list: videoList, cur: showName}" @chooseFun="chooseQyCck"></drop-down>
        <div class="n_newGroup">
          <el-form :model="formObject.model" :ref="formObject.model" class="formClass">
            <el-form-item v-for="item in formObject.arr" :key="item.index" :label="item.tit + ' :'">
              <el-select v-if="item.select && !item.list" v-model="showType" :placeholder="item.tit">
                <el-option
                  v-for="item in [{value: 'PLC单点控制器',label: '单点'},{value: 'PLC行程手动控制器',label: '行程'}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  @click.native="chooseTypeClk">
                </el-option>
              </el-select>
              <el-input v-if="!item.select &&!item.list" v-model="formObject.model[item.prop]"
                        :placeholder="item.tit"></el-input>
              <el-row v-if="item.list" class="list-shebei">
                <el-col v-for="esnItem in esnIdsList" :key="esnItem.id">{{esnItem.name}}</el-col>
                <!--<el-col>1#风机</el-col>-->
              </el-row>
            </el-form-item>
            <el-form-item class="btn-form-item">
              <el-button type="primary" @click="addClear">新增设备</el-button>
              <el-button type="primary" @click="save">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="n_dapeng_status">
        <div class="n_dapeng_statusbox">
          <el-row>
            <el-col v-for="items in esnList" :key="items.id" class="n_status_icon n_status_normal">
              <i v-show="items.cgData=='鼓风机'" class="icon-gufengji"></i>
              <i v-show="items.cgData=='水泵'" class="icon-shuibeng"></i>
              <i v-show="items.cgData=='内遮阳'" class="icon-neizheyang"></i>
              <i v-show="items.cgData=='天窗'" class="icon-tianchuang"></i>
              <i v-show="items.cgData=='外遮阳'" class="icon-waizheyang"></i>
              <i v-show="items.cgData=='雨量清零'" class="icon-ylql"></i>
              <i v-show="items.cgData=='远程控制开关'" class="icon-yckz"></i>
              <p>{{items.name}}</p>
            </el-col>
            <!--<el-col class="n_status_icon n_status_run">-->
            <!--<i class="icon-ylql"></i><p>1号点</p>-->
            <!--</el-col>-->
            <!--<el-col class="n_status_icon n_status_danger">-->
            <!--<i class="icon-ylql"></i><p>2号点</p>-->
            <!--</el-col>-->
            <!--<el-col class="n_status_icon n_status_close">-->
            <!--<i class="icon-ylql"></i><p>3号点</p>-->
            <!--</el-col>-->
          </el-row>
        </div>
      </div>
      <div class="n_plan">
        <div class="n_planbox">
          <h3>编组信息</h3>
          <div class="n_jiaoshui no-groupright">
            <div class="n_jiaoshuibox">

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import dropDown from '@/components/DropDown'

  export default {
    data() {
      return {
        showType: 'PLC行程手动控制器',
        showName: '1区',
        showNameId: '',
        esnList: [],
        esnIdsList: [
          {id: '1', name: '01#内遮阳'},
          {id: '2', name: '01#左天窗'},
          {id: '3', name: '03#右天窗'},
        ],
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
            name: '',
            type: 'PLC行程手动控制器',
            description: '',
            esnIds: ''
          },
          arr: [
            {
              prop: 'name',
              tit: '设备编组'
            },
            {
              prop: 'type',
              tit: '编组类型',
              select: true
            },
            {
              prop: 'description',
              tit: '详情备注'
            },
            {
              prop: 'esnIds',
              tit: '所属设备',
              list: true
            }
          ],
          oFun: [
            {
              name: '新增编组',
              event: 'addClear'
            },
            {
              name: '保存',
              event: 'edit'
            }
          ]
        }
      };
    },
    components: {
      dropDown
    },
    created() {
      // this.queryInfoList()
      this.queryUserAreaList()
    },
    computed: {
      UID() {
        return this.$store.getters.userid
      }
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
      queryUserEsnListByUserAreaId(userAreaId) {
        var that = this;
        this.$http.post('/group/getUserEsnByUserAreaIdAndType', {
          type: that.showType,
          userAreaId: userAreaId,
        }, function (res) {
          const obj = res.data
          if (obj.length != 0) {
            that.esnList = obj;
          }
        })
      },
      chooseQyCck(val) {
        console.log(val.id)
        this.esnList = []
        this.showName = val.name
        this.showNameId = val.id
        this.queryUserEsnListByUserAreaId(val.id)
      },
      chooseTypeClk() {
        this.esnList = []
        this.queryUserEsnListByUserAreaId(this.showNameId)
      },
      addClear() {//新增编组
        alert('新增编组')
        this.esnIdsList = []
        this.showType = 'PLC行程手动控制器'
        this.esnIdsList = []
      },
      save() {//保存
        alert('保存')
      },
      queryUserAreaList() {
        var that = this;
        this.$http.post('/group/getUserAreaByUserId', {
          userId: that.UID,
        }, function (res) {
          const obj = res.data
          if (obj.length != 0) {
            that.videoList = obj
            that.chooseQyCck(obj[0])
          }
        })
      },
    }
  };
</script>
