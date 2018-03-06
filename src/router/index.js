/**
 * Created by zzmhot on 2017/3/23.
 *
 * 路由Map
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/23 18:30
 * @Copyright(©) 2017 by zzmhot.
 *
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//import components
//view page warp component
import viewPageComponent from 'pages/App'

//home
import homeComponent from 'pages/home'
//404
import noPageComponent from 'pages/error/404'
//login
import loginComponent from 'pages/user/login'


//sort table
import sortTableComponent from 'pages/table/sort'
//drag table
import dragTableComponent from 'pages/table/drag'
//inlineEdit table
import inlineEditTableComponent from 'pages/table/edit'



//bar charts
import barChartsComponent from 'pages/charts/bar'

//imageUpload
import imageUploadComponent from 'pages/resource/upload'
//editor
import editorComponent from 'pages/resource/editor'
//markdown
import markdownComponent from 'pages/resource/markdown'

//user list
import userListComponent from 'pages/user/list'
//user edit
import userEditComponent from 'pages/user/edit'
//user add
import userAddComponent from 'pages/user/add'

//project list
import projectListComponent from 'pages/project/list'
//project message
import projectTabComponent from 'pages/project/tab'


Vue.use(VueRouter)

//使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),
const routes = [
  {
    path: '/404',
    name: 'notPage',
    component: noPageComponent
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/user/login',
    name: 'login',
    component: loginComponent
  },
  {
  path: '/',
  redirect: '/home',
  component: viewPageComponent,
  children: [
    {
      path: '/home',
      name: 'home',
      component: homeComponent,
      meta: {
        title: "主页",
        auth: true
      }
    },
    {
      path: '/table/sort',
      name: 'tableSort',
      component: sortTableComponent,
      meta: {
        title: "排序表格",
        auth: true
      }
    },
    {
      path: '/table/drag',
      name: 'tableDrag',
      component: dragTableComponent,
      meta: {
        title: "拖拽表格",
        auth: true
      }
    },
    {
      path: '/table/inlineEdit',
      name: 'tableDrag',
      component: inlineEditTableComponent,
      meta: {
        title: "编辑表格",
        auth: true
      }
    },
    {
      path: '/charts/bar',
      name: 'chartsBar',
      component: barChartsComponent,
      meta: {
        title: "柱状图表",
        auth: true
      }
    },
    // 图片上传
    {
      path: '/resource/upload',
      name: 'imageUpload',
      component: imageUploadComponent,
      meta: {
        title: "图片上传",
        auth: true
      }
    },
    // 富文本编辑器
    {
      path: '/resource/editor',
      name: 'editor',
      component: editorComponent,
      meta: {
        title: "富文本编辑器",
        auth: true
      }
    },
    // markdown
    {
      path: '/resource/markdown',
      name: 'markdown',
      component: markdownComponent,
      meta: {
        title: "markdown",
        auth: true
      }
    },
    // 用户模块
    {
      path:'/config/user',
      name:'user',
      component:userListComponent,
      meta:{
        title:"用户列表",
        auth:true
      }
    },
    // 用户编辑
    {
      path:'/config/user/edit/:id',
      name:'userEdit',
      component:userEditComponent,
      meta:{
        title:"用户编辑",
        auth:true
      }
    },
    // 用户新增
    {
      path:'/config/user/add',
      name:'userAdd',
      component:userAddComponent,
      meta:{
        title:"用户新增",
        auth:true
      }
    },
    // 项目列表
    {
      path:'/config/project',
      name:'project',
      component:projectListComponent,
      meta:{
        title:"项目列表",
        auth:true
      }
    },
    // 项目详情
    {
      path:'/config/project/tab',
      name:'projectTab',
      component:projectTabComponent,
      meta:{
        title:"项目配置",
        auth:true
      }
    }
  ]
}]

const router = new VueRouter({
  routes,
  mode: 'hash', //default: hash ,history
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {
  NProgress.done().start()
  let toName = to.name
  // let fromName = from.name
  let is_login = store.state.user_info.login

  if (!is_login && toName !== 'login') {
    next({
      name: 'login'
    })
  } else {
    if (is_login && toName === 'login') {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
})

//路由完成之后的操作
router.afterEach(route => {
  NProgress.done()
})

export default router
