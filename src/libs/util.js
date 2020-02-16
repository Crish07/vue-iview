/*
* Created by crish on 2019/11/13
* */

import axios from 'axios';
import { Message } from 'iview'
import '@/mockjs/mockTest';//模拟数据

let util = {};
const ajaxUrl = 'http://www.table.com';//请求地址

/*
* 使用自定义配置新建一个 axios 实例
* */
const instance = util.ajax = axios.create({
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  baseURL: ajaxUrl,
  timeout: 100000
});

/*
* axios 添加响应拦截器
*   @params response: 返回值
* */
instance.interceptors.response.use(function (response) {
  let msg;
  if(response) {
    if(response.data) {
      if(!response.data.success) {
        msg = response.data.message;
      }
    } else {
      msg = '系统错误，返回数据为空！';
    }
  } else {
    msg = '系统错误，返回对象为空！';
  }
  if(msg) {
    Message.error(msg);
  }
  return response.data;
}, function (error) {
  Message.error('系统错误，请联系管理员！');
  return Promise.reject(error);
});

/*
* 设置页头标题
*   @params
*     title: html meta title名
* */
util.title = function (title) {
  title = title || 'vue iView';
  window.document.title = title;
};

util.oneOf = function (ele, targetArr) {
  if(targetArr.indexOf(ele) >= 0) {
    return true;
  } else {
    return false;
  }
};

/*
* 验证权限 动态添加菜单
* @params
*   itAccess: 当前权限
*   currentAccess: 登录时保存的权限
* */
util.showThisRoute = function (itAccess, currentAccess) {
  if(typeof itAccess === 'object' && Array.isArray(itAccess)) {
    return util.oneOf(currentAccess, itAccess);
  } else {
    return itAccess === currentAccess;
  }
};

/*
* 设置面包屑
* @params
*   vm: vue(this)
*   name: 当前路由名
* */
util.setCurrentPath = function (vm, name) {
  let currentPathArr = [];
  let currentPathObj = vm.$store.state.app.routers.filter(item => {
    if(item.children.length <= 1) {
      return item.children[0].name === name;
    } else {
      let i = 0;
      let childArr = item.children;
      let len = childArr.length;
      while(i < len) {
        if(childArr[i].name === name) {
          return true;
        }
        i++;
      }
      return false;
    }
  })[0];

  if(currentPathObj.children.length <= 1 && currentPathObj.name === 'main') {
    currentPathArr = [
      {
        title: '首页',
        path: '',
        name: 'home_index'
      }
    ];
  } else if(currentPathObj.children.length <= 1 && currentPathObj.name !== 'main') {
    currentPathArr = [
      {
        title: '首页',
        path: '/index',
        name: 'home_index'
      },
      {
        title: currentPathObj.title,
        path: '',
        name: name
      }
    ];
  } else {
    let childObj = currentPathObj.children.filter((child) => {
      return child.name === name;
    })[0];

    currentPathArr = [
      {
        title: '首页',
        path: '/index',
        name: 'home_index'
      },
      {
        title: currentPathObj.title,
        path: '',
        name: currentPathObj.name
      },
      {
        title: childObj.title,
        path: '',
        name: name
      }
    ];
  }
  vm.$store.commit('app/setCurrentPath', currentPathArr);

  return currentPathArr;
};

/*
* 没有配置权限的路由跳转
* @params
*   routers: 所有页面
*   name: 即将要进入的路由对象
*   route: 路由配置信息
*   next: 是继续跳转或中断的方法
* */
util.toDefaultPage = function (routers, name, route, next) {
  let len = routers.length;
  let i = 0;
  let notHandle = true;
  while(i < len) {
    if(routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
      route.replace({
        name: routers[i].children[0].name
      });
      notHandle = false;
      next();
      break;
    }
    i++;
  }
  if(notHandle) {
    next();
  }
};

/*
* 验证登录权限
* @params
*   routers: 菜单栏显示的子页面
*   name: 即将要进入的路由对象
* */
util.getRouterObjByName = function (routers, name) {
  if(!name || !routers || !routers.length) {
    return null;
  }
  // debugger;
  let routerObj = null;
  for(let item of routers) {
    if(item.name === name) {
      return item;
    }
    routerObj = util.getRouterObjByName(item.children, name);
    if(routerObj) {
      return routerObj;
    }
  }
  return null;
};

export default util;
