<template>
  <div class="header-section">
    <div class="search">
      <search @search="submit_search"></search>
    </div>
    <menu-right></menu-right>
    <div class="theme-picker-container">
      <themePicker></themePicker>
    </div>

  </div>
</template>
<script type="text/javascript">
  import menuRight from './menuRight'
  import search from 'components/search'
  import themePicker from 'components/themePicker'

  export default{
    components: {
      menuRight,
      search,
      themePicker
    },
    methods: {
      submit_search(value) {
        this.$message.success(value)
      }
    }
  }
</script>
<style media="screen" lang="scss">

</style>
