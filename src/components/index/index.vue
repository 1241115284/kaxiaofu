<template>
  <div class="warp">
    <div class="scrollerstyle">
      <scroller
        :on-refresh="refresh"
        :on-infinite="infinite"
        :noDataText="msg"
        ref="myscroller"
        @touchmove.native="touchmove"
      >
        <div class="scroll" v-if="imgList.length>1">
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide
              v-for="(swiperitem,index) in imgList"
              :key="index"
              @click.native="swiperclick(swiperitem.redirectUrl)"
            >
              <img :src="swiperitem.plans" alt>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>

        <div
          class="imgwarp"
          v-if="imgList.length==1"
          v-for="itemsimg in imgList"
          @click="imgclick(itemsimg.redirectUrl)"
        >
          <img :src="itemsimg.plans" alt>
        </div>

        <div class="iconconcent" v-if="iconList.length!=0">
          <ul class="iconul">
            <li
              v-for="item in iconList"
              @click="iconclick(item.linkaddress)"
              :style="{width:iconwidth}"
            >
              <img :src="item.iconurl" alt>
              <p>{{item.navname}}</p>
            </li>
          </ul>
        </div>

        <div class="concentwarp">
          <h1 class="title">
            <img src="../../assets/hot@2x.png" alt>
          </h1>
          <ul class="commodity">
            <li v-for="msg in commodityList" @click="particularsclick(msg.goodsId)">
              <div class="shangpinwarp">
                <img :src="msg.picture" alt="商品" class="chanpinimg">
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

        <div class="copyright" id="copy">
          <div class="copyright1">© 2019 南京酷克斯网络科技有限公司</div>
          <a class="copyright2" href="http://www.beian.miit.gov.cn/">版权所有 苏ICP备18025910号</a>
        </div>
      </scroller>

      <img
        src="../../assets/sy_icon_top@2x.png"
        class="returntoop"
        v-show="toTopShow"
        @click="toTopShows"
      >
    </div>

    <div class="loding" v-if="loding">
      <img
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542711101022&di=3b47c50ded423ff4ce29856c279708d3&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a65c57108eab6ac725134372f367.gif"
        alt
      >
    </div>
    <div class="bottomwarp" v-show="bottomwarp">
      <div class="bottomwarpleft">登录卡小福开启品质生活</div>
      <div class="bottomwarpright" @click="immediatelylogin">立即登录</div>
      <img src="../../assets/my_sh_icon_gb@2x.png" alt @click="nonebottomwarp">
    </div>
    <bottomnative :idx="0"></bottomnative>
  </div>
</template>

<script>
import bottomnative from './../bottomnative/bottomnative'

export default {
  components: {
    bottomnative, bottomnative,
  },
  props: ['idx'],
  name: 'HelloWorld',

  data () {
    return {
      swiperOption: {
        //循环
        loop: true,
        autoplay: {
          delay: 3000,//自动轮播1秒一次
          disableOnInteraction: false,   //触摸后自动切换  true：停止 false:开始
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        observer: true,
        observeParents: true
      },
      imgList: [],
      iconList: [],
      commodityList: [],
      msg: "",
      // msg: 'O(∩_∩) 没有更多商品啦~',
      secondCategoryId: "",
      page: 1,
      hasNext: 0,
      toTopShow: false,
      loding: true,
      iconwidth: "",
      bottomwarp: true,
    }
  },
  methods: {
    immediatelylogin () {
      this.$router.push({ path: '/logo', })
    },
    nonebottomwarp () {
      this.bottomwarp = false
    },
    iconclick (iconurl) {
      console.log(iconurl)
      window.location.href = iconurl
    },
    swiperclick (redirectUrl) {
      console.log(redirectUrl)
      window.location.href = redirectUrl
    },
    imgclick (redirectUrl) {
      console.log(redirectUrl)
      window.location.href = redirectUrl
    },

    init (done) {
      let homepageObj = {
        navadress: "0",
        slideshow: "1",
        offset: this.page,
        limit: 10
      }

      this.$server.homepage(homepageObj).then(data => {
        console.log(data)
        this.loding = false
        this.iconList = data.data.navigation
        this.imgList = data.data.slideshow
        if (data.data.navigation.length >= 5) {
          this.iconwidth = "20%"
        } else {
          this.iconwidth = 100 / data.data.navigation.length + "%"
        }

        if (this.page == 1) {

          this.commodityList = []
        }

        this.commodityList = this.commodityList.concat(data.data.recommendPro.productData)
        console.log(this.commodityList)
        this.hasNext = Math.ceil(data.data.recommendPro.total / 10)
        if (done) done()

      })

    },

    refresh (done) {         //下拉刷新
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


    //滚动条大于500 返回顶部按钮出现
    touchmove () {
      //  console.log(this.$refs.myscroller.getPosition().top)
      if (this.$refs.myscroller.getPosition().top >= 500) {
        this.toTopShow = true
      } else {
        this.toTopShow = false
      }

    },
    toTopShows () {
      let $scroller = this.$refs.myscroller
      $scroller.scrollTo(0, true)
    },
    particularsclick (goodsId) {
      console.log(goodsId)
      this.$router.push({ path: '/particulars', })
      sessionStorage.setItem("goodsId", goodsId)
    }

  },

  mounted () {

    this.init()
    sessionStorage.setItem('skiprouter', this.$route.path)

    if (localStorage.getItem("sessionCode")) {
      this.bottomwarp = false
    } else {
      this.bottomwarp = true
    }


  },




}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.warp {
  width: 100%;
  height: 100%;
  position: fixed;
  background: #f2f2f2;
}

.swiper-container {
  width: 100%;
}
.swiper-slide img {
  width: 100%;
  height: 5rem;
  position: absolute;
}

.swiper-slide {
  width: 100%;
  height: 5rem;
  background: #fff;
  position: relative;
}

.sorll {
  position: fixed;
}

.iconconcent {
  overflow: hidden;
  width: 100%;
  background: #fff;
  padding-bottom: 0.3rem;
}
.iconconcent ul li {
  float: left;
  text-align: center;
  padding-top: 0.3rem;
}
.iconul li img {
  width: 1.6rem;
  height: 1.3rem;
}
.iconul li p {
  margin-top: 0.1rem;
  font-size: 0.35rem;
  color: rgb(102, 102, 102);
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
  height: 100%;
  top: 0rem;
  background: #f2f2f2;
}
.returntoop {
  width: 0.9rem;
  height: 0.9rem;
  position: fixed;
  right: 0.266rem;
  bottom: 4rem;
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
.bottomwarp {
  width: 100%;
  height: 1.2rem;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  bottom: 1.36rem;
  border-radius: 4px;
}

.bottomwarpleft {
  line-height: 1.2rem;
  color: #fff;
  font-size: 0.38rem;
  float: left;
  margin-left: 0.3rem;
}
.bottomwarpright {
  float: right;
  color: #fff;
  background: #f7a020;
  padding: 0.1rem;
  border-radius: 4px;
  margin-top: 0.25rem;
  font-size: 0.35rem;
  margin-right: 0.3rem;
}
.bottomwarp img {
  width: 0.6rem;
  height: 0.6rem;
  position: absolute;
  top: -0.7rem;
  right: 0.2rem;
}
.copyright {
  width: 100%;
  height: 1.5rem;
  background: #4e525e;
  text-align: center;
  color: #ccc;
  font-size: 0.35rem;
  overflow: hidden;
  position: absolute;
  bottom: -0.3rem;
  left: 0;
  z-index: 100;
}
.copyright1 {
  margin-top: 0.25rem;
}
a {
  color: #ccc;
}
</style>
