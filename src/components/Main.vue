<!--
-- Created by crish on 2019/11/2
-->

<template lang="pug">
  div(class="main")
    Sider(collapsible :collapsed-width="78" v-model="isCollapsed" class="sider-main")
      div(class="layout-logo")
        div(class="logo-con")
      MenuList(:isCollapsed="isCollapsed" :menu-list="menuList" :open-names="openedSubmenuArr" id="menu")
    Layout(:style="{left:isCollapsed?'78px':'200px'}")
      Header
        breadcrumbNav(:currentPath="currentPath")
        div
          fullScreen(v-model="isFullScreen" @on-change="fullscreenChange")
          Dropdown(@on-click="handleClickUserDropdown"  placement="bottom-end")
            a
              Avatar(:style="{ backgroundColor: '#f56a00' }") {{ userName }}
            DropdownMenu(slot="list")
              DropdownItem(name="ownSpace") 个人中心
              DropdownItem(divided name="loginOut") 退出登录
      Content(:style="{padding: '16px'}")
        router-view
</template>

<script>
import MenuList from './menu-components/menuList';
import fullScreen from './menu-components/fullScreen';
import breadcrumbNav from './menu-components/breadcrumb-nav';
import Cookies from 'js-cookie';
import util from '../libs/util.js';

export default {
  name: 'Main',
  components: {
    MenuList,
    fullScreen,
    breadcrumbNav,
  },
  computed: {
    menuList () {
      return this.$store.state.app.menuList;
    },
    currentPath () {
      return this.$store.state.app.currentPath;
    }
  },
  data () {
    return {
      userName: '',
      isCollapsed: false,
      isFullScreen: false,
      openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
    }
  },
  created () {
    this.init();
  },
  mounted () {
    //根据窗口高度改变切换条宽度
    let trigger = document.getElementsByClassName("ivu-layout-sider-trigger")[0];
    trigger.style.width = `${document.getElementById("menu").offsetWidth}px`;

    window.onresize = () => {
      trigger.style.width = `${document.getElementById("menu").offsetWidth}px`;
    };
  },
  methods: {
    init () {
      let pathArr = util.setCurrentPath(this, this.$route.name);
      this.$store.commit('app/updateMenulist');
      if(pathArr.length >= 2) {
        this.$store.commit('app/addOpenSubmenu', pathArr[1].name);
      }
      this.userName = Cookies.get('user');
    },
    fullscreenChange (isFullScreen) {//全屏
      //         console.log(isFullScreen);
    },
    handleClickUserDropdown (name) {
      if(name === 'loginOut') {
        // 退出登录
        this.$store.commit('login/logout');
        this.$router.push({
          name: 'login'
        });
      } else if(name === 'ownSpace') {
        this.$router.push({
          name: 'ownSpace'
        });
      }
    }
  },
  watch: {
    '$route' (to) {
      let pathArr = util.setCurrentPath(this, to.name);
      if(pathArr.length > 2) {
        this.$store.commit('app/addOpenSubmenu', pathArr[1].name);
      }
    },
  },
}
</script>

<style lang="less">
@import "main.less";
</style>
