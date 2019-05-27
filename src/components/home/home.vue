<template>
  <div class="hello">
    <!-- 遮盖 -->
    <div class="zhegai" v-show="zhegai" @click="zhegaiclick"></div>

    <!-- 隐藏导航栏 -->
    <div class="showicon" v-show="showicon">
      <div class="btn">
        <div
          v-for="items in iconList"
          :data-tag="items.key"
          :class="{ activecolor:items.key==current}"
          @click="showiconclick(items.key)"
        >{{items.value}}</div>
      </div>
    </div>

    <!-- 头部导航 -->
    <div class="homeheadwarp">
      <div class="imgwarp" @click="shangpinwarpclick">
        <img
          src="../../assets/sy_icon_xl@2.png"
          alt
          class="homeicon"
          :class="[rotateright?'fa fa-arrow-down dingdango':'fa fa-arrow-down dingdanaa']"
        >
      </div>
      <div
        id="ceshi"
        :class="{ active: onecurrent==current}"
        class="homeli"
        @click="quanbuclick()"
        ref="demo"
      >
        <div class="shangpin">全部</div>
      </div>
      <div class="homehead">
        <div class="homeheadauto" id="homeheadauto">
          <div class="nav">
            <div
              :class="{ active:item.key==current}"
              v-for="item in iconList"
              :data-tag="item.key"
              @click="homeheadclick(item.key)"
              ref="headdemo"
            >
              <div class="shangpin">{{item.value}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="scrollerstyle" v-if="scrollerconcent">
      <scroller
        :on-refresh="refresh"
        :on-infinite="infinite"
        :noDataText="msg"
        ref="myscroller"
        @touchmove.native="touchmove"
      >
        <div class="concent">
          <ul>
            <li v-for="msg in concentList" @click="particularsclick(msg.goodsId)">
              <div class="shangpinwarp">
                <img :src="msg.picture" alt class="chanpinimg">
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

    <div class="lackhtml" v-if="lackhtml">
      <div>暂无商品哦~</div>
    </div>

    <img
      src="../../assets/sy_icon_top@2x.png"
      class="returntoop"
      v-show="toTopShow"
      @click="toTopShows"
    >
    <bottomnative :idx="1"></bottomnative>
    <div class="loding" v-if="loding">
      <img
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542711101022&di=3b47c50ded423ff4ce29856c279708d3&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a65c57108eab6ac725134372f367.gif"
        alt
      >
    </div>
  </div>
</template>
<script>
import bottomnative from './../bottomnative/bottomnative'
export default {
  components: {
    bottomnative, bottomnative,
  },
  name: 'HelloWorld',
  data () {
    return {
      loding: true,
      secondCategoryId: "",
      scrollerconcent: true,
      lackhtml: false,
      hasNext: 0,
      page: 1,
      offset: 0,
      onecurrent: null,
      msg: 'O(∩_∩) 没有更多商品啦~',
      zhegai: false,
      show: true,
      count: "",
      cheackinput: false,
      concent: null,
      current: null,
      toTopShow: false,
      showicon: false,
      rotateright: false,
      numbeindex: null,
      offsetLeft: null,
      homeList: [],
      iconList: [],
      concentList: []
    }
  },
  methods: {


    homeheadclick (index) {
      this.$store.commit("loding", true)
      console.log(index)
      this.current = index
      this.page = 1
      this.secondCategoryId = index
      this.init()
      this.zhegai = false
      this.showicon = false
      this.toTopShow = false
      if (this.concentList.length != 0) {
        let $scroller = this.$refs.myscroller
        $scroller.scrollTo(0, true)
      }
    },

    quanbuclick () {
      this.$store.commit("loding", true)
      this.current = null
      this.secondCategoryId = ""
      this.init()
      this.toTopShow = false
      this.zhegai = false
      this.showicon = false
      if (this.concentList.length != 0) {
        let $scroller = this.$refs.myscroller
        $scroller.scrollTo(0, true)
      }
    },

    showiconclick (index) {
      this.$store.commit("loding", true)
      // console.log(index)
      this.current = index
      this.showicon = !this.showicon
      this.zhegai = !this.zhegai
      this.rotateright = !this.rotateright
      this.page = 1
      this.secondCategoryId = index
      this.toTopShow = false
      this.init()
      if (this.concentList.length != 0) {
        let $scroller = this.$refs.myscroller
        $scroller.scrollTo(0, true)
      }
    },
    shangpinwarpclick () {
      this.showicon = !this.showicon                 //导航图标click
      this.rotateright = !this.rotateright
      this.zhegai = !this.zhegai
      this.numbeindex = null
    },

    zhegaiclick () {
      this.zhegai = !this.zhegai
      this.showicon = !this.showicon                 //遮盖click
      this.rotateright = !this.rotateright
    },



    particularsclick (goodsId) {
      console.log(goodsId)
      this.$router.push({ path: '/particulars', })
      sessionStorage.setItem("goodsId", goodsId)
    },
    //导航列表
    headList () {
      let homeObj = {

      }
      this.$server.home(homeObj).then(data => {
        console.log('...............data...........', data.data)
        this.iconList = data.data
        this.$nextTick(() => {
          let btns = document.getElementsByClassName('btn')[0].children
          let navs = document.getElementsByClassName('nav')[0].children
          let navsArr = Array.prototype.slice.call(navs)
          let buttons = Array.prototype.slice.call(btns)
          buttons.forEach(function (node) {

            node.onclick = function () {
              const dataTag = node.getAttribute('data-tag')
              const moveNode = navsArr.filter(function (dom) {
                return dataTag === dom.getAttribute('data-tag')
              })
              const offsetLeft = moveNode[0].offsetLeft
              // moveNode[0].className = 'actived'
              document.getElementsByClassName('nav')[0].scrollLeft = offsetLeft

            }

          })

        });

      })

    },
    // 免密码登录
    Avoidthelogin () {
      let secret = this.$route.query.secret
      let secretObj = {
        secret: secret
      }

      this.$server.secret(secretObj).then(data => {
        console.log(data)
        if (data.data.code == "0") {
          localStorage.setItem("sessionCode", data.data.sessionInfo.sessionCode)
          localStorage.setItem("sessionId", data.data.sessionInfo.sessionId)
          sessionStorage.setItem("againphone", data.data.sessionInfo.phone)
        } else {
          this.$layer.msg(data.data.message)
        }
      })
    },
    init (done) {
      var sendDate = (new Date()).getTime();
      let homeconcentObj = {
        secondCategoryId: this.secondCategoryId,
        offset: this.page,
        limit: 10
      }
      this.$server.homeconcent(homeconcentObj).then(data => {
        console.log(data.data)
        var receiveDate = (new Date()).getTime();
        var responseTimeMs = receiveDate - sendDate;
        //  console.log(responseTimeMs)
        var that = this
        if (responseTimeMs < 300) {
          // console.log("...........................")
          setTimeout(function () {
            that.$store.commit("loding", false)
          }, 300)
        } else {
          console.log("else else else else")
          this.$store.commit("loding", false)
        }
        this.loding = false
        if (this.page == 1) {
          this.concentList = []
        }
        this.concentList = this.concentList.concat(data.data.productData)
        if (this.concentList.length == 0) {
          this.scrollerconcent = false
          this.lackhtml = true
        } else {
          this.scrollerconcent = true
          this.lackhtml = false
        }
        //  console.log(this.concentList)
        this.hasNext = Math.ceil(data.data.total / 10)
        if (done) done()

      })

    },


    refresh (done) {  //下拉刷新
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
      console.log("..........翻页...........", this.page)
      this.init(done)

    },


    toTopShows () {                  //点击返回顶部

      let $scroller = this.$refs.myscroller
      $scroller.scrollTo(0, true)
      console.log('.............this.concentList...', this.concentList)

    },

    //滚动条大于500 返回顶部按钮出现
    touchmove () {
      //  console.log(this.$refs.myscroller.getPosition().top)
      if (this.$refs.myscroller.getPosition().top >= 500) {
        this.toTopShow = true
      } else {
        this.toTopShow = false
      }
    },

  },





  created () {

    // this.headList()
  },
  mounted () {
    sessionStorage.setItem('skiprouter', this.$route.path)
    let routersecondCategoryId = this.$route.query.secondCategoryId
    let secret = this.$route.query.secret
    let channelid = this.$route.query.channelid
    if (channelid) {
      sessionStorage.setItem("channelid", channelid)
    }
    if (routersecondCategoryId && secret) {

      this.secondCategoryId = this.$route.query.secondCategoryId
      this.current = this.$route.query.secondCategoryId
      let homeObj = {

      }
      this.$server.home(homeObj).then(data => {
        console.log('...............data...........', data.data)

        this.iconList = data.data
        this.$nextTick(() => {
          let btns = document.getElementsByClassName('btn')[0].children
          let navs = document.getElementsByClassName('nav')[0].children
          let navsArr = Array.prototype.slice.call(navs)
          let buttons = Array.prototype.slice.call(btns)
          var acitvemove = navsArr.filter(function (dom) {
            return routersecondCategoryId == dom.getAttribute('data-tag')
          })


          document.getElementsByClassName('nav')[0].scrollLeft = acitvemove[0].offsetLeft

          buttons.forEach(function (node) {
            node.onclick = function () {
              const dataTag = node.getAttribute('data-tag')
              console.log(dataTag)
              const moveNode = navsArr.filter(function (dom) {
                return dataTag === dom.getAttribute('data-tag')
              })
              const offsetLeft = moveNode[0].offsetLeft
              document.getElementsByClassName('nav')[0].scrollLeft = offsetLeft
              console.log(document.getElementsByClassName('nav')[0])
            }

          })

        });

      })

      //免登录
      this.Avoidthelogin()

    } else if (secret) {

      this.secondCategoryId = ""
      this.current = null
      this.headList()
      this.Avoidthelogin()


    } else {

      this.secondCategoryId = ""
      this.current = null
      this.headList()
    }



    this.init()


  },



}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scrollerstyle {
  position: fixed;
  width: 100%;
  top: 1.2rem;
  bottom: 1.3rem;
  left: 0;
  background: #f2f2f2;
}
.lackhtml {
  position: fixed;
  width: 100%;
  top: 1.2rem;
  bottom: 1.3rem;
  left: 0;
  background: #fff;
  font-size: 0.4rem;
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
.hello {
  width: 100%;
  height: 100%;
  position: fixed;
  background: #f2f2f2;
}
.homehead {
  width: 71%;
  height: 1.16rem;
  position: fixed;
  left: 19%;
}
.homeheadwarp {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 1.16rem;
  overflow: hidden;
  background: #fff;
}
.overflow {
  overflow-x: scroll;
  white-space: nowrap;
  width: 100%;
  padding: 20px;
}
.homeheadauto {
  width: 100%;
  margin: 0 auto;
  font-size: 0.4rem;
  overflow-x: scroll;
  white-space: nowrap;
}

.homeli:first-child .shangpin {
  margin-left: 0;
}
.homeli:last-child .solid {
  display: none;
}

.homeheadauto ul .active {
  color: #222222;
  font-weight: bold;
}

.imgwarp {
  width: 0.8rem;
  height: 1.13rem;
  /* background: red; */
  position: absolute;
  right: 0;
  top: 0rem;
}
.showicon {
  width: 100%;
  background: #fff;
  border-top: 1px solid #dddddd;
  overflow: hidden;
  padding-bottom: 0.3rem;
  /* background: red; */
  position: absolute;
  top: 1.16rem;
  left: 0;
  z-index: 500;
}

.homeicon {
  width: 0.24rem;
  height: 0.2rem;
  margin-top: 0.5rem;
}
.concent {
  width: 100%;
  overflow: hidden;
  /* padding-top: 1.13rem; */
  padding-bottom: 1.5rem;
}
.concent ul li {
  width: 46%;
  /* width: 4.61rem; */
  height: 6.85rem;
  float: left;
  /* background: red; */
  border-radius: 5px;
  margin-left: 2.66%;
  margin-top: 0.266rem;
  background: #fff;
}
.chanpinimg {
  width: 100%;
  height: 4.45rem;
  border-radius: 5px 5px 0 0;
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
.shangpinwarp {
  width: 100%;
  height: 4.45rem;
  /* background: red; */
}
.jiaqian {
  margin-top: 0.2rem;
}
.shangpintext .jiaqian {
  font-size: 0.32rem;
}
.shangpintext .jiaqian span {
  font-size: 0.453rem;
}
.returntoop {
  width: 0.9rem;
  height: 0.9rem;
  position: fixed;
  right: 0.266rem;
  bottom: 2rem;
}

.showicon ul li {
  float: left;
  width: 25%;
  text-align: center;
  font-size: 0.4rem;
  color: #666;
  margin-top: 0.3rem;
}
.showicon ul .activecolor {
  font-weight: bold;
  color: #222;
}
.aa {
  transition: all 0.5s;
  transform: rotate(0deg);
}
.go {
  transform: rotate(180deg);
  transition: all 0.5s;
}
.dingdanaa {
  transition: all 0.5s;
  transform: rotate(0deg);
}
.dingdango {
  transform: rotate(180deg);
  transition: all 0.5s;
}
.zhegai {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
}
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar {
  display: none;
}
.nav {
  width: 100%;
  height: 1.16rem;
  white-space: nowrap;
  overflow-x: scroll;
}

.nav div {
  line-height: 1.1rem;
  font-size: 0.373rem;
  display: inline-block;
  color: #666666;
}
.shangpin {
  margin-right: 0.8rem;
}
.active .shangpin {
  border-bottom: 2px solid #222;
  box-sizing: border-box;
  /* margin-left: 0; */
}
.btn {
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
}
.btn div {
  float: left;
  width: 25%;
  text-align: center;
  font-size: 0.373rem;
  color: #666;
  margin-top: 0.3rem;
  height: 0.5rem;
}
.nav .active {
  font-weight: bold;
  color: #222;
}
.active .shangpin {
  font-weight: bold;
  color: #222;
}
.btn .activecolor {
  font-weight: bold;
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
  z-index: 500;
}
#ceshi {
  width: 1.6rem;
  float: left;
  line-height: 1.1rem;
  font-size: 0.373rem;
  display: inline-block;
  color: #666666;
  text-align: center;
  position: fixed;
  z-index: 200;
  background: #fff;
  margin-left: 3%;
}
#ceshi .shangpin {
  margin-right: 0.8rem;
}
</style>
