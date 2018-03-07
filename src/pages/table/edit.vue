<template>
<div class="panel">
  <panel-title :title="$route.meta.title"></panel-title>
  <div class="panel-body">
    <el-table :data="tableData" :border="true"  size="small" :stripe="true" v-loading="loadData" element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
      <!-- <el-table-column prop="id" label="id" width="70" align="center"> -->
      <!-- </el-table-column> -->
      <el-table-column prop="time" label="时间" width="180" align="center">
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center">
        <template scope="scope">
          <el-input v-show="scope.row.edit" v-model="scope.row.title"></el-input>
          <span v-show="!scope.row.edit" v-text="scope.row.title" >{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="作者" width="90" align="center">
      </el-table-column>
      <el-table-column prop="important" label="重要性" width="90" align="center">
      </el-table-column>
      <el-table-column prop="read" label="浏览量" width="90" align="center">
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template scope="scope">
            <el-button v-show="!scope.row.edit" type="primary" size="small" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
            <el-button v-show="scope.row.edit" type="success" size="small" icon="el-icon-circle-check" @click="finishEdit(scope.row)">完成</el-button>
        </template>
      </el-table-column>
    </el-table>
    <bottom-tool-bar>
      <div slot="page">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </bottom-tool-bar>
  </div>
</div>
</template>
<script type="text/javascript">
import Sortable from 'sortablejs'
import {
  panelTitle,
  bottomToolBar
} from 'components'

export default {
  data() {
    return {
      tableData: null,
      //当前页码
      currentPage: 1,
      //数据总条目
      total: 0,
      //每页显示多少条数据
      length: 10,
      //请求时的loading效果
      loadData: true
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
      this.loadData = true
      this.$fetch.api_table.drag_list({
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
          this.tableData = result
          this.currentPage = page
          this.total = total
          this.loadData = false
        })
        .catch(() => {
          this.loadData = false
        })
    },
    //页码选择
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
    },
    //编辑文本
    edit(row){
      this.tableData.forEach((item,i) => {
        if(item.id == row.id){
          this.$set(this.tableData[i],'edit',true)
        }
      })
    },
    finishEdit(row){
      this.tableData.forEach((item,i) => {
        if(item.id == row.id){
          this.$set(this.tableData[i],'edit',false)
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .el-table_1_column_7 .el-button--success{
    margin-left: 0px;
  }
</style>
