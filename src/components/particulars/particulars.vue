<template>
  <div class="hello" :class="sorll">
    <transition name="fade">
      <div class="zhegai" v-if="zhegai" @click="zhegaiclick"></div>
    </transition>

    <div class="head">
      <div class="headtop">
        <div class="headtopleft" @click="fanhuiimgwarpclick">
          <div class="fanhuiimgwarp">
            <img src="../../assets/my_icon_f@2x.png" alt>
          </div>
          <div class="go_1">返回</div>
        </div>
      </div>

      <div class="scroll" v-if="imgList.length>1">
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide v-for="(swiperitem,index) in imgList" :key="index">
            <img :src="swiperitem" alt>
            <!-- <img src="../../assets/shangpin.png" > -->
          </swiper-slide>

          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
          <!-- <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
          <div class="swiper-button-next swiper-button-black" slot="button-next"></div>-->
          <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
        </swiper>
      </div>

      <div class="imgwarp" v-if="imgList.length==1" v-for="itemsimg in imgList">
        <img :src="itemsimg" alt>
      </div>
    </div>
    <div class="concent">
      <div class="textconcent">
        <div class="jiaqian" style="color:#FF1515">
          ￥
          <span style="font-size:0.45rem">{{danjiamoneyleft}}.</span>
          <span style="font-size:0.4rem">{{danjiamoneyright}}</span>
        </div>
        <div class="chanpintext">{{chanpintext}}{{description}}</div>
      </div>
      <div class="solid"></div>

      <!-- 规格 -->
      <div class="xuanzewarp" @click="xuanzeclick">
        <div class="xuanze">
          <span>{{guige}}</span>
          <span v-show="yanseshow" class="specification">{{ yanse }}</span>
          <span>{{message}}</span>
          <!-- <span>{{shangpinnumber}}件</span> -->
        </div>
        <img src="../../assets/sy_xq_icon_h@2x.png" alt class="xuanzeshangpin">
      </div>

      <!-- 服务 -->
      <div class="xuanzewarp" @click="serviceclick">
        <div class="xuanze">
          <span>服务：</span>
          <span class="specification" v-for="(itemservice,index) in service">
            <span>{{itemservice.serverName}}</span>
            <span v-if="index+1<service.length">·</span>
          </span>
        </div>
        <img src="../../assets/sy_xq_icon_h@2x.png" alt class="xuanzeshangpin">
      </div>

      <div class="solidfenli">
        <div class="wxwarp">
          <div class="siblingslogo">
            <div class="siblingslogoleft"></div>
            <div class="siblingslogotext">详情</div>
            <div class="siblingslogoright"></div>
          </div>
        </div>
      </div>

      <div class="promise">
        <div v-html="Attachedhtml" class="promiseauto"></div>
      </div>
      <div class="jiesuanbtn" @click="jiageclick" v-show="jiage">
        <div class="jiesuanbtnauto">立即购买</div>
      </div>

      <div class="jiesuanbtn" @click="jiesuanbtnclick" v-show="jiesuanbtn">
        <div class="jiesuanbtnauto">立即购买</div>
      </div>
      <div class="jiesuanbtnwarp" v-show="jiesuanbtnwarp"></div>
    </div>
    <div class="tankuangwarp">
      <div class="tankuang" :class="taxon">
        <div class="tankuangtitle">
          <div class="tankuangtitle_top">
            <div class="tankuangtitle_topimgwarp">
              <img :src="iconimg" alt class="tankuangtitle_topimg">
              <!-- <img src="../../assets/shangpin.png" class="tankuangtitle_topimg" > -->
            </div>
            <div class="tankuangtitle_toptext">
              <div class="tankuangtitle_toptextone">
                ￥
                <span>{{tankuangprice}}</span>
              </div>
              <div class="tankuangtitle_toptexttwo">
                商品编号：
                <span>{{biannumber}}</span>
              </div>
            </div>
            <div class="nonetankuangwarp" @click="nonetankuangwarpclick">
              <img src="../../assets/sy_tc_icon_gb@2x.png" alt class="nonetankuang">
            </div>
          </div>
        </div>

        <div class="container" @touchmove="touchmove">
          <textarea id="values" style="width:600px;height:100px" v-show="hahaha"></textarea>
          <div>
            <div v-show="falsefalse">
              <label>
                默认选中 :
                <input type="text" name="skuId" id="skuId" v-bind:value="skuId">
              </label>
              <button @click="getTextareaData" class="top-but">重新加载数据</button>
              当前属性ID：{{ skuId }}
            </div>

            <div class="specificationwarp">
              <dl
                v-for="(item, key) in list.result"
                class="content"
                v-bind:class="{hl: highKeys[key]}"
                :key="key"
              >
                <div class="geigekey">{{key}}</div>
                <dd>
                  <button
                    class="item"
                    v-for="value in item"
                    @click="handleActive(key, value)"
                    v-bind:class="{active: value.active, disabled: !value.active && value.disabled}"
                  >{{ value.name }}</button>
                </dd>
              </dl>
            </div>
          </div>
          <!-- <button @click="submit">提交</button> -->
        </div>

        <div class="numberxuanze">
          <div class="numberxuanzesolid">
            <div class="numberxuanzeleft">数量</div>
            <div class="numberxuanzeright">
              <div class="jian" @click="removeclick">-</div>
              <!-- <div class="numbergeshu">{{number}}</div> -->
              <input type="number" class="numbergeshu" v-model="number" @blur.prevent="changeCount">
              <div class="zengjia" @click="addclick">+</div>
            </div>
          </div>
        </div>
        <div class="tankuangbtn" @click="submit">确认</div>
        <!-- <div class="tankuangbtns" v-show="tankuangbtns"></div> -->
      </div>

      <div class="servicewarp" :class="serviceclass">
        <h1>服务说明</h1>
        <div class="servelistwarp">
          <div class="servelist" v-for="serviceitem in service">
            <img :src="serviceitem.iconurl" alt>

            <div class="servelistright">
              <div class="servelisttext">{{serviceitem.serverName}}</div>
              <div class="servelisttext" id="textfontlittle">{{serviceitem.serverDesc}}</div>
            </div>
          </div>
        </div>
        <div class="wanchengbtn" @click="zhegaiclick">完成</div>
      </div>
    </div>

    <div class="loding" v-if="loding">
      <img
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542711101022&di=3b47c50ded423ff4ce29856c279708d3&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a65c57108eab6ac725134372f367.gif"
        alt
      >
    </div>
    <div class="thedefaultpage" v-show="thedefaultpage">
      <div class="thedefaultpagetop" @click="fanhuiimgwarpclick">
        <img src="../../assets/back@2x.png" alt>
      </div>

      <div class="thedefaultpagetext">
        <img src="../../assets/111@2x.png" alt>
        <div>产品已下架,请挑选其他商品O(∩_∩)O</div>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
