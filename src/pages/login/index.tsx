import { Text, View } from '@tarojs/components'
import Taro, { ENV_TYPE, useLoad } from '@tarojs/taro'

import { Button, Divider, Form, Input, NavBar, SafeArea, Space } from '@nutui/nutui-react-taro'

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

  const loginWithGoogle = async () => {
    Taro.showToast({ title: '登录成功', icon: 'none' })
  }

  const loginWithWechat = async () => {
    Taro.showToast({ title: '开始请求', icon: 'none' })
    try {
      const res = await Taro.login()
      try {
        const value = await Taro.request({
          url: 'https://www.awish.vip/auth/wechat/callback?app=ds',
          data: {
            state: '',
            code: res.code
          },
          header: {
            appid: 'dsc6805f597d8c411e'
          },
          method: 'POST'
        })
        console.log(value)
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
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
      <View className={`mx-auto flex w-full max-w-[520px] flex-col justify-between overflow-auto p-1`}>
        <View className='mt-5'>
          <Form
            labelPosition='top'
            starPosition='left'
            className='p-0'
            footer={
              <>
                <Button block type='info' onClick={loginWithWechat}>
                  登录
                </Button>
              </>
            }
          >
            <Form.Item required label='用户名' name='account' rules={[{ required: true, message: '请输入用户名' }]}>
              <Input placeholder='请输入用户名' type='text' />
            </Form.Item>
            <Divider />
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
            <Button size='large' type='success' block>
              微信授权登录
            </Button>
            {isWeb && (
              <Button size='large' type='primary' block onClick={() => loginWithGoogle()}>
                谷歌授权登录
              </Button>
            )}
          </Space>
        </View>
      </View>

      <SafeArea position='bottom' />
    </>
  )
}
