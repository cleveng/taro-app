import { getStorageSync, removeStorageSync, setStorageSync } from '@tarojs/taro'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { version } from '../config'

const asyncLocalStorage = {
  getItem: getStorageSync,
  setItem: setStorageSync,
  removeItem: removeStorageSync
}

export interface UserSlice {
  loggedIn: boolean
  token: string | null
  login: (token: string) => void
  logout: () => void
}

export const useUserStore = create<UserSlice>()(
  persist(
    (set, _) => ({
      loggedIn: false,
      token: null,
      login: (token: string) => {
        set({ loggedIn: true, token })
      },
      logout: () => {
        set({ loggedIn: false, token: null })
      }
    }),
    {
      name: 'user',
      version: parseInt(version.replaceAll('.', ''), 10),
      partialize: state => ({ loggedIn: state.loggedIn, token: state.token }),
      storage: createJSONStorage(() => asyncLocalStorage)
    }
  )
)
