import request from '@/utils/request'
//注册请求

export function register(data){   //post data提交 get parasms 提交
  return request({
    url: '/user/register',
    method: 'post',
    data,
    headers:{
      "Content-Type": "application/json"
    },
  })
}
//登录请求
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
    headers:{
      "Content-Type": "application/json"
    },
  })
}
//管理员修改用户信息
export function editUserInfo(data) {
  return request({
    url:'/user/editUserInfo',
    method:'put',
    data
  })
}

//管理员修改用户信息
export function userEditPassword(data) {
  return request({
    url:'/user/userEditPassword',
    method:'put',
    data
  })
}

//普通用户修改信息
export function userEditProfile(data) {
  return request({
    url:'/user/userEditProfile',
    method:'put',
    data
  })
}



//修改用户状态
export function editUserState(data){
  return request({
    url:'/user/editUserState',
    method:'put',
    data
  })
}

//上传修改用户头像
export function updateAvatar(data){
  return request({
    url:'/user/updateAvatar',
    method:'put',
    data
  })
}

//查询用户信息
export function searchUser(params){
  let keyword =  params.keyword
  return request({
    url:'/user/searchUser',
    method:'get',
    params:{
      keyword
    }
  })

}


//获取用户信息
export function getInfo(token) {
  return request({
    url: '/user/getInfo',
    method: 'get',
    params: { token }
  })
}

//获取所有用户信息  仅管理员可查
export function getUserList(params){
  return request({
    url:'/user/getUserList',
    methods:'get',
    params,
  })
}


//用户登出请求
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

//删除用户请求接口
export function deleteUser(params){
  return request({
    url:'/user/deleteUser/' + params,
    method:'delete',
  })
}