<template>
  <div>
    <div class="footer">
      <div
        v-for="(item,index) of items"
        :class="[item.cls,{on:index === idx}]"
        @click="routerclick(item.navname)"
      >
        <img :src="index===idx?item.iconSelect:item.icon">
        <p :class="['colorChange',{on:index===idx}]">{{item.navname}}</p>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  props: ['idx'],
  name: 'HelloWorld',

  data () {
    return {
      items: [


      ]



    }
  },
  methods: {
    routerclick (name) {
      if (name == "首页") {

        this.$router.push({ path: '/' })
      }
      else if (name == "分类") {

        this.$router.push({ path: '/home' })
      }
      else if (name == "购物车") {
        this.$layer.msg("购物车暂未开通")
      } else if (name == "我的") {
        this.$router.push({ path: '/mytext' })
      }
    },
    init () {

      let bottomNavObj = {
        navadress: "1",

      }

      this.$server.bottomNav(bottomNavObj).then(data => {
        console.log(data)
        this.items = data.data.navigation

      })

    },


  },
  mounted () {
    this.init()
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
  width: 100%;
  color: #bbb;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
}
.footer div {
  float: left;
  width: 25%;
  text-align: center;
  height: 1.26rem;
  font-size: 0.293rem;
}
.footer div img {
  width: 0.5rem;
  height: 0.5rem;
  margin-top: 0.2rem;
}

.on {
  color: #f7a020;
}
</style>
