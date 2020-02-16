/*
* Created by crish on 2019/11/27
* */

import { appRouter, otherRouter } from '@/router/router';
import Util from '@/libs/util';
import Cookies from 'js-cookie';

const namespace = 'app';
const r = ac => `${namespace}/${ac}`;
export const moduleName = namespace;

// mutations
export const updateMenulist = r('updateMenulist');
export const setCurrentPath = r('setCurrentPath');
export const addOpenSubmenu = r('addOpenSubmenu');
// export const setCurrentPageName = r('setCurrentPageName');

const module = function () {
  return {
    state: {
      menuList: [],//菜单数组
      routers: [//配置的路由
        ...appRouter,
        ...otherRouter,
      ],
      currentPath: [ // 面包屑数组
        {
          title: '首页',
          path: '',
          name: 'home_index'
        }
      ],
      openedSubmenuArr: [], // 要展开的菜单数组
    },
    mutations: {
      [updateMenulist] (state) {
        let accessCode = parseInt(Cookies.get('access'));
        let menuList = [];
        appRouter.forEach((item, index) => {
          if(item.access !== undefined) {
            if(Util.showThisRoute(item.access, accessCode)) {
              if(item.children.length === 1) {
                menuList.push(item);
              } else {
                let len = menuList.push(item);
                let childrenArr = [];
                childrenArr = item.children.filter(child => {
                  if(child.access !== undefined) {
                    if(child.access === accessCode) {
                      return child;
                    }
                  } else {
                    return child;
                  }
                });
                menuList[len - 1].children = childrenArr;
              }
            }
          } else {
            if(item.children.length === 1) {
              menuList.push(item);
            } else {
              let len = menuList.push(item);
              let childrenArr = [];
              childrenArr = item.children.filter(child => {
                if(child.access !== undefined) {
                  if(Util.showThisRoute(child.access, accessCode)) {
                    return child;
                  }
                } else {
                  return child;
                }
              });
              let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
              handledItem.children = childrenArr;
              menuList.splice(len - 1, 1, handledItem);
            }
          }
        });
        state.menuList = menuList;
      },
      [setCurrentPath] (state, currentPath) {
        state.currentPath = currentPath;
      },
      [addOpenSubmenu] (state, name) {
        let hasThisName = false;
        let isEmpty = false;
        if(name.length === 0) {
          isEmpty = true;
        }
        if(state.openedSubmenuArr.indexOf(name) > -1) {
          hasThisName = true;
        }
        if(!hasThisName && !isEmpty) {
          state.openedSubmenuArr.push(name);
        }
      },
    },
  };
};
export default module();
