<template>
  <div class="hellowwarp">
    <div class="head">
      <div class="headauto">
        <div class="imgwarp" @click="imgwarpclick">
          <img src="../../assets/back@2x.png" alt>
        </div>
        <div class="headtext">物流详情</div>
      </div>
    </div>

    <div class="logistics_concent">
      <div class="solid"></div>
      <ul class="logistics_text">
        <li v-for="item in List">
          <img src="../../assets/my_dd_xz@2x.png" alt class="xuanzhong">
          {{item.context}}
        </li>
      </ul>
    </div>

    <div class="nonetext" v-show="nonetext">
      <div>{{text}}</div>
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
      name: '',
      show: true,
      count: "",
      tracknumber: "",
      List: [],
      nonetext: false,
      text: null
    }
  },
  methods: {
    imgwarpclick () {

      this.$router.push({ path: '/myorder', query: { id: 2 } })
    },
    init () {
      let queryLogisticsObj = {
        logisticsNo: this.tracknumber
      }
      this.$server.queryLogistics(queryLogisticsObj).then(data => {
        console.log(data)
        this.loding = false
        if (!data.data) {
          this.text = "物流单号不正确！"
          this.nonetext = true
          return
        }
        if (!data.data.data) {
          this.text = data.data.message
          this.nonetext = true
        } else {
          this.nonetext = false
        }

        if (data.data.data) {
          this.List = data.data.data
          return
        }

      })

    }

  },

  created () {
    this.tracknumber = this.$route.query.tracknumber

  },

  mounted () {
    this.init()
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS t0o this component only -->
<style scoped>
.hellowwarp {
  width: 100%;
  height: 100%;
  position: fixed;
  background: #fff;
  overflow-y: auto;
}
.head {
  width: 100%;
  height: 1.2rem;
  border-bottom: 1px solid #f2f2f2;
  background: #fff;
}

.imgwarp {
  width: 1rem;
  height: 1.2rem;
  float: left;
}
.imgwarp img {
  width: 0.5rem;
  margin-top: 0.35rem;
  margin-left: 0.26rem;
}
.headtext {
  width: 3rem;
  margin: 0 auto;
  font-size: 0.45rem;
  text-align: center;
  line-height: 1.2rem;
}

body {
  position: relative;
}

.header {
  width: 90%;
  height: 1.26rem;
  margin: 0 auto;
  font-size: 0.43rem;
  color: #333333;
  text-align: center;
  line-height: 1.26rem;
  font-weight: bold;
}
.headers {
  width: 100%;
  height: 1.26rem;
  background: #fff;
  border-bottom: 1px solid #f1f1f1;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.headleft {
  width: 0.266rem;
  height: 0.44rem;
  float: left;
  margin-top: 0.425rem;
}
.shippinng_btn {
  float: right;
  width: 0.586rem;
  height: 0.586rem;
  margin-top: 0.426rem;
}
.logistics_concent {
  width: 100%;
  background: #fff;
  overflow: hidden;
  position: relative;
  /* padding-top: 1.26rem; */
  padding-top: 0.2rem;
}
.logistics_concentauto {
  width: 90%;
  margin: 0 auto;
}
.leftsolid {
  width: 1px;
  height: 101%;
  border-left: 1px solid red;
  position: absolute;
  top: 0;
  left: -12px;
  z-index: 1;
  box-sizing: border-box;
}
.logistics_text {
  width: 85%;
  font-size: 0.32rem;
  color: #999;
  float: left;
  position: relative;
  float: right;
}
.logistics_text li {
  width: 97%;
  border-bottom: 1px solid #f1f1f1;
  padding-top: 0.466rem;
  padding-bottom: 0.466rem;
  box-sizing: border-box;
  position: relative;
}
.logistics_text li div {
  line-height: 0.586rem;
  width: 95%;
}
.logistics_text li:nth-child(5) {
  border-bottom: none;
}
.phone {
  color: #76d459;
}
.logistics_text li::before {
  content: "";
  position: absolute;
  width: 15px;
  height: 15px;
  background: #d2d2d2;
  border-radius: 50%;
  left: -1.1rem;
  top: 0.6rem;
  z-index: 110;
  display: none;
}
.border {
  width: 12px;
  height: 12px;
  background: red;
  border-radius: 50%;
  position: absolute;
  left: -50%;
  top: -16px;
  margin-left: -7px;
  z-index: 9;
}

.logistics_text li .xuanzhong {
  width: 0.613rem;
  height: 0.613rem;
  position: absolute;
  left: -1.2rem;
  top: 0.5rem;
  display: none;
  z-index: 200;
}
.logistics_text .active {
  color: #272727;
}
.logistics_text .active img {
  display: block;
}

.logistics_text li:last-child .warp {
  display: block;
}
.logistics_text li:first-child .xuanzhong {
  display: block;
}
.solid {
  height: 100%;
  width: 1px;
  border-left: 1px solid #ccc;
  position: absolute;
  top: 1.3rem;
  left: 0.57rem;
}
.logistics_text li .warp {
  width: 1px;
  height: 100%;
  position: absolute;
  top: 0.6rem;
  left: -0.93rem;
  background: #fff;
  display: none;
  z-index: 100;
}
.return {
  width: 1rem;
  height: 1.26rem;
  float: left;
}
.kuaidi {
  width: 100%;

  border-bottom: 1px solid #f2f2f2;
}
.kuaidiauto {
  width: 95%;
  margin: 0 auto;
}
.kuaidiimg {
  width: 1.05rem;
  height: 1.05rem;
  float: left;
}
.rightttt {
  float: left;
  color: #888;
  font-size: 0.32rem;
  margin-left: 0.4rem;
}
.rightttt .righttttone {
  font-size: 0.373rem;
  color: #222;
}
.kuaidiautotop {
  overflow: hidden;
  margin-top: 0.4rem;
}
.kuaidinumber {
  font-size: 0.373rem;
  color: #222;
  margin-top: 0.2rem;
  padding-bottom: 0.4rem;
}
.nonetext {
  width: 100%;
  height: 100%;
  background: #fff;
  position: fixed;
  z-index: 100;
  text-align: center;
}
.nonetext div {
  font-size: 0.4rem;
  margin-top: 1rem;
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
</style>
