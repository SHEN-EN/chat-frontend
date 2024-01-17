import request from '../index'

const register = (params) =>{
    return request.post('/users/register',params)
}

const login = (params) =>{
    return request.post('/users/login',params)
}
export default {
    register,
    login
}