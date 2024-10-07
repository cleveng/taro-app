import React from 'react'

import Taro from '@tarojs/taro'

import { useLaunch } from '@tarojs/taro'

import '@nutui/nutui-react-taro/dist/style.css'
import './assets/styles/app.scss'
import { interceptor } from './utils/interceptor'

type Props = {
  children: React.ReactNode
}

Taro.addInterceptor(interceptor)

export default function App({ children }: Readonly<Props>) {
  useLaunch(() => {
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return children
}
