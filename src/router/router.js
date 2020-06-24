/*
* Created by crish on 2019/11/27
* */

import Main from '@/components/Main'

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: resolve => { require(['@/components/Login.vue'], resolve); }
};

export const error403 = {
  path: '/403',
  name: 'error-403',
  meta: {
    title: '403-权限不足'
  },
  component: resolve => { require(['@/components/error-page/403.vue'], resolve); }
};

export const error404 = {
  path: '/*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在'
  },
  component: resolve => { require(['@/components/error-page/404.vue'], resolve); }
};

export const error500 = {
  path: '/500',
  meta: {
    title: '500-服务端错误'
  },
  name: 'error-500',
  component: resolve => { require(['@/components/error-page/500.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = [
  {
    path: '/',
    name: 'otherRouter',
    title: '个人中心',
    component: Main,
    children: [
      {
        path: '/ownSpace', title: '个人中心', name: 'ownSpace', component: resolve => {
          require(['@/components/own-component/personalCenter'], resolve);
        }
      }
    ]
  },
  {
    path: '/interface',
    name: 'interfaceCase',
    title: '编辑接口用例',
    component: Main,
    children: [
      {
        path: '/interfaceCaseEdit', title: '编辑接口用例', name: 'interfaceCaseEdit', component: resolve => {
          require(['@/components/interfaceManagement/case_edit'], resolve);
        }
      }
    ]
  },
  {
    path: '/viewInterface',
    name: 'viewInterface',
    title: '查看接口用例',
    component: Main,
    children: [
      {
        path: '/viewCase', title: '查看接口用例', name: 'viewCase', component: resolve => {
          require(['@/components/interfaceManagement/view_case.vue'], resolve);
        }
      }
    ]
  },
];

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/',
    redirect: '/login',
    name: 'main',
    icon: 'home',
    title: '首页',
    component: Main,
    children: [
      {
        path: '/index', title: '首页', name: 'home_index', component: resolve => {
          require(['@/components/homepage/Index'], resolve);
        }
      },
    ]
  },
  {
    path: '/interface',
    name: 'interfaceManagement',
    icon: 'grid',
    title: '接口管理',
    component: Main,
    children: [
      {
        path: '/modal_index', title: '接口用例管理', name: 'modal_index', icon: 'ios-list', component: resolve => {
          require(['@/components/interfaceManagement/ModalMain'], resolve);
        }
      },
      {
        path: '/interface/management', title: '添加接口用例', name: 'interface_management', icon: 'ionic', component: resolve => {
          require(['@/components/interfaceManagement/tableMain'], resolve);
        }
      },
      {
        path: '/interface/batchOperation', title: '批量运行任务', name: 'batch_operation', icon: 'ios-compose', component: resolve => {
          require(['@/components/table-components/operationTable'], resolve);
        }
      },
    ]
  },
  {
    path: '/table',
    name: 'tableMain',
    icon: 'grid',
    title: '表格',
    component: Main,
    children: [
      {
        path: '/table/asynTable', title: '异步加载表格', name: 'table_index', icon: 'ionic', component: resolve => {
          require(['@/components/table-components/tableMain'], resolve);
        }
      },
      {
        path: '/table/operation', title: '可操作的表格', name: 'operation_index', icon: 'ios-compose', component: resolve => {
          require(['@/components/table-components/operationTable'], resolve);
        }
      },
    ]
  },
  {
    path: '/form',
    name: 'formMain',
    icon: 'navicon-round',
    title: '表单',
    component: Main,
    children: [
      {
        path: '/form/basisForm', title: '基础表单', name: 'form_index', icon: 'ios-list', component: resolve => {
          require(['@/components/form-components/formMain'], resolve);
        }
      },
      {
        path: '/form/quillEditor', title: '富文本', name: 'quillEditor_index', icon: 'ios-paper', component: resolve => {
          require(['@/components/form-components/quillEditor'], resolve);
        }
      },
      {
        path: '/form/uploadFiles', title: '文件上传', name: 'uploadFiles_index', icon: 'android-upload', component: resolve => {
          require(['@/components/form-components/uploadFiles'], resolve);
        }
      },
    ]
  },
  {
    path: '/echarts',
    name: 'echarts',
    icon: 'android-color-palette',
    title: '图表',
    component: Main,
    children: [
      {
        path: '/echarts_index', title: '图表', name: 'echarts_index', component: resolve => {
          require(['@/components/echarts-component/echartsMain'], resolve);
        }
      },
    ]
  },
  {
    path: '/draggable-list',
    name: 'draggable-list',
    icon: 'crop',
    title: '拖拽',
    component: Main,
    children: [
      {
        path: '/draggable_index', title: '拖拽', name: 'draggable_index', component: resolve => {
          require(['@/components/draggable-list/draggable-list'], resolve);
        }
      },
    ]
  },
  {
    path: '/modal',
    name: 'modal',
    icon: 'ios-browsers',
    title: '弹框',
    component: Main,
    children: [
      {
        path: '/modal_index', title: '弹框', name: 'modal_index', component: resolve => {
          require(['@/components/modal-components/ModalMain'], resolve);
        }
      },
    ]
  },
  {
    path: '/access',
    icon: 'key',
    name: 'access',
    title: '权限管理',
    component: Main,
    children: [
      { path: '/access_index', title: '权限管理', name: 'access_index', component: resolve => { require(['@/components/access/access'], resolve); } }
    ]
  },
  {
    path: '/access-test',
    icon: 'lock-combination',
    title: '权限测试页',
    name: 'accesstest',
    access: 0,
    component: Main,
    children: [
      { path: '/accesstest_index', title: '权限测试页', name: 'accesstest_index', access: 0, component: resolve => { require(['@/components/access/access-test'], resolve); } }
    ]
  },
]


// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  loginRouter,
  ...appRouter,
  ...otherRouter,
  error403,
  error500,
  error404,
]
