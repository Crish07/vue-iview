<!--
-- Created by crish on 2019/11/12
-->

<template lang="pug">
  div
    template(v-for="(item, index) in menuList")
      Dropdown(@on-click="changeItems" transfer v-if="item.children.length !== 1" placement="right-start" class="collapsed-menu")
        a
          Icon(:type="item.icon")
        DropdownMenu(slot="list")
          template(v-for="(child, i) in item.children")
            DropdownItem(:name="child.name")
              Icon(:type="child.icon" :style="{ marginRight:'5px' }")
              span {{ child.title }}
      Dropdown(@on-click="changeItems" transfer v-else placement="right-start" class="collapsed-menu")
        a
          Icon(:type="item.icon")
        DropdownMenu(slot="list")
          DropdownItem(:name="item.children[0].name")
            Icon(:type="item.icon" :style="{ marginRight:'5px' }")
            span {{ item.title }}
</template>

<script>

export default {
  name: 'CollapsedBar',
  props: {
    menuList: {
      type: Array
    },
  },
  data () {
    return {}
  },
  methods: {
    changeItems (name) {
      this.$emit('on-change', name);
    },
  }
}
</script>

<style lang="less">
.collapsed-menu {
  display: block !important;
  a {
    color: rgba(255, 255, 255, 0.7);
    display: block;
    text-align: center;
    padding: 14px 0;
  }
  i {
    font-size: 22px;
  }
}
</style>
