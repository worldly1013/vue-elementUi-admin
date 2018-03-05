<template>
<div class="panel">
  <panel-title :title="$route.meta.title"></panel-title>
  <div class="panel-body">
    <el-table :data="table_data" :stripe="true" v-loading="load_data" element-loading-text="拼命加载中" @selection-change="onBatchSelect" style="width: 100%;">
      <el-table-column align="center" type="selection" width="55">
      </el-table-column>
      <el-table-column prop="id" label="id" width="70" align="center" sortable>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="90" align="center" sortable>
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="90" align="center" sortable>
        <template scope="props">
            <span v-text="props.row.sex == 1 ? '男' : '女'"></span>
          </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="90" align="center" sortable>
      </el-table-column>
      <el-table-column prop="birthday" label="生日" width="114" align="center" sortable>
      </el-table-column>
      <el-table-column prop="zip" label="邮编" width="100" align="center" sortable>
      </el-table-column>
      <el-table-column prop="address" label="地址" align="center" sortable>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template scope="props">
            <el-button type="info" size="small" icon="edit">修改</el-button>
            <el-button type="danger" size="small" icon="delete" @click="deleteData(props.row)">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
    <bottom-tool-bar>
      <el-button type="danger" icon="delete" size="small" :disabled="batch_select.length === 0" @click="onBatchDel" slot="handler">
        <span>批量删除</span>
      </el-button>
      <div slot="page">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </bottom-tool-bar>
  </div>
</div>
</template>
<script type="text/javascript">
import {
  panelTitle,
  bottomToolBar
} from 'components'

export default {
  data() {
    return {
      table_data: null,
      //当前页码
      currentPage: 1,
      //数据总条目
      total: 0,
      //每页显示多少条数据
      length: 15,
      //请求时的loading效果
      load_data: true,
      //批量选择数组
      batch_select: []
    }
  },
  components: {
    panelTitle,
    bottomToolBar
  },
  created() {
    this.getData()
  },
  methods: {
    //获取数据
    getData() {
      this.load_data = true
      this.$fetch.api_table.list({
          page: this.currentPage,
          length: this.length
        })
        .then(({
          data: {
            result,
            page,
            total
          }
        }) => {
          this.table_data = result
          this.currentPage = page
          this.total = total
          this.load_data = false
        })
        .catch(() => {
          this.load_data = false
        })
    },
    //单个删除
    deleteData(item) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.load_data = true
          this.$fetch.api_table.del(item)
            .then(({
              msg
            }) => {
              this.getData()
              this.$message.success(msg)
            })
            .catch(() => {})
        })
        .catch(() => {})
    },
    //页码选择
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
    },
    //批量选择
    onBatchSelect(val) {
      this.batch_select = val
    },
    //批量删除
    onBatchDel() {
      this.$confirm('此操作将批量删除选择数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.load_data = true
          this.$fetch.api_table.batch_del(this.batch_select)
            .then(({
              msg
            }) => {
              this.getData()
              this.$message.success(msg)
            })
            .catch(() => {})
        })
        .catch(() => {})
    }
  }
}
</script>
