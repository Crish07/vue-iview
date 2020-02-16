<template lang="pug">
  Modal(v-model="modal" title="普通的Modal对话框标题" width="600" @on-ok="ok" @on-cancel="cancel")
    Button(type="primary" @click="btnClick") 显示多级弹框1
    p Content of dialog Content of dialog Content of dialog
    p Content of dialog Content of dialog Content of dialog
    p Content of dialog Content of dialog Content of dialog
    p Content of dialog Content of dialog Content of dialog
</template>

<script>
  export default {
    name: 'ModalOne',
    props: {
      myModal: {
        type: Boolean,
      }
    },
    data() {
      return {
        modal: this.myModal,//①创建props属性myModal的副本--modal
      }
    },
    methods: {
      ok () {
        this.$Message.info('点击了确定');
      },
      cancel () {
        this.$Message.info('点击了取消');
      },
      btnClick () {
        this.$emit("on-change",true);
      },
    },
    watch: {
      myModal (val) {//②监听外部对props属性myModal的变更，并同步到组件内的data属性modal中
        this.modal = val;
      },
      modal (val) {//③组件内对modal变更后向外部发送事件通知
        this.$emit("on-modalClick",val);
      }
    },
  }
</script>

<style>

</style>
