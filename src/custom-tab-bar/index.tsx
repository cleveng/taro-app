import { Component, ReactNode } from 'react'
import { Tabbar } from '@nutui/nutui-react'
import { Cart, Category, Find, Home, User } from '@nutui/icons-react'

import './index.scss'

export default class Index extends Component {
  render(): ReactNode {
    return (
      <Tabbar fixed defaultValue={0} safeArea>
        <Tabbar.Item title='首页' icon={<Home width={18} height={18} />} value={9} />
        <Tabbar.Item title='分类' icon={<Category width={18} height={18} />} dot />
        <Tabbar.Item title='发现' icon={<Find width={18} height={18} />} />
        <Tabbar.Item title='购物车' icon={<Cart width={18} height={18} />} />
        <Tabbar.Item title='我的' icon={<User width={18} height={18} />} />
      </Tabbar>
    )
  }
}
