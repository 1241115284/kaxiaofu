<template>
  <div class="hellowwarp">
    <div class="zhegai" v-show="zhegai" @click="zhegaiclick"></div>
     <div class="head">
       <div class="headauto">
         <div class="imgwarp" @click="imgwarpclick">
           <img src="../../assets/back@2x.png" alt="">
         </div>
         <div class="headtext">申请退/换货</div>
       </div>
     </div>
  <div class="leixng">
   <div class="leixingauto">
     <span class="left">*</span>
     <span class="auto">类型</span>
     <span class="right">(只可以选择其中一条)</span>
   </div>
  </div>
  <div class="cheack">
    <div class="cheackauto">
      <ul>
      <li 
      v-for="(item,index) in List"
      :class="{active:index==current}"
      @click="cheackclick(index)">
        <div class="nonoecheack"></div>
        <div>{{item.text}}</div>
      </li>
      <!-- <li  :class="{active:current ==aaa}" @click="cheackclick(aaa)">
        <div class="nonoecheack"></div>
        <div>换货</div>
      </li>
      <li :class="{active:current ==bbb}" @click="cheackclick(bbb)">
        <div class="nonoecheack"></div>
        <div>退款</div> -->
      </li>
    </ul>
    </div>
  </div>
   <div class="leixng" id="topsolid">
   <div class="leixingauto">
     <span class="left">*</span>
     <span class="auto">原因</span>
   </div>
  </div>
  <div class="cheack" @click="xuanzeyuanyin">
    <div class="cheackauto">
       <span class="auto" id="yuanyin">{{chushitext}}</span>
       <img src="../../assets/my_icon_f@2x.png" alt="" class="imgclass">
    </div>
  </div>
   <div class="leixng">
   <div class="leixingauto">
     <!-- <span class="left">*</span> -->
     <span class="auto">问题描述</span>
     <span class="right" id="rightcolor">(您可以输入<span v-html="number"></span>个字描述)</span>
   </div>
  </div>
  <div class="wenben">
   <div class="wenbenauto">
     <textarea 
     placeholder="问题描述的越详细,退换货的几率越大哦(最多100个字)" 
     v-model="items.text"
      ref="count"
      @blur="animateWidth"
      >
      </textarea >
      
   </div>
  </div>
  <div class="yesbtn" @click="tijiaoclick()">提交</div> 
  <div class="yuanyinwarp" v-show="yuanyinwarp">
   <div class="head">
       <div class="headauto">
         <div class="imgwarp" @click="zhegaiclick">
           <img src="../../assets/back@2x.png" alt="">
         </div>
         <div class="headtext">选择原因</div>
       </div>
     </div>

      <div class="head" 
      v-for="item in Listtext"
      @click="yuanyintextclick(item.value,item.id)
      ">
       <div class="headauto">
         <div class="yunyintext" v-html="item.value"></div>
       </div>
     </div>

      <!-- <div class="head" id="solidnione" @click="yuanyintextclick(yuanyin1)">
       <div class="headauto">
         
         <div class="yunyintext">商品与描述不符</div>
       </div>
     </div> -->
  </div>
  </div>
</template>

<script>

