<template lang="pug">
  Card
    p(style="margin-bottom:10px") 多级弹框：
    Button(type="primary" @click="btnClick") 显示弹框
    ModalOne(:myModal="modal" @on-modalClick="modalClick" @on-change="modalChange")
    ModalTwo(:myModal1="modal1" @on-modal1Click="modal1Click")
</template>

<script>
  import ModalOne from './ModalOne.vue';
  import ModalTwo from './modalTwo.vue';

  export default {
    name: 'ModalMain',
    components: {
      ModalOne,
      ModalTwo,
    },
    data() {
      return {
        modal: false,
        modal1: false,
      }
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
    }
  }
</script>

<style>

</style>
