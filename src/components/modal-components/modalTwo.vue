<template lang="pug">
  Modal(v-model="modal1" title="显示多级弹框1" @on-ok="ok" @on-cancel="cancel")
    p Content of dialog
    p Content of dialog
</template>

<script>
  export default {
    name: 'modalTwo',
    props: {
      myModal1: Boolean,
    },
    data() {
      return {
        modal1: this.myModal1,//①创建props属性myModal1的副本--modal1
      }
    },
    methods: {
      ok () {
        this.$Message.info('点击了确定');
      },
      cancel () {
        this.$Message.info('点击了取消');
      },
    },
    watch: {
      myModal1 (val) {//②监听外部对props属性myModal1的变更，并同步到组件内的data属性modal1中
        this.modal1 = val;
      },
      modal1 (val) {//③组件内对modal1变更后向外部发送事件通知
        this.$emit("on-modal1Click",val);
      }
    }
  }
</script>

<style>

</style>
