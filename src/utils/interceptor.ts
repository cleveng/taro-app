import { appid, baseURL, isDev, version } from '../config'

import { useUserStore } from '../store/user'

import type { Chain } from '@tarojs/taro'

export const interceptor = (chain: Chain) => {
  const requestParams = chain.requestParams
  const { method, data, url } = requestParams

  if (!url.startsWith('https://')) {
    requestParams.url = url.startsWith('/') ? `${baseURL}${url}` : `${baseURL}/${url}`
  }

  if (isDev) {
    console.log(`http ${method || 'GET'} --> ${requestParams.url} data: `, data)
  }

  // 组件外使用 zustand
  const token = useUserStore.getState().token

  requestParams.header = {
    ...requestParams.header,
    'Content-Type': 'application/json',
    'Mp-Version': version,
    Appid: appid,
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }

  return chain.proceed(requestParams).then(res => {
    if (isDev) {
      console.log(`http <-- ${requestParams.url} result:`, res)
    }

    if (res.statusCode === 200) {
      return Promise.resolve(res.data)
    }

    return Promise.reject(res.data)
  })
}
