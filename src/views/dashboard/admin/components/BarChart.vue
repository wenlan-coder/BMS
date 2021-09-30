<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000

export default {
  mixins: [resize],
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
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '爱情',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [2, 3, 5, 6, 6, 6, 6],
          animationDuration
        }, 
        {
          name: '仙侠',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [6, 2, 10, 4, 7, 10, 20],
          animationDuration
        },
        {
          name: '漫画',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [9, 2, 18, 34, 30, 30, 20],
          animationDuration
        },{
          name: '科普',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [10, 5, 20, 34, 39, 33, 20],
          animationDuration
        }, {
          name: '马克思',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [3, 5, 20, 33, 39, 33, 22],
          animationDuration
        }]
      })
    }
  }
}
</script>
