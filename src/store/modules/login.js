/*
* Created by crish on 2019/11/28
* */

import Cookies from 'js-cookie';

const namespace = 'login';
const r = ac => `${namespace}/${ac}`;
export const moduleName = namespace;

// mutations
export const logout = r('logout');

const module = function () {
  return {
    state: {

    },
    mutations: {
      [logout] () {
        Cookies.remove('user');
        Cookies.remove('password');
        Cookies.remove('access');
      }
    }
  }
};
export default module();
