<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/images/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" :key="index" 
        class="title-item" :class="{active: index === currentIndex}">{{item}}</div></div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品","参数","评论","推荐"],
      currentIndex: 0
    }
  }, 
  methods: {
    titleClick(index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .title {
    display: flex;
  }
  .title-item{
    flex: 1;
    font-size: 13px;
  }
  .active {
    color: red;
  }
  .back img{
    margin-top: 12px;
  }
</style>