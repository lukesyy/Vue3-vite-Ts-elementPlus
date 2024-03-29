import { request } from '@/utils/http/request'

// 登录方法
export function login(params?: Recordable) {
    return request({
        url: '/loginval',
        method: 'get',
        params
    })
}

// 刷新方法
export function refreshToken() {
    return request({
        url: '/auth/refresh',
        method: 'post'
    })
}

// 获取用户详细信息
export function getInfo() {
    return request({
        url: '/system/user/getInfo',
        method: 'get'
    })
}

// 退出方法
export function logout() {
    return request({
        url: '/auth/logout',
        method: 'delete'
    })
}

// 获取验证码
export function getCodeImg() {
    return request({
        url: '/code',
        method: 'get',
        timeout: 20000
    })
}
