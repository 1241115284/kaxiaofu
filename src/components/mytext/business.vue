<template>
  <div class="hellowwarp">
    <div class="zhegai" v-show="zhegai" @click="zhegaiclick">
      <img src="../../assets/zhu.jpg" alt>
    </div>
    <div class="head">
      <div class="headauto">
        <div class="imgwarp" @click="imgwarpclick">
          <img src="../../assets/back@2x.png" alt>
          <span>返回</span>
        </div>
        <div class="headtext">经营信息</div>
      </div>
    </div>
    <div class="zhizhao" @click="zhizhaoclick">
      <img src="../../assets/zhu.jpg" alt>
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

    }
  },
  methods: {
    imgwarpclick () {
      this.$router.push({ path: '/AboutUs' })
    },
    zhizhaoclick () {
      this.zhegai = true
    },
    zhegaiclick () {
      this.zhegai = false
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
  background: #ffffff;
  overflow: auto;
}
.head {
  width: 100%;
  height: 1.2rem;
  border-bottom: 1px solid #f2f2f2;
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
.zhizhao {
  width: 8rem;
  height: 11.3rem;
  margin: 0 auto;
  margin-top: 1rem;
}
.zhizhao img {
  width: 100%;
}
.zhegai {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.9);
  /* background: red; */
}
.zhegai img {
  width: 90%;
  height: 15rem;
  position: fixed;
  left: 5%;
  top: 5%;
}
</style>
