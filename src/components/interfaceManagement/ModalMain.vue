<template lang="pug">
  Card
    ModalOne(:myModal="modal" @on-modalClick="modalClick" @on-change="modalChange")
    Form(:model="caseParams" :label-width="65" inline class="searchForm")
      FormItem(label="用例名称：")
        Input(v-model="caseParams.caseName")
      FormItem
        Button(type="primary" @click="handleSubmit()") 查询
        Button(type="success" @click="btnClick" style="margin-left: 5px;") 添加接口
    Table(border :columns="columns" :data="data")
    div(style="margin: 10px;overflow: hidden")
      div(style="float: right;")
        Page(:total="pageTotal" show-sizer :current="pageCurrent" @on-change="changePage" @on-page-size-change="changeSize" placement="top")
</template>

<script>
import ModalOne from './ModalOne.vue';

export default {
  name: 'ModalMain',
  computed: {
    data () {
      return this.$store.state.table.data;
    },
    columns () {
      let columns = this.$store.state.table.columns;
      columns.push({
        title: 'Action',
        key: 'action',
        width: 200,
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
                  this.showCase(params.row.Id);
                }
              }
            }, '查看用例'),
            h('Button', {
              props: {
                type: 'success',
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
  components: {
    ModalOne
  },
  data () {
    return {
      caseParams: { // 查询条件
        caseName: ''
      },
      modal: false,
      modal1: false,
      loading: false,
    }
  },
  created () {
    this.tableInit();
  },
  methods: {
    btnClick () {
      this.modal = true;
    },
    modalClick (val) {//接收子组件对modal变更后的数据
      this.modal = val;
    },
    modalChange (val) {//接收弹框1里面的btn点击后传回的值
      this.modal1 = val;
    },
    modal1Click (val) {//接收子组件对modal1变更后的数据
      this.modal1 = val;
    },
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
    /**
     * 查看用例
     */
    showCase (id) {
      this.$router.push({ // 跳转到查看接口用例
        name: 'viewCase',
        params: {
          id
        }
      });
    },
    /**
     * 查询
     */
    handleSubmit () {
      console.log(this.caseParams);
    }
  }
}
</script>

<style>
.searchForm .ivu-form-item-content {
  margin-left: 0 !important;
  float: left;
}
.searchForm .ivu-form-item-label {
  padding: 10px 0px 10px 0;
}
.searchForm .ivu-form-item {
  margin-bottom: 10px;
}
</style>
