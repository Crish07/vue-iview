<!--
-- Created by crish on 2019/12/13
-->

<template lang="pug">
  <div class="layout-content">
    <div class="layout-content-main">
      <i-button type="primary" @click="showModal">显示对话框 {{modal1}}</i-button>
      <i-form :model="formItem" :label-width="80">
        <Form-item label="选择器">
            <i-select :model.sync="formItem.select" placeholder="请选择">
                <i-option value="beijing">北京市</i-option>
                <i-option value="shanghai">上海市</i-option>
                <i-option value="shenzhen">深圳市</i-option>
            </i-select>
        </Form-item>
        <Form-item label="输入框">
            <i-input :value.sync="formItem.input" placeholder="请输入"></i-input>
        </Form-item>
        
        <Form-item>
            <i-button type="primary">查询</i-button>
        </Form-item>
      </i-form>
    </div>
    <Modal :visible.sync="modal1" width="600">
      <p>对话框内容</p>
      <p>对话框内容</p>
      <p>对话框内容</p>
    </Modal>
  </div>
</template>

<script scoped>

export default {
        data () {
            return {
                formItem: {
                    input: '',
                    select: '',
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50],
                    textarea: ''
                },
                modal1:false
            }
        },
        methods: {
            ok () {
                this.$Message.info('点击了确定');
            },
            cancel () {
                this.$Message.info('点击了取消');
            },
            showModal() {
              this.modal1 = true
            }
        }
    }
</script>

<style>
  .layout-content{
          min-height: 500px;
          margin: 15px;
          overflow: hidden;
          background: #fff;
          border-radius: 4px;
      }
      .layout-content-main{
          padding: 10px;
      }
</style>
