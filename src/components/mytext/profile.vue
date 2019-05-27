<template>
  <div class="hellowwarp">
    <div class="zhegai" v-show="zhegai"></div>
    <div class="head">
      <div class="headauto">
        <div class="imgwarp" @click="imgwarpclick">
          <img src="../../assets/back@2x.png" alt>
          <span>返回</span>
        </div>
        <div class="headtext">我的资料</div>
      </div>
    </div>
    <div class="name" @click="nameclick" id="nicheng">
      <div class="nameauto">
        <div class="nameautoleft">昵称</div>
        <div class="nameautoright">
          <div class="text">{{username}}</div>
          <img src="../../assets/sy_xq_icon_h@2x.png" alt>
        </div>
      </div>
    </div>
    <!-- 未绑定手机号 -->
    <div class="name" id="phone" @click="phoneclick" v-if="phonecode!=0">
      <div class="nameauto">
        <div class="nameautoleft">手机号绑定</div>
        <div class="nameautoright">
          <div class="text" id="nonoebtn">未绑定</div>
          <img src="../../assets/sy_xq_icon_h@2x.png" alt>
        </div>
      </div>
    </div>
    <!-- 已绑定手机号 -->
    <div class="name" id="phone" v-if="phonecode==0">
      <div class="nameauto">
        <div class="nameautoleft">手机号绑定</div>
        <div class="nameautoright">
          <div class="text" id="yesbtn">已绑定</div>
          <img src="../../assets/sy_xq_icon_h@2x.png" alt>
        </div>
      </div>
    </div>
    <!-- 已绑定微信 -->
    <div class="name" v-if="wechatState==0">
      <div class="nameauto">
        <div class="nameautoleft">微信</div>
        <div class="nameautoright">
          <div class="text" id="yesbtn">已绑定</div>
          <img src="../../assets/sy_xq_icon_h@2x.png" alt>
        </div>
      </div>
    </div>

    <!-- 未绑定微信 -->
    <div class="name" @click="wxclick" v-if="wechatState!=0">
      <div class="nameauto">
        <div class="nameautoleft">微信</div>
        <div class="nameautoright">
          <div class="text" id="nonoebtn">未绑定</div>
          <img src="../../assets/sy_xq_icon_h@2x.png" alt>
        </div>
      </div>
    </div>

    <!-- 清理缓存 -->

    <div class="name" @click="usenameclear()" id="remove">
      <div class="nameauto">
        <div class="nameautoleft">清理缓存</div>
        <div class="nameautoright">
          <img src="../../assets/sy_xq_icon_h@2x.png" alt>
        </div>
      </div>
    </div>

    <div class="loding" v-if="loding">
      <img
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542711101022&di=3b47c50ded423ff4ce29856c279708d3&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a65c57108eab6ac725134372f367.gif"
        alt
      >
    </div>
    <div class="nonetankuang" v-show="exitwarp">
      <h1>清理缓存将会退出登录,您确定清理吗？</h1>
      <!-- <h2>您的订单将被保存在待付款订单里，请尽快完成支付。</h2> -->
      <div class="nonetankuangbtn">
        <div class="nonetankuangbtnleft" @click="nonewarpclick">取消</div>
        <div class="nonetankuangbtnright" @click="yeswarpclick">确认</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  name: 'HelloWorld',
  data () {
    return {
      name: '',
      username: null,
      phonecode: null,
      wechatState: null,
      loding: true,
      zhegai: false,
      exitwarp: false
    }
  },
  methods: {
    imgwarpclick () {
      this.$router.push({ path: '/mytext' })
    },
    nameclick () {
      this.$router.push({ path: '/name' })
    },
    phoneclick () {
      this.$router.push({ path: '/phone' })
    },


    isWeiXin () {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        //  alert("我是微信游览器")

        location.replace(this.wxlogo())

      }
      else {
        this.$layer.msg("请在微信客户端绑定微信")
        return false;
      }

    },
    // 微信登录链接
    wxlogo () {
      let redirect_uri = location.origin;
      let parameter = this.$parameter
      // this.$layer.msg(".绑定微信.")
      return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc49eb72e379064c2&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=/${parameter}/profile#wechat_redirect`

    },




    wxclick () {
      this.isWeiXin()
    },

    init () {
      let userMsgObj = {

      }
      this.$server.userMsg(userMsgObj).then(data => {
        this.loding = false
        console.log(data)
        this.username = data.data.username
        sessionStorage.setItem("name", data.data.username)
        this.phonecode = data.data.phoneState
        this.wechatState = data.data.wechatState
        console.log('....... this.phonecode.......', this.phonecode)
        console.log('....... this.wechatState.......', this.wechatState)
      })


    },
    usenameclear () {
      this.zhegai = true
      this.exitwarp = true
    },
    nonewarpclick () {
      this.zhegai = false
      this.exitwarp = false
    },
    yeswarpclick () {
      localStorage.clear();
      sessionStorage.clear()
      this.$router.push({ path: '/logo' })
    }
  },


  mounted () {
    this.init()
  },


  created () {

    var parameter = location.href.indexOf("?")
    console.log(parameter)
    if (parameter > -1) {
      console.log("...........走ajax了..........")
      var code = location.href.split("?")[1].split("&")[0].split("=")[1]
      let bindWechatObj = {
        code: code
      }
      this.$server.bindWechat(bindWechatObj).then(data => {

        console.log(data.data.code)
        if (data.data.code == "0") {
          this.init()
        } else {
          this.$layer.msg(data.data.message)
        }

      })

    }




  }




}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hellowwarp {
  width: 100%;
  height: 100%;
  position: fixed;
  background: #f2f2f2;
}
.head {
  width: 100%;
  height: 1.2rem;
  border-bottom: 1px solid #f2f2f2;
  background: #fff;
}

