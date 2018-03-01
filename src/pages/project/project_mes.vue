<template>
<div class="panel">
  <panel-title :title="$route.meta.title"></panel-title>
  <div class="panel-body" v-loading="loadData" element-loading-text="拼命加载中">
    <el-row>
      <el-col :span="22">
        <!-- http://element-cn.eleme.io/#/zh-CN/component/form -->
        <el-form ref="form" :model="form" :rules="rules" label-width="160px" label-position="left">
          <el-form-item label="项目名:" prop="name">
            <el-input v-model="form.name" placeholder="请输入项目名" style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item label="项目法定名称:" prop="legalName">
            <el-input v-model="form.legalName" placeholder="请输入项目法定名称" style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item label="关联公司:" prop="companyName">
            <el-select v-model="form.companyName" placeholder="请选择关联公司" style="width:250px;">
              <el-option label="唐三藏西部文化娱乐公司" value="唐三藏西部文化娱乐公司"></el-option>
              <el-option label="诸葛亮文化传媒有限公司" value="诸葛亮文化传媒有限公司"></el-option>
              <el-option label="杨贵妃美甲美容有限公司" value="杨贵妃美甲美容有限公司"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="项目所在地:" prop="area">
            <address-linkage select-width="150px"  @change="addressLinkageChange"></address-linkage>
          </el-form-item>

          <el-form-item label="项目所在地:" prop="linkageAddress">
            <el-cascader
             placeholder="请选择项目所在地"
             :options="cityOptions"
             @change="changeAddress"
             style="width:250px;"
            >
            </el-cascader>
          </el-form-item>

          <el-form-item label="详细地址:" prop="address">
            <el-input v-model="form.address" placeholder="请输入详细地址" style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item label="占地面积:" prop="zdAcreage">
            <el-input class="mr_10" v-model.number="form.zdAcreage" style="width: 250px;"></el-input>m²
          </el-form-item>
          <el-form-item label="建筑面积:" prop="jzAcreage">
            <el-input class="mr_10" v-model.number="form.jzAcreage" style="width: 250px;"></el-input>m²
          </el-form-item>
          <el-form-item label="可出租面积:" prop="czAcreage">
            <el-input class="mr_10" v-model.number="form.czAcreage" style="width: 250px;"></el-input>m²
          </el-form-item>
          <el-form-item  label="联系人姓名:" prop="fpersonName">
            <el-input class="mr_10" v-model="form.fpersonName" placeholder="请输入姓名" style="width: 100px;"></el-input>
          </el-form-item>
          <el-form-item  label="联系人电话:" prop="fpersonPhone">
            <el-input v-model="form.fpersonPhone" placeholder="请输入联系方式" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="权益系数:" prop="incomePercent">
            <el-input class="mr_10" v-model.number="form.incomePercent" style="width: 250px;"></el-input>%
          </el-form-item>

          <el-form-item label="土地使用权到期日:" prop="landEndDate">
            <el-date-picker v-model="form.landEndDate" type="date" format="yyyy-MM-dd" :editable="false" placeholder="请选择日期" style="width: 250px;">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="加入物业组合日期:" prop="completeDate">
            <el-date-picker v-model="form.completeDate" type="date" format="yyyy-MM-dd" :editable="false" placeholder="请选择日期" style="width: 250px;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="物业概况:" prop="wyProfile">
            <el-input type="textarea" v-model="form.wyProfile" style="width: 250px"></el-input>
          </el-form-item>

          <el-form-item style="width:400px;">
            <el-button type="primary" @click="submitForm" :loading="onSubmitLoading">确认保存</el-button>
            <el-button @click="$router.back()">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</div>
</template>
<script type="text/javascript">
import { panelTitle , addressLinkage} from 'components'
import { validate } from 'common/tools'
import address from 'common/data/address_linkage'

export default {
  data() {
    return {
      form: {
        name: null,
        legalName: null,
        companyName:null,
        address: null,
        zdAcreage: null,
        jzAcreage: null,
        czAcreage: null,
        fpersonName:null,
        incomePercent:null,
        landEndDate:null,
        completeDate:null,
        wyProfile:null
      },
      routeId: this.$route.params.id,
      loadData: false,
      onSubmitLoading: false,
      // 表单的验证规则
      rules: {
        name: [{
          required: true,
          message: '项目名不能为空',
          trigger: 'blur'
        }],
        address: [{
          required: true,
          message: '详细地址不能为空',
          trigger: 'blur'
        }],
        zdAcreage: [{
          type: 'number',
          message: '占地面积必须为数字',
          trigger: 'blur'
        }],
        jzAcreage: [{
          type: 'number',
          message: '建筑面积必须为数字',
          trigger: 'blur'
        }],
        czAcreage: [{
          type: 'number',
          message: '可出租面积必须为数字',
          trigger: 'blur'
        }],
        fpersonPhone: [{
          validator: validate.mobile,
          message: '联系方式格式不正确',
          trigger: 'blur'
        }],
        incomePercent:[{
          type: 'number',
          message: '权益系数必须为数字',
          trigger: 'blur'
        }],
        companyName:[{
          required: true,
          message: '关联公司不能为空',
          trigger: 'blur'
        }],
        area:[{
          required: true,
          message: '关联公司不能为空',
          trigger: 'blur'
        }]
      },
      cityOptions:address,
      linkageAddress:null,
      pro:null,
      city:null,
      district:null
    }
  },
  methods: {
    // 提交
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (!valid) return false
        this.onSubmitLoading = true
        this.$fetch.api_project.save_project(this.form)
          .then(({
            msg
          }) => {
            this.$message.success(msg)
            // setTimeout(this.$router.back(), 1000)
          })
          .catch(() => {
            this.onSubmitLoading = false
          })
      })
    },
    // 三级联动所选地址
    changeAddress(val){
      console.log(val);
      var self = this;
      val.forEach((item,index) => {
        if(index === 0){ self.pro = item }
        if(index === 1 && item){ self.city = item }
        if(index === 2 && item){ self.district = item }
      })
      this.linkageAddress = '000'
    },
    addressLinkageChange(val){
      console.log(val);
    }
  },
  components: {
    panelTitle,
    addressLinkage
  }
}
</script>
