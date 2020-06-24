<!--
 * @Descripttion: 查看用例
 * @Author: Crish<714415473@qq.com>
 * @Date: 2020-06-24 23:01:48
 * @LastEditors: Crish<714415473@qq.com>
 * @LastEditTime: 2020-06-24 23:07:50
--> 

<template lang="pug">
  Card
    Table(border :columns="columns" :data="data")
</template>

<script>
export default {
  name: 'viewCase',
  data () {
    return {
      columns: [ // 表头

      ],
      data: [ // 表格内容

      ]
    }
  },
  created () {
    console.log(this.$route.params); // 获取接口管理页传过来的参数
  },
  methods: {

  },
}
</script>

<style>
</style>
