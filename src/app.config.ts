import Taro, { ENV_TYPE } from '@tarojs/taro'

export default defineAppConfig({
  pages: ['pages/index/index', 'pages/login/index', 'pages/machine/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    custom: Taro.getEnv() === ENV_TYPE.WEAPP,
    color: '#666',
    selectedColor: '#333',
    backgroundColor: '#fff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: 'index'
      },
      {
        pagePath: 'pages/login/index',
        text: 'login'
      },
      {
        pagePath: 'pages/machine/index',
        text: 'machine'
      }
    ]
  }
})
