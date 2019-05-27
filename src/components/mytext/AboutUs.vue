<template>
  <div class="hellowwarp">
    <div class="head">
      <div class="headauto">
        <div class="imgwarp" @click="imgwarpclick">
          <img src="../../assets/back@2x.png" alt>
          <span>返回</span>
        </div>
        <div class="headtext">关于我们</div>
      </div>
    </div>

    <div class="middle">
      <div class="Aboutlogoimgwarp">
        <img src="../../assets/logo.png" alt class="phoneinputimg">
      </div>
      <div class="phoneconcent">
        <div class="phonewarp">
          <div class="pnhonekey">客服热线电话：</div>
          <a href="tel:400-888-9999">
            <div class="phonevalue">400-888-9999</div>
          </a>
        </div>
        <div class="phonewarp">
          <div class="pnhonekey">商家入驻电话：</div>
          <a href="tel:5689411">
            <div class="phonevalue">010-123456798</div>
          </a>
        </div>
      </div>
    </div>

    <div class="concentwarp">
      <div class="mylocation" @click="yingyetxttclick" :class="coloractivetwo">
        <div class="mylocationauto">
          <div class="mylocationleft">
            <!-- <img src="../../assets/my_icon_xx@2x.png" alt=""> -->
            <div>经营信息</div>
          </div>
          <div class="mylocationright">
            <img src="../../assets/my_icon_f@2x.png" alt>
          </div>
        </div>
      </div>

      <div class="mylocation" @click="xieyiclick" :class="xieyiclass">
        <div class="mylocationauto">
          <div class="mylocationleft">
            <!-- <img src="../../assets/my_icon_xx@2x.png" alt=""> -->
            <div>卡小福用户协议</div>
          </div>
          <div class="mylocationright">
            <img src="../../assets/my_icon_f@2x.png" alt>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  name: 'HelloWorld',
  data () {
    return {
      name: '',
      zhegai: false,
      coloractivetwo: "coloatwo",
      xieyiclass: "falseclass",
    }
  },
  methods: {
    imgwarpclick () {
      this.$router.push({ path: '/mytext' })
    },
    yingyetxttclick () {         //营业执照

      this.coloractivetwo = "coloractivetwo"
      var that = this
      setTimeout(function () {
        that.coloractivetwo = "colora"
        that.$router.push({ path: '/business' })
      }, 100)


    },
    xieyiclick () {
      this.xieyiclass = "trueclass"
      var that = this
      setTimeout(function () {
        that.xieyiclass = "falseclass"
        that.$router.push({ path: '/useragreement' })
      }, 100)

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
  background: #f1f1f1;
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
.middle {
  width: 100%;
  overflow: hidden;
  background: #fff;
  padding-bottom: 0.5rem;
}
.Aboutlogoimgwarp {
  width: 3rem;
  margin: 0 auto;
  margin-top: 1rem;
}
.Aboutlogoimgwarp img {
  width: 100%;
}
.phoneconcent {
  width: 6rem;
  margin: 0 auto;
  font-size: 0.4rem;
  margin-top: 1.5rem;
}
.phonewarp {
  overflow: hidden;
  margin-top: 0.4rem;
}
.phonewarp div {
  float: left;
}
.phonewarp .phonevalue {
  margin-top: 0.01rem;
  color: #4477cf;
}

.mylocation {
  width: 100%;
  height: 1.25rem;
  box-sizing: border-box;
  border-bottom: 1px solid #f2f2f2;
  background: #fff;
}
.mylocationleft {
  float: left;

  font-size: 0.4rem;
  color: #222222;
  overflow: hidden;
}
.mylocationleft img {
  float: left;
  margin-top: 0.35rem;
  margin-right: 0.3rem;
}
.mylocationleft div {
  float: left;
  line-height: 1.25rem;
}
.mylocationleft img {
  width: 0.5rem;
  height: 0.526rem;
}
.mylocationright {
  float: right;
  line-height: 1.25rem;
  margin-right: 0.1rem;
}
.mylocationright img {
  width: 0.4rem;
}
.mylocationauto {
  width: 95%;
  margin: 0 auto;
}
.concentwarp {
  margin-top: 0.3rem;
}
.coloractivetwo {
  background: #ccc;
}
.trueclass {
  background: #ccc;
}
</style>
