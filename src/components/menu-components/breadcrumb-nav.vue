<!--
-- Created by crish on 2019/11/27
-->

<template lang="pug">
  Breadcrumb
    BreadcrumbItem(v-for="item in currentPath" :to="item.path" :key="item.name") {{ item.title }}
</template>

<script>
export default {
  name: 'breadcrumbNav',
  props: {
    currentPath: Array
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
