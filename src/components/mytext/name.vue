<template>
  <div class="hellowwarp">
    <div class="head">
      <div class="headauto">
        <div class="imgwarp" @click="imgwarpclick">
          <img src="../../assets/back@2x.png" alt>
          <span>返回</span>
        </div>
        <div class="headtext">昵称</div>
      </div>
    </div>
    <div class="name">
      <div class="nameauto">
        <input type="text" class="nameinput" v-model="modelname">
      </div>
    </div>
    <div class="yesbtn" @click="yesbtnclick">保存</div>
  </div>
</template>

<script>

export default {

  name: 'HelloWorld',
  data () {
    return {
      name: '',
      modelname: null,
    }
  },
  methods: {
    imgwarpclick () {
      this.$router.push({ path: '/profile' })
    },
    yesbtnclick () {
      if (this.modelname.length == 0) {
        this.$layer.msg('昵称不得为空')
      } else if (this.modelname.length < 2) {
        this.$layer.msg('昵称不得少于两位')
      } else if (this.modelname.length > 15) {
        this.$layer.msg('昵称不得超过15位')
      } else {

        let setUsernameObj = {
          username: this.modelname
        }
        this.$server.setUsername(setUsernameObj).then(data => {
          if (data.data.code == "0") {
            this.$router.push({ path: '/profile' })
          } else {
            this.$layer.msg(data.data.msg)
          }

        })





      }


    }
  },
  created () {
    this.modelname = sessionStorage.getItem("name")
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
.name {
  width: 100%;
  height: 1.2rem;
  background: #fff;
}
#phone {
  margin-top: 0.2rem;
  border-bottom: 1px solid #f2f2f2;
}
.nameauto {
  width: 95%;
  margin: 0 auto;
}
.nameinput {
  width: 100%;
  height: 1.2rem;
  border: none;
  font-size: 0.4rem;
  color: #222;
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
