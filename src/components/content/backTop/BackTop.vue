<template>
  <!-- <div class="back-top" @click="backClick"> -->
  <div class="back-top">
    <img src="~assets/images/common/top.png/" alt="">
  </div>
</template>

<script>
export default {
  name: "BackTop",
  methods: {
    //
    // backClick() {
    //   this.$emit('backClick')
    // }
  },
}
</script>

<style>
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 55px;
  }
  .back-top img {
    height: 43px;
    height: 43px;
  }
</style>
