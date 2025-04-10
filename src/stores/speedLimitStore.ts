import type { ISettingsType } from '@/types/speedLimitSettings'
import { defineStore } from 'pinia'

interface IState {
  settingsTypes: ISettingsType[]
}

export const useSpeedLimitStore = defineStore('speed-limit', {
  state: (): IState => ({
    settingsTypes: [
      {
        name: '4G/LTE',
        download: 30000, // 30,000 Кбіт/с (30 Мбіт/с)
        upload: 10000, // 10,000 Кбіт/с (10 Мбіт/с)
        latency: 30, // 30 мс
      },
      {
        name: '3G',
        download: 3000, // 3,000 Кбіт/с (3 Мбіт/с)
        upload: 1000, // 1,000 Кбіт/с (1 Мбіт/с)
        latency: 100, // 100 мс
      },
      {
        name: 'Власне',
        download: 1000, // 3,000 Кбіт/с (3 Мбіт/с)
        upload: 1000, // 1,000 Кбіт/с (1 Мбіт/с)
        latency: 1, // 100 мс
      },
      {
        name: 'Offline',
        download: 0, // 3,000 Кбіт/с (3 Мбіт/с)
        upload: 0, // 1,000 Кбіт/с (1 Мбіт/с)
        latency: 0, // 100 мс
      },
    ],
  }),

  getters: {
    // doubleCount: (state) => state.count * 2,
    // greeting: (state) => `Hello, ${state.name}!`
  },

  actions: {
    // increment() {
    //   this.count++
    // },
    // async fetchData() {
    //   const response = await fetch('https://api.example.com/data')
    //   this.data = await response.json()
    // }
  },
})
