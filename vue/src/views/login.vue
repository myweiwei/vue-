<template>
    <div class='login'>
        <div class='login-inner'>
            <h1>Login</h1>
            <el-form :rules="rules" :model='loginForm' ref="ruleForm" class="demo-ruleForm">
                <el-form-item label="" prop="user">
                    <el-input placeholder="请输入用户名" v-model="loginForm.user" auto-complete="new-password">
                        <i slot="prefix" class="iconfont iconicon"></i>
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input placeholder="请输入密码" v-model="loginForm.password" :type="passwordType" auto-complete="new-password">
                        <i slot="prefix" class="iconfont iconmima"></i>
                        <i slot="suffix" class="iconfont iconbiyan pointer" @click='passwordType=""' v-if='passwordType=="password"'></i>
                        <i slot="suffix" class="iconfont iconeye pointer" @click='passwordType="password"' v-else></i>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click='login'>登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            loginForm:{
                user:'',
                password:''
            },
            rules: {
                user: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            },
            passwordType:'password'
        }
    },
    methods:{
        login:function(){
            let me=this;
            me.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    sessionStorage.setItem('user',me.loginForm.user);
                    sessionStorage.setItem('role',1);
                    if(sessionStorage.getItem('user')){
                        me.$router.push({path:"/index"})
                    }
                }
            })
        }
    },
    created(){
        sessionStorage.clear();
    }
}
</script>
<style lang="scss">
    .login {
        width:100%;
        height:100%;
        background: #2d3a4b;
        display:flex;
        align-items: center;
        justify-content: center;
        .login-inner {
            width:30%;
            h1 {
                font-size: 26px;
                color: #eee;
                margin: 0px auto 40px auto;
                text-align: center;
                font-weight: bold;
            }
            .el-form-item {
                width:100%;
                .el-button {
                    width:100%;
                    background: #46a6ff;
                    border-color: #46a6ff;
                    color: #FFFFFF;
                }
            }
            .el-input__inner {
                border: 1px solid rgba(255, 255, 255, 0.1);
                background: rgba(0, 0, 0, 0.1);
                border-radius: 5px;
                color: #fff;
                height: 50px;
                line-height: 50px;
            }
            .el-form-item__content{
                font-size:17px;
                line-height: 50px;
                left:2%;
                color:#889aa4!important;
            }
            .el-input__suffix-inner i{
                font-size: 20px;
            }
            .el-input__prefix {
                left:3%;
            }
        }
    }
</style>