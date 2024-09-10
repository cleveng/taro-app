export default defineAppConfig({
  pages: ['pages/index/index', 'pages/login/index', 'pages/welcome/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    custom: false,
    color: '#666',
    selectedColor: '#333',
    backgroundColor: '#fff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页'
      },
      {
        pagePath: 'pages/login/index',
        text: '登录'
      }
    ]
  }
})
