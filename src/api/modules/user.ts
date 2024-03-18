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
const getInfo = (uuid?:string) =>{
    if(uuid){
        return request.get(`/users/getUserInfo?uuid=${uuid}`)
    }

    return request.get(`/users/getUserInfo`)
}
const getPublicKey = ()=>{
    return request.get(`/users/getPublicKey`)
}
export default {
    register,
    login,
    editUserInfo,
    getInfo,
    getPublicKey
}