<template>
  <div class="left-side">
    <div class="left-side-inner">
      <router-link to="/" class="logo block">
        <img src="./images/logo.png" alt="AdminX">
      </router-link>
      <el-menu
        class="menu-box"
        theme="dark"
        router
        :default-active="$route.path">
        <div
          v-for="(item, index) in nav_menu_data"
          :key="index">
          <el-menu-item
            class="menu-list"
            v-if="typeof item.child === 'undefined'"
            :index="item.path">
            <i class="icon fa" :class="item.icon"></i>
            <span v-text="item.title" class="text"></span>
          </el-menu-item>
          <el-submenu
            :index="item.path"
            v-else>
            <template slot="title">
              <i class="icon fa" :class="item.icon"></i>
              <span v-text="item.title" class="text"></span>
            </template>
            <el-menu-item
              class="menu-list"
              v-for="(sub_item, sub_index) in item.child"
              :index="sub_item.path"
              :key="sub_index">
              <!--<i class="icon fa" :class="sub_item.icon"></i>-->
              <span v-text="sub_item.title" class="text"></span>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default{
    name: 'slide',
    data(){
      return {
        nav_menu_data: [
          {
            title: "主页",
            path: "/home",
            icon: "fa-home"
          },
          {
            title: "表格管理",
            path: "/table",
            icon: "fa-table",
            child: [
              {
                title: "排序表格",
                path: "/table/sort"
              },
              {
                title: "拖拽表格",
                path: "/table/drag"
              },
              {
                title: "内嵌编辑表格",
                path: "/table/inlineEdit"
              },
            ]
          },
          {
            title: "图表管理",
            path: "/charts",
            icon: "fa-bar-chart-o",
            child: [
              {
                title: "柱状图表",
                path: "/charts/bar"
              }
            ]
          },
          {
            title: "资源管理",
            path: "/resource",
            icon: "el-icon-document",
            child: [
              {
                title: "图片上传",
                path: "/resource/upload"
              },
              {
                title: "Excel导出",
                path: "/resource/excelExport"
              },
              {
                title: "富文本",
                path: "/resource/editor"
              },
              {
                title: "Markdown",
                path: "/resource/markdown"
              },
              {
                title: "AMap",
                path: "/resource/amap"
              }
            ]
          },
          {
            title: "项目实例",
            path:"/config",
            icon:"el-icon-bell",
            child:[
              {
                title:"组织架构",
                path:"/config/organization"
              },
              {
                title:"用户管理",
                path:"/config/user"
              },
              {
                title:"项目配置",
                path:"/config/project"
              },

            ]
          }
        ]
      }
    }
  }
</script>
