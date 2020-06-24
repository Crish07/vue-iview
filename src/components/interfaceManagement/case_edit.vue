<!--
 * @Descripttion: 编辑接口用例
 * @Author: Crish<714415473@qq.com>
 * @Date: 2020-06-24 15:06:45
 * @LastEditors: Crish<714415473@qq.com>
 * @LastEditTime: 2020-06-24 23:02:48
--> 

<template lang="pug">
  Card
    div
      Select(v-model="caseParams.type" style="width:200px; margin-right: 5px;")
        Option(v-for="item in stage" :value="item.value" :key="item.value") {{ item.label }}
      Button(type="primary" icon="ios-play" style="margin-right: 5px;" @click="caseRun('formValidate')") 运行
      Button(type="success" icon="ios-filing-outline" @click="caseSave('formValidate')") 保存
    div(class="line-box pt10 pr10")
      Form(ref="formValidate" :rules="ruleValidate" :model="caseParams" :label-width="80")
        FormItem(label="接口名称")
          Input(v-model="caseParams.name" readonly)
        FormItem(label="接口url")
          Input(v-model="caseParams.interface" readonly)
        FormItem(label="用例名称" prop="caseName")
          Input(v-model="caseParams.caseName")
        FormItem(label="准入case" prop="isCase")
          Select(v-model="caseParams.isCase")
            Option(value="1") 是
            Option(value="0") 否
        FormItem(label="所属环境" prop="environment")
          Select(v-model="caseParams.environment")
            Option(value="1") 仅支持stage
            Option(value="0") other
    div(class="line-box")
      div(class="box-title") 请求信息
      Tabs(type="card" style="margin: 10px;")
        TabPane(label="请求头")
          Table(border :columns="headerColumns" :data="headerData")
          Button(type="warning" style="margin-top: 5px;" @click="addHeader()") 添加header
        TabPane(label="请求参数")
          RadioGroup(v-model="caseParams.requestParams" style="margin: 5px 0;")
            Radio(label="form-data")
            Radio(label="application/json")
            Radio(label="Raw")
            Radio(label="multipart-data")
          Table(border :columns="requestTableColumns" :data="requestTableData")
          div(style="margin-top: 5px; display: flex;")
            Button(type="warning" style="margin-right: 5px; height: 32px;" @click="addRequest()") 添加参数
            Upload(action="/" style="width: 80%;" @on-success="importSuccess()" @on-error="importError()")
              Button(type="warning") 导入json
        TabPane(label="mock下游接口")
          p mock下游接口内容
    div(class="line-box")
      div(class="box-title") 返回结果校验
      div(class="box-body")
        div(style="color: red;")
          p Tips
          p 1. http_code码校验key必须是http_code
          p 2. 校验字符串数字，数字前需加s，例如：s1234
          p 3. 提取入参body参数key值格式：(入参key)
        RadioGroup(v-model="caseParams.verifyType" style="margin: 5px 0;")
          Radio(label="key") key值校验
          Radio(label="reg") 完全匹配
        Input(v-model="caseParams.verifyString" type="textarea" placeholder="请输入匹配文本")
    div(class="line-box")
      div(class="box-title") 请求参数
      div(class="box-body")
        pre {{requestData}}
    div(class="line-box")
      div(class="box-title") Response Status:
        span(style="margin: 0 4px;") {{status}} 
        span Time: {{time}}
      div(class="box-body")
        pre {{resCode}}

    Modal(v-model="modalFlag" :title="modalTitle" @on-ok="modalOk" @on-cancel="modalCancel")
      Form(:model="modalParams" :label-width="50")
        FormItem(label="Key")
          Input(v-model="modalParams.key")
        FormItem(label="Value")
          Input(v-model="modalParams.value")
</template>