export default {

  name: 'HelloWorld',
  data () {
    return {
      id:"1",
      chushitext:"实物与描述不符",
      number: '100',
      aaa:"aaa",
      bbb:"bbb",
      current:0,
       name:'',
       show: true,
       count:"", 
       items: {
           text:'',
      },
       List:[
       
         {
           text:"退款",
           key:"1"
         }
       ],
       Listtext:[
         {
          value:"实物与描述不符",
          id:"1"
         },
           {
          value:"假冒品牌",
          id:"2"
         },
           {
          value:"做工瑕疵",
          id:"3"
         },
           {
          value:"多拍/错拍",
          id:"4"
         },
           {
          value:"不喜欢/效果不好",
          id:"5"
         },
           {
          value:"七天无理由退换货",
          id:"6"
         },
           {
          value:"其他",
          id:"7"
         },

       ],
        zhegai:false,
        yuanyinwarp:false,
    }
   
  },
  methods: {
      imgwarpclick(){
       this.$router.push({path: '/myorder',query:{id:3}})  
    },

    cheackclick(msg){
      console.log(msg)

    },

   yuanyintextclick(msg,id){
    // console.log(msg)
    // console.log(id)
    this.chushitext=msg
    this.zhegai=false
    this.yuanyinwarp=false
    this.id=id
   },
   tijiaoclick(){               //提交
     this.$store.commit("loding",true)
   
    let createRefundOrderObj={
      oid:sessionStorage.getItem("danoid"),
      refundReason:this.id,
      remark:this.items.text,
      refundType:1
    }
    this.$server.createRefundOrder(createRefundOrderObj).then(data => {

        this.$store.commit("loding",false)
        console.log(data)
        if(data.data.code=="0000"){
        this.$router.replace({path: '/reimburse'})  
        }else{
        this.$layer.msg(data.data.msg)
        }

     })


   },
   animateWidth(){
    document.body.scrollTop = 0;
   },

   xuanzeyuanyin(){      //选择原因
    this.zhegai=true
    this.yuanyinwarp=true
   },

   zhegaiclick(){        //点击遮盖关闭弹框
      this.zhegai=false
    this.yuanyinwarp=false
   }
   
  },
  
  watch:{ 
    items:{

      handler:function(){

      var _this = this;
      var _sum = 100;
      _this.$refs.count.setAttribute("maxlength",_sum);
      _this.number= _sum- _this.$refs.count.value.length;

      },
      deep:true

   }
}


 

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hellowwarp{
    width: 100%;
  height: 100%;
  position: fixed;
  background: #f2f2f2;
}
.head{
  width: 100%;
  height: 1.2rem;
  border-bottom: 1px solid #F2F2F2;
  background: #fff;
}

.imgwarp{
  width: 1rem;
  height: 1.2rem;
  float: left;

}
.imgwarp img{
  width: 0.5rem;
  margin-top: 0.35rem;
  margin-left: 0.26rem;
 
}
.headtext{
  width: 3rem;
  margin: 0 auto;
  font-size: 0.45rem;
  text-align: center;
  line-height: 1.2rem;
}
.leixng{
 width: 100%;
  height: 0.8rem;
  border-bottom: 1px solid #F2F2F2;
  background: #fff;
}
.leixingauto{
  width: 95%;
  margin: 0 auto;
}
.left{
  color: #F7A020;
}
.auto{
  font-size: 0.373rem;
  color: #222222;
  line-height: 0.8rem;
}
.right{
   font-size: 0.373rem;
    color: #F7A020;
     line-height: 0.8rem;
}
.cheack{
   width: 100%;
  height: 1.2rem;
  border-bottom: 1px solid #F2F2F2;
  background: #fff;
}
.cheackauto{
  width: 95%;
  margin: 0 auto;
}
.cheack ul li div{
  float: left;
   margin-top: 0.4rem;
}
.cheack ul li {
  float: left;
  height: 1.2rem;
  margin-right: 1rem;
  overflow: hidden;
}
.cheackauto ul li .nonoecheack{
  width: 0.4rem;
  height: 0.4rem;
  background: url(../../assets/gwc_sy_icon_wxz@2x.png)no-repeat;
  background-size:0.4rem 0.4rem;
  margin-right: 0.2rem;
}
.cheackauto ul .active .nonoecheack{
 
     background: url(../../assets/gwc_sy_icon_xz@2x.png)no-repeat;
   background-size:0.4rem 0.4rem;
}
#topsolid{
  margin-top: 0.2rem;
}
#yuanyin{
  line-height: 1.2rem;
}
.imgclass{
  width: 0.4rem;
  float: right;
  margin-top: 0.4rem;
}
#rightcolor{
  color: #999;
}
.wenben{
  width: 100%;
  height: 4rem;
  background: #fff;
  overflow: hidden;
}
.wenbenauto{
  width: 95%;
  height: 4rem;
  margin: 0 auto;
  margin-top: 0.4rem;
}
.wenbenauto textarea{
  width: 100%;
  height: 95%;
  border: none;
  font-size: 0.373rem;

}
.yesbtn{
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
.zhegai{
   width: 100%;
   height: 100%;
   position: fixed;
   top:0;
   left: 0;
   background: rgba(0,0,0,0.4);
   z-index: 10;
}
.yuanyinwarp{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
 z-index: 100;
  background: red;
}
.yunyintext{
  margin-left: 0.2rem;
  font-size: 0.4rem;
  line-height: 1.2rem;
}
#solidnione{
  border: none;
}
</style>
