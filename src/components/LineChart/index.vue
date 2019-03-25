<template>
  <div :style="{height:height,width:width}" :class="className" ref="chartContent"></div> 
</template>
<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
import { debounce, dateFormat } from '@/utils'
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
      default: '420px'
    },
    chartData: {
      type: Object
    },
    chartOption: {
      type: Object
    }
  },
  data() {
    return {
      chart: null,
      mainColor: '#ff8019'
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
  watch: {
    chartData(val) {
      this.chart.dispose()
      this.chart = null
      this.initChart(val)
    }
  },
  methods: {
    setOptions(datastr, options) {
      var mainColor = this.mainColor
      if (JSON.stringify(datastr) === '{}') {
        this.$refs.chartContent.innerHTML = '<span class="nochart-data">无数据显示</span>'
        return
      }
      this.chart.setOption({
        title: {
          text: options.tit + '走势图',
          subtext: '数据来自公司',
          textStyle: {
            align: 'center',
            color: '#333',
            fontSize: 14
          },
          textAlign: 'center',
          left: 'center'
        },
        xAxis: {
          boundaryGap: false,
          data: datastr.xData,
          axisLabel: {
            interval: 0,
            rotate: -30
          },
          nameTextStyle: {
            fontSize: 10
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: [mainColor],
              width: 1,
              type: 'solid'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '单位(' + options.unit + ')'
        },
        series: [
          {
            type: 'line',
            name: options.tit + '(' + options.unit + ')',
            data: datastr.zData,
            label: {
              show: true,
              formatter: '{c}'+ options.unit
            }
          }
        ],
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: 50,
          bottom: 80,
          y2: 140
        }
        // dataZoom: [
        //   {
        //     type: 'slider',
        //     start: 86,
        //     end: 100,
        //     borderColor: mainColor
        //   },
        //   {
        //     type: 'inside'
        //   }
        // ],
      })
    },
    initChart() {
      var that = this
      that.chart = echarts.init(that.$el, 'macarons')
      setTimeout(function() {
        that.setOptions(that.chartData, that.chartOption)
      }, 50)
    }
  }
}
</script>

<style>
  .nochart-data{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: #666;
  }
</style>
