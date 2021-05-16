import {request} from "./request"

// 获取轮播图图片
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}
// 获取首页goods
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })

}
