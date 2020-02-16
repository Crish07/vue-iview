<!--
-- Created by crish on 2020/01/21
-->

<template lang="pug">
  Card
    Form(:model="formItem" :label-width="80")
      FormItem(label="Input")
        Input(v-model="formItem.input" placeholder="Enter something...")
      FormItem(label="Select")
        Select(v-model="formItem.select")
          Option(value="beijing") New York
          Option(value="shanghai") London
          Option(value="shenzhen") Sydney
      FormItem(label="DatePicker")
        Row
          Col(span="11")
            DatePicker(type="date" placeholder="Select date" v-model="formItem.date" style="display: block")
          Col(span="2" style="text-align: center") -
          Col(span="11")
            TimePicker(type="time" placeholder="Select time" v-model="formItem.time" style="display: block")
      FormItem(label="Radio")
        RadioGroup(v-model="formItem.radio")
          Radio(label="male") Male
          Radio(label="female") Female
      FormItem(label="Checkbox")
        CheckboxGroup(v-model="formItem.checkbox")
          Checkbox(label="Eat")
          Checkbox(label="Sleep")
          Checkbox(label="Run")
          Checkbox(label="Movie")
      FormItem(label="Switch")
        i-switch(v-model="formItem.switch" size="large")
          span(slot="open") On
          span(slot="close") Off
      FormItem(label="Slider")
        Slider(v-model="formItem.slider" range)
      FormItem(label="Text")
        Input(v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something...")
      FormItem
        Button(type="primary") Submit
        Button(type="ghost" style="margin-left: 8px") Cancel
</template>

<script>
export default {
  name: 'formMain',
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
      }
    }
  }
}
</script>

<style>
</style>
