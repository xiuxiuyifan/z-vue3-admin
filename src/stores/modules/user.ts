// 用户身份登录相关的

import { login } from '@/api/user'
import type { LoginParams } from '@/api/userModel'
import router from '@/router'
import type { UserInfo } from '@/types/store'
import localforage from 'localforage'
import { defineStore } from 'pinia'

interface UserState {
  userInfo: Nullable<UserInfo>
  token: string
}

export const useUserStore = defineStore('app-user', {
  state: (): UserState => {
    return {
      userInfo: null,
      token: ''
    }
  },
  actions: {
    // 更改 state 的值 设置 token
    setToken(token: string) {
      this.token = token
      localforage.setItem('token', token)
    },
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
      localforage.setItem('userInfo', userInfo)
    },
    // 登录函数
    async login(params: LoginParams) {
      const res: any = await login(params)
      // 这块可以后期给 axios 添加类型补充
      this.setToken(res.token)
      this.setUserInfo(res.userInfo)
      // 跳转到首页
      router.push('/')
    }
  }
})
