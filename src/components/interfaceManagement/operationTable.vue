<!--
-- Created by crish on 2019/12/21
-->

<template lang="pug">
  Card
    Table(border :columns="columns" :data="data")
    div(style="margin: 10px;overflow: hidden")
      div(style="float: right;")
        Page(:total="pageTotal" show-sizer :current="pageCurrent" @on-change="changePage" @on-page-size-change="changeSize" placement="top")
</template>

<script>
export default {
  name: 'operationTable',
  computed: {
    data () {
      return this.$store.state.table.data;
    },
    columns () {
      let columns = this.$store.state.table.columns;
      columns.push({
        title: 'Action',
        key: 'action',
        width: 150,
        align: 'center',
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.show(params.index)
                }
              }
            }, '查看'),
            h('Button', {
              props: {
                type: 'error',
                size: 'small'
              },
              on: {
                click: () => {
                  this.remove(params.index)
                }
              }
            }, '删除')
          ]);
        }
      });
      return columns;
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
      });
    },
    mockTableData () {//表格数据
      this.$store.commit('table/SET_DATA');
      this.loading = false;
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
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data[index].Name}<br>Email：${this.data[index].Email}<br>Date：${this.data[index].Date}<br>City：${this.data[index].City}`
      })
    },
    remove (index) {
      this.data.splice(index, 1);
    },
  }
}
</script>

<style>
</style>
