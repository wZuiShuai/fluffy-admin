import http from '@/api'
import { Login,ResPages } from '@/interface'

export const loginApi = (params: Login.ReqLoginForm) => {
    return http.post<Login.ResLogin>('/user/login', params)
}
// http://golf.zhenyujm.com/admin/user/profile
export const getPages = () => http.get<ResPages>('/user/profile')