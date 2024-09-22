import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 从 store 中获取 token 信息，赋值给请求头
    config.headers.Authorization = ''
    return config // 必须返回配置
  },
  (error) => {}
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, message, result } = response.data
    //   要根据success的成功与否决定下面的操作
    if (success) {
      return result
    } else {
      // 业务错误
      ElMessage.error(message) // 提示错误消息
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // 处理 token 超时问题
    if (error.response && error.response.data && error.response.data.code === 401) {
      // token超时
    }
    ElMessage.error(error.message) // 提示错误信息
    return Promise.reject(error)
  }
)

export default service
