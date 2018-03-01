

import Mock from 'mockjs'
import image_url from 'common/data/image'
import {
  port_code,
  port_project
} from 'common/port_uri'

// 项目列表
Mock.mock(new RegExp(port_project.project), () => {
  return Mock.mock({
    code: port_code.success,
    'data|10':[{
      'id|+1': 1,
      'acreage|1-1000000':1000000 ,
      'building|1-10':10,
      'name|1': ['杨贵妃·闻香阁','杨贵妃·望月亭','杨贵妃·思春落','诸葛亮·八卦阵','诸葛亮·孔明灯','诸葛亮·武侯祠'],
      'preview|1':image_url,
      'configPhase|1':[1,2,3],
      'configState|1':['FN','WF'],
      'stCount|1-100':100 ,
      'wpCount|1-100':100
    }]
  })
})

// 保存项目
Mock.mock(new RegExp(port_project.save_project), ({body}) => {
  console.log(body);
  const {name,companyName,address} = JSON.parse(body)
  if(name && companyName && address){
    return Mock.mock({
      code:port_code.success,
      msg:'保存成功',
      data:{}
    })
  }
})

// 项目楼宇列表
Mock.mock(new RegExp(port_project.project_building), ({body}) => {
  const {projectId} = JSON.parse(body)

  console.log(projectId);
  if(projectId){
    return Mock.mock({
      code: port_code.success,
      'data|2':[{
        'buildingId|+1': 1,
        'projectId':projectId,
        'upperFloors|1-100':100,
        'downFloors|1-100':100 ,
        'building|1-10':10,
        'name|1': ['一号楼宇','二号楼宇','三号楼宇','四号楼宇','五号楼宇','六号楼宇','七号楼宇','八号楼宇','九号楼宇','十号楼宇','十一号楼宇'],
        'preview|1':image_url,
      }]
    })
  }
})
