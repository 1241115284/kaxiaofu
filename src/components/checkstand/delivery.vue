<template>
  <div class="hellowwarp">
    <div class="head">
      <div class="headauto">
        <div class="headtext" @click="accomplishclick">完成</div>
      </div>
    </div>
    <div class="concent">
      <div class="imgwarp">
        <img src="../../assets/xd1@2x.png" alt>
      </div>
      <div class="text">
        <div class="fangshi">
          <span>支付方式：</span>
          <span class="colorye">货到付款</span>
        </div>
        <div class="fangshi" id="money">
          <span>订单金额：</span>
          <span class="colorye">
            ￥
            <span>{{money}}</span>
          </span>
        </div>
      </div>
    </div>
    <div class="btnconcent">
      <div class="btntwo">
        <div class="btnleft" @click="orderclick">查看订单</div>
        <div class="btnright" @click="accomplishclick">继续购物</div>
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
      show: true,
      count: "",
      username: "",
      codeWord: "",
      money: null,
    }
  },
  methods: {
    accomplishclick () {
      this.$router.replace({ path: "/" })
    },

    orderclick () {
      this.$router.replace({ path: '/myorder' })
    }


  },

  mounted () {
    if (sessionStorage.getItem("submitorder")) {
      this.money = sessionStorage.getItem("submitorder")

    }

  }


}
</script>

<!-- Add "scoped" attribute to limit CSS t0o this component only -->
<style scoped>
.hellowwarp {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #f2f2f2;
}
.head {
  width: 100%;
  height: 1.2rem;
  border-bottom: 1px solid #f2f2f2;
  background: #fff;
}
.headauto {
  width: 95%;
  margin: 0 auto;
  /* border-bottom: 1px solid #F2F2F2; */
}

.headtext {
  float: right;
  font-size: 0.45rem;
  line-height: 1.2rem;
  margin-right: 0.2rem;
}
.concent {
  width: 100%;
  height: 6rem;
  background: #fff;
  overflow: hidden;
  border-bottom: 1px solid #f2f2f2;
}
.imgwarp {
  width: 2.1rem;
  height: 2.1rem;
  margin: 0 auto;
  margin-top: 0.8rem;
}
.imgwarp img {
  width: 100%;
  height: 100%;
}
.text {
  width: 8rem;
  font-size: 0.4rem;
  margin: 0 auto;
  margin-top: 0.8rem;
  /* background: red; */
}
.fangshi {
  margin: 0 auto;
  width: 4.2rem;
  /* background: blue; */
}
#money {
  margin-top: 0.2rem;
}
.colorye {
  color: #f7a020;
}
.btnconcent {
  width: 100%;
  background: #fff;
  overflow: hidden;
  padding-bottom: 0.8rem;
}
.btntwo {
  overflow: hidden;
  width: 6.7rem;
  margin: 0 auto;
  margin-top: 0.8rem;
}
.btntwo div {
  width: 3.14rem;
  height: 1.1rem;
  line-height: 1.1rem;
  float: left;
  border: 1px solid #222;
  border-radius: 4px;
  text-align: center;
  font-size: 0.4rem;
}
.btntwo .btnleft {
  margin-right: 0.2rem;
}
.btntwo .btnright {
  background: #222;
  color: #fff;
}
</style>
