<template>
    <div class="login_container">
        <!-- logo区域 -->
        <div class="logo">
            <img src="../assets/logo.png" alt="">
        </div>
        <!-- 表单区域 -->
        <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" label-width="0px" class="loginForm_style">
            <!-- 登录名称 -->
            <el-form-item prop="username">
                <el-input v-model="loginForm.username">
                    <!-- 使用slot为输入框username加上小图标 -->
                    <i slot="prefix" class="iconfont icon-user"></i>
                </el-input>
            </el-form-item>
            <!-- 登录密码 -->
            <el-form-item prop="password">
                <el-input v-model="loginForm.password" type="password">
                    <!-- 使用slot为输入框password加上小图标 -->                    
                    <i slot="prefix" class="iconfont icon-3702mima"></i>
                </el-input>
            </el-form-item>
            <!-- 登录和重置的按钮 -->
            <el-form-item class="bts">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="info" @click="resetForm">重置</el-button>                
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loginForm:{
                username:'',
                password:''
            },
            // 表单校验 
            loginFormRules: {
                // 登录名称校验规则
                username: [
                    { required: true, message: '请输入登录名称', trigger: 'blur' },
                    { min: 3, max: 8, message: '登录名称长度在3到8个字符', trigger: 'blur' }
                ],
                // 登录密码校验规则
                password: [
                    { required: true, message: '请输入登录密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '密码长度在6到15个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        resetForm(){
            this.$refs.loginFormRef.resetFields()
        },
        login(){
            // 验证表单 
            this.$refs.loginFormRef.validate(async valid=>{
                // console.log(valid)
                // 验证失败立即return
                if(!valid) return 
                // 发起登录请求
                const {data: res} = await this.$http.post('login',this.loginForm)
                console.log(res)
                // 登录失败
                if(res.meta.status !== 200) return this.$message.error('登录失败')
                // 登录成功
                this.$message.success('登录成功')
                // 把token存到sessionStorage中,供后续接口使用
                window.sessionStorage.setItem('token',res.data.token)
                // 跳转到后台主页
                this.$router.push('/home')

            })
        }
    },
}
</script>
<style lang="less" scoped>
.login_container{
    width: 450px;
    height: 304px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 5px;
    .logo{
        width: 130px;
        height: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 8px;
        box-shadow: 0 0 10px #eee;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-60px);
        background-color: #fff;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
    .loginForm_style{
        padding: 0 20px;
        margin-top: 100px;
    }
    .bts{
        display: flex;
        justify-content: flex-end;
    }
}
</style>
