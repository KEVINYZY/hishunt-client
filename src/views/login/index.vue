<template>
  <div class="his-login-bg">

    <!--登录表单-->
    <el-form v-if="LoginOrRegs" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
             label-position="left"
             label-width="0px" class="login-form">
      <div>
        <img v-if="LogoAcion==0" src="https://cdn.zhusho.com/normal.0447fe9.png" class="normal"/>
        <img v-if="LogoAcion==1" src="https://cdn.zhusho.com/blindfold.58ce423.png" class="normal"/>
        <img v-if="LogoAcion==2" src="https://cdn.zhusho.com/greeting.1415c1c.png" class="normal happy"/>
      </div>
      <el-form-item class="his-login-title">
        <h2>知书</h2>
        <span>登录知书，发现更多的有趣</span>
      </el-form-item>
      <el-form-item prop="username" class="his-login-ele">
        <input @blur="checkLogin('username')" @focus="LogoAcion=2" maxlength="11" v-model="loginForm.username"
               placeholder="请输入手机号"
               autoComplete="on"/>
      </el-form-item>
      <el-form-item prop="password" class="his-login-ele">
        <input @focus="LogoAcion=1" @blur="checkLogin('password')" v-if="icon=='eyeb'"
               style="border-radius: 0px !important;"
               type="password" v-model="loginForm.password"
               autoComplete="on"
               @keyup.enter="handleLogin"
               placeholder="请输入密码"/>

        <input @focus="LogoAcion = 0" @blur="checkLogin('lpassword')" v-if="icon=='eyez'"
               style="border-radius: 0px !important;"
               type="text" v-model="loginForm.password"
               autoComplete="on"
               @keyup.enter="handleLogin"
               placeholder="请输入密码"/>

        <el-button @click.native="icon =='eyez' ? (icon='eyeb',LogoAcion=1) : (icon='eyez',LogoAcion=0)"
                   style="position:absolute;top: -5px;right: 10px;" class="passwordIcon" type="text">
          <svg-icon style="width: 25px;height: 23px" :iconClass="icon"></svg-icon>
        </el-button>
      </el-form-item>
      <el-form-item v-if="loginCount>=3" prop="validata" class="his-login-ele validata">
        <input @blur="checkLogin('validata')" maxlength="4" v-model="loginForm.validata" autoComplete="on"
               @keyup.enter.native="handleLogin"
               placeholder="请输入验证码"/>
        <el-tooltip class="item" effect="dark" content="看不清楚？换一张" placement="top">
          <img style="float: right;cursor:pointer" @click="resetvliDator" :src="validatorUrl" alt="验证码图片"/>
        </el-tooltip>
      </el-form-item>
      <el-form-item class="his-login-ele wz">
        <el-row>
          <el-col :span="12" class="his-login-ele-left">
            <el-tooltip class="item" effect="dark" content="暂无此功能" placement="top-start">
              <span><router-link to="#">手机验证码登录</router-link></span>
            </el-tooltip>
          </el-col>
          <el-col :span="12" class="his-login-ele-right">
            <el-tooltip class="item" effect="dark" content="敬请期待" placement="top-start">
              <span><router-link to="#">忘记密码？</router-link></span>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item class="his-login-ele">
        <el-row>
          <el-button @click.native.prevent="handleLogin" :loading="loading" style="width: 100%" type="primary">登录
          </el-button>
        </el-row>
        <el-row class="his-login-other">
          <el-button type="text" :loading="loginBtnQQ">
            <svg-icon v-if="!loginBtnQQ" style="width: 25px;height: 25px" iconClass="qq"></svg-icon>
          </el-button>
          <span>·</span>
          <el-button type="text" :loading="loginBtnQQ">
            <svg-icon v-if="!loginBtnQQ" style="width: 25px;height: 25px" iconClass="wechat"></svg-icon>
          </el-button>
        </el-row>
      </el-form-item>
      <el-form-item class="his-login-footer">
        <span>没有账号？<el-button @click.native="skipRegForm" type="text">注册</el-button></span>
      </el-form-item>
    </el-form>

    <!--注册表单-->
    <el-form v-if="!LoginOrRegs" :model="regForm" :rules="regRules" ref="regForm"
             label-width="0px" class="login-form">
      <el-form-item class="his-login-title">
        <h2>知书</h2>
        <span>注册知书，发现更多的有趣</span>
      </el-form-item>
      <el-form-item prop="phone" class="his-login-ele" ref="phoneNumber">
        <input @blur="checkRegLogin('phone')" maxlength="11" v-model="regForm.phone" placeholder="请输入手机号"/>
      </el-form-item>
      <transition name="fade">
        <el-form-item v-show="checkClick" prop="code" class="his-login-ele">
          <input @blur="checkRegLogin('code')" maxlength="6" type="text" v-model="regForm.code"
                 placeholder="请输入验证码"/>

          <el-button v-show="checkClick" v-if="!validateSendStatus" @click.native="countDown"
                     style="position:absolute;top: -5px;right: 0px;" class="passwordIcon" type="text">
            {{content}}
          </el-button>

          <el-button v-show="checkClick" v-if="validateSendStatus"
                     style="position:absolute;top: -5px;right: 0px;" class="passwordIcon" type="text" disabled>
            {{content}}
          </el-button>
        </el-form-item>
      </transition>
      <el-form-item prop="pass" class="his-login-ele">
        <input @blur="checkRegLogin('pass')" type="password" v-model="regForm.pass"
               placeholder="请输入密码（不少于6位）"/>
      </el-form-item>

      <el-form-item prop="checkPassword" class="his-login-ele">
        <input @keyup.enter="handReg" @blur="checkRegLogin('checkPassword')" type="password"
               v-model="regForm.checkPassword"
               @keyup.enter.native="handReg"
               placeholder="确认密码(必须和密码一致)"/>
      </el-form-item>

      <el-form-item class="his-login-ele wz">
        <el-row>
          <el-col :push="12" :span="12" class="his-login-ele-right">
            <el-tooltip class="item" effect="dark" content="敬请期待" placement="top-start">
              <span><router-link to="#">接收语言验证码</router-link></span>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item class="his-login-ele">
        <el-row>
          <el-button @click.native.prevent="handReg" :loading="loading" style="width: 100%" type="primary">注册
          </el-button>
        </el-row>
        <el-row class="his-login-other">
          <el-button type="text">注册即代表同意《知书协议》</el-button>
          <el-button type="text">《隐私保护指引》</el-button>
          <!--  <el-button type="text" style="color:#175199;">注册机构号</el-button>-->
        </el-row>
      </el-form-item>
      <el-form-item class="his-login-footer">
        <span>已有账号？<el-button @click.native="skipLoginForm" type="text">登录</el-button></span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import * as elValudate from '@/assets/js/validate/elValidate' // 引入自定义校验方法

  export default {
    name: "Login",
    data() {
      var validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else {
          this.api({
            url: '/validator',
            method: 'post',
            data: {'code': this.loginForm.validata}
          }).then(res => {
            if (res == 1) {//验证通过
              callback();
            } else {
              callback(new Error('验证码有误'));
            }
          })
        }
      };
      var elValidatePhone = async (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请输入手机号'))
          this.checkClick = false
        } else {
          let re = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
          if (!re.test(value)) {
            this.checkClick = false
            callback(new Error('手机号码输入格式有误'))
          } else {
            await this.api({
              url: '/user/' + value,
              method: 'get'
            }).then(() => {
              callback()
              this.checkClick = true
            }).catch((err) => {
              this.checkClick = false
              callback(new Error(err.message))
            })
          }
        }
      }
      var validateCheckCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'))
        } else if (value.length > 6) {
          callback(new Error('验证码格式错误'))
        } else {
          this.api({
            url: '/validator/auth/sms',
            method: 'post',
            data: this.regForm
          }).then(res => {
            if (res == 1) {//验证通过
              callback()
            } else {
              callback(new Error('验证码有误'))
            }
          })
        }
      };
      var validateCheckPass = (rule, value, callback) => {
        if (this.regForm.pass !== '' && this.regForm.phone !== '' && this.regForm.pass.length >= 6) {//只有用户输入密码以后才验证
          if (value === '') {
            callback(new Error('请输入确认密码'))
          } else if (value !== this.regForm.pass) {
            callback(new Error('两次密码不一致'))
          }
          callback()
        }
      };
      return {
        canClick: true, //添加canClick
        checkClick: false,//检查是否可以点击发送验证码
        content: '获取短信验证码',//短信验证码文字
        totalTime: 60,      //记录具体倒计时时间
        validateSendStatus: false,//默认没有发送验证码
        loginBtnQQ: false,
        LogoAcion: 0,//logo动作代码
        loginCount: 0,//输错密码次数
        validatorUrl: '/api/validator',//拿到图片路径
        validatorStr: '',
        icon: 'eyeb',//密码框眼睛Icon
        LoginOrRegs: true,//登录注册表单切换，默认是登录表单
        loginForm: {//登录表单model
          username: '',
          password: '',
          validata: ''
        },
        regForm: {//注册表单model
          phone: '',
          pass: '',
          checkPassword: '',
          code: '',
        },
        loginRules: {
          username: [{
            validator: elValudate.elValidatePhoneLogin
          }],
          password: [{
            required: true,
            trigger: 'blur',
            message: "请输入密码"
          }], validata: [{validator: validateCode}]
        }, regRules: {//登录Rules
          phone: [
            {
              validator: elValidatePhone
            }],
          pass: [{
            validator: elValudate.elValidatePass
          }], checkPassword: [{
            validator: validateCheckPass
          }], code: [{
            validator: validateCheckCode
          }]
        },
        loading: false
      }
    }, methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store.dispatch('Login', this.loginForm).then(data => {
              this.loading = false
              if (200 === data.result) {
                this.$router.push({
                  path: '/'
                })
              } else {
                this.loginCount += 1
                this.$message.error("账号/密码错误")
              }
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      }, handReg() {//注册方法
        this.$refs.regForm.validate(valid => {
          this.loading = true
          if (valid) {
            this.api({
              url: '/user',
              method: 'post',
              data: this.regForm
            }).then((res) => {
              this.$message({
                message: '注册成功，现在就登录吧！',
                type: 'success'
              });
              window.setTimeout(() => {
                window.location.href = '/login'
              }, 2000)

            }).catch(() => {
              this.$message({
                message: '注册失败，请联系平台管理员',
                type: 'error'
              });
            })
            this.loading = false
          }
        })
      }, resetvliDator() {//刷新验证码
        this.validatorUrl += '?t=' + new Date().getTime()
      }, countDown() {//发送短信验证码时校验是否填入手机号
        this.checkRegLogin('phone')//检查用户是否输入手机号
        if (this.checkClick) {
          this.sendMessage()
          this.validateSendStatus = true//已经发送验证码
          if (!this.canClick) return
          this.canClick = false
          this.content = this.totalTime + 's后重新发送'
          let clock = window.setInterval(() => {
            this.totalTime--
            this.content = this.totalTime + 's后重新发送'
            if (this.totalTime < 0) {
              window.clearInterval(clock)
              this.validateSendStatus = false//改为可用状态
              this.content = '重新获取验证码'
              this.totalTime = 60
              this.canClick = true  //这里重新开启
            }
          }, 1000)

        }
      }, clearValidate(formName) {//清空表单验证【跳转页面时使用】
        this.$refs[formName].clearValidate();
      }, skipLoginForm() {//显示登录表单
        window.location.href = '/login'
      }, skipRegForm() {//跳转到注册页面
        window.location.href = '/signup'
      }, checkRegLogin(valiName) {//由于本表单使用的是input 鼠标离开时不会触发表单验证所以自己实现
        this.$refs.regForm.validateField(valiName)//单项验证
      }, checkLogin(valiName) {//登录表单验证 + logo图片切换
        if (valiName === 'username') {
          this.LogoAcion = 0
        } else if (valiName === 'password') {
          this.LogoAcion = 0
        } else if (valiName === 'lpassword') {
          this.LogoAcion = 0
          valiName = 'password'//妥协
        }
        this.$refs.loginForm.validateField(valiName)//单项验证
      }, sendMessage() {//发送短信
        this.api({
          url: '/validator/sms',
          method: 'post',
          data: {'phoneNumber': this.regForm.phone}
        }).then((res) => {
          this.$message({
            message: '短信发送成功',
            type: 'success'
          });
        })
      }
    }, mounted() {
      const bol = localStorage.getItem('login')
      const show = bol === 'false' ? false : true
      this.LoginOrRegs = show//路由控制是登录还是注册
      this.loginBtnQQ = true
      window.setTimeout(() => {
        this.loginBtnQQ = false
      }, 2000)
    }
  }
