<template>
  <div class="concentwarp">
    <div v-if="item.producttype==0">
      <div class="concent_liauto">
        <h1 class="title">
          <div class="titleleft">订单号:{{item.oid}}</div>
          <div v-if="item.status==1">待付款</div>
          <div v-if="item.status==2">待发货</div>
          <div v-if="item.status==3">待收货</div>
          <div v-if="item.status==4">已完成</div>
          <div v-if="item.status==5">交易已取消</div>
        </h1>
        <div class="concent_liwarp">
          <div class="concent_liwarpimgwarp">
            <img :src="item.plans" class="concent_liwarpimg">
          </div>
          <div class="concent_liwarpright">
            <div class="ordertext">{{item.productName}}{{item.description}}</div>
            <div class="orderstyle">
              <span v-for="items in item.specInfo" class="orderstyleflet">
                <span>{{items.attribute}}:</span>
                <span>{{items.attributeVal}}</span>
              </span>
            </div>
            <div class="ordermoney">
              <div class="left">￥{{item.price}}</div>
              <div class="right">x{{item.num}}</div>
            </div>
          </div>
          <div class="orderjiagewarp">
            <div class="shijian">{{item.ctime | formatDate}}</div>
            <div class="orderjiage" v-if="item.paytype!=2">实付款：￥{{item.paymentPrice}}(免运费)</div>
            <div class="orderjiage" v-if="item.paytype==2">应付款：￥{{item.paymentPrice}}(免运费)</div>
          </div>
          <div class="orderbtn" v-if="item.status==1">
            <div class="timee">{{msgg}}</div>
            <div class="zaicibtn" @click="noneclick(item.oid,item.specid)">取消订单</div>
            <div class="zaicibtn" @click="Physicalpaymentclick(item)">确认付款</div>
          </div>

          <div class="orderbtn" v-if="item.status==2">
            <div class="zaicibtn" @click="twogoumai(item.goodsid)">再次购买</div>
          </div>

          <div class="orderbtn" v-if="item.status==3">
            <div class="zaicibtn" @click="shouhuoclick(item.oid)">确认收货</div>
            <div class="zaicibtn" @click="wuliuclick(item.tracknumber)">查看物流</div>
            <div class="zaicibtn" @click="twogoumai(item.goodsid)">再次购买</div>
          </div>

          <div class="orderbtn" v-if="item.status==4">
            <div class="zaicibtn" v-if="item.refundStatus==1" @click="tuihuanclick(item.oid)">申请退/换货</div>
            <div class="zhuihuibtn" v-if="item.refundStatus==0">申请退/换货</div>
            <div class="zhuihuibtn" v-if="item.refundStatus==3">已退款</div>
            <div class="zhuihuibtn" v-if="item.refundStatus==4">暂不支持</div>
            <div class="zaicibtn" @click="twogoumai(item.goodsid)">再次购买</div>
            <a
              class="zaicibtn"
              :href="'tel:'+item.merPhone"
              @click="phoneclick"
              :class="phonestyle"
            >联系商家</a>

            <!-- 回收换钱 -->

            <!-- <div class="zaicibtn" v-if="item.recycle==2"  @click="exchangeclick(item.oid)">回收换钱</div>
                  <div  class="zhuihuibtn" v-if="item.recycle==1" >回收换钱 </div>
            <div  class="zhuihuibtn" v-if="item.recycle==3" >已回收 </div>-->
          </div>

          <div class="orderbtn" v-if="item.status==5">
            <div class="zaicibtn" @click="twogoumai(item.goodsid)">再次购买</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="item.producttype==1">
      <div class="concent_liauto">
        <h1 class="title">
          <div class="titleleft">订单号:{{item.oid}}</div>
          <div v-if="item.status==1">待付款</div>
          <div v-if="item.status==2">充值中</div>
          <div v-if="item.status==3">充值中</div>
          <div v-if="item.status==4">充值完成</div>
          <div v-if="item.status==5">交易已取消</div>
          <div v-if="item.status==6">充值失败</div>
        </h1>
        <div class="concent_liwarp">
          <div class="concent_liwarpimgwarp" v-if="item.isp==10" id="xuniwarp">
            <div class="movement">
              <img src="../../../assets/yd.png" class="concent_liwarpimg">
            </div>
          </div>
          <div class="concent_liwarpimgwarp" v-if="item.isp==20" id="xuniwarp">
            <div class="movement">
              <img src="../../../assets/lt.png" class="concent_liwarpimg">
            </div>
          </div>
          <div class="concent_liwarpimgwarp" v-if="item.isp==30" id="xuniwarp">
            <div class="movement">
              <img src="../../../assets/dx.png" class="concent_liwarpimg">
            </div>
          </div>
          <div class="concent_liwarpright">
            <div class="ordertext">
              <span v-if="item.rechargetype==801">话费充值</span>
              <span v-if="item.rechargetype==804">流量充值</span>
              -
              <span>{{item.ispName}}</span>
            </div>
            <div class="orderstyle">
              <span>充值号码:</span>
              <span>{{item.rechargephone}}</span>
            </div>
            <div class="ordermoney">
              <div class="left">充值面额：{{item.paymentPrice}}元</div>
              <div class="right">x1</div>
            </div>
          </div>
          <div class="orderjiagewarp">
            <div class="shijian">{{item.ctime | formatDate}}</div>
            <div class="orderjiage">实付：￥{{item.paymentPrice}}(免运费)</div>
          </div>
          <div class="orderbtn" v-if="item.status==1">
            <div class="timee">{{msgg}}</div>
            <div class="zaicibtn" @click="xuninoneclick(item.oid,item.specid)">取消订单</div>
            <div class="zaicibtn" @click="virtual(item)">确认付款</div>
          </div>

          <div class="orderbtn" v-if="item.status==2">
            <div class="zaicibtn" @click="xuniagainclick(item.rechargephone)">再次购买</div>
          </div>

          <div class="orderbtn" v-if="item.status==3">
            <div class="zaicibtn" @click="xuniagainclick(item.rechargephone)">再次购买</div>
          </div>

          <div class="orderbtn" v-if="item.status==4">
            <div class="zaicibtn" @click="xuniagainclick(item.rechargephone)">再次购买</div>
            <a class="zaicibtn" href="tel:400-888-9999" @click="phoneclick" :class="phonestyle">联系商家</a>
          </div>
          <div class="orderbtn" v-if="item.status==5">
            <div class="zaicibtn" @click="xuniagainclick(item.rechargephone)">再次购买</div>
          </div>
          <div class="orderbtn" v-if="item.status==6">
            <div class="zaicibtn" @click="xuniagainclick(item.rechargephone)">再次购买</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    item: Object
  },
  name: 'HelloWorld',
  data () {
    return {
      msgg: null,
      phonestyle: "defaultstyle"
    }
  },
  filters: {
    formatDate: function (value) {
      // console.log(value)
      if (value == null) {
        return "暂无时间"
      } else {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '年' + MM + '月' + d + '日' + h + ':' + m + ':' + s;
      }

    },
    down: function (value) {
      console.log(value)
      return value
    }
  },

  methods: {
    wxlogo () {
      let redirect_uri = location.origin;
      let parameter = this.$parameter
      // this.$layer.msg(".付款.")
      return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc49eb72e379064c2&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=/${parameter}/checkstand#wechat_redirect`

    },
    exchangeclick (oid) {
      this.$store.commit("loding", true)
      console.log(oid)
      let getJumpUrlObj = {
        orderId: oid,
        version: this.$parameter,
        routeUri: "myorder"
      }

      this.$server.getJumpUrl(getJumpUrlObj).then(data => {

        console.log("....url.....", data)
        if (data.data.code == "0") {

          window.location.href = data.data.jumpUrl
        } else {
          this.$layer.msg(data.data.message)
        }


      })


    },
    // 实物确认付款
    Physicalpaymentclick (item) {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {

        var sendDate = (new Date()).getTime();
        this.$store.commit("loding", true)
        let affirmPayObj = {
          oid: item.oid
        }
        this.$server.affirmPay(affirmPayObj).then(data => {
          console.log(data)
          var receiveDate = (new Date()).getTime();
          var responseTimeMs = receiveDate - sendDate;
          var that = this
          if (responseTimeMs < 300) {
            setTimeout(function () {
              that.$store.commit("loding", false)
              that.loding = false
            }, 300)
          } else {
            this.$store.commit("loding", false)
            that.loding = false
          }
          if (data.data.result.isPay == "1") {
            if (!sessionStorage.getItem("openid")) {
              sessionStorage.setItem("merId", item.mid)
              sessionStorage.setItem("money", item.paymentPrice)
              sessionStorage.setItem("orderId", item.oid)
              sessionStorage.setItem("userid", item.userid)
              sessionStorage.setItem("describe", item.describe)
              sessionStorage.setItem("goodsId", item.goodsid)
              window.location.href = this.wxlogo()
            } else {
              sessionStorage.setItem("merId", item.mid)
              sessionStorage.setItem("money", item.paymentPrice)
              sessionStorage.setItem("orderId", item.oid)
              sessionStorage.setItem("userid", item.userid)
              sessionStorage.setItem("describe", item.describe)
              sessionStorage.setItem("goodsId", item.goodsid)
              this.$router.push({ path: '/checkstand' })
            }
          } else {
            this.$layer.msg("订单已关闭")
            this.$emit('Physicalpaymentclick');
          }


        })



        return
      }

      var sendDate = (new Date()).getTime();
      this.$store.commit("loding", true)
      let affirmPayObj = {
        oid: item.oid
      }

      this.$server.affirmPay(affirmPayObj).then(data => {
        console.log(data)
        var receiveDate = (new Date()).getTime();
        var responseTimeMs = receiveDate - sendDate;
        var that = this
        if (responseTimeMs < 300) {
          setTimeout(function () {
            that.$store.commit("loding", false)
            that.loding = false
          }, 300)
        } else {
          this.$store.commit("loding", false)
          that.loding = false
        }
        if (data.data.result.isPay == "1") {
          this.$router.push({ path: '/checkstand' })
          sessionStorage.setItem("merId", item.mid)
          sessionStorage.setItem("money", item.paymentPrice)
          sessionStorage.setItem("orderId", item.oid)
          sessionStorage.setItem("userid", item.userid)
          sessionStorage.setItem("describe", item.describe)
          sessionStorage.setItem("goodsId", item.goodsid)

        } else {
          this.$layer.msg("订单已关闭")
          this.$emit('Physicalpaymentclick');
        }


      })



    },
    // 虚拟确认付款
    virtual (item) {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        var sendDate = (new Date()).getTime();
        this.$store.commit("loding", true)
        let affirmPayObj = {
          oid: item.oid
        }
        this.$server.affirmPay(affirmPayObj).then(data => {
          console.log(data)
          var receiveDate = (new Date()).getTime();
          var responseTimeMs = receiveDate - sendDate;
          var that = this
          if (responseTimeMs < 300) {
            setTimeout(function () {
              that.$store.commit("loding", false)
              that.loding = false
            }, 300)
          } else {
            this.$store.commit("loding", false)
            that.loding = false
          }
          if (data.data.result.isPay == "1") {
            if (!sessionStorage.getItem("openid")) {
              sessionStorage.setItem("merId", item.mid)
              sessionStorage.setItem("money", item.paymentPrice)
              sessionStorage.setItem("orderId", item.oid)
              sessionStorage.setItem("userid", item.userid)
              sessionStorage.setItem("describe", item.describe)
              window.location.href = this.wxlogo()
            } else {
              sessionStorage.setItem("merId", item.mid)
              sessionStorage.setItem("money", item.paymentPrice)
              sessionStorage.setItem("orderId", item.oid)
              sessionStorage.setItem("userid", item.userid)
              sessionStorage.setItem("describe", item.describe)
              this.$router.push({ path: '/checkstand' })
            }

          } else {
            this.$layer.msg("订单已关闭")
            this.$emit('virtual');
          }


        })

        return
      }




      var sendDate = (new Date()).getTime();
      this.$store.commit("loding", true)
      let affirmPayObj = {
        oid: item.oid
      }
      this.$server.affirmPay(affirmPayObj).then(data => {
        console.log(data)
        var receiveDate = (new Date()).getTime();
        var responseTimeMs = receiveDate - sendDate;
        var that = this
        if (responseTimeMs < 300) {
          setTimeout(function () {
            that.$store.commit("loding", false)
            that.loding = false
          }, 300)
        } else {
          this.$store.commit("loding", false)
          that.loding = false
        }
        if (data.data.result.isPay == "1") {
          this.$router.push({ path: '/checkstand', query: { virtual: true } })
          sessionStorage.setItem("merId", item.mid)
          sessionStorage.setItem("money", item.paymentPrice)
          sessionStorage.setItem("orderId", item.oid)
          sessionStorage.setItem("userid", item.userid)
          sessionStorage.setItem("describe", item.describe)
        } else {
          this.$layer.msg("订单已关闭")
          this.$emit('virtual');
        }


      })



    },



    xuninoneclick (oid) {             //唤起虚拟订单取消订单弹框按钮
      this.$emit('xuninoneclick', oid);
    },
    noneclick (oid, specid) {           //唤起实物订单取消弹框

      this.$emit('noneclick', oid, specid);
    },
    tuihuanclick (oid) {
      this.$emit('tuihuanclick', oid);
    },
    // 实物再次购买                      
    twogoumai (goodsid) {
      this.$emit('twogoumai', goodsid);
    },
    // 虚拟订单再次购买
    xuniagainclick (againphone) {
      this.$emit('xuniagainclick', againphone);
    },
    // 物流详情
    wuliuclick (tracknumber) {
      this.$emit('wuliuclick', tracknumber);
    },
    // 确认收货
    shouhuoclick (oid) {
      this.$emit('shouhuoclick', oid);
    },
    //  申请退换货
    tuihuanclick (oid) {
      this.$emit('tuihuanclick', oid);
    },
    phoneclick () {
      this.phonestyle = "activestyle"
      var that = this
      setTimeout(function () {
        that.phonestyle = "defaultstyle"
      }, 100)
    },

    timee () {
      const TIME_COUNT = this.item.countDown;
      localStorage.setItem("time", this.item.countDown)
      if (!this.timer) {
        this.count = TIME_COUNT;
      }
      this.count--;
      var s = (this.count % 60) < 10 ? ('0' + this.count % 60) : this.count % 60;
      var h = this.count / 3600 < 10 ? ('0' + parseInt(this.count / 3600)) : parseInt(this.count / 3600);
      var m = (this.count - h * 3600) / 60 < 10 ? ('0' + parseInt((this.count - h * 3600) / 60)) : parseInt((this.count - h * 3600) / 60);
      this.msgg = h + '小时' + ' : ' + m + '分' + ' : ' + s + "秒"
      this.timer = setInterval(() => {
        if (this.count > 0 && this.count <= TIME_COUNT) {
          this.count--;
          var s = (this.count % 60) < 10 ? ('0' + this.count % 60) : this.count % 60;
          var h = this.count / 3600 < 10 ? ('0' + parseInt(this.count / 3600)) : parseInt(this.count / 3600);
          var m = (this.count - h * 3600) / 60 < 10 ? ('0' + parseInt((this.count - h * 3600) / 60)) : parseInt((this.count - h * 3600) / 60);
          this.msgg = h + '小时' + ' : ' + m + '分' + ' : ' + s + "秒"
        } else {
          clearInterval(this.timer);

        }

      }, 1000)

    },

  },
  mounted () {
    if (this.item.countDown) {
      this.timee()
    }


  },


}
</script>

