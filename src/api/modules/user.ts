import request from '../index'

const register = (params) =>{
    return request.post('/users/register',params)
}

const login = (params) =>{
    return request.post('/users/login',params)
}
const editUserInfo  = (params) =>{
    return request.put('/users/editUserInfo',params)
}
const getUserInfo = (uuid) =>{
    return request.get(`/users/getUserInfo?uuid=${uuid}`)
}
export default {
    register,
    login,
    editUserInfo,
    getUserInfo
}