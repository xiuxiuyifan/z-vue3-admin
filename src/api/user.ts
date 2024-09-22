import service from '@/utils/request'
import type { LoginParams } from './userModel'

export const getRandomImage = () => {
  return service({
    url: '/sys/randomImage/' + '1629428467008',
    params: {
      t: new Date().getTime()
    }
  })
}

export const login = (params: LoginParams) => {
  return service({
    method: 'post',
    url: '/sys/login',
    data: {
      ...params,
      checkKey: 1629428467008
    }
  })
}
