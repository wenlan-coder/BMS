<template>
  <div class="login-container">
     <div class="container">
    <input type="checkbox" id="flip">
    <div class="cover">
      <div class="front">
        <img src="@/assets/login_pages/front.png" alt="">
        <div class="text">
          <!-- <span class="text-1">欢迎进入图书管理系统<br></span>
          <span class="text-2"></span> -->
        </div>
      </div>
      <div class="back">
        <img class="backImg" src="@/assets/login_pages/back.png" alt="">
        <div class="text">
          <!-- <span class="text-1">Complete miles of journey <br> with one step</span>
          <span class="text-2">Let's get started</span> -->
        </div>
      </div>
    </div>
    <div class="forms">
        <div class="form-content">
            <!-- 登录页面 -->
          <div class="login-form">
            <div class="title">图书管理系统</div>
           
          <el-form ref="loginForm" :model="loginForm" class="loginForm"  :rules="loginRules"> 
            <div class="input-boxes">
              <el-form-item  label="" class="input-box" prop="username">
                 <i class="el-icon-user-solid" />
                <input
                name="username"
                ref="username" 
                 type="text"
                 v-model="loginForm.username"
                 placeholder="请输入用户名"
                 auto-complete="on" 
                 />
              </el-form-item>
               <el-form-item class="input-box" prop="password">
                 <i class="el-icon-lock" />
                <input
                ref="password"
                :key="passwordType" 
                 :type="passwordType"
                 v-model.trim="loginForm.password"
                 placeholder="请输入密码"
                 name="password"
                 auto-complete="on"
                 @keyup.enter="handleLogin">
                  <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
             
              </el-form-item>
              <div class="text"><a href="#">忘记密码?</a></div>
              <div class="button input-box">
                 <el-button :loading="loading" @click.native.prevent="handleLogin">Login</el-button>
              </div>
              <div class="text sign-up-text">没有账号? <label for="flip">注册</label></div>
            </div>
        </el-form>
      </div>
      <!-- 注册页面 -->
        <div class="signup-form">
          <div class="title">加入我们吧！</div>
        <el-form ref="registerForm" :model="registerForm" class="registerForm" :rules="registerRules">
            <div class="input-boxes">
              <el-form-item class="input-box" prop="registerName">
                <i class="el-icon-s-custom" />
                <input 
                type="text"
                placeholder="请输入用户名"
                name="registerName"
                v-model="registerForm.registerName"
                >
              </el-form-item>
                             <el-form-item class="input-box" prop="registerPassword">
                <i class="el-icon-lock" />
                <input
                ref="registerPasword" 
                :type="passwordType"
                placeholder="请输入密码并记住"
                name="registerPassword"
                v-model="registerForm.registerPassword"
                >
                <span class="show-pwd" @click="showRegister">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
              </el-form-item>
               <el-form-item class="input-box" prop="registerEmail">
                <i class="el-icon-message" />
                <input
                type="email"
                placeholder="请输入邮箱"
                name="registerEmail"
                v-model="registerForm.registerEmail"
                >
              </el-form-item>
               <el-form-item class="input-box" prop="registerPhone">
                <i class="el-icon-phone" />
                <input 
                type="text"
                placeholder="请输入手机号"
                name="registerPhone"
                v-model="registerForm.registerPhone"
                >
              </el-form-item>
              <div class="button input-box">
                 <el-button @click.native.prevent="handleRegister">注册</el-button>
              </div>
              <div class="text sign-up-text">已有账号 <label for="flip">去登陆</label></div>
            </div>
      </el-form>
    </div>
    </div>
    </div>
  </div>
  </div>
</template>

<script>
import {getInfo, register} from '@/api/user'

export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5||value.length>12) {
        callback(new Error('密码长度在5到12位之间'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username:'admin',
        password:"12345"
      },
      registerForm:{
       roles:'editor',   //用户注册写死权限位为用户普通用户
       registerName:"",
       registerEmail:"",
       registerPhone:"",
       registerPassword:""
      },
      loginRules: {
        username: 
        [{ required: true, trigger: 'blur',message:"用户名不为空" },
         { min:1, max: 12, trigger: 'blur', message: '用户名长度应该在1-12位之间' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      registerRules:{
      registerName:[
        { required: true, message: '用户名不为空', trigger: "blur" },
        { min: 2, max: 12, message: '用户名由5-12位的英文字母或数字或下划线或中文组成', trigger: "blur" }
      ],
       registerEmail:[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
       ],
       registerPhone:[
         { required: true, message: "请输入手机号", trigger: "blur" },
         //手机号/电话号验证 正则
         { pattern:/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: "请输入合法手机号/电话号", trigger: "blur" }
       ],
       registerPassword:[
         { required: true, message: "请输入需要注册安全密码", trigger: "blur" },
         {min:2,max:12,message:"安全密码长度在5到12位之间",trigger:"blur"}

       ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted(){
    this.warnings()

  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
        showRegister() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.registerPasword.focus()
      })
    },

    handleLogin() {
      // console.log(this.loginForm);
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' }) 
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$message.warning('一直点也没用呀！请按提示输入');
          return false
        }
      })
    },
    handleRegister(){
      this.$refs.registerForm.validate(valid=>{
        if(valid){
          console.log("valid success");
          console.log(JSON.stringify(this.registerForm));
          return new Promise((resolve,reject)=>{
            register((this.registerForm)).then((res)=>{
              console.log('res数据',res); //fordebuge
              const {message,type} = res
              // console.log(message);
               this.$message({
               message,
               type,
        });
            resolve()
          }).catch((err)=>{
            console.log(err);
            reject(err.message)
          })

          })
 
        }
        else{
          this.$message.warning('有错误，请仔细检查呦😊！');
          return false
        }

      })
    },
    warnings () {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
          this.$message.warning("移动端体验不好，请用电脑浏览器打开1~")
        }
      },
  }
  
}
</script>
<style lang="scss" scoped>
$bg:#91e5f6;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  width: 100%;
  background-color: $bg;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background:#eee;
  padding: 30px;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins" , sans-serif;
}
// body{
//   min-height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background:violet;
//   padding: 30px;
// }

