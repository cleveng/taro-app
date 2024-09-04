import React from 'react'

import { useLaunch } from '@tarojs/taro'

import './app.scss'

type Props = {
  children: React.ReactNode
}

export default function App({ children }: Readonly<Props>) {
  useLaunch(() => {
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return children
}
