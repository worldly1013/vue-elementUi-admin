/**
 * Created by zzmhot on 2017/3/24.
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/24 16:50
 * @Copyright(©) 2017 by zzmhot.
 *
 */

//获取url参数
const parseQueryString = (url) => {
  var reg_url = /^[^\?]+\?([\w\W]+)$/,
    reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
    arr_url = reg_url.exec(url),
    ret = {}
  if (arr_url && arr_url[1]) {
    var str_para = arr_url[1], result;
    while ((result = reg_para.exec(str_para)) != null) {
      ret[result[1]] = result[2]
    }
  }
  return ret
}

import Mock from 'mockjs'
import {port_code, port_table} from 'common/port_uri'

// 姓名	性别	年龄	生日	地址

const data_list = [{
  'id|10-100': 1,
  'name': '@cname',
  'sex': '@pick([1, 2])',//1男，2女
  'age|20-25': 20,
  'birthday': '@date("yyyy-MM-dd")',
  'address': '@county(true)',
  'zip': '@zip'
}]

const articalTitle = function(){
  const data = [
    '习近平代表的两会故事 理上网来',
    '高铁里程占世界三分之二 热点城市房价涨势得到控制',
    '优选装修好工长省心',
    '范冰冰未来感大片 易烊千玺率性街头风',
    '佛罗伦萨队长去世 本轮比赛延后 斯内德退出荷兰队',
    '政府工作报告实录来了 今年个税改革这么改',
    '中国将提高个人所得税起征点 稳妥推进房地产税立法',
    '空军少将李勇晋升副战区级 曾任中部战区副参谋长',
    '我国重型火箭500吨级发动机样机年内问世',
    '工行等多家银行被罚 监管层2月份开307张罚单',
    '原31军副军长姚思忠逝世 享年95岁',
    '李克强正在回顾五年成就 核心数据都在这里',
    '中国新型政党制度的启示',
    '政府依法行政 社会奉法行事',
    '红海行动不止是电影 更是国家行为'
  ]
  let random = Math.floor(Math.random() * 10)
  return data[random]
}

const drag_list_data = [{
  'id|10-100': 1,
  'time': '@date("yyyy-MM-dd")',
  'title':articalTitle,
  'name': '@cname',
  'important|1':[1,2,3,4],
  'read|1-100000':100000
}]

Mock.mock(new RegExp(port_table.list), ({url}) => {
  const params = parseQueryString(url)
  return Mock.mock({
    code: port_code.success,
    msg: '获取成功',
    data: {
      [`result|${params.length}`]: data_list,
      page: Number.parseInt(params.page),
      'total': 30
    }
  })
})

Mock.mock(new RegExp(port_table.drag_list), ({url}) => {
  const params = parseQueryString(url)
  return Mock.mock({
    code: port_code.success,
    msg: '获取成功',
    data: {
      [`result|${params.length}`]: drag_list_data,
      page: Number.parseInt(params.page),
      'total': 30
    }
  })
})

Mock.mock(new RegExp(port_table.get), {
  code: port_code.success,
  msg: '获取成功',
  data: data_list[0]
})

Mock.mock(new RegExp(port_table.del), {
  code: port_code.success,
  msg: '删除成功'
})

Mock.mock(new RegExp(port_table.save), {
  code: port_code.success,
  msg: '操作成功'
})

Mock.mock(new RegExp(port_table.batch_del), {
  code: port_code.success,
  msg: '批量删除成功'
})
