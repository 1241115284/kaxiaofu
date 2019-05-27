<template>
  <div class="hellowwarp">
    <div class="zhegai" v-show="zhegai"></div>
    <!-- <div class="add">
        <div class="commonD">
            <span class="leftSpan">省市县：</span>
            <areaBtn v-on:getValue="have"></areaBtn>
        </div>
    </div>-->
    <div class="backgroundimg">
      <div class="maytitle"></div>
      <div class="myname">
        <div class="mynameleft" v-if="this.anonymous==1" @click="logoclick">
          <img src="../../assets/t1@2x.png" alt class="portrait">
          <div>登录/注册></div>
          <!-- <span>{{username}}</span> -->
        </div>
        <div class="mynameleft" @click="profileclick" v-if="this.anonymous==0">
          <img :src="titleimg" alt class="portrait">
          <div>{{username}}</div>
        </div>
        <div class="maynameright" v-if="this.anonymous==1" @click="logoclick">
          <img src="../../assets/sz@2x.png" alt>
        </div>
        <div class="maynameright" @click="profileclick" v-if="this.anonymous==0">
          <img src="../../assets/sz@2x.png" alt>
        </div>
      </div>
    </div>

    <div class="myorde" @click="myorderclick" v-if="this.anonymous==0">
      <div class="myordeauto">
        <div class="myordeautoleft">我的订单</div>
        <div class="myordeautoright">
          <span>查看全部</span>
          <img src="../../assets/my_icon_f@2x.png" alt>
        </div>
      </div>
    </div>

    <div class="myorde" @click="logoclick" v-if="this.anonymous==1">
      <div class="myordeauto">
        <div class="myordeautoleft">我的订单</div>
        <div class="myordeautoright">
          <span>查看全部</span>
          <img src="../../assets/my_icon_f@2x.png" alt>
        </div>
      </div>
    </div>

    <div class="ordestauts" v-if="this.anonymous==0">
      <ul>
        <li @click="daifukuanclick">
          <img src="../../assets/my_icon_dfk@2x.png" alt>
          <div>待付款</div>
          <div class="numbergeshu" v-if="pendingOrder!=0">{{pendingOrder}}</div>
        </li>
        <li @click="daifahuoclick">
          <img src="../../assets/dfh@2x.png" alt>
          <div>待发货</div>
          <div class="numbergeshu" v-if="shippedOrder!=0">{{shippedOrder}}</div>
        </li>
        <li @click="daishouhuoclick">
          <img src="../../assets/my_icon_dch@2x.png" alt>
          <div>待收货</div>
          <div class="numbergeshu" v-if="receivedOrder!=0">{{receivedOrder}}</div>
        </li>
        <li @click="yiwanchengclick">
          <img src="../../assets/my_icon_wc@2x.png" alt>
          <div>已完成</div>
          <div class="numbergeshu" v-if="completedOrder!=0">{{completedOrder}}</div>
        </li>
        <li @click="reimburseclick">
          <img src="../../assets/my_icon_tk@2x.png" alt>
          <div>退款/售后</div>
          <div class="numbergeshu" v-if="refundOrder!=0">{{refundOrder}}</div>
        </li>
      </ul>
    </div>

    <div class="ordestauts" v-if="this.anonymous==1">
      <ul>
        <li @click="logoclick">
          <img src="../../assets/my_icon_dfk@2x.png" alt>
          <div>待付款</div>
          <div class="numbergeshu" v-if="pendingOrder!=0">{{pendingOrder}}</div>
        </li>
        <li @click="logoclick">
          <img src="../../assets/dfh@2x.png" alt>
          <div>待发货</div>
          <div class="numbergeshu" v-if="shippedOrder!=0">{{shippedOrder}}</div>
        </li>
        <li @click="logoclick">
          <img src="../../assets/my_icon_dch@2x.png" alt>
          <div>待收货</div>
          <div class="numbergeshu" v-if="receivedOrder!=0">{{receivedOrder}}</div>
        </li>
        <li @click="logoclick">
          <img src="../../assets/my_icon_wc@2x.png" alt>
          <div>已完成</div>
          <div class="numbergeshu" v-if="completedOrder!=0">{{completedOrder}}</div>
        </li>
        <li @click="logoclick">
          <img src="../../assets/my_icon_tk@2x.png" alt>
          <div>退款/售后</div>
          <div class="numbergeshu" v-if="refundOrder!=0">{{refundOrder}}</div>
        </li>
      </ul>
    </div>

    <div class="concent">
      <div class="solid"></div>

      <div class="mylocation" @click="logoclick" :class="coloractive" v-if="this.anonymous==1">
        <div class="mylocationauto">
          <div class="mylocationleft">
            <img src="../../assets/my_icon_add@2x.png" alt>
            <div>收货地址</div>
          </div>
          <div class="mylocationright">
            <img src="../../assets/my_icon_f@2x.png" alt>
          </div>
        </div>
      </div>

      <div
        class="mylocation"
        @click="shippingaddressclick"
        :class="coloractive"
        v-if="this.anonymous==0"
      >
        <div class="mylocationauto">
          <div class="mylocationleft">
            <img src="../../assets/my_icon_add@2x.png" alt>
            <div>收货地址</div>
          </div>
          <div class="mylocationright">
            <img src="../../assets/my_icon_f@2x.png" alt>
          </div>
        </div>
      </div>

      <div class="solid"></div>
      <div class="mylocation" @click="phoneclick" :class="coloractivethree">
        <div class="mylocationauto">
          <div class="mylocationleft">
            <img src="../../assets/cz@2x.png" alt>
            <div>手机充值</div>
          </div>
          <div class="mylocationright">
            <img src="../../assets/my_icon_f@2x.png" alt>
          </div>
        </div>
      </div>

      <!-- <div class="mylocation" @click="logoclick" :class="Sparemoney"  v-if="this.anonymous==1">
    <div class="mylocationauto">
          <div class="mylocationleft">
       <img src="../../assets/xz@2x.png" alt="">
       <div>闲置换钱</div>
     </div>
     <div class="mylocationright">
       <img src="../../assets/my_icon_f@2x.png" alt="">
     </div>
    </div>
   </div>

 






   <div class="mylocation" @click="Sparemoneyclick" :class="Sparemoney"  v-if="this.anonymous==0">
    <div class="mylocationauto">
          <div class="mylocationleft">
       <img src="../../assets/xz@2x.png" alt="">
       <div>闲置换钱</div>
     </div>
     <div class="mylocationright">
       <img src="../../assets/my_icon_f@2x.png" alt="">
     </div>
    </div>
      </div>-->

      <!-- <div class="mylocation"  @click="recycleclick" :class="recycle">
    <div class="mylocationauto">
          <div class="mylocationleft">
       <img src="../../assets/hs@2x.png" alt="">
       <div>回收订单</div>
     </div>
     <div class="mylocationright">
       <img src="../../assets/my_icon_f@2x.png" alt="">
     </div>
    </div>
      </div>-->

      <div class="solid"></div>
      <!-- <a href="tel:400-888-9999" >
     <div class="mylocation" @click="yingyetxttclick" :class="coloractivetwo">
    <div class="mylocationauto">
          <div class="mylocationleft" id="kefu">
       <img src="../../assets/kf@2x.png" alt="">
       <div>客服电话</div>
     </div>
     <div class="mylocationright">
       <img src="../../assets/my_icon_f@2x.png" alt="">
     </div>
    </div>
   </div>
      </a>-->

      <div class="mylocation" :class="coloractivetwo" @click="yingyetxttclick">
        <div class="mylocationauto">
          <div class="mylocationleft" id="kefu">
            <img src="../../assets/xz@2x.png" alt>
            <div>信用卡管家</div>
          </div>
          <div class="mylocationright">
            <img src="../../assets/my_icon_f@2x.png" alt>
          </div>
        </div>
      </div>

      <div class="mylocation" :class="coloractivefive" @click="feedback">
        <div class="mylocationauto">
          <div class="mylocationleft" id="kefu">
            <img src="../../assets/my_y@2x.png" alt>
            <div>意见反馈</div>
          </div>
          <div class="mylocationright">
            <img src="../../assets/my_icon_f@2x.png" alt>
          </div>
        </div>
      </div>

      <div class="mylocation" @click="mypronclick" :class="coloractivefour">
        <div class="mylocationauto">
          <div class="mylocationleft" id="kefu">
            <img src="../../assets/gy@2x.png" alt>
            <div>关于我们</div>
          </div>
          <div class="mylocationright">
            <img src="../../assets/my_icon_f@2x.png" alt>
          </div>
        </div>
      </div>

      <div class="solid"></div>
      <div class="nonelogo" @click="nonelogoclick" v-if="this.anonymous==0">退出登录</div>
    </div>

    <bottomnative :idx="3"></bottomnative>
    <div class="loding" v-if="loding">
      <img
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542711101022&di=3b47c50ded423ff4ce29856c279708d3&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a65c57108eab6ac725134372f367.gif"
        alt
      >
    </div>
    <div class="nonetankuang" v-show="exitwarp">
      <h1>确定退出账户？</h1>
      <!-- <h2>您的订单将被保存在待付款订单里，请尽快完成支付。</h2> -->
      <div class="nonetankuangbtn">
        <div class="nonetankuangbtnleft" @click="nonewarpclick">取消</div>
        <div class="nonetankuangbtnright" @click="yeswarpclick">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
