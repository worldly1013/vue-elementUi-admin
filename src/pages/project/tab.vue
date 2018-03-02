<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="项目配置" name="0" :disabled="false">
      <projectMes></projectMes>
    </el-tab-pane>
    <el-tab-pane label="楼宇楼层配置" name="1" :disabled="buildingTab">
      <buildingList v-if="!buildingTab"></buildingList>
    </el-tab-pane>
    <el-tab-pane label="单元配置" name="2" :disabled="unitTab">
      <div v-if="!unitTab">单元配置</div>
    </el-tab-pane>
    <el-tab-pane label="费项配置" name="3" :disabled="expenseTab">费项配置</el-tab-pane>
  </el-tabs>
</template>

<script>
import projectMes from './project_mes'
import buildingList from './building'

export default {
  data() {
    return {
      activeName: this.$route.params.tabIndex,
      buildingTab:false,
      unitTab:false,
      expenseTab:false
    };
  },
  components:{
    projectMes,
    buildingList
  },
  created(){
    this.isDisabledTabItem()
  },
  methods: {
    isDisabledTabItem(){
      var index = this.$route.params.tabIndex;
      if(index == 0){
        this.buildingTab = true;
        this.unitTab = true;
        this.expenseTab = true;
      }
      if(index == 1){
        this.unitTab = true;
        this.expenseTab = true;
      }
      if(index == 2){
        this.expenseTab = true;
      }
    },
    handleClick(tab, event) {

    }
  }
};
</script>

<style lang="scss">
  .el-tabs__item{
    color:#333;
  }
</style>
