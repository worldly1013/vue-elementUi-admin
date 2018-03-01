<template lang="html">
  <div>
    <el-select v-model="form.pro" placeholder="请选择省" :style="{width: selectWh + 'px'}" :loading="isLoadingPro" @change="proChange">
      <el-option :label="item.label" :value="item.value" :key="item.value" v-for="item in proData"></el-option>
    </el-select>

    <el-select v-model="form.city" placeholder="请选择市" :style="{width: selectWh + 'px'}" :loading="isLoadingCity" @change="cityChange">
      <el-option :label="item.label" :value="item.value" :key="item.value" v-for="item in cityData"></el-option>
    </el-select>

    <el-select v-model="form.district" placeholder="请选择区" :style="{width: selectWh + 'px'}" :loading="isLoadingDistrict">
      <el-option :label="item.label" :value="item.value" :key="item.value" v-for="item in districtData"></el-option>
    </el-select>
  </div>
</template>

<script>

import addressData from 'common/data/address_linkage'

export default {
  props:{
    selectWidth:{
      type:Number,
      default:200
    }
  },
  data(){
    return {
      selectWh:this.selectWidth,
      form:{
        pro:null,
        city:null,
        district:null
      },
      proData:addressData,
      cityData:[],
      districtData:[],
      isLoadingPro:false,
      isLoadingCity:false,
      isLoadingDistrict:false
    }
  },
  methods:{
    proChange(val){
      var self = this;
      self.isLoadingCity = true;
      self.form.city = null;
      self.form.district = null;
      self.proData.forEach((item,i) => {
        if(item.label === val){
          self.cityData = item.children
          self.isLoadingCity = false;
        }
      })
    },
    cityChange(val){
      var self = this;
      self.isLoadingDistrict = true;
      self.form.district = null;
      self.cityData.forEach((item,i) => {
        if(item.label === val){
          self.districtData = item.children
          self.isLoadingDistrict = false;
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
