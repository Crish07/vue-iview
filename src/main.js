/*
* Created by crish on 2019/11/2
* */

import Vue from 'vue'
import App from './App.vue'
import { router } from './router/index'
import store from './store/index'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

import VueQuillEditor from 'vue-quill-editor' //富文本
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(VueQuillEditor);

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App),
  mounted () {
    // 权限菜单过滤相关
    this.$store.commit('app/updateMenulist');
  },
});
