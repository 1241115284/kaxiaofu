<template>
  <div class="hellowwarp">
    <div class="head">
      <div class="headauto">
        <div class="imgwarp" @click="imgwarpclick">
          <img src="../../assets/back@2x.png" alt>
          <span>返回</span>
        </div>
        <div class="headtext">手机充值</div>
      </div>
    </div>
    <div class="phone">
      <div class="phoneauto">
        <input
          type="tel"
          placeholder="请输入手机号"
          v-model="phone"
          @keyup="phoneclick"
          oninput="if(value.length > 11)value = value.slice(0, 11)"
        >
        <div class="phonetong" v-show="phonetype">
          {{pnhonetype}}
          <span>({{region}})</span>
        </div>
      </div>
      <img src="../../assets/my_sh_icon_gb@2x.png" alt class="nonoephone" @click="nonoephoneclick">
    </div>
    <div class="huafeiwarp">
      <div class="huafeiwarptitle">
        <div class="huafeiwarptitleauto">话费充值</div>
      </div>
      <div class="huafeiwarpconcent">
        <ul>
          <!-- 话费充值 -->

          <li v-for="item in List" class="zhihui" v-show="itemshow">
            <div class="yuanwarp">
              <div class="chushihua">{{item.msg}}元</div>
            </div>
          </li>

          <li
            v-for="(item,index) in newList"
            :class="{active:index==current}"
            @click="xuanzeclick(item.denomination,item.realRrice,item.viewPrice,item.denoName)"
            v-show="activeshow"
          >
            <div class="yuanwarp">
              <div class="yuanwarpleft">{{ item.denoName }}</div>
              <div class="yuanwarpright">售价{{item.viewPrice}}元</div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="huafeiwarp" id="liuliang" v-show="liuliang">
      <div class="huafeiwarptitle">
        <div class="huafeiwarptitleauto">流量充值</div>
      </div>
      <div class="huafeiwarpconcent" id="huafeiwarpconcents">
        <ul>
          <!-- 流量充值 -->

          <li v-for="item in List" class="zhihui" v-show="flowshow">
            <div class="yuanwarp">
              <div class="chushihua">{{item.msg}}M</div>
            </div>
          </li>

          <li
            v-for="(item,index) in liuliangList"
            :class="{active:index==current}"
            @click="liuliangclick(item.denomination,item.realRrice,item.viewPrice,item.denoName)"
            v-show="newflowshow"
          >
            <div class="yuanwarp">
              <div class="yuanwarpleft">{{item.denoName}}</div>

              <div class="yuanwarpright">售价{{item.viewPrice}}元</div>
            </div>
          </li>
        </ul>
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

