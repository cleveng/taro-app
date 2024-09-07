import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'
import {
  Button,
  Form,
  Input,
  TextArea,
} from '@nutui/nutui-react'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='mx-auto min-h-screen w-screen max-w-screen-md overflow-auto'>
      <div className='p-6'>
        <div className='grid w-full grid-cols-1 items-center justify-center text-left'>
          <div>
            <h2 className='text-lg font-medium tracking-tighter text-gray-600 lg:text-3xl'>Starter</h2>
            <Text className='mt-2 text-sm text-gray-500'>Suitable to grow steadily.</Text>
          </div>
          <div className='mt-6'>
            <p>
              <span className='text-5xl font-light tracking-tight text-black'>$25</span>
              <span className='text-base font-medium text-gray-500'> /mo </span>
            </p>
          </div>
        </div>
      </div>

      <Form
        labelPosition="right"
        footer={
          <>
            <Button nativeType="submit" block type="primary">
              提交
            </Button>
          </>
        }
      >
        <Form.Item
          align="center"
          required
          label="字段A"
          name="username"
          rules={[
            { max: 5, message: '字段A不能超过5个字' },
            { required: true, message: '请输入字段A' },
          ]}
        >
          <Input
            className="nut-input-text"
            placeholder="请输入字段A"
            type="text"
          />
        </Form.Item>
        <Form.Item
          label="字段D"
          name="address"
          rules={[
            { max: 15, message: '字段D不能超过15个字' },
            { required: true, message: '请输入字段D' },
          ]}
        >
          <TextArea placeholder="请输入字段D" maxLength={100} />
        </Form.Item>
      </Form>
    </View>
  )
}
