export default {
  addCart(context, payload) {
    // payload为新添加的商品
    // 查找之前数组中是否有该商品
    // 方法一
    // let oldProduct = null
    // for (let item of state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }

    // 方法二
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    if (oldProduct) {
      // oldProduct.count += 1
      context.commit('addCounter', oldProduct)
    }else {
      payload.count = 1
      // context.state.cartList.push(payload)
      context.commit('addToCart', payload)
    }
  }
}
