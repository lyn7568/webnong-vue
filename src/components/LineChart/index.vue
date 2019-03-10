<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>
<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
import { debounce } from '@/utils'
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    chartData: {
      type: Object
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  // watch: {
  //   chartData: {
  //     deep: true,
  //     handler(val) {
  //       this.setOptions(val)
  //     }
  //   }
  // },
  methods: {
    setOptions(datastr) {
      this.chart.setOption({
        title: {
          text: datastr.tit + '走势图',
          subtext: '数据来自公司',
          textStyle: {
            color: '#333',
            fontSize: 14
          },
          textAlign: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        dataZoom: [
          {
            type: 'slider',
            start: 60,
            end: 100
          },
          {
            type: 'inside'
          }
        ],
        xAxis: {
          boundaryGap: false,
          data: datastr.xData,
          axisLabel: {
            interval: 1,
            rotate: -30
          },
          nameTextStyle: {
            fontSize: 10
          }
        },
        yAxis: {
          type: 'value',
          name: '单位(' + datastr.unit + ')'
        },
        // legend: {
        //   data: ['PC端', '移动端', '合计']
        // },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: {
              type: ['line', 'bar']
            },
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            type: 'line',
            name:  + '(' + datastr.unit + ')',
            data: datastr.zData,
            itemStyle: {
              normal: {
                label: {
                  show: true
                }
              }
            },
            axisLabel: {
              formatter: datastr.tit + ':{value}' + datastr.unit
            }
          }
        ]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      var that = this
      setTimeout(function() {
        that.setOptions(that.chartData)
      }, 1)
    }
  }
}
</script>
<style>
  .chart-box{
    background: rgba(255,255,255,.8);
  }
</style>

