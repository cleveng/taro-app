import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'

import { useUserStore } from '../../store/user'

export default function Index() {
  useLoad(async () => {
    console.log('Page loaded.')
  })

  const token = useUserStore(state => state.token)
  const login = useUserStore(state => state.login)
  const logout = useUserStore(state => state.logout)

  return (
    <>
      <View>hello world {token}</View>
      <button onClick={() => login('123')}>登录</button>
      <button onClick={() => logout()}>退出</button>
    </>
  )
}
