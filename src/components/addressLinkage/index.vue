<template lang="html">
  <div>
    <el-select v-model="form.pro" placeholder="请选择省" :style="{width: selectWh}" @change="proChange(arguments[0],true)">
      <el-option :label="item.label" :value="item.value" :key="item.value" v-for="item in proData"></el-option>
    </el-select>

    <el-select v-model="form.city" placeholder="请选择市" :style="{width: selectWh}" @change="cityChange(arguments[0],true)">
      <el-option :label="item.label" :value="item.value" :key="item.value" v-for="item in cityData"></el-option>
    </el-select>

    <el-select v-model="form.district" placeholder="请选择区" :style="{width: selectWh}" @change="disChange(arguments[0],true)">
      <el-option :label="item.label" :value="item.value" :key="item.value" v-for="item in districtData"></el-option>
    </el-select>
  </div>
</template>

<script>
/**
 * Created by liyang on 2018/2/28.
 *
 * 省市区三级联动组件
 *
 * @prop {String} select-width  select容器宽度  默认为 200px
 * @prop  {String} province   省  默认为 -
 * @prop  {String} city       市  默认为 -
 * @prop  {String} district   区  默认为 -
 * @event change   选中值发生变化时触发  回调参数为选中的值
 *
 * @author: liyang
 * @email: 1184785075@qq.com
 * @Date: 2018/2/28 17:00
 * @Copyright(©) 2018 by liyang.
 *
 */

import addressData from 'common/data/address_linkage'

export default {
  props:{
    selectWidth:{
      type:String,
      default:'200px'
    },
    province:{
      type:String,
      default:null,
    },
    city:{
      type:String,
      default:null,
    },
    district:{
      type:String,
      default:null,
    },
  },
  data(){
    return {
      selectWh:this.selectWidth,
      form:{
        pro:this.province,
        city:this.city,
        district:this.district
      },
      proData:addressData,
      cityData:[],
      districtData:[]
    }
  },
  created(){
    if(this.form.pro !== null){
      this.proChange(this.form.pro,false)
    }
    if(this.form.city !== null){
      this.cityChange(this.form.city,false)
    }
  },
  methods:{
    proChange(val,isEmpty){
      var self = this;
      if(isEmpty){
        self.form.city = null;
        self.form.district = null;
      }

      self.proData.forEach((item,i) => {
        if(item.label === val){
          self.cityData = item.children
        }
      })
      this.$emit('change', this.form)
    },
    cityChange(val,isEmpty){
      var self = this;
      if(isEmpty){ self.form.district = null; }

      self.cityData.forEach((item,i) => {
        if(item.label === val){
          self.districtData = item.children
        }
      })
      this.$emit('change', this.form)
    },
    disChange(val){
      this.$emit('change', this.form)
    }
  }
}
</script>
