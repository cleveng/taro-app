import path from 'path'

import { defineConfig } from '@tarojs/cli'
import { Input } from 'postcss'
import { UnifiedWebpackPluginV5 } from 'weapp-tailwindcss/webpack'

import type { ConfigEnv, UserConfigExport } from '@tarojs/cli'

import devConfig from './dev'
import prodConfig from './prod'

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig<'webpack5'>((merge, _: ConfigEnv) => {
  const baseConfig: UserConfigExport<'webpack5'> = {
    projectName: 'app',
    date: '2024-9-4',
    designWidth: (input?: Input): number => {
      if (input?.file && input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
        return 375
      }

      return 750
    },
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2
    },
    sass: {
      resource: [path.resolve(__dirname, '..', 'src/assets/styles/variables.scss')]
      // data: `@import "@nutui/nutui-react-taro/dist/styles/variables.scss";`
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: ['@tarojs/plugin-html', 'taro-plugin-compiler-optimization'],
    defineConstants: {},
    copy: {
      patterns: [],
      options: {}
    },
    framework: 'react',
    compiler: {
      type: 'webpack5',
      prebundle: {
        force: true,
        enable: false, // <https://nutui.jd.com/taro/react/2x/#/zh-CN/guide/start-react>
        exclude: ['@nutui/nutui-react-taro', '@nutui/icons-react-taro']
      }
    },
    cache: {
      enable: false
    },
    mini: {
      webpackChain(chain, _webpack) {
        chain.merge({
          plugin: {
            tailwind: {
              plugin: UnifiedWebpackPluginV5,
              args: [
                {
                  appType: 'taro',
                  rem2rpx: true
                  // disabled: ['h5', 'harmony', 'rn'].includes(process.env.TARO_ENV)
                }
              ]
            }
          }
        })
      },
      postcss: {
        pxtransform: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
      optimizeMainPackage: {
        enable: true
      }
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',

      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css'
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: true // 默认为 false，如需使用 css modules 功能，则设为 true
        }
      }
    }
  }
  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }

  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})
