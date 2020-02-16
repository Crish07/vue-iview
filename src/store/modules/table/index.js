/*
* Created by crish on 2019/12/14
* */

import api from './api/index';

const namespace = 'table';
const r = ac => `${namespace}/${ac}`;
export const moduleName = namespace;

// actions
export const INIT_DATA = r('INIT_DATA');
// mutations
export const SET_DATALIST = r('SET_DATALIST');
export const SET_DATA = r('SET_DATA');
export const SET_COLUMNS = r('SET_COLUMNS');
export const SET_TOTAL = r('SET_TOTAL');
export const SET_CURRENT = r('SET_CURRENT');
export const SET_SIZE = r('SET_SIZE');

export const module = function (api) {
  return {
    state: {
      dataList: [],
      data: [],
      columns: [],
      total: null,
      current: 1,
      size: 10,
    },
    mutations: {
      [SET_DATALIST] (state, dataList) {
        state.dataList = dataList;
      },
      [SET_DATA] (state) {
        let dataList = [];
        let page = parseInt(state.total / state.size);
        if(state.current <= page) {
          for(let i = (state.current - 1) * state.size; i < (state.current * state.size); i++) {
            dataList.push(state.dataList[i])
          }
          state.data = dataList;
        } else {
          for(let i = (state.current - 1) * state.size; i < state.total; i++) {
            dataList.push(state.dataList[i])
          }
          state.data = dataList;
        }
      },
      [SET_COLUMNS] (state) {
        let columns = [];
        if(state.data) {
          for(let key in state.data[0]) {
            columns.push({
              title: key,
              key: key
            });
          }
          state.columns = columns;
        }
      },
      [SET_TOTAL] (state, total) {
        state.total = total;
      },
      [SET_CURRENT] (state, current) {
        state.current = current;
      },
      [SET_SIZE] (state, size) {
        state.size = size;
      },
    },
    actions: {
      async [INIT_DATA] ({ commit }) {
        let res = await api.initField();
        // res.success && commit(SET_DATA, res.data);
        commit(SET_TOTAL, res.data.length);
        commit(SET_DATALIST, res.data);
      }
    }
  };
};
export default module(api);
