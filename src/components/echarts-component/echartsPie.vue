<!--
-- Created by crish on 2020/1/23
-->

<template>
  <div id="EchartsPie"
       :style="{ height: '300px' }"></div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts');
// 引入饼图组件
require('echarts/lib/chart/pie');
// 引入提示框，工具栏和title组件
require('echarts/lib/component/title');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/visualMap');

export default {
  name: 'echartsPie',
  data () {
    return {}
  },
  mounted () {
    this.drawLine();
  },
  methods: {
    drawLine () {
      let myChartContainer = document.getElementById('EchartsPie');

      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(myChartContainer);

      // 绘制图表

      myChart.setOption(
        {
          backgroundColor: '#2c343c',

          title: {
            text: 'Customized Pie',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#ccc'
            }
          },

          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },

          visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
              colorLightness: [0, 1]
            }
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 274, name: '联盟广告' },
                { value: 235, name: '视频广告' },
                { value: 400, name: '搜索引擎' }
              ].sort(function (a, b) { return a.value - b.value; }),
              roseType: 'radius',
              label: {
                normal: {
                  textStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                  }
                }
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20
                }
              },
              itemStyle: {
                normal: {
                  color: '#c23531',
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },

              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200;
              }
            }
          ]
        }
      );
    }
  }
}
</script>

<style>
</style>
