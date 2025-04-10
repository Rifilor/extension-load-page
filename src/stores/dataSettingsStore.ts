import { defineStore } from 'pinia'

interface IState {
  isGlobalLoading: boolean
}

export const useDataSettingsStore = defineStore('dataSettingsStore', {
  state: (): IState => ({
    isGlobalLoading: false
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
