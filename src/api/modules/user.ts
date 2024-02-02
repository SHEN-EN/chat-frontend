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
const getUserInfo = () =>{
    return request.get(`/users/getUserInfo`)
}
export default {
    register,
    login,
    editUserInfo,
    getUserInfo
}