<!-- Add "scoped" attribute to limit CSS t0o this component only -->
<style scoped>
/* .activestyle{
  background: #222;
} */
a {
  text-decoration: none;
  color: #333;
}
.concentwarp {
  background: #fff;
}
.hellowwarp {
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: auto;
  background: #f2f2f2;
}
.head {
  width: 100%;
  height: 1.2rem;
  border-bottom: 1px solid #f2f2f2;
  background: #fff;
  box-sizing: border-box;
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
.nativgie {
  width: 100%;
  height: 1.1rem;
  background: #fff;
}
.nativgie ul li {
  width: 20%;
  float: left;
  font-size: 0.373rem;
}
.nativgie ul li div {
  color: #666666;
  line-height: 1.1rem;
  text-align: center;

  margin: 0 auto;
  width: 1.2rem;
}
.nativgie ul .active .nativgietext {
  color: #222222;
  border-bottom: 2px solid #222222;
}

.concent_li {
  width: 95%;
  background: #fff;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 0.2rem;
  overflow: hidden;
}
.concent_liauto {
  width: 95%;
  margin: 0 auto;
}
.title {
  color: #f8ae51;
  font-size: 0.34rem;
  overflow: hidden;
  height: 1.2rem;
  line-height: 1.2rem;
  box-sizing: border-box;
  border-bottom: 1px solid #f1f1f1;
}
.title div {
  float: right;
}
.concent_liwarp {
  overflow: hidden;
  margin-top: 0.4rem;
}

.concent_liwarpright {
  width: 72%;
  float: left;
  margin-left: 0.2rem;
}
.ordertext {
  font-size: 0.34rem;
  /* margin-top: 0.2rem; */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /*! autoprefixer: on */
  -webkit-line-clamp: 2;
}
.orderstyle {
  font-size: 0.34rem;
  color: #888888;
  margin-top: 0.3rem;
  overflow: hidden;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /*! autoprefixer: on */
  -webkit-line-clamp: 2;
}
.ordermoney {
  font-size: 0.34rem;
  margin-top: 0.3rem;
  overflow: hidden;
  font-weight: bold;
}
.left {
  float: left;
}
.right {
  float: right;
}
.orderjiage {
  margin-top: 0.4rem;
  float: right;
  font-size: 0.373rem;
  padding-bottom: 0.3rem;
}
.orderjiagewarp {
  overflow: hidden;
  font-weight: bold;
  width: 100%;
}

.orderbtn {
  /* width: 100%; */
  padding-bottom: 0.3rem;
  overflow: hidden;
  /* float: right; */
  font-weight: bold;
  width: 100%;
  border-top: 1px solid #f1f1f1;
  padding-top: 0.3rem;
  /* margin-top: 0.2rem; */
}
.zaicibtn {
  box-sizing: border-box;
  height: 0.8rem;
  border: 1px solid #222;
  border-radius: 3px;
  font-size: 0.36rem;
  line-height: 0.8rem;
  text-align: center;
  float: right;
  margin-left: 0.2rem;
  padding-left: 0.18rem;
  padding-right: 0.18rem;
}
.concent {
  /* padding-top: 2.3rem; */
}
.fxiedtop {
  width: 100%;
  height: 2.3rem;
  background: #fff;
  position: fixed;
  top: 0;
  z-index: 100;
}
.scrollerstyle {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 2.3rem;
  left: 0;
  padding-bottom: 0.5rem;
}
/* .orderstyle span{
  margin-right: 0.2rem;
} */

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
  z-index: 1000;
}
.zhezhao {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 888;
}
.noneclick {
  width: 7.24rem;
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -3.62rem;
  margin-top: -1.5rem;
  z-index: 999;
  border-radius: 10px;
}
.noneyesbtn {
  text-align: center;
  font-size: 0.4rem;
  color: #333333;
  margin-top: 0.7rem;
  font-weight: bold;
}
.btnnnn {
  width: 100%;
  height: 1rem;
  border-top: 1px solid #f2f2f2;
  margin-top: 0.7rem;
}
.btnnnn div {
  width: 50%;
  line-height: 1rem;
  float: left;
  height: 1rem;
  text-align: center;
  font-size: 0.4rem;
  color: #f7a01f;
}
.btnnnnleft {
  width: 50%;
  border-right: 1px solid #f2f2f2;
  box-sizing: border-box;
}
.lackhtml {
  position: fixed;
  width: 100%;
  top: 1.2rem;
  bottom: 1.3rem;
  left: 0;
  background: #fff;
  font-size: 0.4rem;
  height: 100%;
}

