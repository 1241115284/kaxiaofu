<template>
  <div class="hellowwarp">
    <transition name="fade">
      <div class="zhegai" v-if="zhegai" @click="zhegaiclick"></div>
    </transition>
    <div class="head">
      <div class="headauto">
        <div class="imgwarp" @click="imgwarpclick">
          <img src="../../assets/back@2x.png" alt>
          <span>返回</span>
        </div>
        <div class="headtext">确认订单</div>
      </div>
    </div>
    <div class="text">
      <!-- <div class="textauto" v-if="mallUserAddress!=null" @click="tiaozhuanclick">
       <h1>
         <div class="textleft">
           收货人：{{consignee}}
         </div>
         <div class="textright">
          {{phone}}
         </div>
       </h1>
       <h2 >
         <img src="../../assets/gwc_tc_icon_add@2x.png" alt="" class="dingweiimg">
         <div class="gerenxinxidizhi">{{addressarea}} {{address}}</div>
         <img src="../../assets/gwc_tc_icon_f@2x.png" alt="" class="xuanzeimg">
       </h2>
      </div>-->

      <!-- <div class="textauto" v-if="mallUserAddress==null" @click="tiaozhuanclick">
       <h2 >
          <div class="gerenxinxidizhi" style="color:#F9B765">暂无地址,点击去添加用户地址</div> 
         <img src="../../assets/gwc_tc_icon_f@2x.png" alt="" class="xuanzeimg">
       </h2>
      </div>-->

      <!-- 未登录  没地址 -->
      <div class="textauto" v-if="this.anonymous==1&&this.haveAdd==1" @click="noneanonymousclick">
        <h2>
          <div class="gerenxinxidizhi" style="color:#F9B765">未登录,暂无线上收货地址</div>
        </h2>
      </div>

      <!-- 未登录 有地址   -->
      <div class="textauto" v-if="this.anonymous==1&&this.haveAdd==0" @click="noneanonymousclick">
        <h1>
          <div class="textleft">收货人：{{consignee}}</div>
          <div class="textright">{{phone}}</div>
        </h1>
        <h2>
          <img src="../../assets/gwc_tc_icon_add@2x.png" alt class="dingweiimg">
          <div class="gerenxinxidizhi">{{addressarea}} {{address}}</div>
          <img src="../../assets/gwc_tc_icon_f@2x.png" alt class="xuanzeimg">
        </h2>
      </div>

      <!-- 已登录, 没地址 -->
      <div class="textauto" v-if="this.anonymous==0&&this.haveAdd==1" @click="tiaozhuanclick">
        <h2>
          <div class="gerenxinxidizhi" style="color:#F9B765">暂无地址,点击去添加用户地址</div>
          <img src="../../assets/gwc_tc_icon_f@2x.png" alt class="xuanzeimg">
        </h2>
      </div>

      <!-- 已登录,有地址 -->
      <div class="textauto" v-if="this.anonymous==0&&this.haveAdd==0" @click="tiaozhuanclick">
        <h1>
          <div class="textleft">收货人：{{consignee}}</div>
          <div class="textright">{{phone}}</div>
        </h1>
        <h2>
          <img src="../../assets/gwc_tc_icon_add@2x.png" alt class="dingweiimg">
          <div class="gerenxinxidizhi">{{addressarea}} {{address}}</div>
          <img src="../../assets/gwc_tc_icon_f@2x.png" alt class="xuanzeimg">
        </h2>
      </div>
    </div>
    <div class="solidimgwarp">
      <img src="../../assets/gwc_tc_fg@2x.png" alt class="solidimg">
    </div>
    <div class="solid"></div>
    <div class="peisong">
      <div class="peisongauto">
        <div class="peisongautoleft">支付方式</div>

        <!-- //全部支持 -->
        <div class="peisongautoright" v-if="this.paymethod==0">
          <div class="way" :class="{active:current==trueavtive1}" @click="wayclick1()">
            <div class="backimg"></div>
            <div>在线支付</div>
          </div>
          <div class="way" :class="{active:current==trueavtive2}" @click="wayclick2()">
            <div class="backimg"></div>
            <div>货到付款</div>
          </div>
        </div>
        <!-- 只支持在线支付 -->
        <div class="peisongautoright" v-if="this.paymethod==1">
          <div class="way" :class="{active:current==trueavtive1}" @click="wayclick1()">
            <div class="backimg"></div>
            <div>在线支付</div>
          </div>
          <div class="way" style="color:#ccc">
            <div class="zhihuiimg"></div>
            <div>货到付款</div>
          </div>
        </div>
      </div>
    </div>
    <div class="solid"></div>
    <div class="concent">
      <div class="concenttop">
        <div class="concenttopauto">
          <div class="shangpinimgwarp">
            <img :src="urlimg" alt class="shangpinimg">
          </div>
          <div class="concenttopautoright">
            <div class="concenttopautorighttext">
              {{productName}}
              {{description}}
            </div>
            <div class="concenttopautorightguige">
              <!-- <span v-for="itemicon in specInfo">
              {{itemicon.attribute}}：
              {{itemicon.attributeVal}}
              </span>-->
              <span v-for="items in specInfo" class="orderstyleflet">
                <span>{{items.attribute}}:</span>
                <span>{{items.attributeVal}}</span>
              </span>
            </div>
            <div class="concenttopautorightjiage">
              <div class="jiage" style="color:red">
                ￥
                <span style="font-size:0.45rem">{{ongjiatoFixedleft}}</span>.
                <span style="font-size:0.4rem">{{ongjiatoFixedright}}</span>
              </div>
              <div class="shuliang">x{{numberr}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="peisong">
        <div class="peisongauto">
          <div class="peisongautoleft">配送方式</div>
          <div class="peisongautoright">免运费</div>
        </div>
      </div>
      <div class="solid"></div>
      <div class="peisong">
        <div class="peisongauto">
          <div class="peisongautoleft">商品金额</div>
          <div class="peisongautoright">￥{{ongjiatoFixed}}</div>
        </div>
      </div>
      <div class="peisong">
        <div class="peisongauto">
          <div class="peisongautoleft">运费</div>
          <div class="peisongautoright" style="color:red">+￥0.00</div>
        </div>
      </div>
      <!-- <div class="concentbottom">
      <div class="concentbottomauto">
        <div class="concentbottomautoright">
          <span>共计1件商品</span>
           <span class="xiaoji">小计：￥{{orderprice}}</span>
        </div>
      </div>
      </div>-->
    </div>

    <div class="nativebottom">
      <div class="solidimgwarp">
        <img src="../../assets/gwc_tc_fg@2x.png" alt class="solidimg">
      </div>

      <!-- <div class="bottomdizhi" v-show="mallUserAddress!=null">
   <div class="bottomdizhiauto">{{addressarea}} {{address}}</div>
      </div>-->

      <!-- 未登录  没地址 -->
      <div
        class="bottomdizhi"
        v-if="this.anonymous==1&&this.haveAdd==1"
        style="background:#FFEFD7;color:#F9B765"
      >
        <div class="bottomdizhiauto">未登录,暂无线上收货地址</div>
      </div>

      <!-- 未登录 有地址 -->
      <div
        class="bottomdizhi"
        v-if="this.anonymous==1&&this.haveAdd==0"
        style="background:#FFEFD7;color:#F9B765"
      >
        <div class="bottomdizhiauto">{{addressarea}} {{address}}</div>
      </div>

      <!-- 已登录  有地址 -->
      <div class="bottomdizhi" v-if="this.anonymous==0&&this.haveAdd==0">
        <div class="bottomdizhiauto">{{addressarea}} {{address}}</div>
      </div>

      <!-- 已登录 没地址 -->
      <div
        class="bottomdizhi"
        v-if="this.anonymous==0&&this.haveAdd==1"
        style="background:#FFEFD7;color:#F9B765"
      >
        <div class="bottomdizhiauto">暂无地址,点击去添加用户地址</div>
      </div>

      <div class="bottomtijiapbtn">
        <div class="bottomtijiapbtnauto">
          <div class="bottomtijiapbtnautoleft">
            合计：
            <span style="color:red;font-size:0.45rem">￥{{orderpriceleft}}.</span>
            <span style="color:red;font-size:0.4rem">{{orderpriceright}}</span>
          </div>
          <div class="bottomtijiapbtnautoright" @click="tijiaoclick">提交订单</div>
        </div>
      </div>
    </div>
    <div class="loding" v-if="loding">
      <img
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542711101022&di=3b47c50ded423ff4ce29856c279708d3&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a65c57108eab6ac725134372f367.gif"
        alt
      >
    </div>

    <div class="addressewarp" :class="addressclass">
      <div class="addresstitle">
        请填写收货地址
        <img src="../../assets/gwc_tc_icon_gb@2x.png" alt @click="zhegaiclick">
      </div>
      <div class="nameinput">
        <div class="nameinputauto">
          <input type="text" placeholder="收货姓名" v-model="aterconsignee" @blur="animateWidth">
        </div>
      </div>
      <div class="nameinput">
        <div class="nameinputauto">
          <input
            type="tel"
            placeholder="联系电话"
            v-model="aterphone"
            oninput="if(value.length > 11)value = value.slice(0, 11)"
            @blur="animateWidth"
          >
        </div>
      </div>

      <div class="nameinput">
        <div class="nameinputauto">
          <div class="commonD">
            <areaBtn v-on:getValue="have" :message="areaddressarea"></areaBtn>
          </div>
        </div>
      </div>

      <div class="nameinput">
        <div class="nameinputauto">
          <input type="text" placeholder="详细地址" v-model="ateraddress" @blur="animateWidth">
        </div>
      </div>

      <div @click="querenclick" class="quedingbtn">确认</div>
    </div>
  </div>
</template>

<script>
import areaBtn from '../mytext/area.vue'
export default {
  components: {
    areaBtn, areaBtn
  },
  name: 'HelloWorld',
  data () {
    return {
      aterconsignee: null,
      aterphone: null,
      addressarea: null,
      ateraddress: null,
      description: "",
      loding: true,
      name: '',
      show: true,
      count: "",
      mallUserAddress: "",
      consignee: "",
      phone: "1",
      addressarea: "",
      address: "",
      productName: "",
      specInfo: [],
      onejia: null,
      numberr: null,
      orderprice: "",
      addressid: "",
      urlimg: null,
      bottomdizhi: false,
      zhegai: false,
      addressclass: null,
      areaddressarea: "",
      // current:"trueavtive1",
      trueavtive1: "1",
      trueavtive2: "2",
      anonymous: null,
      haveAdd: null,
      paymethod: null,
      ongjiatoFixed: null,
      ongjiatoFixedleft: null,
      ongjiatoFixedright: null,
      orderpriceleft: null,
      orderpriceright: null,
    }
  },
  computed: {
    id () {
      return this.$store.state.id
    },

    token () {
      return this.$store.state.token
    },
    current () {
      return this.$store.state.current
    }
  },
  methods: {
    wxlogo () {
      let redirect_uri = location.origin;
      let parameter = this.$parameter
      //  this.$layer.msg(".生成订单.")
      return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc49eb72e379064c2&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=/${parameter}/checkstand#wechat_redirect`

    },
    tiaozhuanclick () {
      this.$router.replace({ path: '/shippingaddress', })
      localStorage.setItem("biaoji", 1)
    },
    imgwarpclick () {
      this.$router.push({ path: '/particulars' })
      this.$store.commit("current", "1")
    },

    zhegaiclick () {
      this.zhegai = false
      this.addressclass = "activefalse"
    },

    have (data) {
      this.areaddressarea = data;
    },
    //  弹出编辑地址弹框
    noneanonymousclick () {
      this.zhegai = true
      this.addressclass = "trueactive"
      this.dizhiinit()
    },
    querenclick () {

      console.log(this.aterconsignee)
      console.log(this.aterphone)
      console.log(this.areaddressarea)
      console.log(this.ateraddress)
      //  this.$store.commit("current","1")
      //  this.$router.replace({path: '/delivery'})
      if (this.aterconsignee == "") {
        this.$layer.msg("请输入用户名")
      } else if (this.aterphone.length != 11) {
        this.$layer.msg("请输入正确手机号")
      } else if (this.areaddressarea == "") {
        this.$layer.msg("请选择收货地址")
      } else if (this.ateraddress == "") {
        this.$layer.msg("请输入详细地址")
      } else {
        let anonymousAddressObj = {
          addressarea: this.areaddressarea,
          address: this.ateraddress,
          consignee: this.aterconsignee,
          phone: this.aterphone
        }
        this.$server.anonymousAddress(anonymousAddressObj).then(data => {
          console.log(data)
          if (data.data.code == "0") {
            sessionStorage.setItem("siteid", data.data.addId)
            this.dizhiinit()
            this.zhegai = false
            this.addressclass = "activefalse"
          } else {
            this.$layer.msg(data.data.msg)
          }

        })
      }




    },
    animateWidth () {
      document.body.scrollTop = 0;
    },
    wayclick1 () {
      // this.current="trueavtive1"
      this.$store.commit("current", "1")
      // alert()
    },
    wayclick2 () {
      this.$store.commit("current", "2")
      //  this.current="trueavtive2"
    },
    init () {
      let getBasketInfoObj = {
        specid: localStorage.getItem("specid"),
        basketid: localStorage.getItem("basketid"),
        mid: localStorage.getItem("submmid"),

      }
      this.$server.getBasketInfo(getBasketInfoObj).then(data => {
        console.log('..................init............', data)
        if (data.data.code = "0000") {
          this.loding = false
          this.description = data.data.result.description
          this.productName = data.data.result.productName
          this.specInfo = data.data.specInfo
          this.onejia = data.data.result.price
          this.ongjiatoFixed = this.onejia.toFixed(2)
          this.ongjiatoFixedleft = this.ongjiatoFixed.split(".")[0]
          this.ongjiatoFixedright = this.ongjiatoFixed.split(".")[1]
          this.numberr = data.data.result.num
          this.orderprice = data.data.result.orderprice.toFixed(2)
          this.orderpriceleft = this.orderprice.split(".")[0]
          this.orderpriceright = this.orderprice.split(".")[1]
          this.urlimg = data.data.result.plans
          this.loding = false
          this.paymethod = data.data.result.paymethod
          console.log(this.mallUserAddress)
        } else {
          this.$layer.msg(data.data.msg)
        }

      })
    },

    dizhiinit () {
      let getDefaultAddressObj = {
        addId: sessionStorage.getItem("siteid") || null
      }
      this.$server.getDefaultAddress(getDefaultAddressObj).then(data => {
        console.log('..............dizhiinit.....', data)
        this.mallUserAddress = data.data
        this.anonymous = data.data.anonymous
        this.haveAdd = data.data.haveAdd
        if (data.data.haveAdd != 1) {
          this.consignee = data.data.consignee
          this.aterconsignee = data.data.consignee
          this.phone = data.data.phone
          this.aterphone = data.data.phone
          this.addressarea = data.data.addressarea
          this.areaddressarea = data.data.addressarea
          this.address = data.data.address
          this.ateraddress = data.data.address
          this.addressid = data.data.addId

          this.bottomdizhi = true
          console.log('.........this.addressid.....', this.addressid)
        }

      })
    },

    tijiaoclick () {
      var ua = window.navigator.userAgent.toLowerCase();
      console.log(this.current)

      if (this.current == "1") {
        console.log("在线支付")

        if (this.anonymous == 1 && this.haveAdd == 1) {
          // this.$layer.msg("未登录,没地址,跳去登录")
          this.$router.replace({ path: '/logo', })
          sessionStorage.setItem("router", "/submitorder")
        } else if (this.anonymous == 0 && this.haveAdd == 1) {
          // this.$layer.msg("已登录,没地址,选择地址")
          this.zhegai = true
          this.addressclass = "trueactive"
        } else if (this.anonymous == 0 && this.haveAdd == 0) {
          //  this.$layer.msg("已登录,有地址,在线提交支付")


          if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            this.loding = true
            let createOrderObj = {
              basketid: localStorage.getItem("basketid"),
              paymentprice: this.orderprice,
              addressid: this.addressid,
              producttype: 0,
              paymethod: this.current
            }
            this.$server.createOrder(createOrderObj).then(data => {
              console.log(data)

              if (data.data.code == "0000") {
                if (!sessionStorage.getItem("openid")) {
                  this.loding = false
                  localStorage.setItem("token", "1")
                  this.$store.commit("token", 1)
                  sessionStorage.setItem("merId", data.data.result.mid)
                  sessionStorage.setItem("money", data.data.result.paymentPrice)
                  sessionStorage.setItem("orderId", data.data.result.oid)
                  sessionStorage.setItem("userid", data.data.result.userid)
                  sessionStorage.setItem("describe", data.data.result.describe)
                  window.location.href = this.wxlogo()
                } else {
                  this.loding = false
                  localStorage.setItem("token", "1")
                  this.$store.commit("token", 1)
                  sessionStorage.setItem("merId", data.data.result.mid)
                  sessionStorage.setItem("money", data.data.result.paymentPrice)
                  sessionStorage.setItem("orderId", data.data.result.oid)
                  sessionStorage.setItem("userid", data.data.result.userid)
                  sessionStorage.setItem("describe", data.data.result.describe)
                  this.$router.replace({ path: '/checkstand' })
                }
              } else if (data.data.code == "2015") {
                this.$layer.msg(data.data.msg)
                var that = this
                setTimeout(function () {
                  that.$router.replace({ path: '/myorder', query: { id: 1 } })
                }, 1000)
              }
              else {
                this.$layer.msg(data.data.msg)
              }


            })
            return
          }
          console.log(this.addressid)
          this.loding = true
          let createOrderObj = {
            basketid: localStorage.getItem("basketid"),
            paymentprice: this.orderprice,
            addressid: this.addressid,
            producttype: 0,
            paymethod: this.current
          }
          this.$server.createOrder(createOrderObj).then(data => {
            console.log(data)
            if (data.data.code == "0000") {
              localStorage.setItem("token", "1")
              this.$store.commit("token", 1)
              this.$router.replace({ path: '/checkstand' })
              sessionStorage.setItem("merId", data.data.result.mid)
              sessionStorage.setItem("money", data.data.result.paymentPrice)
              sessionStorage.setItem("orderId", data.data.result.oid)
              sessionStorage.setItem("userid", data.data.result.userid)
              sessionStorage.setItem("describe", data.data.result.describe)
            } else if (data.data.code == "2015") {
              this.$layer.msg(data.data.msg)
              var that = this
              setTimeout(function () {
                that.$router.replace({ path: '/myorder', query: { id: 1 } })

              }, 1000)
            } else {
              this.$layer.msg(data.data.msg)
            }
          })

        } else if (this.anonymous == 1 && this.haveAdd == 0) {
          // this.$layer.msg("未登录,有地址,跳去登录")
          this.$router.replace({ path: '/logo', })
          sessionStorage.setItem("router", "/submitorder")
        }

      }
      else if (this.current == "2") {
        //  console.log("货到付款")
        if (this.anonymous == 1 && this.haveAdd == 1) {
          this.zhegai = true
          this.addressclass = "trueactive"
        } else if (this.anonymous == 0 && this.haveAdd == 1) {
          // this.$layer.msg("暂无收货地址")
          this.zhegai = true
          this.addressclass = "trueactive"
        } else if (this.anonymous == 0 && this.haveAdd == 0) {
          // this.$layer.msg("登录了，有地址，提交订单啦")
          this.submitorder()
        } else if (this.anonymous == 1 && this.haveAdd == 0) {
          //  this.$layer.msg("未登录，有地址，提交订单啦")
          this.submitorder()
        }

      }


    },

    // 提交订单
    submitorder () {
      this.loding = true
      let createOrderObj = {
        basketid: localStorage.getItem("basketid"),
        paymentprice: this.orderprice,
        addressid: this.addressid,
        producttype: 0,
        paymethod: this.current
      }
      this.$server.createOrder(createOrderObj).then(data => {
        console.log('...........submitorder.........', data)
        this.loding = false
        if (data.data.code == "0000") {
          this.$router.replace({ path: '/delivery' })
          sessionStorage.setItem("submitorder", data.data.result.paymentPrice)
          this.$store.commit("current", "1")
        } else if (data.data.code == "2015") {
          this.$layer.msg(data.data.msg)
          this.$store.commit("current", "1")
          var that = this
          setTimeout(function () {
            that.$router.replace({ path: '/myorder', query: { id: 1 } })
          }, 1000)
        }
      })
    }

  },
  mounted () {
    this.init()
    this.dizhiinit()
    console.log(this.current)
  },
  // destroyed(){
  //    localStorage.removeItem("token") 
  // }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.text {
  width: 100%;
  background: #fff;
  overflow: hidden;
  padding-bottom: 0.2rem;
  /* background: red; */
}
.textauto h1 {
  overflow: hidden;
  margin-top: 0.25rem;
  font-weight: normal;
}
.textauto h2 {
  overflow: hidden;
  margin-top: 0.25rem;
  font-size: 0.37rem;
  font-weight: normal;
}
.textauto {
  width: 95%;
  margin: 0 auto;
}
.textleft {
  float: left;
  font-size: 0.37rem;
  color: #222;
  margin-left: 0.5rem;
}
.textright {
  float: right;
  font-size: 0.37rem;
  color: #333;
  margin-right: 0.5rem;
}
.dingweiimg {
  width: 0.35rem;
  height: 0.4rem;
  float: left;
  margin-top: 0.05rem;
}
.xuanzeimg {
  width: 0.4rem;
  height: 0.4rem;
  float: right;
}
.gerenxinxidizhi {
  width: 85%;
  float: left;
  margin-left: 0.15rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  padding-bottom: 0.1rem;
}
.solidimg {
  width: 100%;
  float: left;
}
.solidimgwarp {
  overflow: hidden;
  background: #fff;
  display: none;
}
.concent {
  width: 100%;
  background: #fff;
  overflow: hidden;
}
.concenttop {
  width: 100%;
  background: #fafafa;
  margin-top: 0.25rem;
  overflow: hidden;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #f2f2f2;
}
.concenttopauto {
  width: 95%;
  margin: 0 auto;
  overflow: hidden;
  margin-top: 0.15rem;
}
.shangpinimgwarp {
  float: left;
  width: 2.4rem;
  height: 2.4rem;
  box-sizing: border-box;
  border: 1px solid #f1f1f1;
}
.shangpinimg {
  width: 100%;
  height: 100%;
}
.concenttopautoright {
  width: 6.8rem;
  float: left;
  margin-left: 0.25rem;
}
.concenttopautorighttext {
  font-size: 0.34rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /*! autoprefixer: on */
  -webkit-line-clamp: 2;
}
.concenttopautorightguige {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /*! autoprefixer: on */
  -webkit-line-clamp: 2;
  margin-top: 0.2rem;
  height: 0.9rem;
  font-size: 0.34rem;
  color: #888;
}
.concenttopautorightjiage {
  /* margin-top: 0.1rem; */
  font-weight: bold;
  font-size: 0.34rem;
}
.jiage {
  float: left;
}
.shuliang {
  float: right;
}
.peisong {
  height: 1.2rem;
  box-sizing: border-box;
  /* border-top: 1px solid #f2f2f2; */
  border-bottom: 1px solid #f2f2f2;
  line-height: 1.2rem;
  background: #fff;
}
.peisongauto {
  width: 95%;
  margin: 0 auto;
  color: #222;
  font-size: 0.36rem;
}
.peisongauto .peisongautoleft {
  float: left;
}
.peisongauto .peisongautoright {
  float: right;
}
.concentbottom {
  width: 100%;
  height: 1.1rem;
}
.concentbottomauto {
  width: 95%;
  margin: 0 auto;
  font-size: 0.36rem;
  overflow: hidden;
}
.concentbottomautoright {
  float: right;
  line-height: 1.1rem;
}
.xiaoji {
  margin-left: 0.2rem;
}
.nativebottom {
  width: 100%;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
}
.bottomdizhi {
  width: 100%;
  box-sizing: border-box;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
}
.bottomdizhiauto {
  font-size: 0.37rem;
  width: 95%;
  margin: 0 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  /* margin-top: 0.2rem; */
}
.bottomtijiapbtn {
  width: 100%;
  box-sizing: border-box;
  border-top: 1px solid #f2f2f2;
  height: 1.2rem;
  /* margin-top: 0.2rem; */
  line-height: 1.2rem;
}
.bottomtijiapbtnauto {
  width: 100%;
  margin: 0 auto;
  font-size: 0.373rem;
}
.bottomtijiapbtnautoleft {
  float: left;
  color: #222;
  margin-left: 2.5%;
}
.bottomtijiapbtnautoright {
  float: right;
  font-size: 0.373rem;
  background: #222;
  width: 3rem;
  text-align: center;
  color: #fff;
  line-height: 1.2rem;
}
.solid {
  width: 100%;
  height: 0.3rem;
  background: #f2f2f2;
}
.orderstyleflet {
  margin-right: 0.2rem;
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
.zhegai {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.3);
  /* background: red; */
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.addressewarp {
  width: 100%;
  background: #fff;
  position: fixed;
  bottom: -100%;
  left: 0;
  z-index: 20;
  border-radius: 5px 5px 0 0;
}
.trueactive {
  bottom: 0;
  transition: bottom 0.7s, transform 1s;
  -moz-transition: bottom 0.7s, -moz-transform 1s;
  -webkit-transition: bottom 0.7s, -webkit-transform 1s;
  -o-transition: bottom 0.7s, -o-transform 1s;
}
.activefalse {
  bottom: -100%;
  transition: bottom 0.7s, transform 1s;
  -moz-transition: bottom 0.7s, -moz-transform 1s;
  -webkit-transition: bottom 0.7s, -webkit-transform 1s;
  -o-transition: bottom 0.7s, -o-transform 1s;
}
.nameinput {
  width: 95%;
  height: 1.2rem;
  /* box-sizing: border-box; */
  border-bottom: 1px solid #dddddd;
  background: #fff;
  margin: 0 auto;
}
/* .nameinputauto{
  width: 95%;
  margin: 0 auto;
} */
.nameinputauto input {
  font-size: 0.4rem;
  width: 100%;
  height: 1.2rem;
  /* box-sizing: border-box; */
  border: none;
}
.addresstitle {
  width: 95%;
  margin: 0 auto;
  font-size: 0.45rem;
  color: #222;
  text-align: center;
  margin-top: 0.5rem;
  padding-bottom: 0.3rem;
  position: relative;
}
.addresstitle img {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  right: 0;
  top: 0;
}
.quedingbtn {
  width: 95%;
  height: 1rem;
  background: #222222;
  line-height: 1rem;
  text-align: center;
  color: #fff;
  font-size: 0.4rem;
  margin: 0 auto;
  margin-top: 1rem;
  border-radius: 2px;
  margin-bottom: 0.2rem;
}
.way {
  float: left;
  margin-left: 0.4rem;
}
.way div {
  float: left;
}
.backimg {
  width: 0.4rem;
  height: 0.4rem;
  background: url(../../assets/w1@2x.png) no-repeat;
  background-size: 0.4rem 0.4rem;
  margin-top: 0.39rem;
  margin-right: 0.2rem;
}
.zhihuiimg {
  width: 0.4rem;
  height: 0.4rem;
  background: url(../../assets/m@2x11.png) no-repeat;
  background-size: 0.4rem 0.4rem;
  margin-top: 0.39rem;
  margin-right: 0.2rem;
}
.active .backimg {
  width: 0.4rem;
  height: 0.4rem;
  background: url(../../assets/xz.png) no-repeat;
  background-size: 0.4rem 0.4rem;
  margin-top: 0.39rem;
  margin-right: 0.2rem;
}
</style>
