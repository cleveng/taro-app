import { Cell, CountDown, Dialog, Progress } from '@nutui/nutui-react-taro'
import { Text, View } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useRef, useState } from 'react'

export default function Index() {
  useLoad(async () => {
    console.log('Page loaded.')
  })

  const stateRef = useRef({
    endTime: Date.now() + 60 * 1000
  })
  const onEnd = () => {
    setVisible(false)
    Taro.showToast({ title: '倒计时结束', icon: 'none' })
  }

  const [visible, setVisible] = useState(false)
  return (
    <>
      <Cell title='设备安装密码' onClick={() => setVisible(true)} />
      <Dialog
        className='test-dialog'
        title='设备安装密码'
        visible={visible}
        hideConfirmButton
        hideCancelButton
        onCancel={() => setVisible(false)}
        closeIcon
      >
        <>
          <View className='text-gray-400'>动态密码60秒钟有效，失效后请重新刷新进行获取</View>
          <View className='mt-1.5 grid grid-cols-6 gap-1'>
            <Text className='inline-flex h-12 w-auto items-center justify-center bg-gray-200 text-sm font-bold'>1</Text>
            <Text className='inline-flex h-12 w-auto items-center justify-center bg-gray-200 text-sm font-bold'>2</Text>
            <Text className='inline-flex h-12 w-auto items-center justify-center bg-gray-200 text-sm font-bold'>3</Text>
            <Text className='inline-flex h-12 w-auto items-center justify-center bg-gray-200 text-sm font-bold'>4</Text>
            <Text className='inline-flex h-12 w-auto items-center justify-center bg-gray-200 text-sm font-bold'>5</Text>
            <Text className='inline-flex h-12 w-auto items-center justify-center bg-gray-200 text-sm font-bold'>6</Text>
          </View>
          <View className='my-1.5'>
            <Progress
              percent={30}
              color='var(--nutui-color-primary)'
              background='var(--nutui-brand-1)'
              strokeWidth='1'
            />
          </View>
          <View className='flex items-center justify-between'>
            <Text onClick={onEnd}>刷新动态密码</Text>
            <CountDown endTime={stateRef.current.endTime} onEnd={onEnd} />
          </View>
        </>
      </Dialog>
    </>
  )
}
