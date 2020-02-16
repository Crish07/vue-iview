<!--
-- Created by crish on 2020/1/23
-->

<template>
  <div id="EchartsBar"
       :style="{ height: height }"></div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts');
// 引入柱状图组件
require('echarts/lib/chart/bar');
// 引入提示框，工具栏和title组件
require('echarts/lib/component/title');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/toolbox');

export default {
  name: 'echartsBar',
  props: {
    height: {
      type: String,
      default: '300px'
    }
  },
  data () {
    return {

    }
  },
  mounted () {
    this.drawLine();
  },
  methods: {
    drawLine () {
      let myChartContainer = document.getElementById('EchartsBar');

      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(myChartContainer);

      // 绘制图表
      let hours = ['2', '4', '6', '8', '10', '12', '15', '18', '20', '22', '25', '28', '30', '32', '35', '38', '40', '42', '45', '48', '50', '52', '55', '58', '60', '62', '65', '68', '70', '72', '75', '78', '80', '82', '85', '88', '90', '92', '95', '98', '100'];

      let days = ['20', '40', '60', '80', '100'];

      let data = [28, 38, 46, 54, 66, 74, 86, 94, 99, 95, 88, 85, 77, 75, 69, 64, 55, 49, 39, 29, 25, 16, 8, 4, 3, 5, 8, 10, 15, 19, 22, 27, 33, 37, 40, 39, 36, 29, 24, 18, 10];

      myChart.setOption(
        {
          title: {
            text: 'EchartsBar',
            left: 'center',
            textStyle: {
              color: '#ffffff'
            }
          },
          backgroundColor: '#000000',
          grid: {
            left: '5%',
            right: '2%',
          },
          xAxis: {
            type: 'category',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: function (value, index) {
                return value >= 0 ? '#fff' : '#000';
              }
            },
            data: hours
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              color: function (value, index) {
                return value >= 0 ? '#fff' : '#000';
              }
            },
            data: days
          },
          toolbox: {
            feature: {
              saveAsImage: {},
              restore: {},
              dataZoom: {}
            }
          },
          tooltip: {},
          series: [
            {
              type: 'bar',
              name: '测试',
              itemStyle: {
                normal: {
                  color: function (params) {
                    // build a color map as your need.
                    let colorList = [
                      '#7F2C1C', '#BF4625', '#E5542D', '#E56433', '#FF6F39',
                      '#FF8F53', '#FFB05A', '#FFBB42', '#FFC031', '#FFC92D',
                      '#FFCF2E', '#FFDE2F', '#FFE93B', '#DDFF60', '#B1FF4F',
                      '#7FFF55', '#5FBF40', '#3F7F2B', '#317F40', '#347F5A',
                      '#2D7F71', '#3B7F77', '#467F76', '#36797F', '#2F727F',
                      '#276B7F', '#143540', '#0D6C7F', '#27657F', '#19577F',
                      '#2F627F', '#31537F'
                    ];
                    return colorList[params.dataIndex]
                  },
                  barBorderRadius: 10
                }
              },
              data: data
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
