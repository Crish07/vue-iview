<!--
-- Created by crish on 2020/1/23
-->

<template lang="pug">
  div(class="EchartsMain")
    Row(:gutter="10")
      Col(span="12")
        Card(style="background: #000")
          echarts-Bar
      Col(span="12")
        Card(style="background: #2c343c")
          echarts-Pie
    Row
      Col(span="24")
        Card(style="background: #404a59")
          echartsScatter
      Col(span="24")
        Card(style="background: #404a59")
          echartsSiChuanMap
</template>

<script>
import echartsBar from './echartsBar';
import echartsPie from './echartsPie';
import echartsScatter from './echartsScatter';
import echartsSiChuanMap from './echartsSiChuanMap';

export default {
  name: 'echartsMain',
  components: {
    echartsBar,
    echartsPie,
    echartsScatter,
    echartsSiChuanMap,
  },
  data () {
    return {}
  }
}
</script>

<style lang="less">
.EchartsMain {
  .ivu-card {
    margin: 5px 0;
  }
}
</style>
