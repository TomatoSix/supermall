<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 轮播图 -->
    <home-swiper :banners="banners"></home-swiper>
    <!-- 推荐 -->
    <recommend-view :recommends="recommends"></recommend-view>
    <!-- 本周流行 -->
    <feature-view/>
    <tab-control class="tab-control" :titles="['流行','新款','精选']"
                @tabClick="tabClick"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
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
    GoodsList
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
      currentType: 'pop'
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
  methods: {
    // 1.事件监听相关方法
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
      })
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  }
}
</script>

<style>
  #home {
    padding-top: 44px;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control {
    position: sticky;
    top: 44px;
  }
</style>