.container{
  position: relative;
  max-width: 900px;
  width: 100%;
  background:#fff;
  padding: 40px 30px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  perspective: 2700px;
  .cover{
  position: absolute;
  top: 0;
  left: 50%;
  height: 100%;
  width: 50%;
  z-index: 98;
  transition: all 1s ease;
  transform-origin: left;
  transform-style: preserve-3d;
}
}

.container .cover::before{
  content: '';
  position: absolute;
  height: 100%;
  width: 100%;
  background: transparent;
  opacity: 0.5;
  z-index: 100;
}
.container .cover::after{
  content: '';
  position: absolute;
  height: 100%;
  width: 100%;
  background: transparent;
  opacity: 0.5;
  z-index: 100;
  transform: rotateY(180deg);
}
.container #flip:checked ~ .cover{
  transform: rotateY(-180deg);
}
.container .cover img{
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: 12;
  backface-visibility: hidden;
}
.container .cover .back .backImg{
  transform: rotateY(180deg);
  transform: rotateY(180deg);
}
.container .cover .text{
  position: absolute;
  z-index: 111;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.cover .text .text-1,
.cover .text .text-2{
  font-size: 26px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  backface-visibility: hidden;
}
.cover .back .text .text-1,
.cover .back .text .text-2{
  transform: rotateY(180deg);
}
.cover .text .text-2{
  font-size: 15px;
  font-weight: 500;
}
.container .forms{
  height: 100%;
  width: 100%;
  background: #fff;
}
.container .form-content{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-content .login-form,
.form-content .signup-form{
  width: calc(100% / 2 - 25px);
}
.forms .form-content .title{
  position: relative;
  font-size: 24px;
  font-weight: 500;
  color: #333;
}
.forms .form-content .title:before{
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 25px;
  background: $bg;
}
.forms .signup-form  .title:before{
  width: 20px;
}
.forms .form-content .input-boxes{
  margin-top: 30px;
}
.forms .form-content .input-box {
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  margin: 20px 0;
  position: relative;
}
.form-content .input-box input{
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  padding: 0 30px;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 2px solid rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}
.form-content .input-box i{
  position: absolute;
  color: $bg;
  font-size: 17px;
}
.forms .form-content .text{
  font-size: 14px;
  font-weight: 500;
  color: #333;
}
.forms .form-content .text a{
  text-decoration: none;
}
.forms .form-content .text a:hover{
  text-decoration: underline;
}
.forms .form-content .button{
  color: #fff;
  margin-top: 40px;
}
.forms .form-content .button .el-button{
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  padding: 0 30px;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 2px solid rgba(0,0,0,0.2);
  transition: all 0.3s ease;
  width: 100%;
  color: #fff;
  background:#84d2f6;
  border-radius: 6px;
  padding: 0;
  cursor: pointer;
  transition: all 0.4s ease;
}
.forms .form-content .button .el-button:hover{
  background: $bg;
}
.forms .form-content label{
  color: $bg;
  cursor: pointer;
}
.forms .form-content label:hover{
  text-decoration: underline;
}
.forms .form-content .login-text,
.forms .form-content .sign-up-text{
  text-align: center;
  margin-top: 25px;
}
.container #flip{
  display: none;
}
@media (max-width: 730px) {
  .container .cover{
    display: none;
  }
  .form-content .login-form,
  .form-content .signup-form{
    width: 100%;
  }
  .form-content .signup-form{
    display: none;
  }
  .container #flip:checked ~ .forms .signup-form{
    display: block;
  }
  .container #flip:checked ~ .forms .login-form{
    display: none;
  }
}
.input-box ::v-deep.el-form-item__content{   //sass不能使用/deep/  修改element-ui组件样式 穿透样式 
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  height: 50px;
  margin: 10px 0;
}
.input-box ::v-deep.el-form-item__error{
  color:#00a5cf;
}
.form-content .input-box input:focus{
  border-color:$bg;
}

</style>
