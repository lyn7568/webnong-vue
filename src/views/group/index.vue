<template>
  <div class="app-container">
    <div class="n_group_content">
      <div class="n_dapengL">
        <drop-down :options="{list: videoList, cur: showName}" @chooseFun="chooseQyCck"></drop-down>
        <div class="n_newGroup">
          <el-form :model="formObject.model" :ref="formObject.model" class="formClass">
            <el-form-item v-for="item in formObject.arr" :key="item.index" :label="item.tit + ' :'">
              <el-select v-if="item.select && !item.list" v-model="formObject.model[item.prop]" :placeholder="item.tit">
                <el-option
                  v-for="item in [{value: '1',label: '单点'},{value: '2',label: '行程'}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-input v-if="!item.select &&!item.list" v-model="formObject.model[item.prop]" :placeholder="item.tit"></el-input>
              <el-row v-if="item.list" class="list-shebei">
                <el-col>3号点</el-col>
                <el-col>1#风机</el-col>
              </el-row>
            </el-form-item>
            <el-form-item class="btn-form-item">
              <el-button v-for="operate in formObject.oFun" :key="operate.index" type="primary" @click="$emit(operate.event)">{{operate.name}}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="n_dapeng_status">
        <div class="n_dapeng_statusbox">
          <el-row>
            <el-col class="n_status_icon n_status_normal">
              <i class="icon-gufengji"></i><p>1#风机</p>
            </el-col>
            <el-col class="n_status_icon n_status_run">
              <i class="icon-ylql"></i><p>1号点</p>
            </el-col>
            <el-col class="n_status_icon n_status_danger">
              <i class="icon-ylql"></i><p>2号点</p>
            </el-col>
            <el-col class="n_status_icon n_status_close">
              <i class="icon-ylql"></i><p>3号点</p>
            </el-col>
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
            prop: 'Logs_Date3',
            tit: '设备编组'
          },
          {
            prop: 'Logs_Date',
            tit: '编组类型',
            select: true
          },
          {
            prop: 'Logs_Date2',
            tit: '详情备注'
          },
          {
            prop: 'Control_Type',
            tit: '所属设备',
            list: true
          }
        ],
        oFun: [
          {
            name: '新增编组',
            event: 'editOpenDialogFun'
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
    }
  }
};
</script>
