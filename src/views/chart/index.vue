<template>
  <div class="app-container">
    <div class="form-filter">
      <div class="chart-filter formClass">
        <drop-down class="float-l" :options="{list: videoList, cur: showAreaName}" @chooseFun="chooseQyCck"></drop-down>
        <el-button class="exportAll" @click="exportAll">导出</el-button>
        <el-date-picker class="float-r"
          v-model="dateRangerVal"
          @change="changeTime"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </div>
    </div>
    <div class="list-tabs-show chart-tabs-show">
      <el-tabs v-model="activeName" type="card" @tab-click="esnTabClk">
        <el-tab-pane :lazy="true" v-for="item in tabList" :label="item.name" :name="item.id" :key="item.index">
          <line-chart :chartOption="chartOption" :chartData="chartData[item.id]" v-loading="chartLoading"></line-chart>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import lineChart from '@/components/LineChart'
  import dropDown from '@/components/DropDown'

  export default {
    data() {
      return {
        activeName: '',
        dataList:[],
        exportName:'导出数据',
        userAreaId: '',
        showAreaName: '选择',
        currentIp: '',
        currentCIp:'',
        chooseTimeValue:'',
        tableData: [
          {'index':'0',"nickName": "沙滩搁浅我们的旧时光", "name": "小明"},
          {'index':'1',"nickName": "女人天生高贵", "name": "小红"},
          {'index':'2',"nickName": "海是彩色的灰尘", "name": "小兰"}
        ],
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime());
              picker.$emit('pick', [start, end]);
              // alert("start:"+start+";end:"+end+";dateRangerVal:"+this.dateRangerVal)
            }
          }, {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        dateRangerVal: '',
        tabList: [],
        chartOption: {
          tit: '',
          unit: ''
        },
        chartData: {},
        videoList: [],
        chartLoading: false
      }
    },
    components: {
      lineChart,
      dropDown
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
      queryInfoList() {
        var that = this
        that.chartLoading = true
        that.chartData[that.activeName] = {}
        var whereObj={ip: that.currentIp,cip: that.currentCIp}
        if(this.chooseTimeValue!=''){
          whereObj.createTime=this.chooseTimeValue
        }
        this.$http.post('/chart/getEsnCgqDataList', {
          ip: that.currentIp,
          cip: that.currentCIp,
          time:this.chooseTimeValue
        }, function(res) {
          var $data = res.data
          that.dataList=$data
          if ($data.length > 0) {
            var allData = {
              xData: [],
              zData: []
            }
            for (let i = $data.length-1; i >=0; i--) {
              allData.xData.push($data[i].createTime)
              allData.zData.push($data[i].value)
            }
            that.chartData[that.activeName] = allData
          } else {
            that.chartData[that.activeName] = {}
          }
          setTimeout(res => {
            that.chartLoading = false
          }, 1000)
        })
      },
      queryUserAreaList() {
        var that = this;
        this.$http.post('/chart/getUserAreaByUserId', {
          userId: that.UID,
        }, function (res) {
          const obj = res.data
          if (obj.length != 0) {
            that.videoList = obj
            that.chooseQyCck(obj[0])
          }
        })
      },
      queryUserEsnListByUserAreaId(userAreaId) {
        var that = this;
        this.$http.post('/chart/getUserEsnByUserAreaId', {
          type:'485类型传感器;CAN类型传感器;232类型传感器;开关量传感器;模拟量传感器',
          // type: 'NTT无线传感器',
          userAreaId: userAreaId,
        }, function (res) {
          const obj = res.data
          that.tabList = obj
          that.exportName=obj[0].name
          that.currentIp = obj[0].ip
          that.activeName = obj[0].id
          that.findActiveInfo()
        })
      },
      chooseQyCck(val) {
        this.showAreaName = val.name
        this.queryUserEsnListByUserAreaId(val.id)
      },
      esnTabClk() {
        this.findActiveInfo()
      },
      changeTime(val){
        this.chooseTimeValue=val
        this.queryInfoList()
      },
      findActiveInfo() {
        var activeIndex = this.tabList.find(item => {
          return item.id === this.activeName
        })
        this.exportName=activeIndex.name
        this.chartOption.tit = activeIndex.cgData
        this.chartOption.unit = activeIndex.unit
        this.currentIp = activeIndex.ip
        this.currentCIp = activeIndex.cip
        this.queryInfoList()
      },
      //导出的方法
      exportAll() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('../../vendor/Export2Excel');
          const tHeader = [ '时间', '数值('+this.chartOption.unit+')'];
          // 上面设置Excel的表格第一行的标题
          const filterVal = ['createTime', 'value'];
          // 上面的index、nickName、name是tableData里对象的属性
          const list = this.dataList;  //把data里的tableData存到list
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, this.exportName);
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
      // exportAll() {
      //   import('@/vendor/Export2Excel').then(excel => {
      //     const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
      //     var data = [1,1,1,1,1]
      //     excel.export_json_to_excel({
      //       header: tHeader, //表头 必填
      //       data, //具体数据 必填
      //       filename: 'excel-list', //非必填
      //       autoWidth: true, //非必填
      //       bookType: 'xlsx' //非必填
      //     })
      //   })
      // }
    }
  }
</script>
<style>
  .exportAll{
    background-color: #ff8019;
    color: white;
    border-radius: 0.165rem;
    height: 27px;
    margin-left: 12px;
  }
</style>
