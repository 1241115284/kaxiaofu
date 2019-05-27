import Vue from 'vue'
import Router from 'vue-router'
import logo from '@/components/logo'
import home from '@/components/home/home'
import index from '@/components/index/index'     //首页
import particulars from '@/components/particulars/particulars'  //详情组件 
import submitorder from '@/components/particulars/submitorder'  //提交订单
import mytext from '@/components/mytext/mytext'
import business from '@/components/mytext/business'        //经营许可
import AboutUs from '@/components/mytext/AboutUs'            //关于我们
import feedback from '@/components/mytext/feedback'            //意见反馈
import shippingaddress from '@/components/mytext/shippingaddress' //我的地址
import Sparemoney from '@/components/mytext/Sparemoney' //闲置换钱
import addmyshipping from '@/components/mytext/addmyshipping' //新增地址
import name from '@/components/mytext/name' //昵称设置
import phone from '@/components/mytext/phone' //手机号设置
import compile from '@/components/mytext/compile'    //编辑组件
import profile from '@/components/mytext/profile'  //我的资料
import myorder from '@/components/myorder/myorder'  //我的订单
import reimburse from '@/components/myorder/reimburse'  //退款售后列表   
import Refunding from '@/components/myorder/Refunding'  //  申请/退换货
import xunidingdan from '@/components/myorder/xunidingdan'  //  虚拟订单
import telephone from '@/components/myorder/telephone'  //  话费
import checkstand from '@/components/checkstand/checkstand'  //  收银台
import delivery from '@/components/checkstand/delivery'  //  货到付款
import zhifusuccess from '@/components/checkstand/zhifusuccess'  //  支付成功
import zhifuerror from '@/components/checkstand/zhifuerror'  //  支付失败
import zhifuintermediation from '@/components/checkstand/zhifuintermediation'  //  支付中
import Promptpages from '@/components/checkstand/Promptpages'  //  其他游览器支付
import wuliuxiangqing from '@/components/wuliuxiangqing/wuliuxiangqing'  //  物流详情   useragreement
import useragreement from '@/components/useragreement'  //  用户协议   Credit
import Credit from '@/components/mytext/Credit'  //  信用卡列表    
import Credicarddetails from '@/components/mytext/Credicarddetails'  //  信用卡详情
Vue.use(Router) 


export default new Router({
   base:"/v1/",
  mode:"history",
 

  routes: [
    {
      path: '/logo',
      name: 'logo',
      meta:{index:0},
      component: logo
    },

    {
      path: '/xunidingdan',
      name: 'xunidingdan',
      meta:{index:20},
      component: xunidingdan
    },
    {
      path: '/telephone',
      name: 'telephone',
      component: telephone
    },
    {
      path: '/',
      name: '/index',
      meta:{index:1},
      component: index
    },
  
    {
      path: '/home',
      name: '/home',
      meta:{index:2},
      component: home
    },
 
    {
      path: '/particulars',
      name: '/particulars',
      meta:{index:4},
      component: particulars
    },
    {
      path: '/mytext',
      name: '/mytext',
      meta:{index:3},
      component: mytext
    },
    
    {
      path: '/Sparemoney',
      name: '/Sparemoney',
      meta:{index:333},
      component: Sparemoney
    },
    {
      path: '/business',
      name: '/business',
      meta:{index:50},
      component: business
    },
    {
      path: '/AboutUs',
      name: '/AboutUs',
      meta:{index:40},
      component: AboutUs
    },
    {
      path: '/feedback',
      name: '/feedback',
      meta:{index:41},
      component: feedback
    },
    {
      path: '/Credit',
      name: '/Credit',
      meta:{index:41},
      component: Credit
    },
    {
      path: '/Credicarddetails',
      name: '/Credicarddetails',
      meta:{index:42},
      component: Credicarddetails
    },
    {
      path: '/shippingaddress',
      name: '/shippingaddress',
      meta:{index:7},
      component: shippingaddress
    },
    {
      path: '/addmyshipping',
      name: '/addmyshipping',
      meta:{index:9},
      component: addmyshipping
    },
    {
      path: '/compile',
      name: '/compile',
      meta:{index:8},
      component: compile
    },
    {
      path: '/profile',
      name: '/profile',
      meta:{index:13},
      component: profile
    },
    {
      path: '/name',
      name: '/name',
      meta:{index:14},
      component: name
    },
    {
      path: '/phone',
      name: '/phone',
      meta:{index:15},
      component: phone
    },
    {
      path: '/myorder',
      name: '/myorder',
      meta:{index:5},
      component: myorder
    },
    {
      path: '/reimburse',
      name: '/reimburse',
      meta:{index:12},
      component: reimburse
    },
    {
      path: '/Refunding',
      name: '/Refunding',
      meta:{index:6},
      component: Refunding
    },
    {
      path: '/checkstand',
      name: '/checkstand',
      meta:{index:18},
      component: checkstand
    },
    {
      path: '/delivery',
      name: '/delivery',
      meta:{index:18},
      component: delivery
    },
    {
      path: '/Promptpages',
      name: '/Promptpages',
      meta:{index:50},
      component: Promptpages
    },
    {
      path: '/zhifusuccess',
      name: '/zhifusuccess',
      meta:{index:30},
      component: zhifusuccess
    },
    {
      path: '/zhifuerror',
      name: '/zhifuerror',
      meta:{index:30},
      component: zhifuerror
    },
    {
      path: '/zhifuintermediation',
      name: '/zhifuintermediation',
      meta:{index:30},
      component: zhifuintermediation
    },
    {
      path:'/submitorder',
      name: '/submitorder',
      meta:{index:5},
      component: submitorder
    },
    {
      path:'/wuliuxiangqing',
      name: '/wuliuxiangqing',
      meta:{index:20},
      component: wuliuxiangqing
    },
    {
      path:'/useragreement',
      name: '/useragreement',
      meta:{index:50},
      component: useragreement
    }

  ]
})
