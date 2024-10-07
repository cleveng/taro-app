import { Text, View } from '@tarojs/components'
import Taro, { ENV_TYPE, useLoad } from '@tarojs/taro'

import { API } from '#/types/api'
import { Button, Cell, Divider, Form, Input, NavBar, Notify, SafeArea, Space } from '@nutui/nutui-react-taro'

import { NotifyType } from '@nutui/nutui-react-taro/dist/types/packages/notify/notify.taro'
import { useState } from 'react'

import { useUserStore } from '@/store/user'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  const isWeb = Taro.getEnv() === ENV_TYPE.WEB

  const goBack = async () => {
    await Taro.navigateTo({
      url: '/pages/index/index'
    })
  }

  const submitFailed = error => {
    Taro.showToast({ title: JSON.stringify(error), icon: 'error' })
  }

  const [isVisible, SetIsVisible] = useState(false)
  const [states, SetStates] = useState({
    message: '',
    type: 'danger' as NotifyType
  })
  const login = useUserStore(state => state.login)
  const loginWithAccount = async (params: Record<string, string>) => {
    try {
      const res = await Taro.request({
        url: '/auth/login?app=ds',
        data: {
          ...params,
          payload: null
        },
        method: 'POST'
      })

      const { data } = res as unknown as API.Response<string>
      SetStates({
        message: '登录成功',
        type: 'success'
      })
      SetIsVisible(true)
      login(data)
    } catch (e) {
      const { message } = e as API.Response<string>
      console.log(message)
      SetStates({
        message,
        type: 'danger'
      })
      SetIsVisible(true)
    }
  }

  const loginWithWechat = async () => {
    Taro.showToast({ title: '微信快捷登录', icon: 'none' })
  }

  const loginWithGoogle = async () => {
    Taro.showToast({ title: '谷歌快捷登录', icon: 'none' })
  }

  return (
    <>
      {isWeb && (
        <NavBar
          back={<Text>hh</Text>}
          right={
            <>
              <Text>lang</Text>
            </>
          }
          onBackClick={() => goBack()}
        >
          登录
        </NavBar>
      )}
      <Notify
        id='notify'
        visible={isVisible}
        type={states.type}
        onClose={() => {
          SetIsVisible(false)
        }}
        onClick={() => {
          console.log('click')
        }}
      >
        {states.message}
      </Notify>
      <View className={`mx-auto flex min-h-[100vh-50px] w-full flex-col justify-between overflow-auto bg-gray-50 p-1`}>
        <View className='mt-5'>
          <Form
            divider
            labelPosition='top'
            starPosition='left'
            onFinish={values => loginWithAccount(values)}
            onFinishFailed={(_, errors) => submitFailed(errors)}
            footer={
              <>
                <Button size='large' block nativeType='submit' type='info'>
                  登录
                </Button>
              </>
            }
          >
            <Form.Item required label='用户名' name='username' rules={[{ required: true, message: '请输入用户名' }]}>
              <Input placeholder='请输入用户名' type='text' />
            </Form.Item>
            <Form.Item
              label='密码'
              name='password'
              rules={[
                { max: 15, min: 6, message: '密码长度不能超过15个字符' },
                { required: true, message: '请输入密码' }
              ]}
            >
              <Input placeholder='请输入密码' maxLength={15} type='password' />
            </Form.Item>
          </Form>
        </View>

        <View className='mb-5'>
          <Divider>或者</Divider>
          <Space direction='vertical' className='mx-auto space-y-2 text-center text-xs'>
            <Cell className='bg-gray-50 shadow-none'>
              <Button size='large' type='success' block onClick={loginWithWechat}>
                微信授权登录
              </Button>
            </Cell>
            <Cell className='bg-gray-50 shadow-none'>
              <Button size='large' type='primary' block onClick={() => loginWithGoogle()}>
                谷歌授权登录
              </Button>
            </Cell>
          </Space>
        </View>
      </View>

      <SafeArea position='bottom' />
    </>
  )
}
