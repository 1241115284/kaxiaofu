<template>
  <div class="hellowwarp">
    <div class="head">
      <div class="headauto">
        <!-- <div class="imgwarp" @click="imgwarpclick">
           <img src="../../assets/back@2x.png" alt="">
        </div>-->
        <div class="headtext">手机号绑定</div>
      </div>
    </div>
    <div class="name">
      <div class="nameauto">
        <div class="nameautoleft">手机号码</div>
        <input type="tel" class="nameinput" placeholder="请输入手机号" v-model="username" id="phoneinput">
      </div>
    </div>
    <div class="name">
      <div class="nameauto">
        <div class="nameautoleft">验证码</div>
        <input type="tel" class="nameinput" placeholder="请输入验证码" v-model="codeWord" id="codeinput">
        <div class="loginImgBtn" id="btnSendCode">
          <span v-show="show" @click="getCode">获取验证码</span>
          <span v-show="!show" class="count">{{count}}秒后重新获取</span>
        </div>
      </div>
    </div>
    <div class="yesbtn" @click="btnclick">确认</div>
  </div>
</template>

<script>

export default {

  name: 'HelloWorld',
  data () {
    return {
      name: '',
      show: true,
      count: "",
      username: "",
      codeWord: "",
    }
  },
  methods: {
    // imgwarpclick(){
    //   this.$router.go(-1)
    //   //  this.$router.push({path: '/profile'})  
    // },
    // 获取短信验证码
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

          console.log("ajax请求")
          let phoneregsmsObj = {
            phone: this.username
          }
          this.$server.phoneregsms(phoneregsmsObj).then(data => {
            console.log(data)
            if (data.respCode == "0000") {
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

    btnclick () {
      if (this.username == "") {
        this.$layer.msg("手机号不能为空")
      } else if (this.username.length != 11) {
        this.$layer.msg("请输入正确手机号")
      } else if (this.codeWord == "") {
        this.$layer.msg("请输入验证码")
      } else {

        let bindPhoneObj = {
          phone: this.username,
          code: this.codeWord,
          openid: localStorage.getItem("openid")
        }
        this.$server.bindPhone(bindPhoneObj).then(data => {
          console.log(data)
          if (data.data.code == "0") {
            localStorage.setItem("sessionCode", data.data.sessionInfo.sessionCode)
            localStorage.setItem("sessionId", data.data.sessionInfo.sessionId)

            this.$router.push({ path: '/' })
          } else {
            this.$layer.msg(data.data.message)
          }

        })


      }







    }





  },




}
</script>

<!-- Add "scoped" attribute to limit CSS t0o this component only -->
<style scoped>
.hellowwarp {
  width: 100%;
  height: 100%;
  position: fixed;
  /* background: #f2f2f2; */
}
.head {
  width: 100%;
  height: 1.2rem;
  /* border-bottom: 1px solid #F2F2F2; */
  background: #fff;
}
.headauto {
  width: 95%;
  margin: 0 auto;
  border-bottom: 1px solid #f2f2f2;
}
.imgwarp {
  width: 1rem;
  height: 1.2rem;
  float: left;
}
.imgwarp img {
  width: 0.5rem;
  margin-top: 0.35rem;
  margin-left: 0.26rem;
}
.headtext {
  width: 3rem;
  margin: 0 auto;
  font-size: 0.45rem;
  text-align: center;
  line-height: 1.2rem;
}
.name {
  width: 100%;
  height: 1.3rem;
  background: #fff;
  /* border-bottom: 1px solid #f2f2f2; */
  box-sizing: border-box;
}
#phone {
  margin-top: 0.2rem;
  border-bottom: 1px solid #f2f2f2;
}
.nameauto {
  width: 95%;
  margin: 0 auto;
  height: 1.3rem;
  border-bottom: 1px solid #f2f2f2;
  margin-top: 0.1rem;
}
.nameinput {
  float: left;
  margin-left: 0.2rem;
  /* width: 100%; */
  height: 1.28rem;
  border: none;
  font-size: 0.4rem;
  color: #222;
  box-sizing: border-box;
  /* background: red; */
}
.yesbtn {
  width: 90%;
  margin: 0 auto;
  height: 1rem;
  background: #222222;
  line-height: 1rem;
  text-align: center;
  font-size: 0.4rem;
  color: #fff;
  border-radius: 5px;
  margin-top: 1rem;
}
.nameautoleft {
  float: left;
  font-size: 0.4rem;
  color: #222;
  line-height: 1.3rem;
}
#btnSendCode {
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  /* width: 3rem; */
  height: 0.8rem;
  border-left: 1px solid #bbb;
  text-align: center;
  float: right;
  margin-top: 0.2rem;
  font-size: 0.373rem;
  color: #222;
  /* background: red; */
  line-height: 0.8rem;
  border: 1px solid #000;
  box-sizing: border-box;
  border-radius: 5px;
  margin-right: 0.3rem;
}
#codeinput {
  width: 40%;
  margin-left: 0.9rem;
}
#phoneinput {
  margin-left: 0.5rem;
  width: 70%;
}
</style>
