<template>
  <!-- <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="item in cartList"
      :key="item.iid" :itemInfo="item"></cart-list-item>
    </scroll>
  </div> -->

  <scroll>
    <div>
      <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-list-item>
    </div>
  </scroll>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'

	export default {
		name: "CartList",
    computed: {
      ...mapGetters(['cartList'])
    },
    components: {
		  Scroll,
      CartListItem
    },
    // activated() {
    //   this.$refs.scroll.refresh()
    // },
    // props: {
		//   cartList: {
		//     type: Array,
    //     default() {
		//       return []
    //     }
    //   }
    // }
	}
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
