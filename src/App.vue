<template>
  <div id="app">
<<<<<<< HEAD
    <!-- 路由缓存keep-alive -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
     
=======
>>>>>>> f142d536a34deb6a048aef49983de911444270a1
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/maintabbar/MainTabBar"

  export default {
    name: 'App',
    components: {
      MainTabBar,
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>

