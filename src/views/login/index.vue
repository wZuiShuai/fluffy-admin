<template>
    <div class="login p-15">
        <div class="loginForm f-center p-15">
            <div class="leftImg">
                <img src="@/assets/images/login_banner.webp" alt="dog" />
            </div>
            <div class="rightForm f-column-between">
                <h4>{{ title }}</h4>
                <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" @keyup.enter="login(loginFormRef)">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" size="large" placeholder="username" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            v-model="loginForm.password"
                            size="large"
                            type="password"
                            placeholder="password"
                            show-password
                        />
                    </el-form-item>
                </el-form>
                <el-button size="large" type="primary" :loading="loading" @click="login(loginFormRef)">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="login">
import { reactive, ref } from 'vue'
import { Login } from '@/api/interface/index'
import { loginApi } from '@/api/modules/login'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { main } from '@/store/index'

const title = import.meta.env.VITE_TITLE // 环境变量中读取

const mainState = main()

// 定义 formRef（校验规则）
const loginFormRef = ref<FormInstance>()

const loginRules = reactive<FormRules>({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [
        {
            required: true,
            min: 6,
            message: '请输入密码且不少于6位',
            trigger: 'blur',
        },
    ],
})

const loginForm = reactive<Login.ReqLoginForm>({
    username: '',
    password: '',
})

const loading = ref<boolean>(false)

const login = async (formEl: FormInstance | undefined) => {
    if (!formEl) {
        return
    }
    await formEl.validate(async (valid) => {
        if (valid) {
            loading.value = true
            try {
                const res = await loginApi(loginForm)
                ElMessage({
                    message: '登录成功',
                    type: 'success',
                })
                mainState.token = res.data.token
                // const resPages = await getPages()
                // console.log(resPages.data.role.menus)

            } finally {
                loading.value = false
            }
        }
    })
}
</script>

<style scoped lang="scss">
.login {
    height: 100%;
    background: url("@/assets/images/login_bg.webp") no-repeat;
    // background-color: var(--el-bg-color);
    background-size: cover;
    display: flex;
    flex-direction: column;

    .loginForm {
        // background-color: var(--el-bg-color);
        background-color: var(--el-bg-color);
        margin: auto;
        border-radius: 0.6rem;
        box-shadow: 0 1px 2px -2px #00000029, 0 3px 6px #0000001f,
            0 5px 12px 4px #00000017;
        min-width: 21.56rem;
        max-width: 43.75rem;

        .leftImg {
            width: 23.75rem;

            img {
                width: 100%;
            }
        }

        .rightForm {
            width: 20rem;
            height: 100%;
            padding: 2.18rem 1.25rem;

            h4 {
                color: rgba(106, 106, 106, 0.6);
                font-weight: 400;
                font-size: 1.5rem;
            }

            .el-form {
                width: 100%;
            }

            .el-button {
                width: 100%;
            }
        }
    }
}
</style>
