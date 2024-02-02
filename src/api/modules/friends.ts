import request from '../index'
const getList = (status:number) =>{
    return request.get(`/friends/getList?status=${status}`)
}
const findFriends = (account:string) =>{
    return request.get(`/friends/searchFriends?account=${account}`)
}
const addFriend = (params) =>{
    return request.post(`/friends/addFriends`,params)
}
const getApplyList = () =>{
    return request.get(`/friends/getApplyList`)
}
export default {
    getList,
    findFriends,
    addFriend,
    getApplyList
}