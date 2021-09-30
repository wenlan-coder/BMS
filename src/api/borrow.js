import request from '@/utils/request'


//用户借书请求接口
export function borrowBooks(data){
    return request({
        url:"/borrow/borrowBooks",
        method:"post",
        data
    })
}

//延期请求某月之前的数据
export function HistoryfindByTime(params){
    return request({
      url:'/borrow/historyfindByTime',
      method:'get',
      params
    })
  }

//删除记录
export function deleteHistory(params){
    return request({
      url:"/borrow/deleteHistory/" + params,
      method:"delete"
    })
  }

//修改记录
export function editHistory(data){
    return request({
        url:'/borrow/editHistory',
        method:"put",
        data,

    })
}

//用户归还图书请求接口
export function returnBooks(data){
    return request({
        url:"/borrow/returnBooks",
        method:"post",
        data
    })
}


//返回用户借书记录 不带图片
export function userHistory(params){
    return request({
        url:"/borrow/userHistory",
        method:"get",
        params
    })
}
//返回所有用户记录
export function getAllHistory(){
    return request({
        url:"/borrow/getAllHistory",
        method:"get",
    })
}

//返回用户借书记录 带图片
export function userBooksHistory(params){
    return request({
        url:"/borrow/userBooksHistory",
        method:"get",
        params
    })

}