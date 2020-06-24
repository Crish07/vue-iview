<template lang="pug">
  Modal(v-model="modal" title="添加接口" width="600" @on-ok="ok" @on-cancel="cancel")
    Form(:model="formItem" :label-width="80")
      FormItem(label="请求域名：")
        Input(v-model="formItem.input" placeholder="request_host : http://stage-api-gateway.vipkid-qa.com.cn")
      FormItem(label="请求url：")
        Input(v-model="formItem.input" placeholder="request_url : /api/test")
      FormItem(label="接口名称：")
        Input(v-model="formItem.input" placeholder="interface_name:")
      FormItem(label="请求方法：")
        Select(v-model="formItem.select")
          Option(value="GET") GET
          Option(value="POST") POST
          Option(value="PUT") PUT
          Option(value="OPTIONS") OPTIONS
          Option(value="DELETE") DELETE
</template>

<script>
export default {
  name: 'ModalOne',
  props: {
    myModal: {
      type: Boolean,
    }
  },
  data () {
    return {
      modal: this.myModal,
      formItem: {
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
      }//①创建props属性myModal的副本--modal
    }
  },
  methods: {
    ok () {
      this.$Message.info('点击了确定');
      this.$router.push({ // 跳转到编辑接口用例
        name: 'interfaceCaseEdit'
      });
    },
    cancel () {
      this.$Message.info('点击了取消');
    },
  },
  watch: {
    myModal (val) {//②监听外部对props属性myModal的变更，并同步到组件内的data属性modal中
      this.modal = val;
    },
    modal (val) {//③组件内对modal变更后向外部发送事件通知
      this.$emit("on-modalClick", val);
    }
  },
}
</script>

<style>
</style>
