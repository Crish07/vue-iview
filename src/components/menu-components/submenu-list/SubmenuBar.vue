<!--
-- Created by crish in 2019/11/12
-->

<template lang="pug">
  Menu(:active-name="$route.name" :open-names="openNames" ref="sideMenu" theme="dark" width="auto" accordion @on-select="selectName")
    template(v-for="item in menuList")
      MenuItem(v-if="item.children.length<=1" :name="item.children[0].name")
        Icon(:type="item.icon")
        span {{ item.title }}

      Submenu(v-if="item.children.length > 1" :name="item.name")
        template(slot="title")
          Icon(:type="item.icon")
          span {{ item.title }}
        template(v-for="child in item.children")
          MenuItem(:name="child.name")
            Icon(:type="child.icon")
            span {{ child.title }}
</template>

<script>

export default {
  name: 'SubmenuBar',
  props: {
    menuList: {
      type: Array
    },
    openNames: {
      type: Array
    }
  },
  data () {
    return {}
  },
  methods: {
    selectName (name) {
      this.$emit('on-change', name);
    },
  },
  mounted () {
    this.$nextTick(() => {//实时更新菜单栏状态
      if(this.$refs.sideMenu) {
        this.$refs.sideMenu.updateOpened();
        this.$refs.sideMenu.updateActiveName();
      }
    });
  }
}
</script>

<style lang="less">
</style>
