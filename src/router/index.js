/*
* Created by crish on 2019/11/2
* */

import Vue from 'vue'
import iView from 'iview';
import util from '../libs/util';
import Router from 'vue-router'
import Cookies from 'js-cookie';
import { routers, appRouter } from './router';

Vue.use(Router);

// 路由配置
const RouterConfig = {
  mode: 'history',
  bace: 'dist',
  routes: routers
};

export const router = new Router(RouterConfig);

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  util.title(to.meta.title);
  if(!Cookies.get('user') && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
    next({
      name: 'login'
    });
  } else if(Cookies.get('user') && to.name === 'login') { // 判断是否已经登录且前往的是登录页
    util.title();
    next({
      name: 'home_index'
    });
  } else {
    /* 验证登录权限 */
    const curRouterObj = util.getRouterObjByName([...appRouter], to.name);
    if(curRouterObj && curRouterObj.access !== undefined) { // 需要判断权限的路由
      if(curRouterObj.access === parseInt(Cookies.get('access'))) {
        util.toDefaultPage([...appRouter], to.name, router, next); // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
      } else {
        next({
          replace: true,
          name: 'error-403'
        });
      }
    } else { // 没有配置权限的路由, 直接通过
      util.toDefaultPage([...routers], to.name, router, next);
    }
  }
});

router.afterEach((to) => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});
