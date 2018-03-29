/**
 * Created by worldly1013 on 2018/3/4.
 *
 * @author: zzmhot
 * @github: https://github.com/worldly1013/vue-elementUi-admin
 * @email: 1184785075@qq.com
 * @Date: 2017/3/4 20:56
 * @Copyright(©) 2017 by worldly1013.
 *
 */

//用户登录
export const login = "/api/post/user/login"
//用户登出
export const logout = "/api/post/user/logout"
//搜索租户用户列表
export const search_list = "/api/get/tenants/users/_search_create_time"
//新增用户
export const add = "/api/post/tenants/user"
//编辑用户
export const edit = "/api/put/tenants/user"
//删除用户
export const del = "/api/delete/tenants/user"
//获取用户
export const mes = "/api/get/tenants/user"
//启用/禁用用户
export const valid = "/api/put/tenants/user/valid"
