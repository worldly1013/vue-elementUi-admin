/**
 * Created by zzmhot on 2017/3/21.
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/21 10:55
 * @Copyright(©) 2017 by zzmhot.
 *
 */

import Mock from 'mockjs'
import {
  port_code,
  port_user
} from 'common/port_uri'

// export const login = "/api/post/user/login"
// Mock.mock(rurl,function(options))
// https://github.com/nuysoft/Mock/wiki/Mock.mock()

var createCompany = function(){
  var data = ['昊楼一','昊楼二','昊楼三','昊楼四','昊楼五','昊楼六','昊楼七','昊楼八','昊楼九','昊楼十']
  var random = Math.floor(Math.random() * 10)
  return data[random] + '信息科技有限公司'
}
var createOrganization = function(){
  var data = ['研发一','研发二','研发三','设计一','运营','产品','业务','销售','测试','设计二']
  var random = Math.floor(Math.random() * 10)
  return data[random] + '部门'
}

var dataList = [{
  'id|+1': 1,
  'account|1': ['Fenzhi1', 'Fenzhi2', 'Fenzhi3', 'Fenzhi4', 'Fenzhi5', 'Fenzhi6', 'Fenzhi7', 'Fenzhi8', 'Fenzhi9', 'Fenzhi10'],
  'phone|1': ['13100000000', '13111111111', '13122222222'],
  'name|1': '@cname',
  'companys|1':createCompany,
  'organization|1':createOrganization,
  'valid|1': ['Y', 'N'],
  'createTime': '@date("yyyy-MM-dd")'
}]

// 登录
Mock.mock(new RegExp(port_user.login), ({
  body
}) => {
  const {
    username,
    account,
    password
  } = JSON.parse(body)

  if (username === 'admin' && account === 'admin' && password === '1234567') {
    return Mock.mock({
      code: port_code.success,
      msg: "登录成功",
      data: {
        'name': '@cname',
        'avatar': 'https://avatars0.githubusercontent.com/u/16893554?v=3&s=240',
        'age|20-25': 20,
        'desc': '@csentence()'
      }
    })
  } else {
    return Mock.mock({
      code: port_code.error,
      msg: "账号或密码错误"
    })
  }
})

// 退出登录
Mock.mock(new RegExp(port_user.logout), {
  code: port_code.success,
  msg: "退出成功"
})

// 查询用户列表
Mock.mock(new RegExp(port_user.search_list), ({body}) => {
  const {page,limit,beginTime,endTime,keyWord} = JSON.parse(body)

  if (page && limit) {
    return Mock.mock({
      code: port_code.success,
      data:{
        [`users|${limit}`]: dataList,
        'page': page,
        'total': 300
      }
    })
  }
})

// 获取单个用户信息  id
Mock.mock(new RegExp(port_user.mes),({body}) => {
  const {id} = JSON.parse(body)
  if(id){
    return Mock.mock({
      code:port_code.success,
      data:{
        'id':id,
        'account|1':['001','002','003','004','005','006','007','008','009','010'],
        'psd':'123456',
        'name|1':'@cname',
        'phone|1':['13100000000', '13111111111', '13122222222'],
        'email|1':['11@qq.com','22@163.com']
      }
    })
  }
})

// 编辑用户  id
Mock.mock(new RegExp(port_user.edit),({body}) => {
  const {account,name,psd,phone,email} = JSON.parse(body)
  if(account && name && psd && phone && email){
    return Mock.mock({
      code:port_code.success,
      msg: '保存成功',
      data:{}
    })
  }
})

// 新增用户
Mock.mock(new RegExp(port_user.add),({body}) => {
  const {account,name,psd,phone,email} = JSON.parse(body)
  if(account && name && psd && phone && email){
    return Mock.mock({
      code:port_code.success,
      msg: '保存成功',
      data:{}
    })
  }
})
