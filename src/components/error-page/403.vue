<!--
-- Created by crish on 2020/1/30
-->

<template lang="pug">
  div(class="error403")
    div(class="error403-body-con")
      Card
        div(class="error403-body-con-title") 4
          span(class="error403-0-span")
            Icon(type="android-lock")
          span(class="error403-key-span")
            Icon(size="220" type="ios-bolt")
        p(class="error403-body-con-message") You don't have permission
        div(class="error403-btn-con")
          Button(@click="goHome" size="large" style="width: 200px;" type="text") 返回首页
          Button(@click="backPage" size="large" style="width: 200px;margin-left: 40px;" type="primary") 返回上一页
</template>

<script>
export default {
  name: 'Error403',
  methods: {
    backPage () {
      this.$router.go(-1);
    },
    goHome () {
      this.$router.push({
        name: 'home_index'
      });
    }
  }
};
</script>

<style lang="less">
@import "./403.less";
</style>
