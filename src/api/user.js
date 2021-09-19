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
//获取用户信息
export function getInfo(token) {
  return request({
    url: '/user/getInfo',
    method: 'get',
    params: { token }
  })
}
//用户登出请求
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
