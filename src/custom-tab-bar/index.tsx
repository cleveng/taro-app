import { Cart, Find, Home } from '@nutui/icons-react-taro'
import { Tabbar } from '@nutui/nutui-react-taro'
import Taro from '@tarojs/taro'
import { Component, ReactNode } from 'react'

import './index.scss'

export default class Index extends Component {
  ctx = Taro.getCurrentInstance().page
  static options = {
    addGlobalClass: true
  }

  state = {
    selected: 0
  }

  switchTab = (index: number, pagePath: string = '') => {
    if (index === this.state.selected) return

    this.setState({ selected: index })
    switch (index) {
      case 0:
        Taro.switchTab({ url: '/pages/index/index' })
        break
      case 1:
        Taro.switchTab({ url: '/pages/login/index' })
        break
      case 2:
        Taro.switchTab({ url: '/pages/machine/index' })
        break
      default:
        Taro.switchTab({ url: '/pages/index/index' })
    }
  }

  setSelected = (index: number) => {
    this.setState({ selected: index })
  }

  render(): ReactNode {
    const { selected } = this.state

    return (
      <Tabbar fixed defaultValue={selected} safeArea onSwitch={index => this.switchTab(index)}>
        <Tabbar.Item title='首页' icon={<Home width={18} height={18} />} value={9} />
        <Tabbar.Item title='设备' icon={<Find width={18} height={18} />} />
        <Tabbar.Item title='我的' icon={<Cart width={18} height={18} />} />
      </Tabbar>
    )
  }
}
