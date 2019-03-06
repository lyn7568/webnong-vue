<template>
  <div class="container">
    <section class="fog">
      <figure class="absolute-bg"></figure>
      <div class="fog__container">
          <div class="fog__img fog__img--first"></div>
          <div class="fog__img fog__img--second"></div>
      </div>
    </section>
    <div class="ntt_loginPage">
      <div class="ntt-avtar float-l">
        <div class="ntt-avtar1">
          <div class="code"></div>
          <p>扫描下载APP <br>一键控制全局信息</p>
        </div>
        <div class="ntt-avtar2">
          <div class="code"></div>
          <p>更多信息扫描关注<br>农抬头微信公众平台</p>
        </div>
      </div>
      <div class="ntt_loginForm float-l">
        <el-form class="login-form" auto-complete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
          <h3 class="title">用户登录</h3>
          <el-form-item prop="username">
            <span class="svg-container svg-container_login">
              <svg-icon icon-class="user" />
            </span>
            <el-input name="username" type="text" v-model="loginForm.username" auto-complete="on" placeholder="请输入您的账号" maxlength="11" />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password"/>
            </span>
            <el-input name="password" :type="pwdType" v-model="loginForm.password" auto-complete="on"
              placeholder="请输入您的登录密码" maxlength="24" @keyup.enter.native="handleLogin"></el-input>
              <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" v-show="!falg"/><svg-icon icon-class="password-view" v-show="falg"/></span>
          </el-form-item>
          <el-form-item>
            <el-button class="log-btn" type="primary" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    
  </div>
</template>

<script>
import { requiredTip, checkPhoneV } from '@/utils/validator'
import '@/styles/loginform.scss'

export default {
  name: 'login',
  data() {
    return {
      falg: false,
      loginForm: {
        username: '',
        password: '',
        role: 2
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: checkPhoneV }],
        password: [
          { required: true, message: requiredTip('您的登录密码'), trigger: 'blur' }
        ]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    showPwd() {
      this.falg = !this.falg
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      var that = this
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          that.loading = true
          that.$store.dispatch('Login', that.loginForm).then(() => {
            that.$router.replace({ path: '/' })
          }).catch((error) => {
            that.$error(error.response.data)
          })
          setTimeout(() => {
            that.loading = false
          }, 3000);
        }
      })
    }
  }
}
</script>

<style>
  figure {
    margin: 0;
}
.absolute-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    height: 100%;
    width: 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    background-image: url("./img/login_bg.jpg")
}
.fog {
    position: relative;
    height: 100vh;
    width: 100%;
    background-color: #000;
}
.fog__container {
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;
}
.fog__img {
    position: absolute;
    height: 100vh;
    width: 300vw;
}
.fog__img--first {
    background: url("./img/fog-1.png") repeat-x;
    background-size: contain;
    background-position: center;
    -webkit-animation: marquee 60s linear infinite;
    animation: marquee 60s linear infinite;
}
.fog__img--second {
    background: url("./img/fog-2.png") repeat-x;
    background-size: contain;
    background-position: center;
    -webkit-animation: marquee 40s linear infinite;
    animation: marquee 40s linear infinite;
}
@-webkit-keyframes marquee {
    0% {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    100% {
        -webkit-transform: translate3d(-200vw, 0, 0);
        transform: translate3d(-200vw, 0, 0);
    }
}
@keyframes marquee {
    0% {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    100% {
        -webkit-transform: translate3d(-200vw, 0, 0);
        transform: translate3d(-200vw, 0, 0);
    }
}

.ntt_loginPage {
    width: 21.25rem;
    height: 10rem;
    position: fixed;
    left: 50%;
    top: 33%;
    transform: translateX(-50%);
    z-index: 20000;
    box-shadow: 0.05rem 0.05rem 0.125rem #ff8019;
}
.ntt-avtar {
    width: 6.25rem;
    height: 100%;
    background-color: #dcdcdc;
    padding: .25rem 0;
}
.ntt_loginForm {
    width: 15rem;
    height: 100%;
    background-color: #fff;
    position: relative;
    padding: 1rem 2.5rem;
}
.ntt_loginForm:before {
    border: solid transparent;
    content: ' ';
    height: 0;
    top: 20%;
    position: absolute;
    width: 0;
    border-width: .25rem;
    border-right-color: #fff;
    left: -.5rem;
}

</style>
