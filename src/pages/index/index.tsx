import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'

import { Button, Tag, Price, Dialog, Image, Toast } from '@nutui/nutui-react'
import Taro from '@tarojs/taro'
import { toBase64String } from '@cakioe/kit.js'
import { useState } from 'react'

export default function Index() {
  useLoad(async () => {
    await initData()
    console.log('Page loaded.')
  })

  const header: any = {
    'content-type': 'application/json',
    Appid: 'ds59179408415a4877',
    AppSecret: 'b443faa02a3a8d64515937a5bb67a80551f3b492'
  }

  const no = '16327130'
  const [products, setProducts] = useState([])

  const initData = async () => {
    try {
      const res = await Taro.request({
        url: 'https://www.awish.vip/api/openapi/v1/products',
        header: header,
        method: 'POST',
        data: {
          payload: toBase64String(
            {
              machine_no: no,
              per_page: 100
            },
            'kva'
          )
        }
      })
      const { data } = res.data as any
      setProducts(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const [id, setId] = useState(160)
  const onSubmit = async (item: any) => {
    Dialog.alert({
      className: 'dialog-func',
      title: `${item.good.name}`,
      header: <Image src={item.good.thumb} />,
      content: `需要支付: ${item.good.price}元`,
      onConfirm: async () => {
        const { data: res, statusCode } = await Taro.request({
          url: 'https://www.awish.vip/api/openapi/v1/orders',
          header: header,
          method: 'POST',
          data: {
            machine_no: no,
            notify_url: 'https://ou.microaircon.com/index.php/shop/api.awish_open/callBackUrl',
            trade_id: new Date().getTime().toString(),
            products: [
              {
                product_id: item.id,
                quantity: 1
              }
            ]
          }
        })
        if (statusCode !== 200) {
          const { message } = res
          Toast.show(`下单失败, 错误: ${message}`)
          return
        }

        const { data } = res as any
        setId(data.order_id)
        Toast.show(`${data.order_id} 下单成功`)
      }
    })
  }

  const onUpdate = async (status: string) => {
    const { data, statusCode } = await Taro.request({
      url: `https://www.awish.vip/api/openapi/v1/orders/${id}`,
      header: header,
      method: 'PUT',
      data: {
        payload: toBase64String(
          {
            machine_no: no,
            status: status
          },
          'kva'
        )
      }
    })
    if (statusCode !== 200) {
      const { message } = data
      Toast.show(`订单: ${id}, 错误: ${message}`)
      return
    }

    Toast.show(`订单: ${id}, 更新成功`)
  }

  const [order, setOrder] = useState('')
  const onQuery = async () => {
    const { data: res, statusCode } = await Taro.request({
      url: `https://www.awish.vip/api/openapi/v1/orders/${id}`,
      header: header,
      method: 'POST',
      data: {
        payload: toBase64String(
          {
            machine_no: no
          },
          'kva'
        )
      }
    })
    if (statusCode !== 200) {
      const { message } = res
      Toast.show(`查询订单: ${id}, 错误: ${message}`)
      return
    }

    const { data } = res
    if (data.records) {
      setRecordId(data.records[0].id)
    }
    setOrder(JSON.stringify(data, null, 2))
  }

  const [result, setResult] = useState('')

  const [recordId, setRecordId] = useState(0)
  const onDelivery = async () => {
    if (recordId === 0) {
      await onQuery()
    }
    const { data: res, statusCode } = await Taro.request({
      url: `https://www.awish.vip/api/openapi/v1/deliveries`,
      header: header,
      method: 'POST',
      data: {
        payload: toBase64String(
          {
            machine_no: no,
            order_id: id,
            record_id: recordId,
            method: 'device.delivery.put'
          },
          'kva'
        )
      }
    })

    if (statusCode !== 200) {
      const { message } = res
      Toast.show(`出货失败: ${id}, 错误: ${message}`)
      return
    }

    const { data } = res
    setDeliveryId(data.delivery_id)
    setResult(JSON.stringify(data, null, 2))

    Toast.show(`订单: ${id}, 出货成功`)
  }

  const [deliveryId, setDeliveryId] = useState(0)
  const queryDelivering = async () => {
    if (deliveryId === 0) {
      await onDelivery()
    }

    const { data: res, statusCode } = await Taro.request({
      url: `https://www.awish.vip/api/openapi/v1/deliveries/${deliveryId}`,
      header: header,
      method: 'POST',
      data: {
        payload: toBase64String(
          {
            machine_no: no
          },
          'kva'
        )
      }
    })

    if (statusCode !== 200) {
      const { message } = res
      Toast.show(`出货失败: ${id}, 错误: ${message}`)
      return
    }

    const { data } = res as any
    setResult(JSON.stringify(data, null, 2))
  }

  return (
    <>
      <View className='container mx-auto h-auto min-h-screen w-full max-w-screen-md bg-gray-50 p-1'>
        {order && <View>{order}</View>}
        {result && <View>{result}</View>}
        {id && (
          <View className='mb-10 space-y-3 bg-white p-1'>
            <View className='grid grid-cols-3 gap-1.5'>
              <Button type='info' onClick={() => onUpdate('1')}>
                设已支付
              </Button>
              <Button type='info' onClick={() => onUpdate('3')}>
                取消订单
              </Button>
              <Button type='info' onClick={onQuery}>
                查询订单
              </Button>
            </View>
            <View className='grid grid-cols-2 gap-1.5'>
              <Button type='info' onClick={() => onDelivery()}>
                发起出货
              </Button>
              <Button type='info' onClick={() => queryDelivering()}>
                查询出货
              </Button>
            </View>
          </View>
        )}

        <View className='grid grid-cols-2 gap-1.5'>
          {products.map((item: any) => (
            <View key={item.id} className='relative rounded bg-white p-1 shadow'>
              <img src={item.good.thumb} className='rounded' />
              <Tag type='primary' className='absolute left-0 top-0'>
                {item.channel.name}
              </Tag>
              <View className='flex items-center justify-between'>
                <Price price={item.good.price} size='large' thousands />
                <Button type='info' size='mini' onClick={() => onSubmit(item)}>
                  购买
                </Button>
              </View>
            </View>
          ))}
        </View>
      </View>
    </>
  )
}
