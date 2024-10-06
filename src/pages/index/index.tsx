import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'

export default function Index() {
  // const ctx = Taro.getCurrentInstance().page
  useLoad(async () => {
    // const tabbar = Taro.getTabBar<CustomTabBar>(ctx)
    // if (tabbar) {
    //   ;(tabbar as never as any)?.setSelected(0)
    // }
  })

  return (
    <>
      <View>hello world</View>
    </>
  )
}