.imgwarp {
  width: 2.2rem;
  height: 1.2rem;
  float: left;
  font-size: 0.45rem;
  line-height: 1.2rem;
}
.imgwarp img {
  width: 0.5rem;
  margin-left: 0.26rem;
  margin-top: 0.35rem;
  float: left;
}
.imgwarp span {
  margin-left: 0.2rem;
  font-weight: bold;
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
  height: 1.2rem;
  background: #fff;
}
#phone {
  margin-top: 0.2rem;
  border-bottom: 1px solid #f2f2f2;
}
#remove{
   border-top: 1px solid #f2f2f2;
}
.nameauto {
  width: 95%;
  margin: 0 auto;
}
.nameautoleft {
  float: left;
  line-height: 1.2rem;
  font-size: 0.4rem;
  color: #222;
}
.nameautoright {
  float: right;
  line-height: 1.2rem;
  color: #222;
  font-size: 0.4rem;
}
.text {
  float: left;
}
.nameautoright img {
  width: 0.4rem;
  margin-left: 0.2rem;
  float: left;
  margin-top: 0.3rem;
}
#nonoebtn {
  color: #f7a020;
}
#yesbtn {
  color: #ccc;
}
.loding img {
  width: 40%;
  margin-top: 40%;
}
.loding {
  width: 100%;
  height: 100%;
  background: #fff;
  position: fixed;
  text-align: center;
  top: 0;
  left: 0;
  z-index: 20;
}
#nicheng {
  margin-top: 0.2rem;
}
.nonetankuang {
  width: 7.2rem;
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -2.09rem;
  margin-left: -3.6rem;
  z-index: 20;
  border-radius: 5px;
}
.nonetankuang h1 {
  width: 60%;
  margin: 0 auto;
  text-align: center;
  font-size: 0.41rem;
  color: #222;
  margin-top: 0.6rem;
}
.nonetankuang h2 {
  width: 90%;
  margin: 0 auto;
  font-size: 0.373rem;
  color: #333;
  margin-top: 0.3rem;
}
.nonetankuangbtn {
  width: 100%;
  height: 1.1rem;
  border-top: 1px solid #f2f2f2;
  margin-top: 0.6rem;
  box-sizing: border-box;
}
.nonetankuangbtn div {
  width: 50%;
  font-size: 0.373rem;
  text-align: center;
  line-height: 1.1rem;
  float: left;
}
.nonetankuangbtnleft {
  border-right: 1px solid #f2f2f2;
  box-sizing: border-box;
  color: #666;
}
.nonetankuangbtnright {
  color: #f7a020;
}
.zhegai {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}
</style>
