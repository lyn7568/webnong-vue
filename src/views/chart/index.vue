<template>
  <div class="app-container">
    <div class="form-filter">
      <div class="chart-filter formClass">
        <el-dropdown trigger="click" class="float-l">
          <el-button type="primary">
            展示区<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in videoList" :key="item.index">{{item.type}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-date-picker class="float-r"
          v-model="dateRangerVal"
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
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane v-for="item in tabList" :label="item.tit" :name="item.tab" :key="item.index">
          <line-chart v-if="chartData" :chartData="chartData"></line-chart>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import lineChart from '@/components/LineChart'
  import { dateFormat } from '@/utils'
  export default {
    data() {
      return {
        activeName: '1',
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime());
              picker.$emit('pick', [start, end]);
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
        tabList: [
          {
            tab: '1',
            tit: '室外温度'
          },
          {
            tab: '2',
            tit: '室外湿度'
          },
          {
            tab: '3',
            tit: '室外照度'
          },
          {
            tab: '4',
            tit: '室外风速'
          },
          {
            tab: '5',
            tit: '室外风向'
          },
          {
            tab: '6',
            tit: '室外雨量'
          },
          {
            tab: '7',
            tit: '室外气压'
          }
        ],
        chartData: {},
        videoList: []
      }
    },
    components: {
      lineChart
    },
    computed: {
    },
    created() {
      this.queryInfoList()
      this.queryList()
    },
    methods: {
      queryInfoList() {
        var that = this
        // this.$http.get('/static/json/chart.txt?t='+new Date().getTime(), {
        // }, function(res) {
        //   var $data = res.rows
        //   var allData = {
        //     tit: '温度',
        //     unit: '℃',
        //     xData: [],
        //     zData: []
        //   }
        //   var reg = /^[\u4e00-\u9fa5]{2}/g
        //   for (let i = 0; i < $data.length; ++i) {
        //     if (i === 0) {
        //       allData.tit = reg.exec($data[i].ID_Item)[0]
        //       allData.unit = $data[i].ID_Item.replace(reg, '')
        //     }
        //     // if ($data[i].ID_Time) {
        //     //   $data[i].ID_Time = dateFormat($data[i].ID_Time, 'yyyy-MM-dd hh:mm')
        //     // }
        //     allData.xData.push($data[i].ID_Time)
        //     allData.zData.push($data[i].ID_Value)
        //   }
        //   that.chartData = allData
        // })
      },
      queryList() {
        var that = this;
        // this.$http.get(
        //   "/static/json/video.txt?t=" + new Date().getTime(),
        //   {},
        //   function(res) {
        //     var $data = res.rows;
        //     that.videoList = $data;
        //   }
        // );
      }
    }
  }
</script>
