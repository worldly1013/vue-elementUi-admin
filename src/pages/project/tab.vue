<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="项目信息" name="first">
      <projectMes></projectMes>
    </el-tab-pane>
    <el-tab-pane label="楼宇楼层配置" name="second">
      <buildingList></buildingList>
    </el-tab-pane>
    <el-tab-pane label="单元配置" name="third">单元配置</el-tab-pane>
    <el-tab-pane label="费项配置" name="fifth">费项配置</el-tab-pane>
  </el-tabs>
</template>

<script>
import projectMes from './project_mes'
import buildingList from './building'

export default {
  data() {
    return {
      activeName: 'second'
    };
  },
  components:{
    projectMes,
    buildingList
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab);
    }
  }
};
</script>

<style lang="scss">
  .el-tabs__item{
    color:#333;
  }
</style>
