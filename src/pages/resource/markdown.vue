<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body">
      <markdown :id="id" :height="600" :value="textareaValue" placeholder="大爷，快来试试啊！！" @input="getContent"></markdown>
    </div>
  </div>

</template>
<script>
import {panelTitle,markdown} from 'components'
import showdown from 'showdown'

export default {
  data(){
    return {
      id:'markdown-editor' + new Date(),
      textareaValue:''
    }
  },
  components:{
    panelTitle,
    markdown
  },
  mounted(){

  },
  methods:{
    getContent(val){
      // 将markdown语法转化为html
      // const converter = new showdown.Converter();
      // this.html = converter.makeHtml(val);
    }
  }
}
</script>

<style lang="scss">

</style>
