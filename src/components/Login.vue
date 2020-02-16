<!--
-- Created by crish on 2019/11/28
-->

<template lang="pug">
  div(class="login" @keydown.enter="handleSubmit")
    div(class="login-con")
      Card(:bordered="false")
        p(slot="title")
          Icon(type="log-in")
          span(:style="{ marginLeft:'5px' }") 欢迎登录
        div(class="form-con")
          Form(ref="loginForm" :model="form" :rules="rules")
            FormItem(prop="userName")
              Input(v-model="form.userName" placeholder="请输入用户名")
                Icon(:size="16" type="person" slot="prepend")
            FormItem(prop="passWord")
              Input(type="password" v-model="form.passWord" placeholder="请输入密码")
                span(slot="prepend")
                  Icon(:size="14" type="locked" slot="prepend")
            FormItem
              Button(@click="handleSubmit" type="primary" long) 登录
          p(class="login-tip") 输入任意用户名和密码即可
</template>

<script>
import Cookies from 'js-cookie';

export default {
  name: 'Login',
  data () {
    return {
      form: {
        userName: 'admin',
        passWord: ''
      },
      rules: {
        userName: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if(valid) {
          Cookies.set('user', this.form.userName);
          Cookies.set('password', this.form.passWord);
          if(this.form.userName === 'admin') {
            Cookies.set('access', 0);
          } else {
            Cookies.set('access', 1);
          }
          this.$router.push({
            name: 'home_index'
          });
        }
      });
    }
  },
}
</script>

<style lang="less">
@import "login.less";
</style>
