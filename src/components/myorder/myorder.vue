<template>
  <div class="hellowwarp">
    <div class="zhezhao" v-if="zhezhao"></div>
    <!-- 取消实物订单 -->
    <div class="noneclick" v-if="nonetanluang">
      <div class="noneyesbtn">确认取消该笔订单？</div>
      <div class="btnnnn">
        <div class="btnnnnleft" @click="quxiaotankaungclick">取消</div>
        <div class="btnnnnright" @click="yestankuangclick">确认</div>
      </div>
    </div>

    <!-- 取消虚拟订单 -->
    <div class="noneclick" v-if="xuninonetanluang">
      <div class="noneyesbtn">确认取消该笔订单？</div>
      <div class="btnnnn">
        <div class="btnnnnleft" @click="xuniquxiaotankaungclick">取消</div>
        <div class="btnnnnright" @click="xuniyestankuangclick">确认</div>
      </div>
    </div>

    <!-- 确认收货 -->
    <div class="noneclick" v-if="shouhuo">
      <div class="noneyesbtn">是否收货？</div>
      <div class="btnnnn">
        <div class="btnnnnleft" @click="shouhuononeclick">取消</div>
        <div class="btnnnnright" @click="quxaioyesclick">确认</div>
      </div>
    </div>

    <div class="fxiedtop">
      <div class="head">
        <div class="headauto">
          <div class="imgwarp" @click="imgwarpclick">
            <img src="../../assets/back@2x.png" alt>
            <span>返回</span>
          </div>
          <div class="headtext">我的订单</div>
        </div>
      </div>
      <div class="nativgie">
        <ul>
          <li
            v-for="
      (item,index) in nativgieList"
            :key="item.key"
            :class="{active:item.value==current}"
            @click="nativgieclick(item.value)"
          >
            <div class="nativgietext">{{item.text}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="scrollerstyle" v-if="scrollerconcent">
      <scroller
        v-if="Listconcent.length>0"
        :on-refresh="refresh"
        :on-infinite="infinite"
        :noDataText="msg"
      >
        <div class="concent">
          <ul>
            <li v-for="item in Listconcent  " class="concent_li">
              <concent
                :item="item"
                @xuninoneclick="xuninoneclick"
                @noneclick="noneclick"
                @tuihuanclick="tuihuanclick"
                @twogoumai="twogoumai"
                @xuniagainclick="xuniagainclick"
                @wuliuclick="wuliuclick"
                @shouhuoclick="shouhuoclick"
                @Physicalpaymentclick="Physicalpaymentclick"
                @virtual="virtual"
              ></concent>
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
import concent from './concent/concent'
export default {
  components: {
    concent, concent,
  },
  name: 'HelloWorld',
  data () {
    return {
      msgg: null,
      count: "",
      xuninonetanluang: false,
      shouhuo: false,
      lackhtml: false,
      oid: null,
      specid: null,
      zhezhao: false,
      nonetanluang: false,
      loding: true,
      hasNext: null,
      page: 1,
      iconList: [],
      Listconcent: [],
      scrollerconcent: true,
      msg: '',
      current: 0,
      name: '',
      timee: 7200,
      nativgieList: [
        {
          text: "全部",
          value: 0,
          key: "0",
        },

        {
          text: "待付款",
          value: 1,
          key: "1",
        },
        {
          text: "待发货",
          value: 4,
          key: "4",
        },
        {
          text: "待收货",
          value: 2,
          key: "2",
        },
        {
          text: "已完成",
          value: 3,
          key: "3",
        }
      ]


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
    down: function (value) {
      console.log(value)
      return value
    }
  },
  computed: {
    number () {
      return this.$store.state.number
    }
  },
  methods: {
    imgwarpclick () {
      this.$router.push({ path: '/mytext' })
    },
    nativgieclick (index) {
      this.Listconcent = []
      this.$store.commit("loding", true)
      this.current = index
      this.page = 1
      this.init()
    },

    init (done) {
      console.log('...........statue', this.current)
      var sendDate = (new Date()).getTime();
      console.log(this.current)
      let getUserAllOrderObj = {
        satae: this.current,
        offset: this.page,
        limit: 10
      }
      this.$server.getUserAllOrder(getUserAllOrderObj).then(data => {

        var receiveDate = (new Date()).getTime();
        var responseTimeMs = receiveDate - sendDate;
        console.log(responseTimeMs)
        var that = this
        if (responseTimeMs < 300) {
          console.log("...........................")
          setTimeout(function () {
            that.$store.commit("loding", false)
            that.loding = false
          }, 300)
        } else {
          this.$store.commit("loding", false)
          that.loding = false
        }


        console.log(data)
        for (let index = 0; index < data.data.orderList.length; index++) {
          var total = data.data.orderList[index].total
          this.total = total
        }
        this.hasNext = Math.ceil(this.total / 10)
        if (this.page == 1) {
          this.Listconcent = []
        }

        this.Listconcent = this.Listconcent.concat(data.data.orderList)

        console.log(".........合并数组......", this.Listconcent)
        if (this.Listconcent.length == 0) {
          this.lackhtml = true
          this.scrollerconcent = false
        } else {
          this.lackhtml = false
          this.scrollerconcent = true
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
      console.log('......当前页数......', this.page)
      this.init(done)

    },



    xuninoneclick (oid) {             //唤起虚拟订单取消订单弹框按钮
      console.log(oid)
      this.zhezhao = true
      this.xuninonetanluang = true
      this.oid = oid

    },

    //取消虚拟订单
    xuniyestankuangclick () {

      var sendDate = (new Date()).getTime();
      this.$store.commit("loding", true)
      //  this.$store.commit("loding",true)
      let cancelOrderObj = {
        oid: this.oid,
        producttype: 1
      }
      this.$server.cancelOrder(cancelOrderObj).then(data => {
        console.log(data)

        var receiveDate = (new Date()).getTime();
        var responseTimeMs = receiveDate - sendDate;
        console.log(responseTimeMs)
        var that = this
        if (responseTimeMs < 300) {
          console.log("...........................")
          setTimeout(function () {
            that.$store.commit("loding", false)
            that.loding = false
          }, 300)
        } else {
          this.$store.commit("loding", false)
          that.loding = false
        }
        if (data.data.code == "0000") {
          this.zhezhao = false
          this.xuninonetanluang = false
          this.init()
        } else {
          this.$layer.msg(data.data.msg)
        }

      })


    },





    xuniquxiaotankaungclick () {     //关闭虚拟取消订单弹框
      this.zhezhao = false
      this.xuninonetanluang = false
    },

    noneclick (oid, specid) {          //唤起实物取消订单弹框按钮

      this.oid = oid
      this.specid = specid
      this.zhezhao = true
      this.nonetanluang = true
    },


    quxiaotankaungclick () {             //关闭取消订单弹框
      this.zhezhao = false
      this.nonetanluang = false

    },

    yestankuangclick () {                // 确认取消实物订单
      console.log(this.oid)
      console.log(this.specid)
      var sendDate = (new Date()).getTime();
      this.$store.commit("loding", true)
      let cancelOrderObj = {
        specid: this.specid,
        oid: this.oid,
        producttype: 0
      }
      this.$server.cancelOrder(cancelOrderObj).then(data => {

        var receiveDate = (new Date()).getTime();
        var responseTimeMs = receiveDate - sendDate;
        console.log(responseTimeMs)
        var that = this
        if (responseTimeMs < 300) {
          console.log("...........................")
          setTimeout(function () {
            that.$store.commit("loding", false)
            that.loding = false
          }, 300)
        } else {
          this.$store.commit("loding", false)
          that.loding = false
        }
        console.log(data)

        if (data.data.code == "0000") {
          // alert()
          this.zhezhao = false
          this.nonetanluang = false
          this.init()
        } else {
          this.$layer.msg(data.data.msg)
        }

      })
    },


    //申请退换货
    tuihuanclick (oid) {
      console.log(oid)
      sessionStorage.setItem("danoid", oid)
      this.$router.push({ path: '/Refunding', })
    },


    shouhuoclick (oid) {              //唤起确认收货弹框
      this.oid = oid
      this.zhezhao = true
      this.shouhuo = true

    },

    shouhuononeclick () {          //取消确认收货弹框
      this.zhezhao = false
      this.shouhuo = false
    },


    quxaioyesclick () {             //确认收货
      console.log(this.oid)
      var sendDate = (new Date()).getTime();
      this.$store.commit("loding", true)
      let receiveOrderObj = {
        oid: this.oid
      }
      this.$server.receiveOrder(receiveOrderObj).then(data => {
        console.log(data)

        var receiveDate = (new Date()).getTime();
        var responseTimeMs = receiveDate - sendDate;
        console.log(responseTimeMs)
        var that = this
        if (responseTimeMs < 300) {
          console.log("...........................")
          setTimeout(function () {
            that.$store.commit("loding", false)
            that.loding = false
          }, 300)
        } else {
          this.$store.commit("loding", false)
          that.loding = false

        }


        if (data.data.code == "0000") {
          this.zhezhao = false
          this.shouhuo = false
          this.init()

        } else {
          this.$layer.msg(data.data.msg)
        }

      })

    },



    wuliuclick (tracknumber) {     //物流详情
      // console.log(tracknumber)
      this.$router.push({ path: '/wuliuxiangqing', query: { tracknumber: tracknumber } })

    },



    //实物订单再次购买
    twogoumai (goodsid) {
      console.log(goodsid)
      sessionStorage.setItem("goodsId", goodsid)
      this.$router.push({ path: '/particulars', })
    },
    // 虚拟订单再次购买
    xuniagainclick (againphone) {
      console.log(againphone)
      sessionStorage.setItem("againphone", againphone)
      this.$router.push({ path: '/xunidingdan', query: { uuid: 1 } })
    },
    Physicalpaymentclick () {
      console.log("实物订单")
      this.init()

    },

    virtual () {
      console.log("虚拟订单")
      this.init()
    }



  },
  mounted () {
    this.init()
    sessionStorage.setItem('skiprouter', this.$route.path)
  },
  created () {
    if (this.$route.query.id) {
      this.current = this.$route.query.id
    }





  },



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  padding-left: 0.2rem;
  padding-right: 0.2rem;
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