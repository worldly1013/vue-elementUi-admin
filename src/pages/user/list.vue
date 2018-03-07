<template>
  <section>
    <div class="panel">
      <panel-title :title="$route.meta.title">
        <el-button type="primary" icon="el-icon-circle-plus-outline" size="small">
          <router-link :to="{ name: 'userAdd' }" class="color_fff">新增用户</router-link>
        </el-button>
      </panel-title>

       <div class="panel-body">
         <div class="panel-row">
           <span class="font_14">创建时间：</span>
           <el-date-picker v-model="beginTime" type="date" placeholder="起始日期"></el-date-picker>
           <span>-</span>
           <el-date-picker v-model="endTime" type="date" placeholder="截止日期"></el-date-picker>
         </div>
         <div class="panel-row">
           <span class="font_14">信息搜索：</span>
           <el-date-picker v-model="keyWord" type="date" placeholder="姓名／公司名／联系方式" class="search-mes-ipt"></el-date-picker>
           <el-button size="medium" type="primary" @click="search">查询</el-button>
           <el-button size="medium" @click="reset">重置</el-button>
         </div>

         <el-table :data="tableData" :border="true" style="width: 100%" v-loading="loadData" element-loading-text="绝命加载中">
           <!-- 增加索引  设置 type 属性为 index -->
           <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
           <el-table-column prop="createTime" label="创建时间" width="120" align="center"></el-table-column>
           <el-table-column prop="account" label="账号" width="150" align="center">
           </el-table-column>
           <el-table-column prop="phone" label="联系方式" width="126" align="center">
           </el-table-column>
           <el-table-column prop="name" label="姓名" width="90" align="center">
           </el-table-column>
           <el-table-column prop="companys" label="公司" align="center" :show-overflow-tooltip="true">
           </el-table-column>
           <el-table-column prop="organization" label="归属" align="center">
           </el-table-column>
           <!-- 如果需要在列表中插入内容  可以加入 inline-template 属性 -->
           <el-table-column prop="valid" label="状态" width="70" align="center" inline-template>
               <span v-text="row.valid == 'Y' ? '启用' : '停用'"></span>
           </el-table-column>

           <!-- <el-table-column prop="valid" label="状态" width="70" align="center">
             <template scope="props">
               <span v-text="props.row.valid == 'Y' ? '启用' : '停用'"></span>
             </template>
           </el-table-column> -->
           <el-table-column prop="valid" label="操作" align="center" width="100">
             <template scope="props">
               <span class="hyper_click" v-text="props.row.valid == 'N' ? '启用' : '停用'" @click="modifyValid(props.row)"></span>
               <router-link class="hyper_click" :to="{name: 'userEdit', params: {id: props.row.id}}" tag="span">编辑</router-link>
             </template>
           </el-table-column>
         </el-table>

         <bottom-tool-bar>
           <div slot="page">
             <el-pagination
               @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
               :current-page="currentPage"
               :page-size="limit"
               :page-sizes="[10, 15, 20]"
               layout="sizes,total, prev, pager, next"
               :total="total">
             </el-pagination>
           </div>
         </bottom-tool-bar>

       </div>
    </div>
  </section>
</template>

<script>
import {panelTitle, bottomToolBar} from 'components'

export default {
  data() {
    return {
      title:'用户信息',
      tableData: [],
      beginTime:'',
      endTime:'',
      keyWord:'',
      //当前页码
      currentPage: 1,
      //数据总条目
      total: 0,
      //每页显示多少条数据
      limit: 10,
      //请求时的loading效果
      loadData: true,
      //批量选择数组
      batch_select: []
    }
  },
  components: {
    panelTitle,
    bottomToolBar
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      this.loadData = true;
      this.$fetch.api_user.search_list({
        page:this.currentPage,
        limit:this.limit,
        beginTime:this.beginTime,
        endTime:this.endTime,
        keyWord:this.keyWord
      })
      .then(data => {
        console.log(data);
        this.tableData = data.data.users;
        this.total = data.data.total;
        this.currentPage = data.data.page;
        this.loadData = false
      })
      .catch(() => { this.loadData = false; })

    },
    handleCurrentChange(val){
      console.log(val);
      this.currentPage = val;
      this.getData()
    },
    handleSizeChange(val){
      this.limit = val;
      console.log(val);
      this.getData()
    },
    search(){
      this.getData()
    },
    reset(){
      this.beginTime = '';
      this.endTime = '';
      this.keyWord = '';
      this.getData()
    },
    add(){
      console.log(this.$router);
    },
    modifyValid(row){
      var self = this;
      self.tableData.map((item,index) => {
        if(item.id == row.id){
          if(item.valid === 'Y'){
            self.tableData[index]['valid'] = 'N'
          }else{
            self.tableData[index]['valid'] = 'Y'
          }
        }
      })
    }
  }
}
</script>

<style lang="css">
.search-mes-ipt.el-input{
  width: 213px;
  margin-right: 10px;
}
</style>
