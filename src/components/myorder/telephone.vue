<template>
  <div class="hellowwarp">
    <div class="head">
      <div class="headauto">
        <div class="imgwarp" @click="imgwarpclick">
          <img src="../../assets/back@2x.png" alt>
        </div>
        <div class="headtext">确认订单</div>
      </div>
    </div>
    <div class="phone">
      <div class="phoneauto">
        <input type="text" placeholder="请输入手机号">
      </div>
    </div>
    <div class="huafeiwarp">
      <div class="huafeiwarptitle">
        <div class="huafeiwarptitleauto">消费金额</div>
        <div class="huafeiwarpconcent">
          <ul>
            <li
              v-for="(item,index) in List"
              :class="{active:index==current}"
              @click="xuanzeclick(index,item.msg)"
            >
              <div class="yuanwarp">
                <div>{{item.msg}}</div>
                <div>M</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottomauto">
        <div class="bottomautoleft">合计￥{{twojiaqian}}</div>
        <div class="bottomautoright" @click="bottomautorightclick">提交订单</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  name: 'HelloWorld',
  data () {
    return {
      twojiaqian: null,
      jiaqian: 30,
      current: 0,
      name: '',
      show: true,
      count: "",
      List: [
        {
          msg: 30,
          key: "0"
        },
        {
          msg: 50,
          key: "1"
        },
        {
          msg: 100,
          key: "2"
        },
        {
          msg: 200,
          key: "3"
        },
        {
          msg: 300,
          key: "4"
        },
        {
          msg: 500,
          key: "5"
        },
      ]
    }
  },
  methods: {
    imgwarpclick () {
      this.$router.push({ path: '/particulars' })
    },
    xuanzeclick (index, msg) {
      this.current = index
      console.log(msg)
      this.twojiaqian = msg.toFixed(2)
    },
    bottomautorightclick () {
      this.$layer.msg(this.twojiaqian)
    }
  },
  mounted () {
    this.twojiaqian = this.jiaqian.toFixed(2)
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
.phone {
  width: 100%;
  height: 1.1rem;
  background: #fff;
}
.phoneauto {
  width: 95%;
  margin: 0 auto;
  overflow: hidden;
}
.phoneauto input {
  width: 100%;
  height: 1.1rem;
  border: none;
  font-size: 0.373rem;
}
.huafeiwarp {
  width: 100%;
  height: 5rem;
  background: #fff;
}
.huafeiwarptitle {
  width: 100%;
  height: 0.9rem;
  border: 1px solid #f2f2f2;
  box-sizing: border-box;
  line-height: 0.9rem;
  font-size: 0.373rem;
}
.huafeiwarptitleauto {
  width: 95%;
  margin: 0 auto;
  color: #666;
}
.huafeiwarpconcent {
  width: 100%;
}
.huafeiwarpconcent ul li {
  float: left;
  width: 2.93rem;
  height: 1.44rem;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  line-height: 1.44rem;
  margin-left: 0.26rem;
  margin-top: 0.35rem;
  color: #3d3d3d;
}
.yuanwarp {
  margin: 0 auto;

  width: 100%;
  height: 100%;
  margin-left: 1rem;
}
.yuanwarp div {
  float: left;
}
.huafeiwarpconcent ul .active {
  background: #222;
  color: #fff;
}

.bottomauto {
  width: 95%;
  margin: 0 auto;
  line-height: 1.6rem;
  font-size: 0.373rem;
}
.bottomautoleft {
  float: left;
  color: #222;
}
.bottomautoright {
  float: right;
  font-size: 0.373rem;
  background: #222;
  width: 3rem;
  text-align: center;
  color: #fff;
  line-height: 1.6rem;
}
.bottom {
  width: 100%;
  height: 1.6rem;
  background: #fff;
  line-height: 1.6rem;
  text-align: center;
  font-size: 0.4rem;
  color: #fff;

  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
