<template>
  <div class="hellowwarp">
    <div class="head">
      <div class="headauto">
        <div class="imgwarp" @click="imgwarpclick">
          <img src="../../assets/back@2x.png" alt>
        </div>
        <div class="headtext">提示</div>
      </div>
    </div>
    <div class="text">如需浏览，请长按网址复制后使用浏览器访问</div>
    <p id="text" class="http" v-show="home">{{$url}}home</p>
    <p id="text" class="http" v-show="particulars">{{$url}}particulars?goodsId={{goodsId}}</p>
    <!-- <textarea id="input" >这是幕后黑手</textarea>
   <div @click="copyText()" class="btn">点击复制链接</div>
    <inp>ut type="text"-->
  </div>
</template>

<script>

export default {

  name: 'HelloWorld',
  data () {
    return {
      particulars: false,
      home: false,
      name: '',
      show: true,
      count: "",
      goodsId: null,
    }
  },
  methods: {
    imgwarpclick () {
      this.$router.push({ path: '/checkstand', })
    },
    //  copyText(){
    //   var text = document.getElementById("text").innerText;
    //   var input = document.getElementById("input");
    //   input.value = text; 
    //   alert(input.value)
    //   input.select(); 
    //   document.execCommand("copy"); 
    //   this.$layer.msg("复制链接成功")
    // }

  },
  created () {

    this.goodsId = sessionStorage.getItem("goodsId")
    if (this.$route.query.virtual == true) {
      this.home = true
    } else {
      this.particulars = true
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
  background: #fff;
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
.concentwarp {
  width: 70%;
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
  font-size: 0.4rem;
  color: #9e9e9e;
  height: 8rem;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -4rem;
  margin-left: -35%;
}
.concentwarp img {
  width: 100%;
}
.text {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.4rem;
}
.http {
  text-align: center;
  font-size: 0.4rem;
  margin-top: 0.4rem;
}
.wrapper {
  position: relative;
}
#input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: -10;
}
.btn {
  width: 2.4rem;
  background: #15a5fb;
  margin: 0 auto;
  text-align: center;
  border-radius: 5px;
  line-height: 0.8rem;
  color: #fff;
  margin-top: 0.5rem;
}
</style>
