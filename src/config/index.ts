import pkg from '../../package.json'

export const appid = pkg.appid
export const version = pkg.version
export const isDev = process.env.NODE_ENV === 'development'
export const baseURL = process.env.TARO_APP_API
