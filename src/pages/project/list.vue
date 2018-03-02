<template>
<section>
  <div class="panel">
    <panel-title title="项目信息">
      <el-button type="primary" icon="plus" size="small" round>
        <router-link :to="{ name:'projectTab',params: {tabIndex:'0'}}" class="color_fff">新建项目</router-link>
      </el-button>
    </panel-title>

    <div class="panel-body" v-loading="loadData" element-loading-text="拼命加载中" style="minHeight:100px;">
      <div class="list-container outer_shadow container_hover" v-for="(item,index) in projectListData">
        <div class="picture">
          <img :src="item.preview+'?w=226&h=171'" />
          <div class="mark">
            <p class="name">{{item.name}}({{item.building}})</p>
          </div>
        </div>
        <div class="data-show">
          <!-- 如果配置在第三阶段  则显示出工位、车位和面积  第三阶段表示项目已配置完成 -->
          <p class="to-config" v-if="item.configPhase == '3'">面积：{{item.acreage | formatNum}}m²</p>
          <p class="to-config" v-if="item.configPhase == '3'">工位／{{item.wpCount}}个</p>
          <p class="to-config" v-if="item.configPhase =='3'">车位／{{item.stCount}}个</p>

          <p class="to-config" v-if="item.configPhase == '1'">项目信息</p>
          <p class="not-config" v-if="item.configPhase == '1'">楼宇楼层配置、单元配置</p>
          <p class="to-config" v-if="item.configPhase == '2'">项目信息、楼宇楼层配置</p>
          <p class="not-config" v-if="item.configPhase == '2'">单元配置</p>
          <span class="state">
					{{item.configState == 'FN' ? '完成' : '未完成'}}
				</span>
        </div>
        <div class="list-button">
          <router-link class="color_fff" :to="{ name: 'projectTab', params: {tabIndex:item.configPhase,id:item.id} }" v-if="item.configState == 'FN'">查看/编辑</router-link>
          <div class="delete-btn" v-if="item.configState !== 'FN'" @click="deleteProject(index)">删除</div>
          <router-link class="edit-btn" :to="{ name: 'projectTab', params: {tabIndex:item.configPhase,id:item.id} }" v-if="item.configState !== 'FN'">编辑</router-link>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import {
  panelTitle
} from 'components'

export default {
  data(){
    return {
      loadData:true,
      projectListData:[]
    }
  },
  components: {
    panelTitle
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      this.loadData = true;
      this.$fetch.api_project.project_list()
      .then(data => {
        this.projectListData = data.data;
        this.loadData = false
      })
      .catch(() => { this.loadData = false; })
    },
    deleteProject(i){
      this.$confirm('你确认要删除该项目吗?',{
        confirmButtonText:'确认删除',
        center: true
      })
      .then(() => {
        this.projectListData.splice(i,1)
        this.$message.success('删除成功!')
      })
      .catch(() => {
        this.$message.info('已取消删除!')
      })
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
    border:1px solid #fff;
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
      }
    }
  }












</style>
