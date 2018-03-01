<template>
  <footer class="footer" v-once>Copyright &copy; {{getYear}} worldly1013 All Rights Reserved</footer>
</template>
<script type="text/javascript">
  export default {
    computed: {
      getYear(){
        return new Date().getFullYear()
      }
    }
  }
</script>
