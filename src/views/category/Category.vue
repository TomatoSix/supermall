<template>
  <h2></h2>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Category",
  data(){
    return {
      scroll: null
    }
  },
  // 组件创建完后调用
  mouted() {
    this.scroll = new BScroll(document.querySelector('.wrapper'), {
      probeType: 3,
      pullUpLoad: true,
      click: true
    })

    this.scroll.on('scroll', (position) => {
      console.log(position);
    })

    this.scroll.on('pullingUp', () => {
      console.log("上拉加载更多");
    })
  },
  methods: {
    btnClick() {
      console.log();
    }
  },
}
</script>

<style>

</style>
