<template>
  <div class="hellowwarp">
    <div class="head">
      <div class="headauto">
        <div class="imgwarp" @click="imgwarpclick">
          <img src="../../assets/back@2x.png" alt>
          <span>返回</span>
        </div>
        <div class="headtext">新增地址</div>
      </div>
    </div>
    <div class="nameinput">
      <div class="nameinputauto">
        <input type="text" placeholder="收货姓名" v-model="consignee">
      </div>
    </div>
    <div class="nameinput">
      <div class="nameinputauto">
        <input
          type="tel"
          placeholder="联系电话"
          v-model="phone"
          oninput="if(value.length > 11)value = value.slice(0, 11)"
        >
      </div>
    </div>

    <div class="nameinput">
      <div class="nameinputauto">
        <div class="commonD">
          <!-- <span class="leftSpan">省市县：</span> -->
          <areaBtn v-on:getValue="have"></areaBtn>
        </div>
      </div>
    </div>

    <div class="nameinput">
      <div class="nameinputauto">
        <input type="text" placeholder="详细地址" v-model="address">
      </div>
    </div>
    <div class="yesbtn" @click="yesbtn">确认</div>
  </div>
</template>

<script>
import areaBtn from './area.vue'
export default {
  components: {
    areaBtn, areaBtn
  },
  name: 'HelloWorld',
  data () {
    return {
      name: '',
      phone: '',
      address: '',
      city: '',
      radio: false,
      testPhone: /^0?1[3|4|5|7|8][0-9]\d{8}$/,
      address: "",
      consignee: "",
      phone: ""


    }
  },
  methods: {
    imgwarpclick () {
      this.$router.push({ path: '/shippingaddress' })
    },
    have (data) {
      // console.log(data)
      this.city = data;
      console.log(this.city);
    },
    yesbtn () {
      if (this.consignee == "") {
        this.$layer.msg("收货人不能为空！")
      } else if (this.consignee.length < 2) {
        this.$layer.msg("收货人昵称不得少于2位！")
      } else if (this.consignee.length > 10) {
        this.$layer.msg("收货人昵称不得大于10位！")
      } else if (this.phone == "") {
        this.$layer.msg("手机号不能为空！")
      } else if (this.phone.length != 11) {
        this.$layer.msg("请输入11位手机号")
      } else if (this.city == "") {
        this.$layer.msg("请选择地址")
      } else if (this.address == "") {
        this.$layer.msg("请输入详细地址")
      } else if (this.address.length > 50) {
        this.$layer.msg("详细地址不得超过五十字")
      } else {
        let addAddressObj = {
          addressarea: this.city,
          address: this.address,
          consignee: this.consignee,
          phone: this.phone
        }
        this.$server.addAddress(addAddressObj).then(data => {
          console.log(data)
          if (data.data.code == 0) {
            this.$router.push({ path: '/shippingaddress' })
          } else {
            this.$layer.msg(data.data.msg)
          }

        })
      }

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
.nameinput {
  width: 100%;
  height: 1.2rem;
  /* box-sizing: border-box; */
  border-bottom: 1px solid #f2f2f2;
  background: #fff;
}
.nameinputauto {
  width: 95%;
  margin: 0 auto;
}
.nameinputauto input {
  font-size: 0.4rem;
  width: 100%;
  height: 1.2rem;
  /* box-sizing: border-box; */
  border: none;
}
.yesbtn {
  width: 90%;
  margin: 0 auto;
  height: 1rem;
  background: #222222;
  line-height: 1rem;
  text-align: center;
  font-size: 0.4rem;
  color: #fff;
  border-radius: 5px;
  margin-top: 1rem;
}
</style>
