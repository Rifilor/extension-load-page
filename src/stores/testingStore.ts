import { defineStore } from 'pinia'
import { testInternetSpeed } from '@/utils/speed-test'
import type { ISpeedTestResult } from '@/types/speedTest'

interface IState {
  speedTestResult: ISpeedTestResult | null
}

export const useTestingStore = defineStore('testing', {
  state: (): IState => ({
    speedTestResult: null,
  }),
  actions: {
    async asyncGetSpeedTest(): Promise<void> {
      try {
        const result: ISpeedTestResult = await testInternetSpeed()
        if (!result) {
          throw new Error('Error during getting data from speed test')
        }
        this.speedTestResult = result
      } catch (error) {
        console.error('Помилка отримання швидкості інтернета: ' + error)
        this.speedTestResult = null
        throw error
      }
    },
  },
})
