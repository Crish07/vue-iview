/*
* Created by crish on 2019/12/14
* */

import util from '@/libs/util';

const urls = {
  initField: '/init',
};

export default {
  initField () {
    return util.ajax.get(urls.initField);
  },
}