<script>
export default {
  name: 'caseEdit',
  data () {
    return {
      stage: [ // 第一个下拉框option选项
        {
          value: '0',
          label: 'stage'
        },
        {
          value: '1',
          label: 'other'
        }
      ],
      caseParams: {
        type: '0',
        name: '签发新token',
        interface: '/account/login',
        caseName: '',
        isCase: '0',
        environment: '1',
        verifyType: 'reg',// 校验单选项
        verifyString: '', // 校验匹配文本
        requestParams: 'application/json', // 请求参数
      },
      ruleValidate: { // 校验信息
        caseName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        isCase: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        environment: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      headerColumns: [ // 添加header表格表头
        {
          key: 'key',
          title: 'Key',
        },
        {
          key: 'value',
          title: 'Value',
        },
        {
          key: 'action',
          title: '操作',
          align: 'center',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'error',
                size: 'small'
              },
              on: {
                click: () => {
                  this.headerDelete(params.index);
                }
              }
            }, '删除');
          }
        },
      ],
      headerData: [ // 添加header表格数据内容
        {
          key: 'ces',
          value: 'ccc'
        }
      ],
      requestTableColumns: [ // 添加header表格表头
        {
          key: 'key',
          title: 'Key',
        },
        {
          key: 'value',
          title: 'Value',
        },
        {
          key: 'action',
          title: '操作',
          align: 'center',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'error',
                size: 'small'
              },
              on: {
                click: () => {
                  this.requestDelete(params.index);
                }
              }
            }, '删除');
          }
        },
      ],
      requestTableData: [ // 请求参数表格数据内容
        {
          key: 'ces',
          value: 'ccc'
        }
      ],
      requestData: `{}`, // 下面反显的请求参数
      status: '404', // 状态码
      time: '64ms', // 请求时间
      resCode: `{
        "timestamp": 1592972207855,
        "status": 404,
        "error": "Not Found",
        "message": "No message available",
        "path": "/account/login"
      }`,
      modalFlag: false, // 添加header
      modalTitle: '添加header', // modalTitle
      modalParams: { // 添加header参数
        key: '',
        value: ''
      },
      addFlag: '', // 判断是添加请求头 or 请求参数
    }
  },
  methods: {
    /**
     * 运行
     */
    caseRun (name) {
      console.log('全部所填内容:', this.caseParams, 'header表格内容:', this.headerData, '请求参数表格内容', this.requestTableData);
      this.$refs[name].validate((valid) => {
        if(valid) {
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      })
      let payload = { // 自己组合需要传给后台的参数

      }
      // 调接口
      //this.$store.dispatch('interfaceManage/run_interface', payload);
    },
    /**
     * 保存
     */
    caseSave () {
      console.log('所填内容:', this.caseParams, '表格内容:', this.headerData, this.requestTableData);
    },
    /**
     * 添加请求头
     */
    addHeader () {
      this.addFlag = 'header';
      this.modalTitle = '添加header';
      this.modalFlag = true;
    },
    /**
     * 添加header弹框 -- 确认
     */
    modalOk () {
      if(this.addFlag == 'header') {
        this.headerData.push(this.modalParams);
      } else if(this.addFlag == 'request') {
        this.requestTableData.push(this.modalParams);
      }

      this.modalFlag = false;

      this.modalParams = { // 清空数据
        key: '',
        value: ''
      }
    },
    /**
     * 添加header弹框 -- 关闭
     */
    modalCancel () {
      this.modalFlag = false;

      this.modalParams = { // 清空数据
        key: '',
        value: ''
      }
      this.addFlag = '';
    },
    /**
     * 删除header数据
     */
    headerDelete (index) {
      this.headerData.splice(index, 1);
    },
    /**
     * 添加请求参数
     */
    addRequest () {
      this.addFlag = 'request';
      this.modalTitle = '添加请求参数';
      this.modalFlag = true;
    },
    /**
     * 删除请求参数 数据
     */
    requestDelete (index) {
      this.requestTableData.splice(index, 1);
    },
    /**
     * json导入成功
     */
    importSuccess (response, file, fileList) {
      console.log(response, file, fileList);
      this.$Message.success(response);
    },
    /**
     * json导入失败
     */
    importError (error, file, fileList) {
      console.log(error, file, fileList);
      this.$Message.error(error);
    }
  },
  watch: {

  }
}
</script>

<style lang="less">
.line-box {
  border: 1px solid #e0dede;
  margin-top: 10px;
  border-radius: 4px;
}
.pt10 {
  padding-top: 10px;
}
.pr10 {
  padding-right: 10px;
}
.box-title {
  padding: 5px 10px;
  background: #f3f2f2;
  border-bottom: 1px solid #f3f2f2;
}
.box-body {
  padding: 10px;
}
</style>
