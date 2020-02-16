<!--
-- Created by crish on 2020/01/23
-->

<template lang="pug">
  div(class="uploadFiles")
    Card
      Upload(action="//jsonplaceholder.typicode.com/posts/")
        Button(type="ghost" icon="ios-cloud-upload-outline") 点击上传
    Card
      Upload(multiple action="//jsonplaceholder.typicode.com/posts/")
        Button(type="ghost" icon="ios-cloud-upload-outline") 选择多个文件
    Card
      Upload(:before-upload="handleUpload" action="//jsonplaceholder.typicode.com/posts/")
        Button(type="ghost" icon="ios-cloud-upload-outline") 手动上传
      div(v-if="file !== null") Upload file: {{ file.name }}
        Button(type="text" @click="upload" :loading="loadingStatus") {{ loadingStatus ? 'Uploading' : 'Click to upload' }}
    Card
      Upload(multiple
      type="drag"
      action="//jsonplaceholder.typicode.com/posts/")
        div(style="padding: 20px 0")
          Icon(type="ios-cloud-upload" size="52" style="color: #3399ff")
          p Click or drag files here to upload
</template>

<script>
export default {
  name: 'uploadFiles',
  data () {
    return {
      file: null,
      loadingStatus: false
    }
  },
  methods: {
    handleUpload (file) {
      this.file = file;
      return false;
    },
    upload () {
      this.loadingStatus = true;
      setTimeout(() => {
        this.file = null;
        this.loadingStatus = false;
        this.$Message.success('Success')
      }, 1500);
    }
  }
}
</script>

<style lang="less">
.uploadFiles {
  .ivu-card {
    margin: 10px 0;
  }
}
</style>
