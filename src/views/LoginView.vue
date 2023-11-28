<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import type { FormInstance, FormRules } from "element-plus";
import { useLoginStore } from "@/stores/loginStore";
const loginStore = useLoginStore();

interface RuleForm {
    username: string;
    password: string;
    verify: string;
}

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
    username: "wangluqi",
    password: "1q2q3q4q",
    verify: ""
});

const rules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 6, max: 10, message: "长度6-10位", trigger: "blur" }
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 8, max: 16, message: "长度8-16位", trigger: "blur" }
    ],
    verify: [
        { required: true, message: "请输入验证码", trigger: "blur" },
        { min: 4, max: 4, message: "长度4位", trigger: "blur" }
    ]
});

//登录
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            let data = loginStore.Login(ruleForm);
            console.log(data);
            
        } else {
            console.log("error submit!", fields);
        }
    });
};


// 验证码
const capImage = ref("");

async function getCapImage() {
    axios.get("/capImage").then(res => {
        capImage.value = res.data.data.capImage;
    });
}
onMounted(getCapImage);
</script>
<template>
    <div class="flex justify-center bg-[#F0F2F5] h-[100vh]">
        <div class="text facebook-page">
            <h1>Facebook</h1>
            <p>Connect with friends and the world</p>
            <p>around you on Facebook.</p>
        </div>
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="60px"
            class="demo-ruleForm"
            size="large"
            status-icon
            :hide-required-asterisk="true"
            style="padding: 20px; margin: 0">
            <el-form-item
                label="用户名"
                prop="username"
                style="margin: 18px 0">
                <el-input
                    type="text"
                    v-model="ruleForm.username"
                    style="height: 50px" />
            </el-form-item>

            <el-form-item
                label="密码"
                prop="password"
                style="margin: 18px 0">
                <el-input
                    type="password"
                    v-model="ruleForm.password"
                    style="height: 50px" />
            </el-form-item>
            <el-form-item
                label="验证码"
                prop="verify"
                style="margin: 18px 0">
                <el-input
                    type="text"
                    v-model="ruleForm.verify"
                    style="height: 50px" />
                <el-image
                    :src="capImage"
                    @click="getCapImage" />
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="submitForm(ruleFormRef)">
                    登录
                </el-button>
            </el-form-item>
        </el-form>
        <!--        <form action="#">-->
        <!--            <input type="email" placeholder="Email or phone number" required>-->
        <!--            <input type="password" placeholder="Password" required>-->
        <!--            <div class="link">-->
        <!--                <button type="submit" class="login">Login</button>-->
        <!--                <a href="#" class="forgot">Forgot password?</a>-->
        <!--            </div>-->
        <!--            <hr>-->
        <!--            <div class="button">-->
        <!--                <a href="#">Create new account</a>-->
        <!--            </div>-->
        <!--        </form>-->
    </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
}

.flex {
    display: flex;
    align-items: center;
    padding: 0 300px;
}

.container {
    padding: 0 100px;
    min-height: 100vh;
    background: #f0f2f5;
}

.facebook-page {
    justify-content: space-between;
    max-width: 1000px;
    width: 100%;
}

.facebook-page .text {
    margin-bottom: 90px;
}

.facebook-page h1 {
    color: #1877f2;
    font-size: 4rem;
    margin-bottom: 10px;
}

.facebook-page p {
    font-size: 1.75rem;
    white-space: nowrap;
}

form {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow:
        0 2px 4px rgba(0, 0, 0, 0.1),
        0 8px 16px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
}

form input {
    height: 55px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin-bottom: 15px;
    font-size: 1rem;
    padding: 0 14px;
}

form input:focus {
    outline: none;
    border-color: #1877f2;
}

::placeholder {
    color: #777;
    font-size: 1.063rem;
}

.link {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 15px;
}

.link .login {
    border: none;
    outline: none;
    cursor: pointer;
    background: #1877f2;
    padding: 15px 0;
    border-radius: 6px;
    color: #fff;
    font-size: 1.25rem;
    font-weight: 600;
    transition: 0.2s ease;
}

.link .login:hover {
    background: #0d65d9;
}

form a {
    text-decoration: none;
}

.link .forgot {
    color: #1877f2;
    font-size: 0.875rem;
}

.link .forgot:hover {
    text-decoration: underline;
}

hr {
    border: none;
    height: 1px;
    background-color: #ccc;
    margin-bottom: 20px;
    margin-top: 20px;
}

.button {
    margin-top: 25px;
    text-align: center;
    margin-bottom: 20px;
}

.button a {
    padding: 15px 20px;
    background: #42b72a;
    border-radius: 6px;
    color: #fff;
    font-size: 1.063rem;
    font-weight: 600;
    transition: 0.2s ease;
}

.button a:hover {
    background: #3ba626;
}

@media (max-width: 900px) {
    .facebook-page {
        flex-direction: column;
        text-align: center;
    }

    .facebook-page .text {
        margin-bottom: 30px;
    }
}

@media (max-width: 460px) {
    .facebook-page h1 {
        font-size: 3.5rem;
    }

    .facebook-page p {
        font-size: 1.3rem;
    }

    form {
        padding: 15px;
    }
}
</style>
