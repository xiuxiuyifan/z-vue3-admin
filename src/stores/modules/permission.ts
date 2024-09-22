// 权限菜单相关的

import { defineStore } from 'pinia'

export const usePermissionStore = defineStore('app-permission', {
  state: () => {
    return {}
  },
  actions: {
    // 登录之后通过 token 信息获取用户权限信息，在路由拦截里面
    async getPermissionByToken() {}
  }
})
