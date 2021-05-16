<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control" 
                  :titles="['流行','新款','精选']"
                  @tabClick="tabClick" 
                  ref="tabControl1"
                  v-show="isTabFixed"></tab-control>
    <!-- ref如果是绑定在组件中的，那么通过'this.$refs.refname'获取到的是一个组件对象 -->
    <!-- ref如果是绑定在普通元素中的，那么通过'this.$refs.refname'获取到的是一个元素对象 -->
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!-- 推荐 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- 本周流行 -->
      <feature-view/>
      <tab-control class="tab-control" 
                  :titles="['流行','新款','精选']"
                  @tabClick="tabClick" 
                  ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- 点击回到顶部 -->
    <!-- 组件不能监听点击，需要使用@click.native 监听组件根元素的原生事件  -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
// 导入子组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView"
import FeatureView from "./childComps//FeatureView"
// 导入公共组件
import NavBar from 'components/common/navbar/NavBar';
import TabControl from "components/content/tabControl/TabControl"
import GoodsList from "components/content/goods/GoodsList"
import Scroll from "components/common/scroll/Scroll"
import BackTop from "components/content/backTop/BackTop"

// 导入方法
import { getHomeMultidata, getHomeGoods } from 'network/home';

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    BackTop,
    Scroll

  },
  data() {
    return {
      // 轮播图
      banners: [],
      // 推荐
      recommends: [],
      // 流行、新款、精选
      goods: {
        'pop' : {page: 0,list: []},
        'new' : {page: 0,list: []},
        'sell' : {page: 0,list: []},
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffSetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMuldata()

    // 2.请求商品数据
    this.getHomeGoodsData('pop')
    this.getHomeGoodsData('new')
    this.getHomeGoodsData('sell')
    
  },
  mounted() {
    //1.图片加载完成的事件监听
    const refresh = this.debounce(this.$refs.scroll.refresh(),200)
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })   
  },
  methods: {
    // 1.事件监听相关方法
    // 对于refresh非常频繁的问题，debounce防抖操作
    debounce(func, delay) {
      let timer = null
      return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    },
    // 点击流行 精选 新款 进行切换
    tabClick(index){
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index

    },
    // 设置点击backTop返回至顶层
    backClick() {
      console.log("backClick");
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    contentScroll(position) {
      // 1.判断BackTop 是否显示
      this.isShowBackTop = -position.y > 1000
      // 2.决定tabControl是否吸顶(position: fixed)
      // this.isTabFixed = (-position.y) > this.tabOffSetTop
      this.isTabFixed = (-position.y) > this.tabOffSetTop
    },
    //上拉加载更多方法
    loadMore(){
      console.log("上拉加载更多");
      this.getHomeGoodsData(this.currentType)

      // 调用该方法进行刷新，解决下拉刷新滑不动问题
      this.$refs.scroll.scroll.refresh()
    },
    swiperImageLoad() {
      // 2.获取tabControl的offSetTop
      // 所有的组件都有一个属性 $el:用于获取组件中的元素
      this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop
    },

    // 2.网络请求相关方法
    //请求多个数据
    getHomeMuldata(){
      getHomeMultidata().then(res => {
        console.log(res);
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list

      })
    },
    // 请求流行、新歌、精选栏目数据方法
    getHomeGoodsData(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type, 1).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        console.log(res);

        this.$refs.scroll.finishPullUp()
      })
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  destroyed() {
    console.log("home destroyed");
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY()
  }
}
</script>

// scoped表示作用域，所有样式只对当前组件起效果
<style scoped>
  #home {
    /* 视口高度 */
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .content {
    height: calc(100% - 93px);
    overflow: hidden;
    /* 这里可能会出现滚动部分不充满屏幕的情况 */
    /* margin-top: 44px; */
  }


</style>
