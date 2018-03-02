// /**
//  * @file: project.
//  * @intro: 项目请求数据配置.
//  * @author: liyang.
//  * @email: 1184785075@qq.com
//  * @Date: 2018/2/27 15:18.
//  * @Copyright(©) 2018 by liyang.
//  *
//  /

import fetch from 'common/fetch'
import {port_project} from 'common/port_uri'

// 项目列表
export function project_list(data) {
 return fetch({
   url: port_project.project,
   method: 'get',
   data
 })
}

// 项目详情
export function project_detail(data) {
 return fetch({
   url: port_project.project_detail,
   method: 'get',
   data
 })
}

// 保存项目信息
export function save_project(data) {
 return fetch({
   url: port_project.save_project,
   method: 'put',
   data
 })
}

// 项目下楼宇列表
export function building_list(data) {
 return fetch({
   url: port_project.project_building,
   method: 'get',
   data
 })
}
