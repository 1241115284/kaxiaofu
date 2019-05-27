<template>
  <div class="hello" :class="dingwei">
    <div class="useragreementwarp" v-show="useragreementwarp">
      <useragreement @Closethedeal="Closethedealclick"></useragreement>
    </div>

    <div class="logoheadwarp">
      <img src="../assets/logo.png" alt>
    </div>

    <div class="concentwarp">
      <div class="phoneinput">
        <div class="imgwarp">
          <img src="../assets/dl_icon_zh@2x.png" alt class="phoneinputimg">
        </div>
        <input
          type="tel"
          maxlength="11"
          placeholder="手机号"
          v-model="username"
          id="phonename"
          oninput="if(value.length > 11)value = value.slice(0, 11)"
        >
      </div>
      <div class="phoneinput" id="yanzhengmainput">
        <div class="imgwarp">
          <img src="../assets/dl_icon_yz@2x.png" alt class="phoneinputimg" id="yanzhengimg">
        </div>
        <input
          type="tel"
          placeholder="验证码"
          v-model="codeWord"
          :disabled="disabled"
          @blur="animateWidth"
          id="codeinput"
        >
        <div class="loginImgBtn" id="btnSendCode">
          <span v-show="show" @click="getCode">获取验证码</span>
          <span v-show="!show" class="count">{{count}}秒后重新获取</span>
        </div>
      </div>
      <div class="logobtnwarp">
        <div class="logobtn" @click="logoclick">登录</div>
        <div class="btnzhezhao" v-show="btnzhezhao"></div>
      </div>
      <div class="tiaoli">
        <div @click="tiaoliclick">
          <img :src="require('../assets/'+imgurl)" alt class="cheackinput">
          <span>我已阅读同意</span>
        </div>
        <span class="agreement" @click="useragreement">《卡小福商城用户服务协议》</span>
      </div>
      <div class="wxwarp" v-show="wxwarp">
        <div class="siblingslogo">
          <div class="siblingslogoleft"></div>
          <div class="siblingslogotext">其他方式登录</div>
          <div class="siblingslogoright"></div>
        </div>
        <div class="logoicon" @click="weixinclick">
          <img src="../assets/dl_icon_wx@2x.png" alt>
          <div>微信</div>
        </div>
      </div>
    </div>

    <div class="logowarp" v-show="logowarp">
      <div class="wxlogowarp">
        <img src="../assets/dl_icon_wx@2x.png" alt class="wxlogo">
        <div class="logowarptext">微信登录中..</div>
      </div>
    </div>
  </div>
</template>