// import Swiper from "swiper";
// import "swiper/dist/css/swiper.min.css";
export default {
  components: {
    swiper,
    swiperSlide
  },
  name: 'HelloWorld',
  data () {
    return {
      sorll: "aa",
      thedefaultpage: false,
      taxon: null,
      serviceclass: null,
      tankuangbtns: false,
      jiesuanbtnwarp: false,
      falsefalse: false,
      hahaha: false,
      yanseshow: true,
      guige: "规格：",
      data: [
        { "颜色": "红", "尺码": "大", "型号": "A", "skuId": "3158055" },
        { "颜色": "白", "尺码": "大", "型号": "A", "skuId": "3158054" },
        { "颜色": "白", "尺码": "中", "型号": "B", "skuId": "3133859" },
        { "颜色": "蓝", "尺码": "小", "型号": "C", "skuId": "3516833" }
      ],
      skuId: '',
      skuName: 'skuId',
      // 属性名称信息
      keys: [],
      // 数据集合{list.result list.items}
      list: {},
      // 分隔符
      spliter: '\u2299',
      result: {},
      message: '',
      highKeys: {},
      canSubmit: false,
      selectList: [],
      yanse: "",
      daxiao: "型号",
      message: '',
      orderprice: null,
      productType: null,
      productName: null,
      specid: null,
      tankuangprice: null,
      loding: true,
      biannumber: null,
      iconimg: null,
      Attachedhtml: null,
      attribute0: null,
      attribute1: null,
      attribute2: null,
      attribute3: null,
      attribute4: null,
      goodsId: null,
      danjiamoneyleft: null,
      danjiamoneyright: null,
      chanpintext: null,
      query: {},
      currenttwo: null,
      currentthree: null,
      jiage: null,
      jiesuanbtn: false,
      ifwarp: null,
      aa: "",
      danjiamoney: null,
      money: null,
      shangpinnumber: 1,
      xuanzetext: "",
      shangpinconcent: "",
      zhegai: false,
      tankuang: false,
      number: 1,
      imgwarp: false,
      current: null,
      currentfor: null,
      currentfive: null,
      pushLst: [],
      newpushLst: [],
      colorList: {},
      idList: [1, 2, 3, 4, 5],
      newList: [1, 3, 5, 6, 8, 9, 10],
      imgList: [],
      description: "",
      service: [
        "七天退换",
        "货到付款",
        "七天退换",
        "货到付款",
        "正品保证"
      ],
      swiperOption: {
        //循环
        loop: true,
        autoplay: {
          delay: 3000,//自动轮播1秒一次
          disableOnInteraction: false,   //触摸后自动切换  true：停止 false:开始
        },
        //设定初始化时slide的索引
        // initialSlide:0,
        //自动播放
        // autoplay:true,
        // autoplay: {
        //     delay: 500,
        //     stopOnLastSlide: true,
        //     disableOnInteraction: false,
        // },

        //分页器设置         
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        observer: true,
        observeParents: true
      },
    }

  },

  methods: {
    touchmove () {

    },
    init () {

      let getProductDetailsObj = {
        goodsId: this.goodsId
      }
      this.$server.getProductDetails(getProductDetailsObj).then(data => {

        console.log('........................', data)

        if (data.data.code == "0000") {
          this.loding = false

          this.chanpintext = data.data.goodsName    //商品描述
          this.description = data.data.description
          this.colorList = data.data.attribute
          let listt = data.data.attribute
          console.log(this.colorList)
          this.iconimg = data.data.picturePath.slice(0, 1)
          this.biannumber = data.data.goodsId
          this.imgList = data.data.picturePath
          this.Attachedhtml = data.data.descInfo
          this.danjiamoney = data.data.presentPrice.toFixed(2)   //商品单价
          this.danjiamoneyleft = this.danjiamoney.split(".")[0]
          this.danjiamoneyright = this.danjiamoney.split(".")[1]
          this.tankuangprice = data.data.presentPrice.toFixed(2)  //规格价格
          this.productName = data.data.goodsName
          this.productType = data.data.type
          this.yanse = data.data.attribute.msg
          this.dataLength = data.data.attribute.dataLength
          this.data = data.data.attribute.skuData
          this.getTextareaData()
          this.service = data.data.productService
          //    this.query = Object.keys(this.colorList).reduce((prev, next) => {
          //     	prev[next] = ''
          //   	return prev
          //  }, {})
        } else if (data.data.code == "2001") {
          this.thedefaultpage = true
          var that = this
          setTimeout(function () {
            //  that.$router.push({path: '/',})
          }, 2000)

        }
        else {
          this.$layer.msg(data.data.msg)
        }


      })


    },



    fanhuiimgwarpclick () {
      if (sessionStorage.getItem('skiprouter')) {
        this.$router.push({ path: sessionStorage.getItem('skiprouter') })
      } else {
        this.$router.push({ path: "/" })
      }

    },
    addclick () {
      this.number++
    },
    removeclick () {
      if (this.number <= 1) {
        return
      }
      this.number--
    },
    changeCount () {
      if (this.number < 1) {
        this.number = 1
      }
      document.body.scrollTop = 0;
    },
    xuanzeclick () {              //选择商品类型
      this.tankuang = true
      this.taxon = "trueactive"
      this.zhegai = true
      this.sorll = "sorll"
    },
    serviceclick () {        // 服务类型
      this.zhegai = true
      this.sorll = "sorll"
      this.serviceclass = "trueactive"
    },
    zhegaiclick () {
      this.taxon = "activefalse"
      this.zhegai = false
      this.sorll = "aa"
      this.serviceclass = "activefalse"
    },


    nonetankuangwarpclick () {       //关闭弹框选择规格
      this.shangpinconcent = this.xuanzetext
      this.shangpinnumber = this.number
      this.tankuang = false
      this.zhegai = false
      this.taxon = "activefalse"
      this.sorll = "aa"
      //  this.move()

    },
    jiageclick () {             //选择规格btn
      this.tankuang = true
      this.zhegai = true
      this.taxon = "trueactive"
      this.sorll = "sorll"
      // this.stop() 
    },
    // 立即购买
    jiesuanbtnclick () {
      //  this.loding=true
      var sendDate = (new Date()).getTime();
      this.$store.commit("loding", true)
      this.jiesuanbtnwarp = true
      this.orderprice = this.number * this.tankuangprice            //结算
      let basketObj = {
        specid: this.specid,
        productid: this.goodsId,
        productName: this.productName,
        productType: this.productType,
        num: this.number,
        price: this.tankuangprice,
        orderprice: this.orderprice
      }
      this.$server.basket(basketObj).then(data => {
        var receiveDate = (new Date()).getTime();
        var responseTimeMs = receiveDate - sendDate;
        console.log(responseTimeMs)
        var that = this
        if (responseTimeMs < 300) {
          setTimeout(function () {
            that.$store.commit("loding", false)
            that.loding = false
          }, 300)
        } else {
          this.$store.commit("loding", false)
          that.loding = false
        }


        this.jiesuanbtnwarp = false
        console.log(data)
        if (data.data.code == "0000") {
          this.$router.replace({ path: '/submitorder' })
          localStorage.setItem("specid", this.specid)
          localStorage.setItem("basketid", data.data.result.basketid)
        } else {
          this.$layer.msg(data.data.msg)
        }

      })

    },




    //demo

    powerset (arr) {
      let ps = [[]]
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0, len = ps.length; j < len; j++) {
          ps.push(ps[j].concat(arr[i]))
        }
      }

      return ps
    },

    /**
     * 初始化数据
     * @return
     */
    initData () {
      this.result = {}
      this.keys = this.getAllKeys()
      for (let i = 0; i < this.keys.length; i++) {
        this.highKeys[this.keys[i]] = false
      }

      this.list = this.combineAttr(this.data, this.keys)
      console.log(this.list)
      this.initSeleted(this.skuId)
      this.buildResult(this.list.items)
      this.updateStatus(this.getSelectedItem())
      this.showResult()
    },

    /**
     * 获取输入表单中的数据进行初始化
     * @return
     */
    getTextareaData () {                                //初始化规格
      let data = document.getElementById('values').value
      let skuId = document.getElementById('skuId').value
      //  console.log(this.data)
      try {
        // this.data = JSON.parse(data)
        // let isHas = false
        // for (let i = 0; i < this.data.length; i++) {
        //   if (skuId === this.data[i][this.skuName]) {
        //     isHas = true
        //     break
        //   }
        // }
        // // 默认的skuId不再数组里，就拿第一个skuId当做默认选择
        // this.skuId = isHas ? skuId : this.data[0][this.skuName]
        this.initData()
      } catch (e) {
        this.data = []
      }
    },

    /**
     * 正常属性点击
     */
    handleNormalClick (key, value) {
      for (let i in this.list.result[key]) {
        if (i !== value.name) {
          this.list.result[key][i].active = false
        } else {
          this.list.result[key][i].active = !value.active
        }
      }
    },

    /**
     * 无效属性点击
     */
    handleDisableClick (key, value) {
      this.list.result[key][value.name]['disabled'] = false
      // 清空高亮行的已选属性状态（因为更新的时候默认会跳过已选状态）
      for (let i in this.list.result) {
        if (i !== key) {
          for (let x in this.list.result[i]) {
            this.list.result[i][x].active = false
          }
        }
      }

      this.updateStatus(this.getSelectedItem())
    },

    /**
     * 高亮行
     */
    highAttributes: function () {
      for (let key in this.list.result) {
        this.highKeys[key] = true
        for (let attr in this.list.result[key]) {
          if (this.list.result[key][attr].active === true) {
            this.highKeys[key] = false
            break
          }
        }
      }
    },

    /**
     * 点击事件处理
     * @param  key   点击的行
     * @param  value 点击的按钮的数据
     */
    handleActive: function (key, value) {
      console.log(value)
      // if (value.active === true) {
      //   return false
      // }

      this.handleNormalClick(key, value)
      if (value.disabled === true) {
        this.handleDisableClick(key, value)
      }

      this.updateStatus(this.getSelectedItem())
      this.highAttributes()
      this.showResult()
    },

    /**
     * 计算属性
     * @param  {[type]} data [description]
     * @param  {[type]} keys [description]
     * @return {[type]}      [description]
     */
    combineAttr (data, keys) {
      let allKeys = [],
        result = {}

      for (let i = 0; i < data.length; i++) {
        let item = data[i],
          values = []

        for (let j = 0; j < keys.length; j++) {
          let key = keys[j]
          if (!result[key]) {
            result[key] = {}
          }

          if (!result[key][item[key]]) {
            result[key][item[key]] = { 'name': item[key], 'active': false, 'disabled': true }
          }

          values.push(item[key])
        }

        allKeys.push({
          path: values.join(this.spliter),
          sku: item['skuId']
        })
      }

      return {
        result: result,
        items: allKeys
      }
    },

    /**
     * 获取所有属性
     * @return {[type]} [description]
     */
    getAllKeys () {
      let arrKeys = []
      for (let attribute in this.data[0]) {
        if (!this.data[0].hasOwnProperty(attribute)) {
          continue
        }

        if (attribute !== this.skuName) {
          arrKeys.push(attribute)
        }
      }
      return arrKeys
    },

    getAttruites (arr) {
      let result = []
      for (let i = 0; i < arr.length; i++) {
        result.push(arr[i].path)
      }

      return result
    },

    /**
     * 生成所有子集是否可选、库存状态 map
     */
    buildResult (items) {
      let allKeys = this.getAttruites(items)

      for (let i = 0; i < allKeys.length; i++) {
        let curr = allKeys[i]
        let sku = items[i].sku
        let values = curr.split(this.spliter)
        let allSets = this.powerset(values)

        // 每个组合的子集
        for (let j = 0; j < allSets.length; j++) {
          let set = allSets[j],
            key = set.join(this.spliter)
          if (this.result[key]) {
            this.result[key].skus.push(sku)
          } else {
            this.result[key] = {
              skus: [sku]
            }
          }
        }
      }
    },

    /**
     * 获取选中的信息
     * @return Array
     */
    getSelectedItem () {
      let result = []
      for (let attr in this.list.result) {
        let attributeName = ''
        for (let attribute in this.list.result[attr]) {
          if (this.list.result[attr][attribute].active === true) {
            attributeName = attribute
          }
        }

        result.push(attributeName)
      }

      return result
    },

    /**
     * 更新所有属性状态
     */
    updateStatus (selected) {
      for (let i = 0; i < this.keys.length; i++) {
        let key = this.keys[i],
          data = this.list.result[key],
          hasActive = !!selected[i],
          copy = selected.slice()

        for (let j in data) {
          let item = data[j]['name']
          if (selected[i] === item) {
            continue
          }

          copy[i] = item
          const curr = this.trimSpliter(copy.join(this.spliter), this.spliter)
          this.list.result[key][j]['disabled'] = this.result[curr] ? false : true
        }
      }
    },

    trimSpliter (str, spliter) {
      // ⊙abc⊙ => abc
      // ⊙a⊙⊙b⊙c⊙ => a⊙b⊙c
      let reLeft = new RegExp('^' + spliter + '+', 'g'),
        reRight = new RegExp(spliter + '+$', 'g'),
        reSpliter = new RegExp(spliter + '+', 'g')
      return str.replace(reLeft, '')
        .replace(reRight, '')
        .replace(reSpliter, spliter)
    },

    /**
     * 初始化选中
     * @param  mixed|Int|String skuId 需要选中的skuId
     * @return {[type]}       [description]
     */
    initSeleted (skuId) {
      for (let i in this.data) {
        if (this.data[i][this.skuName] === skuId) {
          for (let x in this.data[i]) {
            if (x !== this.skuName) {
              this.list.result[x][this.data[i][x]].active = true
            }
          }
          break
        }
      }
    },

    /**
     * 显示选中的信息
     * @return
     */
    showResult () {
      this.canSubmit = false
      let result = this.getSelectedItem(),
        s = []
      this.selectList = []
      for (let i = 0; i < result.length; i++) {
        let item = result[i]
        if (!!item) {
          s.push(item)
          this.selectList.push(this.keys[i])
        }
      }
      console.log(this.selectList)
      if (this.selectList.length > 0) {
        this.guige = "已选："
        this.yanseshow = false
      } else {
        this.guige = "规格："
        this.yanseshow = true
      }
      if (s.length === result.length) {
        this.canSubmit = true
      }
      if (s.length === this.keys.length) {
        let curr = this.result[s.join(this.spliter)]
        if (curr) {
          s = s.concat(curr.skus)
          this.skuId = curr.skus[0]
        }
      }
      this.message = s.filter((item, index) => {
        return this.selectList[index]
        // }).map((item, index) => {
        //   return `${this.selectList[index]}:${item}`
      }).join(' / ')

      // console.log(this.dataLength)
      // console.log(s)
      // 改变价格
      if (s.length == this.dataLength) {
        this.$store.commit("loding", true)
        var sendDate = (new Date()).getTime();
        // this.$layer.msg(s.pop())
        let queryProductPriceObj = {
          goodsId: this.biannumber,
          skuId: s.pop()
        }
        this.$server.queryProductPrice(queryProductPriceObj).then(data => {
          var receiveDate = (new Date()).getTime();
          var responseTimeMs = receiveDate - sendDate;
          var that = this
          if (responseTimeMs < 300) {
            setTimeout(function () {
              that.$store.commit("loding", false)

            }, 300)
          } else {
            this.$store.commit("loding", false)
          }

          console.log(data)

          if (data.data.code == "0000") {
            this.jiage = false
            this.jiesuanbtn = true
            this.tankuangprice = data.data.price.toFixed(2)
            this.specid = data.data.specid
            this.iconimg = data.data.pictureUrl
            //  console.log(this.iconimg)
          } else {
            this.$layer.msg(data.data.msg)
          }

        })

      }
      // console.log(s.pop())
    },
    //确定按钮
    submit () {
      console.log(this.jiage)

      let newArr = []
      this.keys.forEach(key => {
        if (this.selectList.indexOf(key) < 0) {
          newArr.push(key)
        }
      })
      if (this.selectList.length !== this.keys.length) {
        this.$layer.msg('请选择' + newArr.join('-'))
      } else if (this.jiage != false) {
        this.$layer.msg('请选择规格')
      }
      else {
        //  this.loding=true
        var sendDate = (new Date()).getTime();
        this.$store.commit("loding", true)
        this.tankuangbtns = true
        this.orderprice = this.number * this.tankuangprice
        let basketObj = {
          specid: this.specid,
          productid: this.goodsId,
          productName: this.productName,
          productType: this.productType,
          num: this.number,
          price: this.tankuangprice,
          orderprice: this.orderprice
        }
        this.$server.basket(basketObj).then(data => {

          var receiveDate = (new Date()).getTime();
          var responseTimeMs = receiveDate - sendDate;
          var that = this
          if (responseTimeMs < 300) {
            console.log("...........................")
            setTimeout(function () {
              that.$store.commit("loding", false)

            }, 300)
          } else {
            this.$store.commit("loding", false)

          }

          this.tankuangbtns = false
          console.log(data)
          if (data.data.code == "0000") {
            this.$router.replace({ path: '/submitorder' })
            localStorage.setItem("specid", this.specid)
            localStorage.setItem("basketid", data.data.result.basketid)
            localStorage.setItem("submmid", data.data.result.mid)
          } else {
            this.$layer.msg(data.data.msg)
          }

        })
      }
    },
    // 同级推广次数接口
    identifying () {
      let extensionObj = {
        extension: "particulars"
      }
      this.$server.extension(extensionObj).then(data => {

      })
    }

  },


  created () {
    console.log(111)
    if (this.$route.query.goodsId) {
      sessionStorage.setItem("goodsId", this.$route.query.goodsId)
    }
    this.goodsId = sessionStorage.getItem("goodsId")
    this.init();


    if (this.$route.query.channelid) {
      sessionStorage.setItem("channelid", this.$route.query.channelid)
        this.identifying()
    }
  


  },

  mounted () {
    this.jiage = true
    this.$store.commit("token", null)

  },


}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
dt {
  width: 100px;
  text-align: right;
}
dl {
  clear: both;
  overflow: hidden;
  width: 90%;
  margin: 0 auto;
  font-size: 0.38rem;
  border-bottom: 1px solid #f1f1f1;
  box-sizing: border-box;
  padding-bottom: 0.4rem;
}
/* dl.hl {
    background:#ddd;
  } */
