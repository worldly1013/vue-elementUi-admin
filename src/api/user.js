/**
 * @file: user.
 * @intro: 用户请求数据配置.
 * @author: zzmhot.
 * @email: zzmhot@163.com.
 * @Date: 2017/5/8 15:18.
 * @Copyright(©) 2017 by zzmhot.
 *
 */

import fetch from 'common/fetch'
import {port_user} from 'common/port_uri'

//登录
export function login(data) {
  return fetch({
    url: port_user.login,
    method: 'post',
    data
  })
}
//登出
export function logout() {
  return fetch({
    url: port_user.logout,
    method: 'post'
  })
}
//查询用户列表
export function search_list(data) {
  return fetch({
    url: port_user.search_list,
    method: 'get',
    data
  })
}
//获取单个用户信息  id
export function mes(data) {
  return fetch({
    url: port_user.mes,
    method: 'get',
    data
  })
}
//新增用户
export function add(data){
  return fetch({
    url: port_user.add,
    method:'post',
    data
  })
}
//编辑用户
export function edit(data){
  return fetch({
    url: port_user.edit,
    method:'put',
    data
  })
}
//删除用户
export function del(data){
  return fetch({
    url: port_user.del,
    method:'delete',
    data
  })
}
//启用/禁用用户
export function valid(data){
  return fetch({
    url: port_user.valid,
    method:'put',
    data
  })
}
