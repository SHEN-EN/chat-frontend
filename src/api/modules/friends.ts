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
const agreeApply = (uuid:string) =>{
    return request.put('/friends/agreeApply',{uuid})
}
const clearApplyList = () =>{
    return request.delete('/friends/clearApplyList')
}
const updateFriendNotes = (uuid:string,notes:string) =>{
    return request.put(`/friends/setFriendNotes?uuid=${uuid}&notes=${notes}`)
}
export default {
    getList,
    findFriends,
    addFriend,
    getApplyList,
    agreeApply,
    clearApplyList,
    updateFriendNotes,
}