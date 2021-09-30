import request from '@/utils/request'

//获取所有分类接口
export function getCategoryList() {
  return request({
    url: '/category/list',
    method: 'get',
  })
}
//新增分类的接口
export function insertCategory(data){
  return request({
    url:'/category/insertCategory',
    method:'post',
    data

  })
}
//删除分类接口
export function deleteCategory(params){
  return request({
    url:"/category/deleteCategory/" + params,
    method:"delete"
  })
}
//修改分类接口
export function updateCategory(data){
  return request({
    url:"/category/updateCategory",
    method:"put",
    data
  })
}
