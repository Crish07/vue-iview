<!--
-- CCreated by crish on 2020/1/23
-->
<template>
  <div id="echartsSiChuanMap"
       :style="{ height: '530px' }"></div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts');
// 引入散点（气泡）图组件
require('echarts/map/js/province/sichuan');
//  require('echarts/lib/chart/scatter');
// 引入组件
require('echarts/lib/component/title');
require('echarts/lib/component/tooltip');
//  require('echarts/lib/component/visualMap');
//  require('echarts/lib/component/geo');
require('echarts/lib/component/legend');

export default {
  name: 'echartsSiChuanMap',
  data () {
    return {}
  },
  mounted () {
    this.drawLine();
  },
  methods: {
    drawLine () {
      let myChartContainer = document.getElementById('echartsSiChuanMap');

      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(myChartContainer);

      // 绘制图表
      let geoCoordMap = {
        "成都市": [104.06, 30.57],
        '阿坝藏族羌族自治州': [102.22, 31.89],
        '巴中市': [106.74, 31.86],
        '达州市': [107.46, 31.20],
        '德阳市': [104.39, 31.12],
        '甘孜藏族自治州': [101.96, 30.04],
        '广安市': [106.63, 30.45],
        '广元市': [105.84, 32.43],
        '乐山市': [103.76, 29.55],
        '凉山彝族自治州': [102.26, 27.88],
        '泸州市': [105.44, 28.87],
        '眉山市': [103.84, 30.07],
        '绵阳市': [104.67, 31.46],
        '内江市': [105.05, 29.58],
        '南充市': [106.11, 30.83],
        '攀枝花市': [101.71, 26.58],
        '遂宁市': [105.59, 30.53],
        '雅安市': [103.04, 30.01],
        '宜宾市': [104.64, 28.75],
        '资阳市': [104.62, 30.12],
        '自贡市': [104.77, 29.33]
      };

      let convertData = function (data) {
        let res = [];
        for(let i = 0; i < data.length; i++) {
          let geoCoord = geoCoordMap[data[i].name];
          if(geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };

      myChart.setOption(
        {
          backgroundColor: '#404a59',
          title: {
            text: '四川省区域注册人数统计',
            x: 'center',
            textStyle: {
              color: '#fff'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: function (a) {//鼠标移到某个州市上弹出的提示内容。包括显示样式可以自定义，利用return返回样式即可。
              return a.data['name'] + ":" + a.data['value'];//a.data['name']:州市名称，a.data['value']:data中的valuez值。
            }
          },
          legend: {},//中心城市指示点
          dataRange: {
            min: 0,
            max: 1000,
            color: ['orange', '#6EA1F4'],
            boder: 3,
            text: ['高', '低'],           // 文本，默认为数值文本
            calculable: true,
            textStyle: {
              color: '#fff'
            }
          },
          visualMap: {
            min: 0,
            max: 1000,
            text: ['高', '低'],
            calculable: true,
            inRange: {
              color: ['#EFFAFB', '#669FD6']//第一版
              //  color: ['#ADDF8E', '#6DB2C2', '#5E7BC8']//第二版（大众评论丑）
            },
            textStyle: {
              color: '#fff'
            }
          },
          geo: {
            map: '四川',
            //              roam: true,
            /*nameMap: {
              '阿坝藏族羌族自治州': '阿坝',
              '巴中市': '巴中',
              '成都市': '成都',
              '达州市': '达州',
              '德阳市': '德阳',
              '甘孜藏族自治州': '甘孜',
              '广安市': '广安',
              '广元市': '广元',
              '乐山市': '乐山',
              '凉山彝族自治州': '凉山',
              '泸州市': '泸州',
              '眉山市': '眉山',
              '绵阳市': '绵阳',
              '内江市': '内江',
              '南充市': '南充',
              '攀枝花市': '攀枝花',
              '遂宁市': '遂宁',
              '雅安市': '雅安',
              '宜宾市': '宜宾',
              '资阳市': '资阳',
              '自贡市': '自贡'
            },*/
            label: {
              show: false,
            },
            itemStyle: {
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              label: {
                show: false,
              },
              itemStyle: {
                areaColor: '',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 5,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          series: [
            {
              //name: '数据名称',
              type: 'map',
              mapType: '四川',//如果是其他省份，也可以改变，例如：上海，北京，天津等地。
              //                selectedMode: 'single',
              //                coordinateSystem: 'geo',
              geoIndex: 0,
              /*itemStyle: {
                normal: {
                  label: {
                    show: true
                  },
                  /!*borderWidth: 1,//省份的边框宽度
                  childBorderWidth: 1,
                  childBorderColor: '#6EA1F4'*!/
                },
                emphasis: {
                  label: {
                    show: true
                  }
                }
              },*/
              data: [
                { name: '阿坝藏族羌族自治州', value: 100 },
                { name: '巴中市', value: 200 },
                { name: '成都市', value: 999 },
                { name: '达州市', value: 800 },
                { name: '德阳市', value: 850 },
                { name: '甘孜藏族自治州', value: 100 },
                { name: '广安市', value: 300 },
                { name: '广元市', value: 550 },
                { name: '乐山市', value: 780 },
                { name: '凉山彝族自治州', value: 90 },
                { name: '泸州市', value: 850 },
                { name: '眉山市', value: 880 },
                { name: '绵阳市', value: 450 },
                { name: '内江市', value: 650 },
                { name: '南充市', value: 790 },
                { name: '攀枝花市', value: 570 },
                { name: '遂宁市', value: 340 },
                { name: '雅安市', value: 260 },
                { name: '宜宾市', value: 540 },
                { name: '资阳市', value: 180 },
                { name: '自贡市', value: 240 }
              ]
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
