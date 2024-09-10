import { View } from '@tarojs/components'
import { NavBar, Toast } from '@nutui/nutui-react'
import { ArrowLeft } from '@nutui/icons-react'
import Taro, { ENV_TYPE, useLoad } from '@tarojs/taro'

import { Button, Form, Input, Divider, Space, Image, SafeArea, Tour } from '@nutui/nutui-react'
import { IoLanguageOutline } from 'react-icons/io5'
import Icon from '../../images/icon.png'
import { useState } from 'react'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  const isWeb = Taro.getEnv() === ENV_TYPE.WEB

  const goBack = async () => {
    Taro.navigateTo({
      url: '/pages/index/index'
    })
  }

  const loginWithGoogle = async () => {
    Toast.show('登录成功')
  }

  const steps = [
    {
      content: '点击这里可以进行语言修改',
      target: 'target'
    }
  ]

  const [showTour, setShowTour] = useState(true)

  return (
    <>
      <NavBar
        back={<ArrowLeft />}
        right={
          <>
            <IoLanguageOutline className='w-4' id='target' onClick={() => setShowTour(false)} />
          </>
        }
        onBackClick={() => goBack()}
      >
        登录
      </NavBar>
      <View className='mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-[520px] flex-col justify-between overflow-auto p-1'>
        <View className='mt-5'>
          <Image src={Icon} width='103' height='103' className='mx-auto text-center' />

          <Form
            labelPosition='top'
            starPosition='left'
            className=''
            footer={
              <>
                <Button size='large' type='info' block>
                  登录
                </Button>
              </>
            }
          >
            <Form.Item required label='邮箱' name='email' rules={[{ required: true, message: '请输入邮箱' }]}>
              <Input className='nut-input-text' placeholder='请输入邮箱' type='email' />
            </Form.Item>
            <Form.Item
              label='密码'
              name='password'
              rules={[
                { max: 15, message: '密码长度不能超过15个字符' },
                { required: true, message: '请输入密码' }
              ]}
            >
              <Input placeholder='请输入密码' maxLength={15} type='password' />
            </Form.Item>
          </Form>
        </View>

        <View className='mb-5'>
          <Divider>或者</Divider>
          <Space direction='vertical' className='mx-auto space-y-2 text-center text-xs text-gray-500'>
            {/* 微信授权登录 */}
            <Button size='large' type='success' block>
              微信授权登录
            </Button>
            {/* H5允许谷歌授权登录 */}
            {isWeb && (
              <Button size='large' type='primary' block onClick={() => loginWithGoogle()}>
                谷歌授权登录
              </Button>
            )}
          </Space>
        </View>
      </View>
      <Tour visible={showTour} onClose={() => setShowTour(false)} list={steps} type='tile' location='bottom-end' />
      <SafeArea position='bottom' />
    </>
  )
}
