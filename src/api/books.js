import request from '@/utils/request'


//新增图书的接口
export function  createBooks(data) {
    return request({
        url:"/books/createBooks",
        method:"post",
        data
    })
    
}
//删除图书列表
export function deleteBooks(params){
    return request({
        url:"/books/deleteBooks/" + params,
        method:"delete",
 
    })
}

//根据书名 或者isbn 或作者 搜索图书
export function searchBooks(params){
    // 
    return request({
        url:"/books/searchBooks",
        method:"get",
        params
 
    })
}

// const handleLogin = async() => {
//     let res = await(searchBooks)
//     console.log(res);
// }



//获取图书列表
export function getBooksList() {
    return request({
      url: '/books/list',
      method: 'get',
    })
  }

  export function updateBooks(data){
      return request({
          url:'/books/updateBooks',
          data,
          method:"put"
      })
  }





  //分页获取book数据
 export function accountlistbypage(params){
    return request({
        url: '/books/list',
        method: 'get',
        params
      })
 } 
 //查询不同分类下的数据接口
export function selectCategory(params){
    return request({
      url:"/books/selectCategory",
      method:"get",
      params
  
    })
  }
  