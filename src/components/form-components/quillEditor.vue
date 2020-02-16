<!--
-- Created by crish on 2020/01/23
-->

<template>
  <Card>
    <quill-editor ref="myTextEditor"
                  v-model="content"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)"
                  @change="onEditorChange($event)">
    </quill-editor>
    <div style="text-align: right; margin: 20px 0;">
      <Button type="primary">发送邮件</Button>
      <Button type="ghost">存草稿</Button>
    </div>
  </Card>
</template>

<script>

export default {
  data () {
    return {
      name: 'quillEditor',
      content: `<h2><span>Text content loading..</span></h2>`,
      editorOption: {

      }
    }
  },
  methods: {
    onEditorBlur (editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus (editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady (editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange ({ editor, html, text }) {
      //        console.log('editor change!', editor, html, text);
    }
  },
  computed: {
    editor () {
      return this.$refs.myTextEditor.quill;
    },
  },
  mounted () {
    console.log('this is my editor', this.editor);
    setTimeout(() => {
      this.content = `<h1>
                          <span style="background-color: rgb(240, 102, 102); color: rgb(255, 255, 255);"> I am Example 1! </span>
                        </h1>
                        <p><br></p>
                        <p><span>W Can a man still be brave if he's afraid? That is the only time a man can be brave. </span></p>
                        <p><br></p>
                        <p><strong>Courage and folly is </strong><strong style="color: rgb(230, 0, 0);">always</strong><strong> just a fine line.</strong></p>
                        <p><br></p>
                        <p><u>There is only one God, and his name is Death. And there is only one thing we say to Death: "Not today."</u></p>
                        <p><br></p>
                        <p><em>Fear cuts deeper than swords.</em></p>
                        <p><br></p>
                        <pre spellcheck="false">const a = 10;</pre>
                        <p><br></p>
                        <p><span>Every flight begins with a fall.</span></p>
                        <p><br></p>
                        <p><a style="color: rgb(230, 0, 0);"><u>A ruler who hides behind paid executioners soon forgets what death is. </u></a></p>
                        <p><br></p>
                        <p><br></p>
                        <p><span>Hear my words, and bear witness to my vow. Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the fire that burns against the cold, the light that brings the dawn, the horn that wakes the sleepers, the shield that guards the realms of men. I pledge my life and honor to the Night’s Watch, for this night and all the nights to come.</span></p>
                        <p><br></p>
                        <p><span>We are born to suffer, to suffer can make us strong.</span></p>
                        <p><br></p>
                        <p><span>The things we love destroy us every time.</span></p>
                        `
    }, 1300)
  }
}
</script>

<style lang="less">
</style>
