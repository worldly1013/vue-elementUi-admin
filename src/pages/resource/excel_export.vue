<template lang="html">
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body">
      <themePicker></themePicker>
    </div>
  </div>
</template>

<script>
import {
  panelTitle,themePicker
} from 'components'

export default {
  data(){
      return {

      }
  },
  components:{
    panelTitle,
    themePicker
  },
  methods:{

  }
}
</script>

<style lang="css">
</style>
