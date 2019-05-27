<template>
  <div class="hellowwarp">
    <div class="fxiedtop">
      <div class="head">
        <div class="headauto">
          <div class="imgwarp" @click="imgwarpclick">
            <img src="../../assets/back@2x.png" alt>
            <span>返回</span>
          </div>
          <div class="headtext">退款/售后列表</div>
        </div>
      </div>
      <div class="nativgie">
        <ul>
          <li
            v-for="
      (item,index) in nativgieList"
            :key="item.key"
            :class="{active:index==current}"
            @click="nativgieclick(index)"
          >
            <div class="nativgietext">{{item.text}}</div>
          </li>
        </ul>
      </div>
    </div>

    <div class="scrollerstyle">
      <scroller :on-refresh="refresh" :on-infinite="infinite" :noDataText="msg">
        <div class="concent">
          <ul>
            <li class="concent_li" v-for="item in concentList">
              <div v-if="item.producttype==0">
                <div class="concent_liauto">
                  <h1 class="title">
                    <div class="titleleft">订单号:{{item.oid}}</div>
                    <div v-if="item.refundStatus==0">退款中</div>
                    <div v-if="item.refundStatus==1">退款中</div>
                    <div v-if="item.refundStatus==2">退款成功</div>
                    <div v-if="item.refundStatus==3">退款中</div>
                  </h1>
                  <div class="concent_liwarp">
                    <div class="concent_liwarpimgwarp">
                      <img :src="item.plans" alt class="concent_liwarpimg">
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
                      <div class="orderjiage">实付：￥{{item.paymentPrice}}(免费运)</div>
                    </div>
                    <div class="orderbtn">
                      <div class="zaicibtn" @click="twogoumai(item.goodsid)">再次购买</div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="item.producttype==1">
                <div class="concent_liauto">
                  <h1 class="title">
                    <div class="titleleft">订单号:{{item.oid}}</div>
                    <div v-if="item.refundStatus==0">退款中</div>
                    <div v-if="item.refundStatus==1">退款中</div>
                    <div v-if="item.refundStatus==2">退款成功</div>
                    <div v-if="item.refundStatus==3">退款中</div>
                  </h1>
                  <div class="concent_liwarp">
                    <div class="concent_liwarpimgwarp" v-if="item.isp==10" id="xuniwarp">
                      <div class="movement">
                        <img src="../../assets/yd.png" class="concent_liwarpimg">
                      </div>
                    </div>
                    <div class="concent_liwarpimgwarp" v-if="item.isp==20" id="xuniwarp">
                      <div class="movement">
                        <img src="../../assets/lt.png" class="concent_liwarpimg">
                      </div>
                    </div>
                    <div class="concent_liwarpimgwarp" v-if="item.isp==30" id="xuniwarp">
                      <div class="movement">
                        <img src="../../assets/dx.png" class="concent_liwarpimg">
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

                    <div class="orderbtn">
                      <div class="zaicibtn" @click="xuniagainclick(item.rechargephone)">再次购买</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </scroller>
    </div>
    <div class="lackhtml" v-if="lackhtml">
      <div>暂无订单哦~</div>
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
      loding: true,
      lackhtml: false,
      hasNext: null,
      total: null,
      satae: 0,
      concentList: [],
      page: 1,
      msg: '',
      current: 0,
      name: '',
      nativgieList: [
        {
          text: "待处理",
          value: 0,
          key: "0",
        },
        {
          text: "已完成",
          value: 1,
          key: "1",
        },

      ]


    }
  },
  computed: {
    number () {
      return this.$store.state.number
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
        return y + '年' + MM + '月' + d + ' 日' + h + ':' + m + ':' + s;
      }

    },
  },
  methods: {
    imgwarpclick () {
      this.$router.push({ path: '/mytext' })
    },
    nativgieclick (index) {
      this.$store.commit("loding", true)
      this.current = index
      this.page = 1
      this.init()
      // this.$store.state.number=index
      // console.log(this.$store.state.number)
    },
    Refundingclick () {                       //申请退换货
      this.$router.push({ path: '/Refunding' })
    },

    //实物订单再次购买
    twogoumai (goodsid) {
      console.log(goodsid)
      sessionStorage.setItem("goodsId", goodsid)
      this.$router.push({ path: '/particulars', })
    },
    // 虚拟订单再次购买
    xuniagainclick (againphone) {
      sessionStorage.setItem("againphone", againphone)
      this.$router.push({ path: '/xunidingdan', query: { uuid: 1 } })
    },



    init (done) {
      var sendDate = (new Date()).getTime();
      let getAllRefundOrderObj = {
        satae: this.current,
        offset: this.page,
        limit: 10
      }
      this.$server.getAllRefundOrder(getAllRefundOrderObj).then(data => {
        console.log(data)
        var receiveDate = (new Date()).getTime();
        var responseTimeMs = receiveDate - sendDate;
        var that = this
        if (responseTimeMs < 300) {
          console.log("...........................")
          setTimeout(function () {
            that.$store.commit("loding", false)
          }, 300)
        }
        else {
          this.$store.commit("loding", false)
        }


        this.loding = false
        for (let index = 0; index < data.data.orderList.length; index++) {
          var total = data.data.orderList[index].total
          this.total = total
        }
        console.log(this.total)
        this.hasNext = Math.ceil(this.total / 10)
        if (this.page == 1) {
          this.concentList = []
        }
        this.concentList = this.concentList.concat(data.data.orderList)
        console.log(this.concentList)
        if (this.concentList.length == 0) {
          this.lackhtml = true
        } else {
          this.lackhtml = false
        }
        if (done) done()

      })

    },

    refresh (done) {    //下拉刷新
      this.page = 1
      this.init(done)
    },

    infinite (done) {    //上拉加载
      if (this.page >= this.hasNext) {
        done(true)
        return
      }
      this.page++
      console.log(this.page)
      this.init(done)

    },

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
  width: 50%;
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

  -webkit-line-clamp: 2;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /*! autoprefixer: on */
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
  padding-left: 0.2rem;
  padding-right: 0.2rem;
}
.concent {
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
  top: 2.35rem;
  left: 0;
  background: #f2f2f2;
}
.orderstyleflet {
  margin-right: 0.2rem;
}

.title .titleleft {
  float: left;
  color: #222;
  font-size: 0.34rem;
  font-weight: bold;
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
}
.concent_liwarpimgwarp {
  float: left;
  width: 2.24rem;
  height: 2.24rem;
  float: left;
  border-radius: 5px;
  /* border: 1px solid #f1f1f1; */
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.orderjiagewarp .shijian {
  float: left;
  margin-top: 0.4rem;
  font-size: 0.35rem;
  color: #a8a8a8;
  font-weight: normal;
}
.concent_liwarpimg {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
</style>
