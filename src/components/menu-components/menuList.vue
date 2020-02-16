<!--
-- Created by crish on 2019/11/21
-->

<template lang="pug">
  div
    SubmenuBar(v-show="!isCollapsed" :menuList="menuList" :open-names="openNames" @on-change="handleChange")
    CollapsedBar(v-show="isCollapsed" :menuList="menuList" @on-change="handleChange")
</template>

<script>
import SubmenuBar from './submenu-list/SubmenuBar';
import CollapsedBar from './collapsed-menu/CollapsedBar';

export default {
  name: 'menuList',
  components: {
    SubmenuBar,
    CollapsedBar,
  },
  props: {
    isCollapsed: {
      type: Boolean,
      default: false,
    },
    menuList: {
      type: Array,
      required: true
    },
    openNames: {
      type: Array
    }
  },
  data () {
    return {}
  },
  methods: {
    handleChange (name) {
      this.$router.push({
        name: name
      });
    }
  }
}
</script>

<style>
</style>
