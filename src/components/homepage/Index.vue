<!--
-- Created by crish in 2020/01/28
-->

<template lang="pug">
  div
    Card
      p 这是首页
    Card(style="background: #000; margin-top: 10px;")
      echartsBar(:height="height")
</template>

<script>
import echartsBar from '../echarts-component/echartsBar';

export default {
  name: 'Index',
  components: {
    echartsBar
  },
  data () {
    return {
      height: '400px'
    }
  }
}
</script>

<style>
</style>