<script>
import useragreement from './useragreement.vue'
export default {
  components: {
    useragreement, useragreement
  },
  name: 'HelloWorld',
  data () {
    return {
      Auseragreement: false,
      disabled: true,
      msg: 'Welcome to Your Vue.js App',
      show: true,
      count: "",
      cheackinput: false,
      concent: null,
      username: "",
      codeWord: "",
      wxwarp: false,
      btnzhezhao: false,
      imgurl: 'checknone.png',
      logowarp: false,
      dingwei: "fixedfalse",
      useragreementwarp: false,
    }
  },
  methods: {
    touchmove () {

    },
    useragreement () {
      this.useragreementwarp = true
      document.body.scrollTop = 0
      this.dingwei = "fixedtrue"
    },
    Auseragreementclick () {
      this.Auseragreement = false
    },
    Closethedealclick () {
      this.useragreementwarp = false
    },
    // 验证码   
    getCode () {
      if (this.username == "") {
        this.$layer.msg("手机号不能为空")
      } else if (this.username.length != 11) {
        this.$layer.msg("请输入正确手机号")
      } else {
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          let regsmsObj = {
            phone: this.username
          }
          this.$server.regsms(regsmsObj).then(data => {
            console.log(data)
            if (data.respCode == "0000") {
              this.disabled = false
              this.$layer.msg(data.data.msg)
            } else {
              this.$layer.msg(data.data.msg)
            }
          })
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)

        }

      }
    },
    // 登录
    logoclick () {
      if (this.username == "") {
        this.$layer.msg("手机号不能为空")
      } else if (this.username.length != 11) {
        this.$layer.msg("手机号不能为空")
      } else if (this.codeWord == "") {
        this.$layer.msg("请输入验证码")
      } else if (this.cheackinput == false) {
        this.$layer.msg("请阅读条例后登录")
      } else {
        this.btnzhezhao = true
        if (sessionStorage.getItem('router')) {        //判断用户上次登录是否为下单页
          let logoObj = {
            phone: this.username,
            code: this.codeWord
          }
          this.$server.logo(logoObj).then(data => {
            this.btnzhezhao = false
            console.log(data)
            if (data.data.code == "0") {
              localStorage.setItem("sessionCode", data.data.sessionInfo.sessionCode)
              localStorage.setItem("sessionId", data.data.sessionInfo.sessionId)
              localStorage.setItem("againphone", data.data.sessionInfo.phone)
              this.$router.replace({ path: sessionStorage.getItem("router") })

            } else {
              this.$layer.msg(data.data.message)
              this.codeWord = ""
            }

          })
        } else {
          let logoObj = {
            phone: this.username,
            code: this.codeWord
          }
          this.$server.logo(logoObj).then(data => {
            this.btnzhezhao = false
            console.log(data)
            if (data.data.code == "0") {
              localStorage.setItem("sessionCode", data.data.sessionInfo.sessionCode)
              localStorage.setItem("sessionId", data.data.sessionInfo.sessionId)
              localStorage.setItem("againphone", data.data.sessionInfo.phone)
              this.$router.replace({ path: '/' })
            } else {
              this.codeWord = ""
              this.$layer.msg(data.data.message)
            }
          })
        }
      }
    },

    tiaoliclick () {
      this.concent++;
      if (this.concent % 2 != 0) {
        this.cheackinput = true
        this.imgurl = 'dl_icon_xz@2x.png'
      } else {
        this.cheackinput = false
        this.imgurl = 'checknone.png'
      }
    },

    // 微信登录
    weixinclick () {
      if (this.cheackinput == false) {
        this.$layer.msg("请阅读条例后登录")
      } else {
        location.replace(this.logo())
      }

    },

    // 微信登录链接
    logo () {
      let redirect_uri = location.origin;
      let parameter = this.$parameter
      //  this.$layer.msg(".登录.")
      return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc49eb72e379064c2&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=/${parameter}/logo#wechat_redirect`


    },
    isWeiXin () {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        // alert("我是微信游览器")
        this.wxwarp = true
      } else {
        this.wxwarp = false
        // alert("我是其他游览器")
        return false;
      }
    },
    // 验证码input 失去焦点后 
    animateWidth () {

      document.body.scrollTop = 0;

    }
  },
  mounted () {

    this.isWeiXin()

  },
  created () {

    var parameter = location.href.indexOf("?")

    if (parameter > -1) {
      if (sessionStorage.getItem('router')) {
        this.logowarp = true
        var code = location.href.split("?")[1].split("&")[0].split("=")[1]
        console.log(code)
        let weixinlogoObj = {
          code: code
        }
        this.$server.weixinlogo(weixinlogoObj).then(data => {
          this.logowarp = false
          console.log(data)
          if (data.data.code == "0") {
            localStorage.setItem("sessionCode", data.data.sessionInfo.sessionCode)
            localStorage.setItem("sessionId", data.data.sessionInfo.sessionId)
            localStorage.setItem("againphone", data.data.sessionInfo.phone)
            this.$router.replace({ path: sessionStorage.getItem("router") })
          } else if (data.data.code == "1") {
            this.$router.replace({ path: '/phone' })
            localStorage.setItem("openid", data.data.openid)
          }
          else {
            this.$layer.msg(data.data.message)
          }

        })

      } else {
        this.logowarp = true
        var code = location.href.split("?")[1].split("&")[0].split("=")[1]
        console.log(code)
        let weixinlogoObj = {
          code: code
        }
        this.$server.weixinlogo(weixinlogoObj).then(data => {
          this.logowarp = false
          console.log(data)
          if (data.data.code == "0") {
            localStorage.setItem("sessionCode", data.data.sessionInfo.sessionCode)
            localStorage.setItem("sessionId", data.data.sessionInfo.sessionId)
            localStorage.setItem("againphone", data.data.sessionInfo.phone)
            this.$router.replace({ path: '/' })
          } else if (data.data.code == "1") {
            this.$router.replace({ path: '/phone' })
            localStorage.setItem("openid", data.data.openid)
          }
          else {
            this.$layer.msg(data.data.message)
          }

        })

      }

    }

  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #fff;
}
.head {
  width: 100%;
  height: 1.25rem;
  box-sizing: border-box;
  border-bottom: 1px solid #f2f2f2;
  color: #222;
}
.headauto {
  width: 95%;
  margin: 0 auto;
  text-align: center;
  line-height: 1.25rem;
  font-size: 0.45rem;
  position: relative;
}
.headimg {
  width: 0.373rem;
  height: 0.373rem;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -0.1865rem;
}
.concentwarp {
  width: 85%;
  margin: 0 auto;
  overflow: hidden;
  margin-top: 1.3rem;
}
.logotitle {
  font-size: 0.45rem;
  margin-top: 0.8rem;
  color: #222;
}
.phoneinput {
  width: 100%;
  height: 1.2rem;
  box-sizing: border-box;
  border: 1px solid #bbbbbb;
  border-radius: 4px;
  margin-top: 0.64rem;
  /* background: red; */
  /* line-height: 1.06rem; */
}
.phoneinputimg {
  width: 0.373rem;
  height: 0.48rem;
  margin-left: 0.32rem;
  margin-top: 0.3rem;
  float: left;
}
.phoneinput input {
  width: 3rem;
  float: left;
  border: none;
  height: 1.1rem;
  margin-left: 0.1rem;
  font-size: 0.373rem;
}
.phoneinput #codeinput {
  background: #fff;
}
.imgwarp {
  width: 1rem;
  height: 1.2rem;
  float: left;
}
#yanzhengmainput {
  margin-top: 0.48rem;
}
#yanzhengimg {
  width: 0.46rem;
  height: 0.46rem;
  margin-top: 0.33rem;
}
#btnSendCode {
  width: 3rem;
  height: 0.53rem;
  border-left: 1px solid #bbb;
  text-align: center;
  float: right;
  margin-top: 0.3rem;
  font-size: 0.373rem;
  color: #222;
  /* background: red; */
  line-height: 0.53rem;
  /* line-height: 1.2rem; */
}
.logobtnwarp {
  position: relative;
  width: 100%;
  height: 1.06rem;
  margin-top: 0.8rem;
}
.logobtn {
  width: 100%;
  height: 1.06rem;
  background: #222;
  color: #fff;
  text-align: center;
  line-height: 1.06rem;
  font-size: 0.373rem;
  border-radius: 4px;
  opacity: 1;
  position: absolute;
  top: 0;
  left: 0;
}
.btnzhezhao {
  width: 100%;
  height: 1.06rem;
  top: 0;
  left: 0;
  z-index: 5;
  position: absolute;
}
.tiaoli {
  width: 100%;
  height: 1rem;
  margin-top: 0.4rem;
  font-size: 0.34rem;
  /* overflow:hidden;
  background:red; */
}
.tiaoli div {
  float: left;
  color: #999;
}
.agreement {
  color: #f7a020;
}

