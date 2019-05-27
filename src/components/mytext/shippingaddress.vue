<template>
  <div class="hellowwarp">
    <div class="zhezhao" v-if="zhezhao"></div>
    <div class="head">
      <div class="imgwarp" @click="imgwarpclick">
        <img src="../../assets/back@2x.png" alt>
        <span>返回</span>
      </div>
      <div class="headtext">收货地址</div>
      <div class="add" @click="addclick">新增</div>
    </div>

    <div class="concent">
      <!-- 默认地址 -->
      <div class="addtext" id="morenaddtext" v-for="item in defaultaddress">
        <div class="addtext_top">
          <div class="addtext_topleft" @click="addtext(item.addId)">
            <div class="addtexttop">
              <span class="name">{{item.consignee}}</span>
              <span class="nameid">{{item.phone}}</span>
            </div>
            <div class="shipping">{{item.addressarea}} {{item.address}}</div>
          </div>
          <div class="addtext_topright" @click="removerclick(item.addId)">
            <img src="../../assets/my_dz_icon_delete@2x.png" alt>
          </div>
        </div>
        <div class="moren">
          <div class="morenleft">默认</div>
          <div class="bianji" @click="compileclick(item.addId)">编辑</div>
        </div>
      </div>

      <!-- 设为默认地址 -->
      <div class="addtext" v-for="items in normal">
        <div class="addtext_top">
          <div class="addtext_topleft" @click="addtext(items.addId)">
            <div class="addtexttop">
              <span class="name">{{items.consignee}}</span>
              <span class="nameid">{{items.phone}}</span>
            </div>
            <div class="shipping">{{items.addressarea}} {{items.address}}</div>
          </div>
          <div class="addtext_topright" @click="removerclick1(items.addId)">
            <img src="../../assets/my_dz_icon_delete@2x.png" alt>
          </div>
        </div>
        <div class="moren">
          <div class="morenleft" @click="morenclick(items.addId)">设为默认地址</div>
          <div class="bianji" @click="compileclick(items.addId)">编辑</div>
        </div>
      </div>
    </div>

    <div v-show="nonedizhi" class="nonedizhi">
      <div>暂无地址哦O(∩_∩)O点击新增去添加吧</div>
    </div>

    <div class="noneclick" v-show="nonewarp">
      <div class="noneyesbtn">确认删除地址?</div>
      <div class="btnnnn">
        <div class="btnnnnleft" @click="yesremover">取消</div>
        <div class="btnnnnright" @click="noneremover">确认</div>
      </div>
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
import areaBtn from './area.vue'
export default {
  components: {
    areaBtn, areaBtn
  },
  name: 'HelloWorld',
  data () {
    return {
      loding: true,
      nonewarp: false,
      zhezhao: false,
      nonedizhi: false,
      name: '',
      phone: '',
      address: '',
      city: '',
      radio: false,
      testPhone: /^0?1[3|4|5|7|8][0-9]\d{8}$/,
      defaultaddress: [],
      normal: [],
      id: null,

    }
  },
  methods: {
    imgwarpclick () {

      if (localStorage.getItem("biaoji")) {
        this.$router.replace({ path: '/submitorder' })
      } else {
        this.$router.push({ path: '/mytext' })
      }

    },
    addclick () {          //新增地址 
      this.$router.push({ path: '/addmyshipping' })
    },
    compileclick (id) {          //编辑
      this.$router.push({ path: '/compile', query: { idd: id } })
    },
    init () {
      this.loding = true
      let addressListObj = {

      }
      this.$server.addressList(addressListObj).then(data => {
        this.loding = false
        console.log(data)
        this.defaultaddress = data.data.default         //默认地址
        this.normal = data.data.normal
        if (this.defaultaddress.length == 0 && this.normal.length == 0) {
          this.nonedizhi = true
        } else {
          this.nonedizhi = false
        }

      })
    },
    morenclick (id) {                //设为默认地址
      console.log(id)
      let setDefaultAddressObj = {
        addId: id
      }
      this.$server.setDefaultAddress(setDefaultAddressObj).then(data => {
        console.log(data)
        if (data.data.code == "0") {
          this.init()
        } else {
          this.$layer.msg(data.data.msg)
        }



      })
    },
    removerclick (id) {
      this.zhezhao = true
      this.nonewarp = true
      this.id = id

    },

    removerclick1 (id) {
      this.zhezhao = true
      this.nonewarp = true
      this.id = id


    },
    addtext (id) {
      if (localStorage.getItem("biaoji")) {
        sessionStorage.setItem("siteid", id)
        this.$router.push({ path: '/submitorder' })
      }
    },
    //取消关闭弹框
    yesremover () {
      this.zhezhao = false
      this.nonewarp = false
    },
    noneremover () {
      console.log(this.id)
      let removerObj = {
        addId: this.id
      }
      this.$server.remover(removerObj).then(data => {
        console.log(data)
        if (data.data.code == "0") {
          this.init()
          this.zhezhao = false
          this.nonewarp = false
          this.$layer.msg("删除成功！")
        } else {
          this.$layer.msg(data.data.msg)
        }
      })
    }
  },
  mounted () {
    this.init()
  },



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.hellowwarp {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #f2f2f2;
}
.head {
  width: 100%;
  height: 1.2rem;
  box-sizing: border-box;
  border-bottom: 1px solid #f2f2f2;
  color: #222;
  background: #fff;
  position: fixed;
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
  width: 5.8rem;
  float: left;
  font-size: 0.45rem;
  text-align: center;
  line-height: 1.2rem;
}
.add {
  width: 1rem;
  font-size: 0.4rem;
  float: right;
  line-height: 1.2rem;
  margin-right: 0.2rem;
}
.addtext {
  width: 100%;
  /* height: 2.586rem; */
  background: #fff;
  margin-bottom: 0.25rem;
}
#morenaddtext {
  margin-bottom: 0.25rem;
}
.addtext_top {
  width: 100%;
  /* height: 1.733rem; */
  box-sizing: border-box;
  border-bottom: 1px solid #f2f2f2;
  overflow: hidden;
  padding-bottom: 0.2rem;
}
.addtext_topleft {
  float: left;
  margin-left: 0.2rem;
  /* height: 1.5rem;; */
  width: 80%;
}
.addtext_topleft .name {
  font-size: 0.4rem;
  color: #222;
}
.addtext_topleft .nameid {
  font-size: 0.373rem;
  color: #888;
  margin-left: 0.1rem;
}
.shipping {
  margin-top: 0.1rem;
  font-size: 0.4rem;
  color: #222;
  width: 100%;
}
.addtext_topright {
  width: 0.7rem;
  height: 0.5rem;
  float: right;
  margin-right: 0.3rem;
  margin-top: 0.4rem;
}
.addtext_topright img {
  width: 0.4rem;
  height: 0.42rem;
  margin-left: 0.2rem;
}
.morenleft {
  float: left;
  margin-left: 0.2rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  background: #fff1dc;
  font-size: 0.4rem;
  text-align: center;
  line-height: 0.48rem;
  color: #f7a020;
  margin-top: 0.2rem;
}
.bianji {
  float: right;
  margin-right: 0.3rem;
  width: 0.96rem;
  height: 0.48rem;
  line-height: 0.48rem;
  text-align: center;
  font-size: 0.4rem;
  margin-top: 0.2rem;
  color: #888;
}
.addtankuang {
  width: 7.2rem;
  height: 7.4rem;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -4.08rem;
  margin-left: -3.6rem;
  background: #fff;
  border-radius: 5px;
}
.addtankuangauto {
  width: 90%;
  margin: 0 auto;
}
.noneimgwarp {
  width: 1rem;
  height: 0.5rem;
  position: absolute;
  right: 0;
  top: 0;
}
.noneimg {
  width: 0.4rem;
  height: 0.42rem;
  float: right;
}
.title {
  font-size: 0.426rem;
  color: #222222;
}
.titleimg {
  text-align: center;
  position: relative;
}
.nameinputwarp {
  width: 100%;
  height: 1.06rem;
  box-sizing: border-box;
  border: 1px solid #f2f2f2;
  border-radius: 5px;
  margin-top: 0.25rem;
}
.nameinput {
  width: 100%;
  height: 100%;
  border: none;
  font-size: 0.373rem;
  text-indent: 0.2rem;
}
.addbtn {
  width: 100%;
  height: 1.1rem;
  box-sizing: border-box;
  border-top: 1px solid #f2f2f2;
  margin-top: 0.4rem;
  text-align: center;
  line-height: 1.1rem;
  font-size: 0.4rem;
  color: #f7a020;
}
.leftSpan {
  float: left;
  font-size: 0.373rem;
  color: #ccc;
  line-height: 1.06rem;
  text-indent: 0.2rem;
}
.nonedizhi {
  width: 100%;
  height: 100%;
  background: #fff;
  position: fixed;
  top: 1.2rem;
  left: 0;
  z-index: 5;
}
.nonedizhi div {
  font-size: 0.373rem;
  text-align: center;
  margin-top: 2rem;
}
.addtexttop {
  margin-top: 0.3rem;
}
.moren {
  overflow: hidden;
  background: #fff;
  padding-bottom: 0.2rem;
}
.noneclick {
  width: 7.24rem;
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -3.62rem;
  margin-top: -1.5rem;
  z-index: 999;
  border-radius: 10px;
}
.noneyesbtn {
  text-align: center;
  font-size: 0.4rem;
  color: #333333;
  margin-top: 0.7rem;
  font-weight: bold;
}
.btnnnn {
  width: 100%;
  height: 1rem;
  border-top: 1px solid #f2f2f2;
  margin-top: 0.7rem;
}
.btnnnn div {
  width: 50%;
  line-height: 1rem;
  float: left;
  height: 1rem;
  text-align: center;
  font-size: 0.4rem;
  color: #f7a01f;
}
.btnnnnleft {
  width: 50%;
  border-right: 1px solid #f2f2f2;
  box-sizing: border-box;
}
.zhezhao {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 888;
}
.concent {
  padding-top: 1.2rem;
}
</style>
