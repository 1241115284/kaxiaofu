<template>
  <div class="hellowwarp">
    <div class="zhegai" v-show="zhegai"></div>
    <div class="head">
      <div class="headauto">
        <div class="imgwarp" @click="imgwarpclick">
          <img src="../../assets/back@2x.png" alt>
          <span>返回</span>
        </div>
        <div class="headtext">收银台</div>
      </div>
    </div>
    <div class="xuzhifu">
      <div class="xuzhifuauto">
        <div>需支付：</div>
        <div>￥</div>
        <div>{{money}}</div>
      </div>
    </div>

    <div class="zhifufangshi">
      <div class="zhifufangshiauto">请选择支付方式</div>
    </div>

    <!-- 微信 -->
    <div
      class="warp"
      :class="{active:curent==index}"
      @click="weixinclick(index,item.paymentId,item.paymentName)"
      v-for="(item,index) in List"
    >
      <div class="weixinzhifu">
        <div class="weixinzhifuauto">
          <div class="weixinzhifuautoleft">
            <img :src="item.iconUrl" alt class="wximg">
            <div>{{item.paymentName}}</div>
          </div>
          <div class="weixinzhifuautoright"></div>
        </div>
      </div>
    </div>

    <!-- 支付宝 -->
    <!-- <div  class="weixinzhifu"  :class="{active:curent==bbb}"  @click="weixinclick(bbb,zhifubaotext)" v-show="Alipay"> 
   <div class="weixinzhifuauto">
     <div class="weixinzhifuautoleft">
       <img src="../../assets/gwc_sy_icon_zfb@2x.png" alt="" class="wximg">
       <div>支付宝</div>
     </div>
     <div class="weixinzhifuautoright"></div>
   </div>
    </div>-->

    <div class="yesbtn" @click="zhifubtn()">{{chushihua}}￥{{money}}</div>
    <div class="yesbtnwarp" v-show="yesbtnwarp"></div>

    <!-- 确认离开弹框 -->
    <div class="nonetankuang" v-show="nonetankuang">
      <h1>确定要离开收银台？</h1>
      <h2>您的订单将被保存在待付款订单里，请尽快完成支付。</h2>
      <div class="nonetankuangbtn">
        <div class="nonetankuangbtnleft" @click="qurenbtnnone">确认离开</div>
        <div class="nonetankuangbtnright" @click="yesmoney">继续支付</div>
      </div>
    </div>
    <!-- 支付中弹框 -->
    <div class="zhifuyes" v-show="zhifuyes">
      <div class="zhifuyesauto">
        <img src="../../assets/gwc_sy_icon_sx@2x.png" alt class="jiazaibtn">
        <div class="zhifuyestext">支付结果确认中</div>
      </div>
    </div>
    <div class="loding" v-if="loding">
      <img
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542711101022&di=3b47c50ded423ff4ce29856c279708d3&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a65c57108eab6ac725134372f367.gif"
        alt
      >
    </div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
