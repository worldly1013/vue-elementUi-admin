<template>
<section>
  <div class="panel">
    <panel-title title="楼宇信息">
      <el-button type="primary" icon="plus" size="small" @click="createBuilding">新建楼宇</el-button>
    </panel-title>

    <div class="panel-body" v-loading="loadData" element-loading-text="拼命加载中" style="minHeight:100px;">
      <div class="list-container outer_shadow container_hover" v-for="(item,index) in listData">
        <div class="picture">
          <img :src="item.preview+'?w=226&h=171'"/>
          <div class="mark">
            <p class="name">{{item.name}}</p>
          </div>
        </div>
        <div class="data-show">
          <p class="to-config">地上层数：{{item.upperFloors}}</p>
          <p class="to-config">地下层数：{{item.downFloors}}</p>
        </div>
        <div class="list-button">
          <div class="delete-btn" @click="deleteBuilding(index)">删除</div>
          <div class="edit-btn" @click="editBuilding(index)">编辑</div>
        </div>
      </div>
    </div>
  </div>
  <div class="" >
    <building-detail :visible="isVisible" :model="editBuildingData" :title="dialogTitle" @dialogState="dialogState" @save="saveBuilding"></building-detail>
  </div>
</section>
</template>

<script>
import {
  panelTitle
} from 'components'
import buildingDetail from './building_detail'
import { sessionStorage } from 'common/storage'

export default {
  data(){
    return {
      loadData:true,
      listData:[],
      isVisible:false,
      dialogTitle:'新建楼宇',
      editBuildingData:{name:'',upperFloors:'',downFloors:''},
    }
  },
  components: {
    panelTitle,
    buildingDetail
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      this.loadData = true;
      this.$fetch.api_project.building_list({projectId:1})
      .then(data => {
        this.listData = data.data;
        this.loadData = false
      })
      .catch(() => { this.loadData = false; })
    },
    deleteBuilding(i){
      this.$confirm('你确认要删除该项目吗?',{
        confirmButtonText:'确认删除',
        type:'warning'
      })
      .then(() => {
        this.listData.splice(i,1)
        this.$message.success('删除成功!')
      })
      .catch(() => {
        this.$message.info('已取消删除!')
      })
    },
    createBuilding(){
      this.isVisible = true;
      this.dialogTitle = '新建楼宇'
      this.editBuildingData = {name:'',upperFloors:'',downFloors:''}
    },
    editBuilding(i){
      this.dialogTitle = '编辑楼宇';
      this.editBuildingData = {
        'name':this.listData[i].name,
        'upperFloors':this.listData[i].upperFloors,
        'downFloors':this.listData[i].downFloors,
      }
      this.isVisible = true;
      sessionStorage.set('project_building_index',i)
    },
    dialogState(val){
      this.isVisible = val;
    },
    saveBuilding(data){
      // 根据 title 编辑是新建还是编辑
      if(this.dialogTitle === '新建楼宇'){
        this.listData.push(data)
      }
      if(this.dialogTitle !== '新建楼宇'){
         var i = sessionStorage.get('project_building_index')
         if(i){
           this.listData[i] = data
           sessionStorage.remove('project_building_index')
         }
      }
    }
  }

}
</script>

<style lang="scss">
  .list-container{
    position:relative;
    width: 228px;
    float: left;
    margin:0 16px 25px 0;
    .picture{
      position: relative;
      height:171px;
      padding: 8px 8px 0;
      img{
        width:100%;
        height: 100%;
      }
      .mark{
        position: absolute;
        left:8px;
        right:8px;
        top:8px;
        height:171px;
        background-color: rgba(51,51,51,.3);
      }
      .name{
        position: absolute;
        top:50%;
        left:0;
        right:0;
        transform: translate(0,-50%);
        color:#fff;
        padding: 4px;
        text-align: center;
        font-size: 14px;
      }
    }
    .data-show{
      padding-top: 20px;
      height: 114px;
      line-height: 20px;
      text-align: center;
      font-size: 14px;
      box-sizing: border-box;
      .to-config{
        padding: 0 10px;
      }
      .not-config{
        color:#f17b57;
      }
      .state{
        color:#5e67a5;
      }
    }
    .list-button{
      height: 39px;
      line-height: 39px;
      text-align: center;
      background-color: #5e67a5;
      .delete-btn{
        color:#fff;
        float: left;
        width:50%;
        border-right: 1px solid #fff;
        box-sizing: border-box;
        font-weight: 300;
        text-decoration: none;
        cursor: pointer;
      }
      .edit-btn{
        color:#fff;
        float: left;
        width:50%;
        font-weight: 300;
        text-decoration: none;
        cursor: pointer;
      }
    }
  }











</style>