export default {

  name: 'HelloWorld',
  data () {
    return {
      liuliang: true,
      region: null,
      lodingcode: null,
      id: null,
      loding: true,
      province: null,
      flowshow: true,
      newflowshow: false,
      pnhonetype: null,
      phonetype: false,
      activeshow: false,
      itemshow: true,
      phone: "",
      twojiaqian: null,
      jiaqian: 30,
      current: 0,
      name: '',
      show: true,
      count: "",
      newList: [],
      liuliangList: [],
      List: [
        {
          msg: 30,
          key: "0"
        },
        {
          msg: 50,
          key: "1"
        },
        {
          msg: 100,
          key: "2"
        },
        {
          msg: 200,
          key: "3"
        },
        {
          msg: 300,
          key: "4"
        },
        {
          msg: 500,
          key: "0"
        },
      ]
    }
  },

  filters: {
    myTextTransform: function (money) {

      var money = money / 100

      return money

    }
  },


  methods: {
    wxlogo () {
      let redirect_uri = location.origin;
      let parameter = this.$parameter
      // this.$layer.msg(".虚拟订单.")
      return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc49eb72e379064c2&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=/${parameter}/checkstand#wechat_redirect`

    },
    imgwarpclick () {
      if (sessionStorage.getItem('skiprouter')) {
        this.$router.push({ path: sessionStorage.getItem('skiprouter') })
      } else {
        this.$router.push({ path: "/" })
      }
    },


    //话费充值
    xuanzeclick (denomination, realRrice, viewPrice, denoName) {
      localStorage.setItem("inputphone", this.phone)
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {

        this.loding = true
        var rechargetype = 801
        var producttype = 1
        let createOrderObj = {
          rechargePhone: this.phone,
          producttype: producttype,
          denomination: denomination,
          rechargetype: rechargetype,
          province: this.province,
          provincename: this.provincename,
          isp: this.isp,
          ispname: this.pnhonetype,
          realRrice: realRrice,
          orderprice: viewPrice,
          paymentprice: viewPrice,
          denoName: denoName,
          paymethod: 1

        }
        this.$server.createOrder(createOrderObj).then(data => {

          if (data.data.code == "0000") {

            if (!sessionStorage.getItem("openid")) {
              sessionStorage.setItem("merId", data.data.result.mid)
              sessionStorage.setItem("money", data.data.result.paymentPrice)
              sessionStorage.setItem("orderId", data.data.result.oid)
              sessionStorage.setItem("userid", data.data.result.userid)
              sessionStorage.setItem("describe", data.data.result.describe)
              window.location.href = this.wxlogo()
            } else {
              sessionStorage.setItem("merId", data.data.result.mid)
              sessionStorage.setItem("money", data.data.result.paymentPrice)
              sessionStorage.setItem("orderId", data.data.result.oid)
              sessionStorage.setItem("userid", data.data.result.userid)
              sessionStorage.setItem("describe", data.data.result.describe)
              this.$router.replace({ path: '/checkstand' })
            }

          } else {
            this.$layer.msg(data.data.msg)
          }



        })


        return
      }
      this.loding = true
      var rechargetype = 801
      var producttype = 1
      let createOrderObj = {
        rechargePhone: this.phone,
        producttype: producttype,
        denomination: denomination,
        rechargetype: rechargetype,
        province: this.province,
        provincename: this.provincename,
        isp: this.isp,
        ispname: this.pnhonetype,
        realRrice: realRrice,
        orderprice: viewPrice,
        paymentprice: viewPrice,
        denoName: denoName,
        paymethod: 1

      }
      this.$server.createOrder(createOrderObj).then(data => {
        console.log(data)

        if (data.data.code == "0000") {
          this.$router.replace({ path: '/checkstand' })
          sessionStorage.setItem("merId", data.data.result.mid)
          sessionStorage.setItem("money", data.data.result.paymentPrice)
          sessionStorage.setItem("orderId", data.data.result.oid)
          sessionStorage.setItem("userid", data.data.result.userid)
          sessionStorage.setItem("describe", data.data.result.describe)

        } else {
          this.$layer.msg(data.data.msg)
        }



      })



    },


    // 流量充值
    liuliangclick (denomination, realRrice, viewPrice, denoName) {
      localStorage.setItem("inputphone", this.phone)
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {

        var sendDate = (new Date()).getTime();
        this.loding = true
        var rechargetype = 804
        var producttype = 1
        let createOrderObj = {
          rechargePhone: this.phone,
          producttype: producttype,
          denomination: denomination,
          rechargetype: rechargetype,
          province: this.province,
          provincename: this.provincename,
          isp: this.isp,
          ispname: this.pnhonetype,
          realRrice: realRrice,
          orderprice: viewPrice,
          paymentprice: viewPrice,
          denoName: denoName,
          paymethod: 1

        }
        this.$server.createOrder(createOrderObj).then(data => {

          if (data.data.code == "0000") {

            if (!sessionStorage.getItem("openid")) {
              sessionStorage.setItem("merId", data.data.result.mid)
              sessionStorage.setItem("money", data.data.result.paymentPrice)
              sessionStorage.setItem("orderId", data.data.result.oid)
              sessionStorage.setItem("userid", data.data.result.userid)
              sessionStorage.setItem("describe", data.data.result.describe)
              window.location.href = this.wxlogo()

            } else {
              sessionStorage.setItem("merId", data.data.result.mid)
              sessionStorage.setItem("money", data.data.result.paymentPrice)
              sessionStorage.setItem("orderId", data.data.result.oid)
              sessionStorage.setItem("userid", data.data.result.userid)
              sessionStorage.setItem("describe", data.data.result.describe)
              this.$router.replace({ path: '/checkstand' })
            }

          } else {
            this.$layer.msg(data.data.msg)
          }


        })

        return
      }

      var sendDate = (new Date()).getTime();
      this.loding = true
      var rechargetype = 804
      var producttype = 1
      let createOrderObj = {
        rechargePhone: this.phone,
        producttype: producttype,
        denomination: denomination,
        rechargetype: rechargetype,
        province: this.province,
        provincename: this.provincename,
        isp: this.isp,
        ispname: this.pnhonetype,
        realRrice: realRrice,
        orderprice: viewPrice,
        paymentprice: viewPrice,
        denoName: denoName,
        paymethod: 1

      }
      this.$server.createOrder(createOrderObj).then(data => {
        console.log(data)

        if (data.data.code == "0000") {
          this.$router.replace({ path: '/checkstand' })
          sessionStorage.setItem("merId", data.data.result.mid)
          sessionStorage.setItem("money", data.data.result.paymentPrice)
          sessionStorage.setItem("orderId", data.data.result.oid)
          sessionStorage.setItem("userid", data.data.result.userid)
          sessionStorage.setItem("describe", data.data.result.describe)
        } else {
          this.$layer.msg(data.data.msg)
        }


      })



    },



    bottomautorightclick () {
      this.$layer.msg(this.twojiaqian)

    },
    nonoephoneclick () {
      this.phone = ""
      this.activeshow = false    //可充值话费
      this.itemshow = true       //静态展示话费
      this.phonetype = false     // 手机号
      this.flowshow = true       //可充值流量
      this.newflowshow = false//静态展示流量
    },
    // 充值列表
    init () {

      this.loding = true
      let queryRechargeProductObj = {
        rechargeType: "801",
        phone: this.phone
      };
      let queryRechargeProductObj1 = {
        rechargeType: "804",
        phone: this.phone
      };

      Promise.all([this.$server.queryRechargeProduct(
        queryRechargeProductObj

      ), this.$server.queryRechargeProduct(
        queryRechargeProductObj1


      )]).then(res => {

        console.log(res)

        if (res) {

          this.loding = false
          // 话费
          if (res[0].data.result.res_code == "200") {
            console.log(res[0].data.result.retObject.ispName)

            if (res[0].data.result.retObject.productPriceList.length != 0) {
              this.activeshow = true
              this.itemshow = false
              this.phonetype = true
              this.newList = res[0].data.result.retObject.productPriceList
              this.newList.sort((a, b) => a.viewPrice - b.viewPrice)
            }





            this.province = res[0].data.result.retObject.province
            this.pnhonetype = res[0].data.result.retObject.ispName
            this.region = res[0].data.result.retObject.provinceName
            this.provincename = res[0].data.result.retObject.provinceName
            this.isp = res[0].data.result.retObject.isp





          } else {
            this.$layer.msg(res[0].data.result.res_msg)
          }



          //流量
          if (res[1].data.result.res_code == "200") {
            if (res[1].data.result.retObject.productPriceList.length != 0) {
              this.flowshow = false
              this.newflowshow = true
              this.phonetype = true

              this.liuliangList = res[1].data.result.retObject.productPriceList
              this.province = res[1].data.result.retObject.province
              this.liuliangList.sort((a, b) => a.viewPrice - b.viewPrice)
            }





          } else {
            this.$layer.msg(res[0].data.result.res_msg)
          }


        }


      })


    },






    phoneclick () {
      console.log(this.phone.length)
      if (this.phone.length == 11) {
        this.init()
      } else {
        this.activeshow = false    //可充值话费
        this.itemshow = true       //静态展示话费
        this.phonetype = false     // 手机号
        this.flowshow = true       //可充值流量
        this.newflowshow = false//静态展示流量
      }
    },

  },

  mounted () {
    this.twojiaqian = this.jiaqian.toFixed(2)
    this.init()
  },
  created () {
    if (localStorage.getItem("inputphone")) {
      this.phone = localStorage.getItem("inputphone")
      localStorage.removeItem("inputphone")
    } else {
      this.phone = localStorage.getItem("againphone")
    }


  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.hellowwarp {
  width: 100%;
  height: 100%;
  position: absolute;
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
.phone {
  width: 100%;
  height: 2rem;
  background: #fff;
  position: relative;
  border-bottom: 1px solid #f2f2f2;
  overflow: hidden;
  margin-top: 0.2rem;
  padding-top: 0.4rem;
}
.phoneauto {
  width: 95%;
  margin: 0 auto;
  overflow: hidden;
  /* margin-top: 0.2rem; */
}
.phoneauto input {
  width: 70%;
  height: 0.9rem;
  border: none;
  font-size: 0.6rem;
  font-family: ”微软雅黑”；;
}
.huafeiwarp {
  width: 100%;
  /* height: 5rem; */
  background: #fff;
}
.huafeiwarptitle {
  width: 100%;

  /* border: 1px solid #F2F2F2; */
  box-sizing: border-box;

  font-size: 0.373rem;
  padding-top: 0.35rem;
}
.huafeiwarptitleauto {
  width: 95%;
  margin: 0 auto;
  color: #aeaeae;
}
.huafeiwarpconcent {
  width: 95%;
  margin: 0 auto;
  /* background: red; */
  overflow: hidden;
  /* padding-bottom: 0.35rem; */
}
.huafeiwarpconcent ul li {
  float: left;
  /* width: 2.93rem; */
  width: 30%;
  height: 1.6rem;
  box-sizing: border-box;
  border: 1px solid #56b76f;
  border-radius: 5px;
  /* line-height: 1.44rem; */
  margin-right: 0.35rem;

  margin-top: 0.35rem;

  color: #56b76f;
  /* background: red; */
  text-align: center;
  font-size: 0.34rem;
}

.huafeiwarpconcent ul li:nth-child(3) {
  margin-right: 0rem;
}
.huafeiwarpconcent ul li:nth-child(6) {
  margin-right: 0rem;
}
.huafeiwarpconcent ul li:nth-child(9) {
  margin-right: 0rem;
}
.huafeiwarpconcent ul li:nth-child(12) {
  margin-right: 0rem;
}

.huafeiwarpconcent ul .zhihui {
  border: 1px solid #ccc;
  color: #ccc;
}
.yuanwarp {
  /* margin: 0 auto;
  
  width: 100%;
  height: 100%;
 margin-left: 1rem; */
}
.yuanwarp div {
  /* float: left; */
}
/* .huafeiwarpconcent ul .active{
  background: #222;
  color: #fff;
} */

.bottomauto {
  width: 95%;
  margin: 0 auto;
  line-height: 1.6rem;
  font-size: 0.373rem;
}
.bottomautoleft {
  float: left;
  color: #222;
}
.bottomautoright {
  float: right;
  font-size: 0.373rem;
  background: #222;
  width: 3rem;
  text-align: center;
  color: #fff;
  line-height: 1.6rem;
}
.bottom {
  width: 100%;
  height: 1.6rem;
  background: #fff;
  line-height: 1.6rem;
  text-align: center;
  font-size: 0.4rem;
  color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
}
.yuanwarpleft {
  margin-top: 0.3rem;
  font-size: 0.45rem;
}
.yuanwarpright {
  /* color: #222222; */
  font-size: 0.25rem;
  color: #90d0a1;
}
.huafeiwarpconcent ul .zhihuise {
  border: 1px solid #222222;

  color: #222222;
  background: #fff;
}
.phonetong {
  width: 100%;
  font-family: ”微软雅黑”；;
  font-size: 0.3rem;
  margin-top: 0.1rem;
}
.nonoephone {
  position: absolute;
  right: 0.5rem;
  top: 0.51rem;
  width: 0.5rem;
  height: 0.5rem;
}
.chushihua {
  line-height: 1.6rem;
}
#liuliang {
  padding-top: 0rem;
}
#huafeiwarpconcents {
  padding-bottom: 0.35rem;
}
</style>