dt,
dd {
  float: left;
  margin-top: 0.2rem;
}
button {
  float: left;
  margin-top: 0.1rem;
  height: 0.8rem;
  box-sizing: border-box;
  text-align: center;
  border-radius: 5px;
  background: #f6f6f6;
  line-height: 0.8rem;
  margin-right: 0.2rem;
  border: none;
  border: 1px solid #fff;
  outline: none;
  font-size: 0.36rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
}

.disabled {
  color: #999;
  background: #ccc;
}
.active {
  border: 1px solid #222222;
}

.top-but {
  margin: 10px;
}

#skuId {
  height: 24px;
  font-size: 14px;
  line-height: 24px;
}
.hello {
  width: 100%;
  height: 100%;
  position: absolute;
}
.head {
  width: 100%;
  overflow: hidden;
}
.swiper-container {
  width: 100%;
}
.swiper-slide img {
  width: 100%;
  height: 10rem;
  position: absolute;
}
.imgwarp {
  width: 100%;
  height: 9.5rem;
}
.imgwarp img {
  width: 100%;
  height: 100%;
}

.fanhuiimgwarp {
  width: 0.8rem;
  height: 0.8rem;
  position: absolute;
  left: 0.2rem;
  top: 0.3rem;
  z-index: 55;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
}
.fanhuiimgwarp img {
  /* width: 100%; */
  width: 0.5rem;
  height: 0.48rem;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -0.24rem;
  margin-left: -0.25rem;
  transform: rotate(180deg);
  z-index: 80;
}
.head .go_1 {
  font-size: 0.5rem;
  font-weight: bold;
  margin-left: 1.2rem;
  margin-top: 0.35rem;
  float: left;
}
.headtopleft {
  width: 3rem;
  height: 1.2rem;
}
.thedefaultpagetop {
  width: 1rem;
  height: 1rem;
  position: absolute;
  left: 0.2rem;
  top: 0.3rem;
  z-index: 55;
}
.thedefaultpagetop img {
  width: 0.5rem;
  height: 0.48rem;
}
.textconcent {
  width: 90%;
  margin: 0 auto;
}
.jiaqian {
  font-size: 0.32rem;
  font-weight: bold;
  margin-top: 0.4rem;
}
.jiaqian span {
  /* font-size: 0.453rem; */
}
.chanpintext {
  font-size: 0.373rem;
  color: #222;
  margin-top: 0.2rem;
  margin-bottom: 0.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /*! autoprefixer: on */
  -webkit-line-clamp: 2;
}
.solid {
  width: 100%;
  height: 0.252rem;
  background: #f2f2f2;
}
.xuanzewarp {
  position: relative;
}
.xuanze {
  width: 80%;
  height: 1.146rem;
  margin-left: 5%;
  font-size: 0.37rem;
  line-height: 1.146rem;
  position: relative;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /*! autoprefixer: on */
  -webkit-line-clamp: 1;
}
.xuanzeleft {
  margin-right: 0.2rem;
  color: #999;
}
.xuanzeshangpin {
  float: right;
  width: 0.5rem;
  height: 0.48rem;
  position: absolute;
  top: 0.3rem;
  right: 5%;
}
.promise {
  width: 90%;
  margin: 0 auto;
  font-size: 0.32rem;
}
.promise h1 {
  margin-top: 0.32rem;
}
.promise ul li {
  margin-top: 0.1rem;
}
.shangpinimgwarp {
  width: 100%;
  margin-top: 0.3rem;
}
.shangpinimgwarp img {
  width: 100%;
}
.concent {
  overflow: hidden;
  padding-bottom: 1.6rem;
  background: #fff;
}
.jiesuanbtn {
  width: 100%;
  height: 1.46rem;
  /* background: #fff; */
  position: fixed;
  bottom: 0;
  left: 0;
}
.jiesuanbtnwarp {
  width: 100%;
  height: 1.46rem;
  position: fixed;
  bottom: 0;
  left: 0;
}
.jiesuanbtnauto {
  width: 100%;
  height: 1.2rem;
  background: rgba(0, 0, 0, 0.7);
  opacity: 1;
  border-radius: 4px;
  margin: 0 auto;
  color: #fff;
  font-size: 0.4rem;
  text-align: center;
  line-height: 1.2rem;
  position: relative;
  margin-top: 0.1rem;
}
.tankuang {
  width: 100%;
  padding-bottom: 1.5rem;
  background: #fff;
  position: fixed;
  bottom: -100%;
  left: 0;
  z-index: 20;
  border-radius: 5px 5px 0 0;
}
.servicewarp {
  width: 100%;
  /* height: 5rem; */
  background: #fff;
  position: fixed;
  bottom: -100%;
  left: 0;
  z-index: 20;
  border-radius: 5px 5px 0 0;
  padding-bottom: 0.2rem;
}
.zhegai {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.3);
  /* background: red; */
}
.tankuangtitle {
  width: 90%;
  height: 3.41rem;
  float: right;
  margin-right: 5%;
  border-bottom: 1px solid #eee;
}
.tankuangtitle_top {
  margin-top: 0.26rem;
}
.tankuangtitle_topimgwarp {
  width: 2.77rem;
  height: 2.77rem;
  border-radius: 5px;
  float: left;
  box-sizing: border-box;
  border: 1px solid #f1f1f1;
}
.tankuangtitle_top .tankuangtitle_topimg {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.tankuangtitle_toptext {
  margin-top: 1.6rem;
  float: left;
  margin-left: 0.3rem;
}
.tankuangtitle_toptextone {
  font-size: 0.4rem;
  color: #222;
}
.tankuangtitle_toptexttwo {
  font-size: 0.32rem;
  color: #222;
}
.nonetankuangwarp {
  width: 1rem;
  height: 1rem;

  position: absolute;
  right: 0.4rem;
}
.nonetankuang {
  width: 0.5rem;
  height: 0.5rem;
  margin-left: 0.2rem;
  margin-top: 0.2rem;
}
.colorxuan {
  width: 100%;

  overflow: hidden;
  font-size: 0.35rem;
}
.numberxuanze {
  width: 90%;
  float: left;
  overflow: hidden;
  font-size: 0.35rem;
  height: 1rem;
  /* background: red; */
  /* margin-top: .5rem; */
  border-top: 1px solid #f1f1f1;
  padding-bottom: 1rem;
  margin-left: 5%;
}
.numberxuanzeleft {
  font-size: 0.38rem;
  float: left;
}
.numberxuanzeright {
  float: right;
  margin-right: 0.2rem;
  overflow: hidden;
}
.numberxuanzeright div {
  float: left;
}
.colorxuan h1 {
  font-size: 0.35rem;
  margin-top: 0.5rem;
}

.colorxuan ul li {
  float: left;
  margin-top: 0.2rem;
  width: 1.89rem;
  height: 0.8rem;
  box-sizing: border-box;
  text-align: center;
  border-radius: 10px;
  background: #f6f6f6;
  line-height: 0.8rem;
  margin-right: 0.2rem;
  border: 1px solid #fff;
}
.colorxuan ul .active {
  border: 1px solid #333;
  color: #333;
  background: #fff;
}
.colorxuanwarp {
  width: 90%;
  float: left;
  overflow: hidden;
  border-bottom: 1px solid #f5f5f5;
  padding-bottom: 0.25rem;
  margin-left: 5%;
}
.jian {
  width: 1rem;
  height: 0.8rem;
  background: #f6f6f6;
  text-align: center;
  line-height: 0.8rem;
  margin-right: 0.2rem;
  color: #999999;
  font-size: 0.4rem;
  font-weight: bold;
}
.numbergeshu {
  width: 0.9rem;
  height: 0.8rem;
  background: #f6f6f6;
  text-align: center;
  line-height: 0.8rem;
  margin-right: 0.2rem;
  color: #222222;
  font-size: 0.4rem;
  font-weight: bold;
  float: left;
  border: none;
}
.zengjia {
  width: 1rem;
  height: 0.8rem;
  background: #f6f6f6;
  text-align: center;
  line-height: 0.8rem;
  color: #222222;
  font-size: 0.4rem;
  font-weight: bold;
}
.tankuangbtn {
  width: 90%;
  height: 1.06rem;
  background: #222222;
  opacity: 1;
  position: absolute;
  bottom: 0.3rem;
  left: 5%;
  border-radius: 5px;
  text-align: center;
  line-height: 1.06rem;
  color: #fff;
  font-size: 0.4rem;
}
.tankuangbtns {
  width: 90%;
  height: 1.06rem;
  opacity: 1;
  position: fixed;
  bottom: 0.2rem;
  left: 5%;
  border-radius: 5px;
  text-align: center;
  line-height: 1.06rem;
  color: #fff;
  font-size: 0.4rem;
  z-index: 100;
}
.swiper-slide {
  width: 100%;
  height: 8rem;
  background: #fff;
  position: relative;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.swiper-slide {
  height: 10rem;
}
.promiseauto {
  width: 100%;
  margin-top: 0.2rem;
}

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

.geigekey {
  margin-top: 0.2rem;
}
.trueactive {
  bottom: 0;
  transition: bottom 0.7s, transform 1s;
  -moz-transition: bottom 0.7s, -moz-transform 1s;
  -webkit-transition: bottom 0.7s, -webkit-transform 1s;
  -o-transition: bottom 0.7s, -o-transform 1s;
}
.activefalse {
  bottom: -100%;
  transition: bottom 0.7s, transform 1s;
  -moz-transition: bottom 0.7s, -moz-transform 1s;
  -webkit-transition: bottom 0.7s, -webkit-transform 1s;
  -o-transition: bottom 0.7s, -o-transform 1s;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.siblingslogo {
  width: 3.5rem;
  height: 0.5rem;
  margin: 0 auto;
  font-size: 0.35rem;
  color: #999;
}
.siblingslogotext {
  float: left;
  text-align: center;
  line-height: 1rem;
}
.siblingslogoleft {
  width: 1.173rem;
  height: 1px;
  border-bottom: 1px solid #999;
  box-sizing: border-box;
  float: left;
  margin-top: 0.45rem;
  margin-right: 0.2rem;
}
.siblingslogoright {
  width: 1.173rem;
  height: 1px;
  border-bottom: 1px solid #999;
  box-sizing: border-box;
  float: left;
  margin-top: 0.45rem;
  margin-left: 0.2rem;
}
.solidfenli {
  width: 100%;
  height: 1rem;
  background: #f1f1f1;
}
.thedefaultpage {
  width: 100%;
  height: 100%;
  background: #fff;
  position: fixed;
  text-align: center;
  top: 0;
  left: 0;
  z-index: 200;
  font-size: 0.373rem;
}

.thedefaultpagetext {
  width: 7rem;
  height: 5rem;
  text-align: center;
  margin: 0 auto;
  line-height: 1rem;
  position: fixed;
  top: 5rem;
  /* margin-top: -2.5rem; */
  left: 50%;
  margin-left: -3.5rem;
}
.thedefaultpagetext img {
  width: 4rem;
  height: 4rem;
}
.container {
  margin-top: 3.41rem;
  width: 100%;
  max-height: 6.2rem;
  overflow-y: auto;
  overflow: auto;
  /* 　　overflow-y:scroll; */
  　　-webkit-overflow-scrolling: touch;
}
.sorll {
  position: fixed;
}
.numberxuanzesolid {
  margin-top: 0.3rem;
}
.content:last-child {
  border: none;
}
.headtop {
  width: 100%;
  height: 1.2rem;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  opacity: 0.8;
  z-index: 9;
}
.servicewarp h1 {
  font-size: 0.4rem;
  text-align: center;
  color: #222;
  margin-top: 0.7rem;
}
.servelistwarp {
  margin-top: 0.2rem;
}
.servelist {
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
  margin-top: 0.4rem;
}

.servelist img {
  width: 0.4rem;
  height: 0.4rem;
  margin-top: 0.3rem;
  float: left;
}
.servelistright {
  width: 90%;
  float: left;
  margin-left: 0.3rem;
  margin-top: 0.2rem;
}
.servelisttext {
  font-size: 0.4rem;
}
#textfontlittle {
  margin-top: 0.1rem;
  color: #888;
}
.wanchengbtn {
  width: 90%;
  height: 1.1rem;
  background: #222222;
  line-height: 1.1rem;
  text-align: center;
  color: #fff;
  margin: 0 auto;
  border-radius: 4px;
  font-size: 0.4rem;
  margin-top: 0.5rem;
}
</style>
