<template>
    <div class="login">
        <el-form ref="ruleFormRef" :model="loginForm" :rules="loginRules" class="login-form">
            <h3 class="title">hello</h3>
            <el-form-item prop="username">
                <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
                    <i class="el-icon-user"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    v-model="loginForm.password"
                    type="password"
                    auto-complete="off"
                    placeholder="密码"
                    @keyup.enter.native="handleLogin">
                    <i class="el-icon-delete"></i>
                </el-input>
            </el-form-item>
            <el-checkbox v-model="loginForm.rememberMe" style="margin: 0px 0px 25px 0px">记住密码</el-checkbox>
            <el-form-item>
                <el-button
                    :loading="loading"
                    type="primary"
                    style="width: 100%"
                    @click.native.prevent="handleLogin(ruleFormRef)">
                    <span v-if="!loading">登 录</span>
                    <span v-else>登 录 中...</span>
                </el-button>
            </el-form-item>
        </el-form>
        <!--  底部  -->
        <!-- <div class="el-login-footer">
      <span>Copyright © 2018-2022 2022 LuoQi All Rights Reserved.</span>
    </div> -->
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/login'
import Cookies from 'js-cookie'
import { FormInstance, FormRules } from 'element-plus'
import { decrypt, encrypt } from '@/utils/jsencrypt'
const router = useRouter()
const loginRules: object = reactive<FormRules>({
    username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
    password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
    code: [{ required: true, trigger: 'change', message: '请输入验证码' }]
})
let loginForm = reactive({
    username: 'admin',
    password: 'admin123',
    rememberMe: false
})
const loading = ref(false)
const ruleFormRef = ref<FormInstance>()
const getCookie = () => {
    const username = Cookies.get('username')
    const password = Cookies.get('password')
    const rememberMe = Cookies.get('rememberMe')
    loginForm = {
        username: username || loginForm.username,
        password: decrypt(password || '') || loginForm.password,
        rememberMe: Boolean(rememberMe) || false
    }
}
const handleLogin = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(valid => {
        if (valid) {
            loading.value = true
            const { username, password, rememberMe } = loginForm
            if (rememberMe) {
                Cookies.set('username', username, { expires: 30 })
                Cookies.set('password', encrypt(password), { expires: 30 })
                Cookies.set('rememberMe', rememberMe.toString(), { expires: 30 })
            } else {
                Cookies.remove('username')
                Cookies.remove('password')
                Cookies.remove('rememberMe')
            }
            login({ id: username, pwd: password })
                .then(() => {
                    router.push({ path: '/' })
                })
                .catch(req => {
                    console.log(req)
                })
        }
    })
}
onMounted(() => {
    getCookie()
})
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// .bckImg{
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
// }
.login {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-image: url('../assets/images/login.jpg');
    background-size: cover;
    background-repeat: no-repeat;
}
.title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #242323;
}
.el-input__inner {
    height: auto !important;
}
.login-form {
    margin-right: 8%;
    border-radius: 6px;
    background: #ffffff;
    width: 360px;
    padding: 25px 25px 5px 25px;
    .el-input {
        height: 42px;
        input {
            height: 42px;
        }
    }
    .input-icon {
        // height: 39px;
        // width: 14px;
        margin-left: 2px;
    }
}
.login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
}
.login-code {
    width: 33%;
    height: 38px;
    float: right;
    img {
        cursor: pointer;
        vertical-align: middle;
    }
}
.el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
}
.login-code-img {
    height: 38px;
}
</style>

function decrypt(password: string): string { throw new Error("Function not implemented."); } function decrypt(password:
string): string { throw new Error("Function not implemented."); } function encrypt(password: string): string { throw new
Error("Function not implemented."); }
