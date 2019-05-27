<template>
  <div class="hellowwarp">
    <div class="head">
      <div class="headauto">
        <div class="imgwarp" @click="imgwarpclick">
          <img src="../../assets/back@2x.png" alt>
          <span>返回</span>
        </div>
        <div class="headtext">支付失败</div>
      </div>
    </div>
    <div class="concentwarp">
      <img src="../../assets/0101.png" alt>
      <div>支付失败...</div>
      <!-- <div class="btn" @click="btnclick">查看订单</div> -->
    </div>
    <!-- <div class="concent">
       <img src="../../assets/gwc_sy_icon_cg@2x.png" alt="">
       <div>支付成功</div>
     </div>
     <div class="btnwarp">
       <div class="btnwarpauto">
         <div class="btnwarpautoleft" @click="chakandingdanclick">查看订单</div>
         <div class="btnwarpautoright" @click="jixugouwuclick">继续购物</div>
       </div>
    </div>-->
  </div>
</template>

<script>

export default {

  name: 'HelloWorld',
  data () {
    return {
      name: '',
      show: true,
      count: "",
    }
  },
  methods: {
    imgwarpclick () {
      this.$router.push({ path: '/myorder', query: { id: 1 } })
    },
    btnclick () {
      this.$router.push({ path: '/myorder' })
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
.concentwarp {
  width: 70%;
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
  font-size: 0.4rem;
  color: #9e9e9e;
  /* height: 8rem; */
  position: absolute;
  left: 50%;
  top: 3rem;
  /* margin-top: -4rem; */
  margin-left: -35%;
}
.concentwarp img {
  width: 100%;
}
.btn {
  font-size: 0.4rem;
  border-radius: 5px;
  text-align: center;
  background: #222;
  line-height: 1rem;
  margin-top: 0.5rem;
  color: #fff;
}
</style>