.cheackinput {
  width: 0.4rem;
  height: 0.4rem;
  float: left;
  margin-right: 0.2rem;
  margin-top: 0.04rem;
  /* margin-right:0.2rem;
  background: url(../assets/checknone.png), no-repeat;
   background-size: 0.38rem 0.38rem; */
  /* margin-top:0.04rem; */
}
/* .class-a{
  width: 0.38rem;
  height: 0.38rem;
  background: url(../assets/dl_icon_xz@2x.png),no-repeat;
  background-size: 0.38rem 0.38rem;
} */
.siblingslogo {
  width: 4.7rem;
  height: 0.5rem;
  margin: 0 auto;
  font-size: 0.32rem;
  color: #999;
  margin-top: 0.7rem;
}
.siblingslogotext {
  float: left;
  text-align: center;
}
.siblingslogoleft {
  width: 1.173rem;
  height: 1px;
  border-bottom: 1px solid #999;
  box-sizing: border-box;
  float: left;
  margin-top: 0.2rem;
  margin-right: 0.2rem;
}
.siblingslogoright {
  width: 1.173rem;
  height: 1px;
  border-bottom: 1px solid #999;
  box-sizing: border-box;
  float: left;
  margin-top: 0.2rem;
  margin-left: 0.2rem;
}
.logoicon {
  text-align: center;
  margin-top: 0.8rem;
  color: #999;
}
.logoicon img {
  width: 1.5rem;
  height: 1.5rem;
}
.phoneinput #phonename {
  width: 80%;
}
.logowarp {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  font-size: 0.4rem;
  color: #333;
  position: fixed;
  z-index: 100;
}
.wxlogo {
  width: 2rem;
}
.wxlogowarp {
  width: 4rem;
  height: 3rem;
  text-align: center;
  position: absolute;
  top: 5rem;
  left: 50%;
  margin-left: -2rem;
}
.logowarptext {
  margin-top: 0.2rem;
}
.logoheadwarp {
  width: 3rem;
  height: 3rem;
  margin: 0 auto;
  margin-top: 1rem;
}
.logoheadwarp img {
  width: 100%;
}
</style>
