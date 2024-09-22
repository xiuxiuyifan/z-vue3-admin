<script lang="ts" setup>
import { getRandomImage } from '@/api/user'
import type { LoginParams } from '@/api/userModel'
import { useUserStore } from '@/stores/modules/user'
import { ref, computed, onMounted, unref } from 'vue'

// 数据源
const loginForm = ref<LoginParams>({
  username: 'jeecg',
  password: 'jeecg#123456',
  captcha: ''
})
// 验证规则
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: computed(() => {
        return '请输入用户名'
      })
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule: any, value: any, callback: any) => {
        if (value.length < 6) {
          callback(new Error('密码不能少于6位'))
        } else {
          callback()
        }
      }
    }
  ]
})

// 处理密码框文本显示状态
const passwordType = ref('password')
const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

// 登录动作处理
const loading = ref(false)
const loginFromRef = ref(null)

const { login } = useUserStore()
const handleLogin = () => {
  console.log('hihihi')
  login(unref(loginForm))
}

// 获取随机生成的图片
const randomImageSrc = ref<any>('')
const requestRandomImage = () => {
  getRandomImage().then((res) => {
    randomImageSrc.value = res
  })
}
onMounted(() => {
  requestRandomImage()
})
</script>

<template>
  <div class="login-container">
    <el-form class="login-form" ref="loginFromRef" :model="loginForm" :rules="loginRules">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon name="user" color="#fff" />
        </span>
        <el-input placeholder="username" name="username" type="text" v-model="loginForm.username" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon name="password" color="#fff" />
        </span>
        <el-input
          placeholder="password"
          name="password"
          :type="passwordType"
          v-model="loginForm.password"
        />
        <span class="show-pwd">
          <svg-icon
            color="#fff"
            :name="passwordType === 'password' ? 'eye' : 'eye-open'"
            @click="onChangePwdType"
          />
        </span>
      </el-form-item>

      <el-form-item>
        <el-input
          v-model="loginForm.captcha"
          placeholder="验证码"
          style="width: 100%; position: relative"
        >
          <template #suffix>
            <img
              class="q-code"
              :src="randomImageSrc"
              alt=""
              srcset=""
              @click="requestRandomImage"
            />
          </template>
        </el-input>
      </el-form-item>

      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        :loading="loading"
        @click="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;
      .el-input__wrapper {
        background: unset;
        border: 0;
        box-shadow: none;
        width: 100%;
      }
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
    .q-code {
      width: 115px;
      position: absolute;
      right: 0;
      bottom: 0;
      cursor: pointer;
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    ::v-deep .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
