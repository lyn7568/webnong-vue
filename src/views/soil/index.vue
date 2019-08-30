<template>
  <div class="app-container">
    <div class="form-filter">
      <div class="chart-filter formClass">
        <drop-down class="float-l" :options="{list: videoList, cur: showAreaName}" @chooseFun="chooseQyCck"></drop-down>
        <el-button type="primary" class="exportAll float-r" @click="exportAll">导出</el-button>
        <el-button type="primary" class="exportAll float-r" @click="search">查询</el-button>
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
    <div class="title-top">
      <el-row>
        <el-col :span="11" align="right">
          东经：113°56′30.1632″  北纬：35°6′27.6197″
        </el-col>
        <el-col :span="1" align="center"> |</el-col>
        <el-col :span="12">
          电量监测：12.49(高) 信号强度：22(强)
        </el-col>
      </el-row>
    </div>
    <div class="list-tabs-show chart-tabs-show">
      <div class="soil-show">
        <img class="soil-img" src="/static/img/16thpic.jpg">
        <div class="soil-data">
          <div v-loading="chartLoading">
            <line-chart :height="'395px'" :chartOption="chartOption" :chartData="chartData"></line-chart>
          </div>
        </div>
      </div>
    </div>
    <div class="list-tabs-show" style="margin: 0.5rem 0 2rem">
      <complex-table v-loading="tableLoading" :tableH="8"
              :tableObject="tableObjectFirst"></complex-table>
    </div>
  </div>
</template>

<script>
  import lineChart from '@/components/LineChart/index_m'
  import dropDown from '@/components/DropDown'
  import complexTable from '@/components/ComplexTable'
  export default {
    data() {
      return {
        dataList:[],
        exportName:'导出数据',
        userAreaId: '',
        showAreaName: '选择',
        currentIp: '',
        currentCIp:'',
        chooseTimeValue:'',
        tableData: [],
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
        chartLoading: false,
        tableLoading: false,
        tableObjectFirst: {
          el: 'tableSoil',
          data: [
            {
              deep: '10cm',
              water: '未安装',
              waterDeep: '未安装',
              temperature: '未安装',
              conductivity: '未安装',
              tds: '未安装',
              vsic: '未数据'
            },
            {
              deep: '20cm',
              water: '35.1%',
              waterDeep: '未安装',
              temperature: '28.8℃',
              conductivity: '164.5mg/L',
              tds: '未安装',
              vsic: '5948.6'
            },
            {
              deep: '20cm',
              water: '35.1%',
              waterDeep: '未安装',
              temperature: '28.8℃',
              conductivity: '164.5mg/L',
              tds: '未安装',
              vsic: '5948.6'
            }
          ],
          arr: [
            {
              prop: 'deep',
              tit: '土层深度'
            },
            {
              prop: 'water',
              tit: '水分'
            },
            {
              prop: 'waterDeep',
              tit: '水深'
            },
            {
              prop: 'temperature',
              tit: '温度'
            },
            {
              prop: 'conductivity',
              tit: '电导率Ec2:1'
            },
            {
              prop: 'tds',
              tit: 'TDS'
            },
            {
              prop: 'vsic',
              tit: 'VSIC'
            }
          ]
        }
      }
    },
    components: {
      lineChart,
      dropDown,
      complexTable
    },
    computed: {
      UID() {
        return this.$store.getters.userid
      }
    },
    created() {
      this.querySoilInfoList()
    },
    methods: {
      queryInfoList() {
        var that = this
        that.chartLoading = true
        that.chartData = {}
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
            that.chartData = allData
          } else {
            that.chartData = {}
          }
          setTimeout(res => {
            that.chartLoading = false
          }, 1000)
        })
      },
      querySoilInfoList() {
        var that = this;
        this.$http.post('/soil/getTableInfo', {
          stcd: "864161020819996",
          stime:"2019-08-30",
          etime:"2019-08-31",
          pageNumber:1,
          pageSize:100
        }, function (res) {
          const obj = res.data
          if (obj.length != 0) {
            that.videoList = obj
            that.chooseQyCck(obj[0])
          }
        })
      },
      chooseQyCck(val) {
        this.showAreaName = val.name
      },
      changeTime(val){
        this.chooseTimeValue=val
        this.queryInfoList()
      },
      search() {

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
    }
  }
</script>
<style lang="scss">
.title-top{
  background: rgba(255,255,255,.8);
  margin-bottom: 0.5rem;
  padding: 0.25rem 0.5rem;
}
.soil-show{
  display: flex;
  align-items: flex-start;
  .soil-img{
    width: 320px;
    margin-right: 0.5rem;
    opacity: 0.86;
  }
  .soil-data{
    position:relative;
    flex: 1;
    background: rgba(255,255,255,.8);
  }
}
  .exportAll{
    margin-left: 12px;
  }
</style>
