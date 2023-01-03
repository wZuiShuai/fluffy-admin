import http from "@/api"
import { Login } from "@/interface"

export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>(`/login`, params)
}
