<!--
-- Created by crish on 2019/12/13
-->

<template lang="pug">
  Card
    Form(:model="form" inline)
      FormItem(label="请输入姓名：" :label-width="90")
        Input(v-model="form.value")
      FormItem
        Button(type="primary" icon="ios-table" @click="searchClick") 查询
    Table(:data="tableData" :columns="tableColumns" stripe border :loading="loading")
    div(style="margin: 10px;overflow: hidden")
      div(style="float: right;")
        Page(:total="pageTotal" show-sizer :current="pageCurrent" @on-change="changePage" @on-page-size-change="changeSize" placement="top")
</template>

<script>

export default {
  name: 'TableMain',
  computed: {
    tableData () {
      return this.$store.state.table.data;
    },
    tableColumns () {
      return this.$store.state.table.columns;
    },
    pageTotal () {
      return this.$store.state.table.total;
    },
    pageCurrent () {
      return this.$store.state.table.current;
    },
    pageSize () {
      return this.$store.state.table.size;
    },
  },
  data () {
    return {
      form: {
        value: '',
      },
      loading: false,
    }
  },
  created () {
    this.tableInit();
  },
  methods: {
    tableInit () {
      this.loading = true;
      this.$store.dispatch('table/INIT_DATA').then(() => {
        this.mockTableData();
        this.$store.commit('table/SET_COLUMNS');
      })
    },
    changePage (page) {
      if(page != this.pageCurrent) {
        this.$store.commit('table/SET_CURRENT', page);
        this.mockTableData();
      }
    },
    changeSize (size) {
      if(size != this.pageSize) {
        this.$store.commit('table/SET_SIZE', size);
        this.mockTableData();
      }
    },
    mockTableData () {//表格数据
      this.$store.commit('table/SET_DATA');
      this.loading = false;
    },
    searchClick () {//点击查询
      console.log(this.form.value);

      this.form.value = '';
    },
  }
}
</script>

<style>
</style>