import bottomnative from './../bottomnative/bottomnative'
import areaBtn from './area.vue'
export default {
  components: {
    bottomnative, bottomnative,
    areaBtn, areaBtn
  },
  name: 'HelloWorld',
  data () {
    return {
      coloractivefour: "colora",
      coloractive: "colora",
      coloractivetwo: "coloatwo",
      coloractivethree: "colora",
      coloractivefive: "colora",
      Sparemoney: "colora",
      recycle: "colora",
      name: '',
      phone: '',
      address: '',
      city: '',
      radio: false,
      testPhone: /^0?1[3|4|5|7|8][0-9]\d{8}$/,
      username: null,
      completedOrder: null,
      pendingOrder: null,
      receivedOrder: null,
      refundOrder: null,
      loding: true,
      zhegai: false,
      exitwarp: false,
      shippedOrder: null,
      anonymous: null,
      titleimg: null


    }
  },

  methods: {
    yingyetxttclick () {         //营业执照
      this.coloractivetwo = "coloractivetwo"
      var that = this
      setTimeout(function () {
        that.coloractivetwo = "colora"
        that.$router.push({ path: '/Credit' })
      }, 100)

    },
    shippingaddressclick () {      //收货地址

      localStorage.removeItem("biaoji")
      console.log(this.coloractive)
      this.coloractive = "coloractive"
      var that = this
      setTimeout(function () {
        that.coloractive = "colora"
        that.$router.push({ path: '/shippingaddress' })
      }, 100)
    },
    profileclick () {
      this.$router.push({ path: '/profile' })
    },
    myorderclick () {
      this.$router.push({ path: '/myorder' }) //跳转全部订单
    },
    daifahuoclick () {
      this.$router.push({ path: '/myorder', query: { id: 4 } }) //跳转待发货订单
    },
    daifukuanclick () {
      this.$router.push({ path: '/myorder', query: { id: 1 } })   //跳转代付款订单
      //  this.$store.commit('number',1)
    },
    daishouhuoclick () {
      this.$router.push({ path: '/myorder', query: { id: 2 } })   //跳转代收货
    },
    yiwanchengclick () {
      this.$router.push({ path: '/myorder', query: { id: 3 } })   //跳转已完成
    },
    reimburseclick () {
      this.$router.push({ path: '/reimburse' })   //退款售后
    },
    logoclick () {                         //登录
      this.$router.push({ path: '/logo' })
      sessionStorage.setItem("router", "/mytext")
    },
    // 手机充值
    phoneclick () {
      this.coloractivethree = "coloractivethree"
      var that = this
      setTimeout(function () {
        that.coloractivethree = "colora"
        that.$router.push({ path: '/xunidingdan' })
      }, 100)

    },

    // 闲置换钱
    Sparemoneyclick () {
      this.Sparemoney = "coloractivethree"
      var that = this
      setTimeout(function () {
        that.Sparemoney = "colora"
        that.$router.push({ path: '/Sparemoney' })
      }, 100)


    },







    //回收订单
    recycleclick () {
      var sendDate = (new Date()).getTime();
      this.recycle = "coloractivethree"
      var that = this
      setTimeout(function () {
        that.recycle = "colora"
      }, 100)

      this.$store.commit("loding", true)
      let getOrderUrlObj = {
        version: this.$parameter,
        routeUri: "mytext"
      }
      this.$server.getOrderUrl(getOrderUrlObj).then(data => {
        console.log('0..........0', data)
        var receiveDate = (new Date()).getTime();
        var responseTimeMs = receiveDate - sendDate;
        var that = this
        if (responseTimeMs < 300) {
          setTimeout(function () {
            that.$store.commit("loding", false)
          }, 300)
        } else {
          this.$store.commit("loding", false)
        }

        if (data.data.code == "0") {
          window.location.href = data.data.jumpUrl
        } else {
          this.$layer.msg(data.data.message)
        }

      })

    },


    // 关于我们
    mypronclick () {
      this.coloractivefour = "coloractivefour"
      var that = this
      setTimeout(function () {
        that.coloractivefour = "colora"
        that.$router.push({ path: '/AboutUs' })
      }, 100)
    },
    // 意见反馈
    feedback () {
      this.coloractivefive = "coloractivefour"
      var that = this
      setTimeout(function () {
        that.coloractivefive = "colora"
        that.$router.push({ path: '/feedback' })
      }, 100)
    },
    init () {

      let userInfoObj = {

      }
      let gainphoneObj = {

      }

      Promise.all([this.$server.userInfo(
        userInfoObj

      ), this.$server.gainphone(
        gainphoneObj

      )]).then(res => {
        if (res[0].respCode == "0000") {
          this.loding = false
        }

        // 用户信息
        console.log(res[0])
        console.log(res[1])
        this.anonymous = res[0].data.anonymous
        this.username = res[0].data.username,
          this.completedOrder = res[0].data.completedOrder    //已完成
        this.pendingOrder = res[0].data.pendingOrder         //待付款
        this.receivedOrder = res[0].data.receivedOrder  //待收货
        this.refundOrder = res[0].data.refundOrder  //退款/售后
        this.shippedOrder = res[0].data.shippedOrder  //待发货
        this.titleimg = res[0].data.headImage

        // 手机号
        localStorage.setItem("againphone", res[1].data.phone)


      })

    },
    nonelogoclick () {
      this.zhegai = true
      this.exitwarp = true
    },
    nonewarpclick () {
      this.zhegai = false
      this.exitwarp = false
    },

    yeswarpclick () {
      let logoutObj = {

      }
      this.$server.logout(logoutObj).then(data => {
        console.log(data)
        if (data.data.code == "0") {
          let uniqueId = localStorage.getItem("uniqueId")
          console.log(uniqueId)
          localStorage.clear();
          sessionStorage.clear()
          localStorage.setItem("uniqueId", uniqueId)

          this.$router.push({ path: '/' })
        } else {
          this.$layer.msg(data.data.msg)
        }

      })
    },


  },
  mounted () {

    sessionStorage.setItem('skiprouter', this.$route.path)
    this.init()

  },



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add {
  padding-bottom: 0.5rem;
}
.add .commonD {
  padding: 0.43rem 0.47rem;
  background: #fff;
  font-size: 0.3rem;
  color: #758692;
  border-bottom: 1px solid #d4dce1;
}
.commonD .leftSpan {
  display: inline-block;
  width: 1.5rem;
}
.commonD input {
  border: none;
  width: 4.5rem;
  line-height: 0.3rem;
  font-size: 0.3rem;
}
.addAddress {
  margin-top: 0.6rem;
}
.addAddress img {
  width: 0.4rem;
  vertical-align: bottom;
}
.bottom {
  padding: 0 0.47rem;
  margin-top: 1.5rem;
}
.bottom button {
  width: 100%;
  height: 0.88rem;
  background: #ea608c;
  border-radius: 100px;
  border: 1px solid #ea608c;
  color: #fff;
  font-size: 0.36rem;
}
.backgroundimg {
  width: 100%;
  height: 2.9rem;
  background: url(../../assets/my_image@2x.png) center, no-repeat;
  overflow: hidden;
}
.hellowwarp {
  width: 100%;
  height: 100%;
  background: #f1f1f1;
  position: absolute;
}
.concent {
  background: #f1f1f1;
  padding-bottom: 3.5rem;
}
.maytitle {
  color: #fff;
  text-align: center;
  font-size: 0.453rem;
  margin-top: 0.5rem;
}
.myname {
  width: 95%;

  margin: 0 auto;
  margin-top: 0.5rem;

  overflow: hidden;
}
.mynameleft {
  float: left;
  color: #fff;
  font-size: 0.5rem;
}
.maynameright {
  width: 1rem;
  height: 1rem;
  float: right;
  text-align: center;
  margin-top: 0.25rem;
}
.maynameright img {
  width: 0.4rem;
  height: 0.4rem;
  margin-top: 0.1rem;
}
.mynameleft img {
  width: 1rem;
  height: 1rem;
  float: left;
  margin-top: 0.1rem;
  border-radius: 50%;
}
.mynameleft div {
  float: left;
  margin-top: 0.15rem;
  margin-left: 0.2rem;
}
.myorde {
  width: 100%;
  box-sizing: border-box;
  height: 1.173rem;
  border: 1px solid #f2f2f2;
  overflow: hidden;
  background: #fff;
}
.myordeauto {
  width: 95%;
  margin: 0 auto;
}
.myordeautoleft {
  float: left;
  line-height: 1.173rem;
  font-size: 0.38rem;
  color: #222222;
}
.myordeautoright {
  float: right;
  line-height: 1.173rem;
  font-size: 0.36rem;
  color: #888888;
}
.myordeautoright img {
  width: 0.32rem;
  height: 0.32rem;
  margin-left: 0.2rem;
  margin-top: 0.1rem;
}
.ordestauts {
  width: 100%;
  height: 1.886rem;
  background: #fff;
}
.ordestauts ul li {
  width: 20%;
  float: left;
  text-align: center;
  margin-top: 0.346rem;
  font-size: 0.37rem;
  color: #222222;
  position: relative;
}
.ordestauts ul li img {
  width: 0.586rem;
}
.solid {
  width: 100%;
  height: 0.262rem;
  background: #f2f2f2;
}
.mylocation {
  width: 100%;
  height: 1.25rem;
  box-sizing: border-box;
  border-bottom: 1px solid #f2f2f2;
  background: #fff;
}
.mylocationleft {
  float: left;

  font-size: 0.4rem;
  color: #222222;
  overflow: hidden;
}
.mylocationleft img {
  float: left;
  margin-top: 0.35rem;
  margin-right: 0.3rem;
}
.mylocationleft div {
  float: left;
  line-height: 1.25rem;
}
.mylocationleft img {
  width: 0.5rem;
  height: 0.526rem;
}
.mylocationright {
  float: right;
  line-height: 1.25rem;
  margin-right: 0.1rem;
}
.mylocationright img {
  width: 0.4rem;
}
.mylocationauto {
  width: 95%;
  margin: 0 auto;
}
.nonelogo {
  width: 100%;
  height: 1.173rem;
  box-sizing: border-box;
  text-align: center;
  line-height: 1.173rem;
  border-bottom: 1px solid #f2f2f2;
  font-size: 0.45rem;
  color: #222222;
  background: #ffffff;
}
.numbergeshu {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #f7a020;
  box-sizing: border-box;
  position: absolute;
  top: -0.2rem;
  right: 0.7rem;
  line-height: 0.5rem;
  text-align: center;
  color: #fff;
  font-size: 0.32rem;
  color: #f7a020;
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
#kefu img {
  width: 0.5rem;
  height: 0.526rem;
  /* margin-top: 0.4rem; */
}
.coloractive {
  background: #ccc;
}
.coloractivetwo {
  background: #ccc;
}
.coloractivethree {
  background: #ccc;
}
.coloractivefour {
  background: #ccc;
}
</style>
