/*
 * @Author: your name
 * @Date: 2021-04-25 22:10:20
 * @LastEditTime: 2021-04-27 00:19:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vuepress-blog\docs\.vuepress\config.js
 */

// 注意：路由的根路径为docs文件夹，静态资源（图片）的根路径为public文件夹

module.exports = {
  // base: ".",
  title: "65man'blog",
  description: '学习笔记',
  // 网页标签的图标
  head: [['link', { res: 'icon', href: '/images/logo.png' }]],
  themeConfig: {
    // 左上角logo
    logo: '/images/logo.jpg',
    // 导航栏配置
    nav: [
      { text: '首页', link: '/' },
      {
        text: '面试宝典',
        items: [
          { text: 'css相关', link: '/guide/interview/css/' },
          { text: 'js相关', link: '/guide/interview/js/' },
          { text: 'vue相关', link: '/guide/interview/vue/' },
          { text: '浏览器网络相关', link: '/guide/interview/net/' }
        ]
      },
      { text: '外部链接', link: 'https://www.baidu.com' }
    ],
    // 侧边栏配置
    sidebar: 'auto'
  }
}
// themeConfig: {
//   // 博客配置
//  blogConfig: {
//    category: {
//      location: 2,     // 在导航栏菜单中所占的位置，默认2
//      text: 'Category' // 默认文案 “分类”
//    },
//    tag: {
//      location: 3,     // 在导航栏菜单中所占的位置，默认3
//      text: 'Tag'      // 默认文案 “标签”
//    },
//    socialLinks: [     // 信息栏展示社交信息
//      { icon: 'reco-github', link: 'https://github.com/recoluan' },
//      { icon: 'reco-npm', link: 'https://www.npmjs.com/~reco_luan' }
//    ]
//  }
// }
