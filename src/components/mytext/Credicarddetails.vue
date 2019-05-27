<template>
  <div class="hellowwarp">
    <div class="head">
      <div class="headauto">
        <div class="imgwarp" @click="imgwarpclick">
          <img src="../../assets/back@2x.png" alt>
          <span>返回</span>
        </div>
        <div class="headtext">{{bankName}}信用卡</div>
      </div>
    </div>

    <div class="concentwarp" v-if="CreditconcentList.length!=0">
      <div class="Creditconcent">
        <ul>
          <li class="Creditconcenteach" v-for="item in CreditconcentList">
            <img :src="item.creditIconUrl" alt class="Creditcardimg">
            <div class="Creditconcenteachcent">
              <div class="title">
                <h1>{{item.creditName}}</h1>
                <div class="titleimg" v-if="item.isRecommend==0">
                  <div style="position: absolute" :style="{right:right1,top:top1}">推荐</div>
                </div>
                <!-- <img src="../../assets/t@2x.png" alt class="titleimg" v-if="item.isRecommend==0"> -->
              </div>
              <p>{{item.creditDesc}}</p>
              <div class="btn" @click="Applyimmediatelyclick(item.linkUrl,item.creditId)">立即申请</div>
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
    <div v-show="toTopShow" @click="toTopShows" class="returntoopwarp">
      <img src="../../assets/sy_icon_top@2x.png" class="returntoop">
    </div>
  </div>
</template>

<script>

export default {

  name: 'HelloWorld',
  data () {
    return {
      top1: "",
      right1: "",
      toTopShow: false,
      bankName: null,
      loding: true,
      CreditconcentList: []
    }
  },
  methods: {
    imgwarpclick () {

      this.$router.push({ path: '/Credit' })
    },
    init () {
      let creditcardObj = {
        bankCode: this.$route.query.bankCode
      }
      this.$server.creditcard(creditcardObj).then(data => {
        this.loding = false
        console.log(data)
        this.CreditconcentList = data.data


      })



    },
    Applyimmediatelyclick (url, creditId) {

      let clickCreditObj = {
        creditId: creditId
      }
      this.$server.clickCredit(clickCreditObj).then(data => {
        location.href = url
      })

    },

    scrollToTop () {
      let that = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 500) {
        that.toTopShow = true
      } else {
        that.toTopShow = false
      }
    },



    toTopShows () {

      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0

    }

  },

  mounted () {

    this.init()
    window.addEventListener('scroll', this.scrollToTop)


  },

  created () {
    this.bankName = this.$route.query.bankName
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
      this.top1 = "0.035rem"
      this.right1 = "0.01rem"
    } else if (isIOS) {
      this.top1 = "0.01rem"
      this.right1 = "0.03rem"
    } else {
      this.top1 = "0.01rem"
      this.right1 = "0.03rem"
    }
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,
body {
}
.hellowwarp {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #f2f2f2 !important;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  z-index: 100;
}
.head {
  width: 100%;
  height: 1.2rem;
  border-bottom: 1px solid #f2f2f2;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

.imgwarp {
  width: 2.2rem;
  height: 1.2rem;
  float: left;
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
  font-size: 0.45rem;
}
.headtext {
  width: 6rem;
  margin: 0 auto;
  font-size: 0.45rem;
  text-align: center;
  line-height: 1.2rem;
}
.bankcentre {
  background: #fff;
  overflow: hidden;
}
.bankcentretitle {
  width: 90%;
  margin: 0 auto;
  background: #fff;
  padding-top: 0.5rem;
  font-size: 0.4rem;
  font-weight: bold;
}
.iconconcent {
  overflow: hidden;
  width: 100%;
  background: #fff;
}
.iconconcent ul li {
  /* width: 20%; */
  float: left;
  text-align: center;
  padding-top: 0.3rem;
}
.iconul li .bankimg {
  width: 1.6rem;
  height: 1.3rem;
}
.iconul li p {
  margin-top: 0.1rem;
  font-size: 0.35rem;
  color: rgb(102, 102, 102);
}
.iconul {
  overflow: hidden;
  padding-bottom: 0.3rem;
  height: 4.3rem;
}
.jiantou {
  width: 100%;
  height: 1rem;
  background: #fff;
  line-height: 1rem;
}
.b {
  height: 100%;
  /* transition: height 1s;
-moz-transition: height 1s;	
-webkit-transition: height 1s;
-o-transition: height 1s; */
}
.a {
  height: 4.3rem;
  /* transition: height 1s;
-moz-transition: height 1s;
-webkit-transition: height 1s;
-o-transition: height 1s; */
}

.aa {
  /* transition: all 1s;  */
  transform: rotate(0deg);
}
.go {
  transform: rotate(180deg);
  /* transition: all 1s; */
}
.dingdanaa {
  /* transition: all 1s;  */
  transform: rotate(0deg);
}
.dingdango {
  transform: rotate(180deg);
  /* transition: all 1s; */
}
.jiantouimg {
  width: 0.5rem;
  margin: 0 auto;
}
.jiantouimg img {
  width: 100%;
}
.bankimgiconwarp {
  width: 1.6rem;
  height: 1.3rem;
  position: relative;
  margin: 0 auto;
}
.tuijian {
  width: 0.8rem;
  height: 0.4rem;
  position: absolute;
  right: -0.4rem;
  top: 0rem;
}
.bankcentretitle img {
  height: 0.4rem;
  float: left;
  margin-right: 0.2rem;
  margin-top: 0.1rem;
  width: 0.1rem;
}
.concentwarp {
  overflow: hidden;
  background: #fff;
  width: 100%;
  padding-top: 1.2rem;
}
.Creditconcent {
  width: 90%;
  margin: 0 auto;
  margin-top: 0.1rem;
}
.Creditconcenteach {
  margin-top: 0.46rem;
  padding-bottom: 0.46rem;
  border-bottom: 1px solid #f2f2f2;
  overflow: hidden;
}
.Creditcardimg {
  width: 2.93rem;
  height: 1.86rem;
  float: left;
  border-radius: 5px;
}
.Creditconcenteachcent {
  float: left;
  margin-left: 0.2rem;
  overflow: hidden;
  width: 65%;
}
.title h1 {
  max-width: 80%;
  font-weight: bold;
  font-size: 0.373rem;
  float: left;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
.title {
  width: 100%;
  overflow: hidden;
}

.Creditconcenteachcent p {
  width: 3.5rem;
  font-size: 0.35rem;
  margin-top: 0.3rem;
  color: #a0a0a0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /*! autoprefixer: on */
  -webkit-line-clamp: 2;
  float: left;
}
.btn {
  float: right;
  width: 2rem;
  height: 0.8rem;
  background: #222222;
  border-radius: 15px;
  text-align: center;
  color: #fff;
  line-height: 0.8rem;
  font-size: 0.373rem;
  /* margin-left: 0.2rem; */
  margin-top: 0.2rem;
}
.titleimg {
  width: 0.8rem;
  height: 0.4rem;
  background: url(../../assets/tt1@2x.png) no-repeat center;
  float: left;
  background-size: 0.8rem 0.4rem;
  font-size: 0.3rem;
  color: #fff;
  position: relative;
}
.titleimg div {
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
  z-index: 500;
}
.returntoop {
  width: 0.9rem;
  height: 0.9rem;
  float: right;
  margin-top: 0.25rem;
  margin-right: 0.266rem;
}
.returntoopwarp {
  width: 1.2rem;
  height: 1.2rem;
  position: fixed;
  right: 0rem;
  bottom: 2rem;
}
</style>
