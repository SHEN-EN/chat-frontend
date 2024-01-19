import request from '../index'
const getList = (params) =>{
    return request.get(`/friends/getList?uuid=${params}`)
}
export default {
    getList
}