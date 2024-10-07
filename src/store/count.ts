import { getStorageSync, removeStorageSync, setStorageSync } from '@tarojs/taro'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { version } from '../config'

const asyncLocalStorage = {
  getItem: getStorageSync,
  setItem: setStorageSync,
  removeItem: removeStorageSync
}

export interface CountSlice {
  value: number
  increase: (by?: number) => void
}

export const useCountStore = create<CountSlice>()(
  persist(
    (set, get) => ({
      value: 0,
      increase: (by = 1) => set({ value: get().value + by })
    }),
    {
      name: 'count',
      version: parseInt(version.replaceAll('.', ''), 10),
      partialize: state => ({ value: state.value }),
      storage: createJSONStorage(() => asyncLocalStorage)
    }
  )
)