export default {

  name: 'HelloWorld',
  data () {
    return {
      loding: true,
      paymentId: "weChat",
      Alipay: true,
      money: "",
      name: '',
      show: true,
      count: "",
      curent: 0,
      chushihua: "微信支付",
      nonetankuang: false,
      zhegai: false,
      zhifuyes: false,
      yesbtnwarp: false,
      openid: null,
      List: [
        {
          value: "微信",
          code: "0"
        },
        {
          value: "支付宝",
          code: "1"
        },
      ]
    }
  },
  methods: {
    // 微信登录链接
    wxlogo () {
      let redirect_uri = location.origin;
      let parameter = this.$parameter

      return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc49eb72e379064c2&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=/${parameter}/checkstand#wechat_redirect`

    },
    imgwarpclick () {
      this.nonetankuang = true
      this.zhegai = true

    },
    qurenbtnnone () {
      this.$router.replace({ path: '/myorder', query: { id: 1 } })  //确认离开
    },
    yesmoney () {
      this.nonetankuang = false                   //继续支付
      this.zhegai = false
    },

    weixinclick (index, paymentId, text) {
      console.log(paymentId)
      this.curent = index
      this.chushihua = text  // 支付方式信息
      this.paymentId = paymentId //支付方式Id
    },


    zhifubtn () {
      //  this.$layer.msg(this.paymentId)
      if (this.paymentId == "weChatJS") {
        // this.$layer.msg("微信公众号")
        var ua = window.navigator.userAgent.toLowerCase();

        var that = this

        let wechatJsPayObj = {
          merId: sessionStorage.getItem("merId"),
          orderId: sessionStorage.getItem("orderId"),
          userId: sessionStorage.getItem("userid"),
          type: this.paymentId,
          amount: sessionStorage.getItem("money"),
          describe: sessionStorage.getItem("describe"),
          returnUrl: this.$url,
          openid: sessionStorage.getItem("openid")
        }
        this.$server.wechatJsPay(wechatJsPayObj).then(data => {
          var res = JSON.parse(data.data)
          var pames = JSON.parse(res.data)
          console.log(pames)
          if (res.code == "success") {
            wx.config({
              // debug: true, 
              appId: pames.appId,
              timestamp: pames.timeStamp,
              nonceStr: pames.nonceStr,
              signature: pames.signature,
              jsApiList: ['chooseWXPay']
            });

            wx.chooseWXPay({
              timestamp: pames.timeStamp,
              package: pames.package,
              nonceStr: pames.nonceStr,
              signType: pames.signType,
              paySign: pames.paySign,
              success: function (res) {
                that.$layer.msg("支付成功");
                if (res.errMsg == "chooseWXPay:ok") {
                  that.$router.replace({ path: '/zhifuintermediation' })
                } else {
                  that.$layer.msg(res.errMsg);
                }
              },
              cancel: function (res) {
                that.$layer.msg("取消支付");
              }

            });

          } else if (res.code == "error") {
            this.$router.replace({ path: '/zhifuerror' })
          }


        })
      } else if (this.paymentId == "weChat") {
        // this.$layer.msg("h5微信")
        this.$store.commit("loding", true)
        var sendDate = (new Date()).getTime();
        console.log(this.paymentId)
        let wechatPayObj = {
          merId: sessionStorage.getItem("merId"),
          orderId: sessionStorage.getItem("orderId"),
          userId: sessionStorage.getItem("userid"),
          type: this.paymentId,
          amount: sessionStorage.getItem("money"),
          describe: sessionStorage.getItem("describe"),
          returnUrl: this.$url
        }
        this.$server.wechatPay(wechatPayObj).then(data => {
          console.log(data)
          this.$store.commit("loding", false)
          let msg = JSON.parse(data.data)
          console.log(msg)
          if (msg.code == "success") {
            this.$router.replace({ path: '/zhifusuccess' })
            setTimeout(function () {
              const div = document.createElement('div')
              div.innerHTML = msg.data
              document.body.appendChild(div)
              document.forms.alipaysubmit.submit()

            }, 1000)
          } else if (msg.code == "error") {
            this.$router.replace({ path: '/zhifuerror' })
          }

        })
      } else if (this.paymentId == "aliPay") {
        // this.$layer.msg("支付宝")
        this.yesbtnwarp = true
        this.$store.commit("loding", true)
        var sendDate = (new Date()).getTime();
        console.log("支付宝ajax")

        let aliPayObj = {
          merId: sessionStorage.getItem("merId"),
          orderId: sessionStorage.getItem("orderId"),
          userId: sessionStorage.getItem("userid"),
          type: this.paymentId,
          amount: sessionStorage.getItem("money"),
          describe: sessionStorage.getItem("describe"),
          returnUrl: this.$url
        }
        this.$server.aliPay(aliPayObj).then(data => {
          console.log(data)
          console.log(data.data)
          this.yesbtnwarp = false
          var receiveDate = (new Date()).getTime();
          var responseTimeMs = receiveDate - sendDate;
          var that = this
          console.log(responseTimeMs)
          if (responseTimeMs < 300) {
            setTimeout(function () {
              that.$store.commit("loding", false)
            }, 300)
          } else {

            this.$store.commit("loding", false)
          }



          if (data.respCode == "0000") {
            this.$router.replace({ path: '/zhifusuccess' })

            setTimeout(function () {
              const div = document.createElement('div')
              div.innerHTML = data.data
              document.body.appendChild(div)
              document.forms.punchout_form.submit();

            }, 1000)

          } else {
            this.$layer.msg(data.respMsg)
          }

        })



      }





    },






    init () {
      let paymentOBj = {

      }
      this.$server.payment(paymentOBj).then(data => {
        this.loding = false
        //  console.log(data)
        this.List = data


        var ua = window.navigator.userAgent.toLowerCase();
        //微信游览器
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          this.List = this.List.filter(function (item) {
            return (item.paymentId != "aliPay" && item.paymentId != "weChat");
          });
          this.paymentId = "weChatJS"

        } else if (ua.match(/QQ/i) == "qq") {
          this.List = this.List.filter(function (item) {
            return (item.paymentId != "aliPay" && item.paymentId != "weChatJS");
          });
          this.paymentId = "weChat"

        } else {
          // 正常游览器 
          this.List = this.List.filter(function (item) {
            return (item.paymentId != "weChatJS");
          });
          this.paymentId = "weChat"
        }


      })

    }

  },

  created () {
    this.money = sessionStorage.getItem("money")
    var parameter = location.href.indexOf("?")

    console.log(parameter)
    if (parameter > -1) {

      console.log("...........走ajax了..........")
      var code = location.href.split("?")[1].split("&")[0].split("=")[1]

      let getOpenidObj = {
        code: code
      }
      this.$server.getOpenid(getOpenidObj).then(data => {
        sessionStorage.setItem("openid", data.data.openid)


      })

    }

  },
  mounted () {
    this.init()




  },



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
  margin-top: 0.35rem;
  margin-left: 0.26rem;
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
.xuzhifu {
  width: 100%;
  height: 1.2rem;
  line-height: 1.2rem;
  background: #fff;
  font-size: 0.4rem;
}
.xuzhifuauto {
  width: 95%;
  margin: 0 auto;
}
.xuzhifuauto div {
  float: left;
}
.zhifufangshi {
  width: 100%;
  height: 1.1rem;
  line-height: 1.1rem;
  background: #fff;
  font-size: 0.35rem;
  color: #666;
  margin-top: 0.2rem;
  border-bottom: 1px solid #f2f2f2;
}
.zhifufangshiauto {
  width: 95%;
  margin: 0 auto;
}
.weixinzhifu {
  width: 100%;
  height: 1.3rem;
  background: #fff;
  border-bottom: 1px solid #f2f2f2;
}
.weixinzhifuauto {
  width: 95%;
  margin: 0 auto;
}
.weixinzhifuautoleft {
  float: left;
  margin-top: 0.3rem;
}
.weixinzhifuautoright {
  float: right;
  margin-right: 0.1rem;
}
.wximg {
  float: left;
  width: 0.7rem;
  height: 0.7rem;
}
.weixinzhifuautoleft div {
  float: left;
  margin-left: 0.2rem;
  font-size: 0.373rem;
  margin-top: 0.1rem;
}
.weixinzhifuautoright {
  width: 0.4rem;
  height: 0.4rem;
  background: url(../../assets/gwc_sy_icon_wxz@2x.png) no-repeat;
  background-size: 0.4rem 0.4rem;
  margin-top: 0.42rem;
}
.active .weixinzhifuautoright {
  background: url(../../assets/gwc_sy_icon_xz@2x.png) no-repeat;
  background-size: 0.4rem 0.4rem;
}
.yesbtn {
  width: 100%;
  height: 1.3rem;
  background: #222222;
  line-height: 1.3rem;
  text-align: center;
  font-size: 0.4rem;
  color: #fff;
  margin-top: 3rem;
  position: absolute;
  bottom: 0;
  left: 0;
}
.yesbtnwarp {
  width: 100%;
  height: 1.3rem;
  line-height: 1.3rem;
  text-align: center;
  font-size: 0.4rem;
  color: #fff;
  margin-top: 3rem;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 500;
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
  text-align: center;
  font-size: 0.41rem;
  color: #222;
  margin-top: 0.3rem;
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
  margin-top: 0.4rem;
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
.zhifuyes {
  width: 7.2rem;
  height: 2.18rem;
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -1.09rem;
  margin-left: -3.6rem;
  z-index: 20;
  border-radius: 5px;
}
.zhifuyestext {
  font-size: 0.373rem;
  color: #333;
  float: left;
}
.jiazaibtn {
  width: 0.4rem;
  height: 0.4rem;
  float: left;
  margin-top: 0.07rem;
  margin-right: 0.2rem;
  -webkit-transition-property: -webkit-transform;
  -webkit-transition-duration: 1s;
  -moz-transition-property: -moz-transform;
  -moz-transition-duration: 1s;
  -webkit-animation: rotate 2s linear infinite;
  -moz-animation: rotate 2s linear infinite;
  -o-animation: rotate 2s linear infinite;
  animation: rotate 2s linear infinite;
}
@-webkit-keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-moz-keyframes rotate {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(359deg);
  }
}
@-o-keyframes rotate {
  from {
    -o-transform: rotate(0deg);
  }
  to {
    -o-transform: rotate(359deg);
  }
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

.zhifuyesauto {
  width: 3.3rem;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 0.85rem;
}
.loding img {
  width: 40%;
  margin-top: 40%;
}
.loding {
  width: 100%;
  height: 100%;
  /* height: calc(100% - 2.46rem); */
  background: #fff;
  position: fixed;
  text-align: center;
  top: 0;
  left: 0;
}
</style>
