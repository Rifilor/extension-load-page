import type { ISettingsType } from '@/types/speedLimitSettings'
import { defineStore } from 'pinia'

interface IState {
  isGlobalLoading: boolean
  speedLimitTest: boolean
  speedLimits: ISettingsType[]
  speedTest: boolean
  loadRequestTest: boolean
  seoTest: boolean
}

export const useDataSettingsStore = defineStore('dataSettingsStore', {
  state: (): IState => ({
    isGlobalLoading: false,
    speedLimitTest: false,
    speedLimits: [],
    speedTest: true,
    loadRequestTest: true,
    seoTest: true,
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
