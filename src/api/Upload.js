import request from '@/utils/request'

export function addBooksCover(data){
    return request({
        url:"/fileUpload/uploadBooksCover",
        method:"post",
        header: { 'Content-Type': 'multipart/form-data' },
        data
    })
}
