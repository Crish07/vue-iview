/*
 * @Descripttion: 编辑接口用例
 * @Author: Crish<714415473@qq.com>
 * @Date: 2020-06-24 21:07:17
 * @LastEditors: Crish<714415473@qq.com>
 * @LastEditTime: 2020-06-24 21:15:38
 */

import util from '@/libs/util';

const urls = {
  runInterface: '/runInterface', // 运行接口用例
};

export default {
  runInterface (payload) {
    return util.ajax.post(urls.runInterface, payload);
  },
}