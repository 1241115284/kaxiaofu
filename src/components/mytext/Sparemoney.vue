<template>
  <div class="hellowwarp">
    <div class="head">
      <div class="headauto">
        <div class="imgwarp" @click="imgwarpclick">
          <img src="../../assets/back@2x.png" alt>
          <span>返回</span>
        </div>
        <div class="headtext">闲置换钱</div>
      </div>
    </div>

    <div class="scrollerstyle">
      <scroller :on-refresh="refresh" :on-infinite="infinite" :noDataText="msg">
        <div class="information">
          <div class="informationauto">
            <img :src="headImage" alt>
            <span>{{username}}</span>
          </div>
        </div>

        <div v-if="concentList.length!=0">
          <div class="text">您在商城购买了{{concentnumber}}件宝贝，可以换钱哦</div>
          <div class="concent">
            <ul>
              <li v-for="item in concentList">
                <div class="concentimgwarp">
                  <img :src="item.plans" alt>
                </div>
                <div class="exchangebtn" @click="exchangeclick(item.oid)">一键换钱</div>
              </li>
            </ul>
          </div>
        </div>

        <div v-if="concentList.length==0" class="Theefaultpage">
          <div class="text" id="nonetext">您还没有可以换钱的商品哦！快去购物吧~</div>
          <div class="Nogoods">
            <img src="../../assets/wsp@2x.png" alt>
          </div>
        </div>

        <div class="solid" v-if="concentwarp"></div>

        <div class="concentwarp" v-if="concentwarp">
          <h1 class="title">
            <img src="../../assets/hot@2x.png" alt>
          </h1>
          <ul class="commodity">
            <li v-for="msg in commoditypageList" @click="particularsclick(msg.goodsId)">
              <div class="shangpinwarp">
                <img class="chanpinimg" :src="msg.picture">
              </div>
              <div class="shangpintext">
                <div class="jieshao">{{msg.goodsName}} {{msg.description}}</div>
                <div class="jiaqian">
                  ￥
                  <span>{{msg.presentPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </scroller>
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

      name: '',
      concentList: [
      ],
      msg: "",
      page: 1,
      commoditypageList: [

      ],
      concentnumber: null,
      username: null,
      headImage: null,
      hasNext: null,
      loding: true,
      concentwarp: true,
    }
  },
  methods: {
    imgwarpclick () {
      this.$router.push({ path: '/mytext' })
    },
    particularsclick (goodsId) {
      console.log(goodsId)
      this.$router.push({ path: '/particulars', })
      sessionStorage.setItem("goodsId", goodsId)
    },
    // 一键换钱
    exchangeclick (oid) {
      this.$store.commit("loding", true)
      let getJumpUrlObj = {
        orderId: oid,
        version: this.$parameter,
        routeUri: "Sparemoney"
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

    commoditypage (done) {
      let getRecoverableRecommendProductObj = {
        offset: this.page,
        limit: 10
      }

      this.$server.getRecoverableRecommendProduct(getRecoverableRecommendProductObj).then(data => {
        console.log(data)
        if (data.data.code == "0000") {
          this.loding = false
          if (this.page == 1) {

            this.commoditypageList = []
          }

          this.commoditypageList = this.commoditypageList.concat(data.data.productData)
          if (this.commoditypageList.length != 0) {
            this.concentwarp = true
          } else {
            this.concentwarp = false
          }
          console.log("...合并后的数组", this.commoditypageList)

          this.hasNext = Math.ceil(data.data.total / 10)
          if (done) done()
        }

      })

    },

    init (done) {
      let getRecoverableProductObj = {

      }

      this.$server.getRecoverableProduct(getRecoverableProductObj).then(data => {
        console.log("....init.....", data)
        if (data.data.code == "0") {
          //  this.loding=false
          this.concentList = data.data.result.recoverableProduct
          this.concentnumber = data.data.result.total
          this.headImage = data.data.result.headImage
          this.username = data.data.result.username
          if (done) done()
        }

      })

    },



    refresh (done) {         //下拉刷新
      this.page = 1
      this.init(done)
      this.commoditypage(done)
    },

    infinite (done) {    //上拉加载
      if (this.page >= this.hasNext) {
        done(true)
        return
      }
      this.page++
      console.log(this.page)
      this.commoditypage(done)
    },

  },
  mounted () {
    // alert()
    this.commoditypage()
    this.init()
    sessionStorage.setItem('skiprouter', this.$route.path)

  },



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hellowwarp {
  width: 100%;
  height: 100%;
  position: fixed;
  background: #fff;
  overflow: auto;
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
.information {
  width: 100%;
  height: 2.16rem;
  background: url(../../assets/img@2x.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  overflow: hidden;
}
.informationauto {
  width: 90%;
  height: 1.46rem;
  margin: 0 auto;
  margin-top: 0.33rem;
  color: #fff;
  line-height: 1.46rem;
  font-size: 0.4rem;
}
.informationauto img {
  width: 1.46rem;
  height: 100%;
  float: left;
  margin-right: 0.4rem;
  border-radius: 50%;
}
.text {
  text-align: center;
  font-size: 0.4rem;
  margin-top: 0.4rem;
}
#nonetext {
  margin-top: 1.4rem;
}
.concent {
  width: 90%;
  margin: 0 auto;
  background: #fefefe;
  padding-bottom: 0.4rem;
  overflow: hidden;
}
.concent ul li {
  float: left;
  width: 48%;
  height: 4.6rem;
  /* background: red; */
  margin-right: 4%;
  margin-top: 0.4rem;
  box-sizing: border-box;
  border: 1px solid #f4f4f4;
  border-radius: 4px;
  /* box-shadow:-10px 0px 10px #f9f9f9,  0px -10px 10px #f9f9f9, 
               10px 0px 10px #f9f9f9,   0px 10px 10px #f9f9f9; */
}

.concent ul li:nth-child(even) {
  margin-right: 0;
}
.concentimgwarp {
  width: 3.44rem;
  height: 2.533rem;
  margin: 0 auto;
  /* background: red; */
  margin-top: 0.4rem;
  border-radius: 5px;
}
.concentimgwarp img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.exchangebtn {
  text-align: center;
  color: #fff;
  width: 2.66rem;
  height: 0.8rem;
  background: #222222;
  font-size: 0.4rem;
  border-radius: 30px;
  line-height: 0.8rem;
  margin: 0 auto;
  margin-top: 0.4rem;
}
.solid {
  width: 100%;
  height: 0.3rem;
  background: #f2f2f2;
}
.recommendconcent {
  width: 100%;
  height: 15rem;
}
.recommendconcentimg {
  width: 4rem;
  margin: 0 auto;
}
.recommendconcentimg img {
  width: 100%;
  margin-top: 0.4rem;
}
.concentwarp {
  width: 100%;
  overflow: hidden;
}
.title {
  width: 4rem;
  margin: 0 auto;
  padding-top: 0.3rem;
  padding-bottom: 0.034rem;
}
.title img {
  width: 100%;
}
.commodity li {
  width: 49%;
  height: 6.85rem;
  float: left;
  /* border-radius: 5px; */
  margin-right: 2%;
  background: #fff;
  margin-top: 0.266rem;
}
.commodity li:nth-child(even) {
  margin-right: 0;
}
.shangpinwarp {
  width: 100%;
  height: 4.45rem;
}
.chanpinimg {
  width: 100%;
  height: 4.45rem;
  /* border-radius: 5px 5px 0 0; */
}
.shangpintext {
  width: 90%;
  margin: 0 auto;
  color: #222;
  font-size: 0.373rem;
  line-height: 0.5rem;
  margin-top: 0.4rem;
}
.jieshao {
  height: 0.9rem;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /*! autoprefixer: on */
  -webkit-line-clamp: 2;
}
.jiaqian {
  font-size: 0.32rem;
  margin-top: 0.2rem;
}
.jiaqian span {
  font-size: 0.45rem;
}
.scrollerstyle {
  position: fixed;
  width: 100%;
  top: 1.2rem;
  bottom: 0rem;
  /* background: #f2f2f2; */
}
.Nogoods {
  width: 2.24rem;
  height: 2.24rem;
  margin: 0 auto;
  margin-top: 0.4rem;
  padding-bottom: 0.2rem;
}
.Nogoods img {
  width: 100%;
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
.Theefaultpage {
  height: 6rem;
  background: #fff;
  overflow: hidden;
}
</style>
