import request from '../index'
const getList = (uuid,status) =>{
    return request.get(`/friends/getList?uuid=${uuid}&status=${status}`)
}
const findFriends = (account:string,uuid:string) =>{
    return request.get(`/friends/searchFriends?account=${account}&uuid=${uuid}`)
}
const addFriend = (params) =>{
    return request.post(`/friends/addFriends`,params)
}
export default {
    getList,
    findFriends,
    addFriend
}