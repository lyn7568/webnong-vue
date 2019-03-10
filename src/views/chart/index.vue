<template>
  <div class="app-container">
    <div class="form-filter">
      
    </div>
    <div class="list-tabs-show chart-tabs-show">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane v-for="item in tabList" :label="item.tit" :name="item.tab" :key="item.index">
          <line-chart :chartData="chartData"></line-chart>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import { dateFormat } from '@/utils'
  import lineChart from '@/components/LineChart'

  export default {
    data() {
      return {
        activeName: '1',
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
        chartData: {}
      }
    },
    components: {
      lineChart
    },
    computed: {
    },
    created() {
      this.queryInfoList()
    },
    methods: {
      queryInfoList() {
        var that = this
        this.$http.get('/static/json/chart.txt?t='+new Date().getTime(), {
        }, function(res) {
          var $data = res.rows
          var allData = {
            tit: '温度',
            unit: '℃',
            xData: [],
            zData: []
          }
          $data.map(log => {
            allData.tit = log.ID_Item.substr(0, 2)
            allData.unit = log.ID_Item.substr(2)
            allData.xData.push(dateFormat(log.ID_Time))
            allData.zData.push(log.ID_Value)
          })
          that.chartData = allData
        })
      }
    }
  }
</script>