.lackhtml div {
  width: 2.4rem;
  height: 1rem;
  /* background: red; */
  line-height: 1rem;
  text-align: center;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -1.2rem;
  margin-top: -0.5rem;
  color: #222;
}

.title .titleleft {
  float: left;
  color: #222;
  font-size: 0.34rem;
  font-weight: bold;
}
.orderstyleflet {
  margin-right: 0.2rem;
}
.zhuihuibtn {
  height: 0.8rem;

  background: #f2f2f2;
  border-radius: 5px;
  font-size: 0.36rem;
  line-height: 0.8rem;
  text-align: center;
  float: right;
  margin-left: 0.2rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  color: #ccc;
  box-sizing: border-box;
}
.concent_liwarpimg {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.concent_liwarpimgwarp {
  float: left;
  width: 2.24rem;
  height: 2.24rem;
  float: left;
  border-radius: 5px;
  /* border: 1px solid #f1f1f1; */
  box-sizing: border-box;
}
.movement {
  width: 80%;
  height: 80%;
  margin: 0 auto;
  margin-top: 0.1rem;
}
.movement img {
  height: 100%;
  width: 100%;
}
.orderjiagewarp .shijian {
  float: left;
  margin-top: 0.4rem;
  font-size: 0.35rem;
  color: #a8a8a8;
  font-weight: normal;
}
.timee {
  float: left;
  line-height: 0.8rem;
  font-size: 0.36rem;
}
</style>
