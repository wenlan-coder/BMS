import request from '@/utils/request'

//请求用户/分类/图书/逾期/总数
export function getCount(){
    return request({
        url:'echart/getCount',
        method:"get",
    })
}