</script>

<style scoped lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border: 0px;
    border-bottom: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    -webkit-transition: border-bottom .2s cubic-bezier(.645, .045, .355, 1);
    transition: border-bottom .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
  }

  input:focus {
    border-bottom: 1px solid #2299dd;
  }

  input::-webkit-input-placeholder {
    color: #8590a6;
  }

  .his-login-bg {
    background-image: url("https://cdn.zhusho.com/db29b0fbd2f78dd8c1b7.db29b0f.png");

    .normal {
      position: absolute;
      top: 0;
      left: 50%;
      width: 10rem;
      transform: translate(-50%, -83%);
      z-index: 1;
    }

    .happy {
      top: 12px;
    }

    background-color: #b8e5f8;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    border-radius: 2px;
    min-height: 688px;
    box-sizing: border-box;
    height: 100%;
    padding-left: auto;
  }

  @media (max-width: 768px) {
    .login-form {
      width: 100% !important;
    }
  }

  .login-form {
    position: relative;

    a {
      color: #8590a6;
    }


    width: 432px;
    background-color: white;
    margin: 0 auto;

    .his-login-ele {
      width: 90%;
      margin: 24px auto;
    }

    .validata {
      .el-input, input {
        width: 60%;
        border-radius: 4px;
        border-bottom: 1px solid #dcdfe6;
      }

      margin-left: 20px;
    }

    .his-login-ele-left {
      text-align: left;
    }

    .his-login-ele-right {
      text-align: right;
    }

    .his-login-btn {
      width: 90%;
      margin: 0 auto;
      text-align: center;
    }

    .his-login-title {
      text-align: center;
      color: #0084ff;

      span {
        font-size: 23px;
      }

      /*猎嗅网标题*/
      h2 {
        line-height: 100px;
        font-size: 43px;
      }
    }

    .his-login-other {
      text-align: center;
      width: 100%;

      .el-button {
        color: #8590a6;
      }


    }

    .wz {
      color: #8590a6;
      margin: -10px auto !important;
    }

    .his-login-footer {
      width: 100%;
      background-color: #f6f6f6;
      border-top: 1px solid #ebebeb;
      text-align: center;
      align-items: center;
      margin-bottom: 0;

      span {
        .el-button {
          font-size: 17px;
        }

        font-size: 17px;
      }
    }
  }

</style>
