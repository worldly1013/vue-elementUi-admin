<template lang="html">
<el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="600px" @close="close">
  <el-row>
    <el-col :span="20">
      <el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="100px">
        <el-form-item label="楼宇名称：" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地上楼层：" prop="upperFloors">
          <el-input v-model.number="form.upperFloors" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地下楼层：" prop="downFloors">
          <el-input v-model.number="form.downFloors" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel" size="small">取 消</el-button>
    <el-button type="primary" size="small" @click="submit">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
import { validate } from 'common/tools'
export default {
  props:{
    visible:{
      type:Boolean,
      default:false
    },
    model:{
      type:Object,
      default(){
        return {name:'',upperFloors:'',downFloors:''}
      }
    },
    title:{
      type:String,
      default:'新建楼宇'
    }
  },
  data() {
    return {
      dialogFormVisible: this.visible,
      form: this.model,
      dialogTitle:this.title,
      rules: {
        name: [{
          required: true,
          message: '楼宇名称不能为空',
          trigger: 'blur'
        }],
        upperFloors: [
          {
            required: true,
            message: '地上楼层不能为空',
          },
          {
            type: 'number',
            message: '请输入数字',
            trigger:'blur'
          }
        ],
        downFloors: [
          {
            required: true,
            message: '地下楼层不能为空',
          },
          {
            type: 'number',
            message: '请输入数字',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch:{
    visible(val){
      this.dialogFormVisible = val;
      this.$refs['form'].resetFields()
    },
    model(val){
      this.form = val;
    },
    title(val){
      this.dialogTitle = val;
    }
  },

  methods:{
    submit(){
      this.$refs.form.validate((valid) => {
        if (!valid) return false
        this.dialogFormVisible = false;
        this.$emit('dialogState', false)
        this.$emit('save',this.form)
      })
    },
    cancel(){
      this.dialogFormVisible = false;
      this.$emit('dialogState', false)
    },
    close(){
      this.dialogFormVisible = false;
      this.$emit('dialogState', false)
    }
  }
}
</script>

<style lang="scss">
</style>
