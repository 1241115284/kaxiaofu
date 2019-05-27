<template>
  <div class="hellowwarp">
    <div class="zhegai" v-show="zhegai"></div>
    <div class="head">
      <div class="headauto">
        <div class="imgwarp" @click="imgwarpclick">
          <img src="../../assets/back@2x.png" alt>
          <span>返回</span>
        </div>
        <div class="headtext">意见反馈</div>
      </div>
    </div>
    <div class="type">
      <div class="typeauto">
        <div class="typeautotitle">反馈问题类型</div>
        <ul class="typeul">
          <li
            v-for="(item,index) in typeList"
            :class="{ activecolor:index==current}"
            @click="typeclick(index,item.key)"
          >{{item.text}}</li>
        </ul>
      </div>
    </div>

    <div class="text">
      <div class="texttextarea">
        <textarea
          @blur="animateWidth"
          placeholder="选择问题类型,帮助我们更好处理您的反馈"
          v-model="items.text"
          ref="count"
        ></textarea>
        <div class="number">{{number}}/500</div>
      </div>
    </div>

    <div class="phone">
      <div class="phoneauto">
        <div class="phoneleft">手机号：</div>
        <div class="inputwarp">
          <input type="tel" @blur="phone" v-model="phonetext">
        </div>
      </div>
    </div>

    <div class="btn" v-show="btn" @click="submitclick">提交</div>
    <div class="btns" v-show="btnnone">提交</div>

    <div class="nonetankuang" v-show="nonetankuang">
      <h2>您反馈的内容未提交，确认离开吗？</h2>
      <div class="nonetankuangbtn">
        <div class="nonetankuangbtnleft" @click="noneclick">取消</div>
        <div class="nonetankuangbtnright" @click="yesclick">确认</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  name: 'HelloWorld',
  data () {
    return {
      items: {
        text: '',
      },
      object: {
        a: false
      },
      number: '0',
      count: "",
      typeList: [
        {
          text: "功能异常",
          key: "0"
        },
        {
          text: "体验问题",
          key: "1"
        },
        {
          text: "新功能建议",
          key: "2"
        },
        {
          text: "其他",
          key: "3"
        },

      ],
      current: null,
      phonetext: "",
      btn: false,
      btnnone: true,
      typekes: null,
      nonetankuang: false,
      zhegai: false,
    }
  },

  computed: {

    address () {
      const { current, phonetext, items: { text } } = this
      return {
        current,
        phonetext,
        items: { text }
      }
    }
  },
  watch: {   //watch()监听某个值（双向绑定）的变化，从而达到change事件监听的效果
    items: {
      handler: function () {
        var _this = this;
        var _sum = 500; //字体限制为100个
        _this.$refs.count.setAttribute("maxlength", _sum);
        _this.number = _this.$refs.count.value.length
      },
      deep: true
    },

    address: {
      handler: function (val) {
        if (val.items.text.length != 0 && val.current != null & val.phonetext.length == 11) {
          this.btn = true
          this.btnnone = false
        } else {
          this.btn = false
          this.btnnone = true
        }
      },
      deep: true
    }

  },
  methods: {
    imgwarpclick () {
      this.zhegai = true
      this.nonetankuang = true
    },
    yesclick () {
      this.$router.push({ path: '/mytext' })
    },

    noneclick () {
      this.zhegai = false
      this.nonetankuang = false
    },
    typeclick (index, key) {
      this.current = index;
      this.typekes = key

    },

    animateWidth () {
      document.body.scrollTop = 0;
    },
    phone () {
      document.body.scrollTop = 0;
    },
    submitclick () {
      let addOpinionObj = {
        opitype: this.typekes,
        content: this.items.text,
        phone: this.phonetext
      }
      this.$server.addOpinion(addOpinionObj).then(data => {
        console.log(data.data.code)
        var that = this
        if (data.data.code == "0000") {
          that.$layer.msg(data.data.msg)
          setTimeout(function () {
            that.$router.push({ path: '/mytext' })
          }, 1000)
        } else {
          this.$layer.msg(data.data.msg)
        }

      })
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
.type {
  width: 100%;
  background: #fff;
  padding-bottom: 0.5rem;
}
.typeauto {
  width: 95%;
  margin: 0 auto;
  overflow: hidden;
}
.typeautotitle {
  font-size: 0.4rem;
  margin-top: 0.5rem;
}
.typeul li {
  float: left;
  font-size: 0.4rem;
  line-height: 0.7rem;
  border: 1px solid #d3d3d3;
  padding: 0 0.2rem;
  margin-right: 0.3rem;
  box-sizing: border-box;
  margin-top: 0.4rem;
}
li:last-child {
  margin-right: 0;
}
.typeul .activecolor {
  border: 1px solid #fa9e1f;
  color: #fa9e1f;
}
.text {
  width: 100%;
  height: 5.33rem;
  background: #fff;
  padding-bottom: 0.5rem;
}
.texttextarea {
  width: 95%;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  border: 1px solid #d3d3d3;
  position: relative;
}
.texttextarea textarea {
  width: 90%;
  height: 80%;
  border: none;
  border-radius: 0;
  font-size: 0.38rem;
  position: absolute;
  left: 5%;
  top: 5%;
}
input,
button,
select,
textarea {
  outline: none;
}
textarea {
  resize: none;
  -webkit-appearance: none;
}
.number {
  position: absolute;
  bottom: 5%;
  right: 5%;
  font-size: 0.38rem;
  color: #bebebe;
}
.phone {
  width: 100%;
  height: 1.3rem;
  background: #fff;
  margin-top: 0.3rem;
}
.phoneauto {
  width: 95%;
  margin: 0 auto;
  font-size: 0.4rem;
}
.phoneleft {
  float: left;
  line-height: 1.3rem;
}
.inputwarp {
  width: 80%;
  float: left;
}
.inputwarp input {
  width: 100%;
  height: 1.3rem;
  box-sizing: border-box;
  font-size: 0.4rem;
  border: none;
}
.btn {
  width: 95%;
  height: 1.06rem;
  background: #222222;
  margin: 0 auto;
  margin-top: 2rem;
  border-radius: 5px;
  color: #fff;
  text-align: center;
  line-height: 1.06rem;
  font-size: 0.45rem;
}
.btns {
  width: 95%;
  height: 1.06rem;
  background: #ccc;
  margin: 0 auto;
  margin-top: 2rem;
  border-radius: 5px;
  color: #fff;
  text-align: center;
  line-height: 1.06rem;
  font-size: 0.45rem;
}
.nonetankuang {
  width: 7.2rem;
  height: 3.15rem;
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -1.55rem;
  margin-left: -3.6rem;
  z-index: 20;
  border-radius: 5px;
}
.nonetankuang h1 {
  text-align: center;
  font-size: 0.41rem;
  color: #222;
  margin-top: 0.3rem;
}
.nonetankuang h2 {
  width: 90%;
  margin: 0 auto;
  font-size: 0.373rem;
  color: #333;
  line-height: 2rem;
}
.nonetankuangbtn {
  width: 100%;
  height: 1.1rem;
  border-top: 1px solid #f2f2f2;

  box-sizing: border-box;
}
.nonetankuangbtn div {
  width: 50%;
  font-size: 0.373rem;
  text-align: center;
  line-height: 1.1rem;
  float: left;
}
.nonetankuangbtnleft {
  border-right: 1px solid #f2f2f2;
  box-sizing: border-box;
  color: #f7a020;
}
.nonetankuangbtnright {
  color: #f7a020;
}
.zhegai {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}
</style>
