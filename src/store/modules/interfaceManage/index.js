/*
 * @Descripttion: 编辑接口用例
 * @Author: Crish<714415473@qq.com>
 * @Date: 2020-06-24 21:07:22
 * @LastEditors: Crish<714415473@qq.com>
 * @LastEditTime: 2020-06-24 21:14:22
 */

import api from './api/index';

const namespace = 'interfaceManage';
const r = ac => `${namespace}/${ac}`;
export const moduleName = namespace;

// actions
export const run_interface = r('run_interface');
// mutations

export const module = function (api) {
  return {
    state: {

    },
    mutations: {

    },
    actions: {
      async [run_interface] ({ commit }, payload) {
        let res = await api.runInterface(payload);
        console.log(res);
        return res;
      }
    }
  };
};
export default module(api);
