<!-- 轮播图制作 -->
<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.image">
      <a :href="item.link">
<<<<<<< HEAD
        <img :src="item.image" alt="" @load="imageLoad">
=======
        <img :src="item.image" alt="">
>>>>>>> f142d536a34deb6a048aef49983de911444270a1
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
<<<<<<< HEAD
  methods: {
    imageLoad() {
      if (!this.isLoad){
        this.$emit("swiperImageLoad")
        this.isLoad = true
      }     
    }
  },
  data() {
    return {
      isLoad: false
    }
  }
=======
>>>>>>> f142d536a34deb6a048aef49983de911444270a1
}
</script>

<style>

</style>
