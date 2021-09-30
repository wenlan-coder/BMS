import request from '@/utils/request'

//返回借阅天数
export function getLimitDay(){
    return request({
        url:"/limit/getday",
        method:"get",
    })
}

