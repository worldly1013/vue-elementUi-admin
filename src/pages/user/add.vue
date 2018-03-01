<template>
<div class="panel">
  <panel-title :title="$route.meta.title"></panel-title>
  <div class="panel-body" v-loading="loadData" element-loading-text="拼命加载中">
    <el-row>
      <el-col :span="8">
        <!-- http://element-cn.eleme.io/#/zh-CN/component/form -->
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="left">
          <el-form-item label="账号:" prop="account">
            <el-input v-model="form.account" placeholder="请输入内容" style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="psd">
            <el-input v-model="form.psd" placeholder="请输入密码" style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item label="联系人:" prop="name">
            <el-input v-model="form.name" placeholder="请输入联系人" style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item label="联系方式:" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入联系方式" style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item label="邮箱:" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱" style="width: 250px;"></el-input>
          </el-form-item>

          <el-form-item style="width:400px;">
            <el-button type="primary" @click="submitForm" :loading="onSubmitLoading">确认保存</el-button>
            <el-button type="primary" @click="resetForm">重置</el-button>
            <el-button @click="$router.back()">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</div>
</template>
<script type="text/javascript">
import {
  panelTitle
} from 'components'
import {
  validate
} from 'common/tools'

export default {
  data() {
    return {
      form: {
        name: null,
        address: null,
        account: null,
        psd: null,
        phone: null,
        email: null,
      },
      routeId: this.$route.params.id,
      loadData: false,
      onSubmitLoading: false,
      // 表单的验证规则
      rules: {
        account: [{
          required: true,
          message: '账号不能为空',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '姓名不能为空',
          trigger: 'blur'
        }],
        psd: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 10,
            message: '长度在6到10个字符',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '手机不能为空',
            trigger: 'blur'
          },
          {
            validator: validate.mobile,
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '邮箱不能为空',
            trigger: 'blur'
          },
          {
            validator: validate.email,
            trigger: 'blur'
          }
        ],
      }
    }
  },
  methods: {
    //提交
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (!valid) return false
        this.onSubmitLoading = true
        this.$fetch.api_user.add(this.form)
          .then(({
            msg
          }) => {
            console.log(msg);
            this.$message.success(msg)
            setTimeout(this.$router.back(), 1000)
          })
          .catch(() => {
            this.onSubmitLoading = false
          })
      })
    },
    //重置
    resetForm(){
      this.$refs.form.resetFields();
      console.log(this.form);
    }
  },
  components: {
    panelTitle
  }
}
</script>
