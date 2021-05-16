module.exports = {
  configureWebpack: {
    resolve: {
      // 用于配置别名 @就相当于src
      alias: {
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
      }
    }
  }
}