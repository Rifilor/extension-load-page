import { defineStore } from 'pinia'
import { testInternetSpeed } from '@/utils/speed-test'
import type { ISpeedTestResult } from '@/types/speedTest'
import { useContentJsStore } from '@/stores/contentJsStore'
import type { IResultsPageLoad } from '@/types/Analize'
import type { ISeoItem } from '@/types/Seo'

interface IState {
  speedTestResult: ISpeedTestResult | null
  loadPageTestResult: IResultsPageLoad | null
  seoAnalizeResult: ISeoItem[]
}

export const useTestingStore = defineStore('testing', {
  state: (): IState => ({
    speedTestResult: null,
    loadPageTestResult: null,
    seoAnalizeResult: [],
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
    async asyncGetLoadPageDataTest(): Promise<void> {
      const contentJs = useContentJsStore()
      try {
        const result = await contentJs.contentCallMethod('testLoadPage')
        if (!result) {
          throw new Error('Error during getting data from load page test')
        }
        this.loadPageTestResult = result
      } catch (error) {
        this.loadPageTestResult = null
      }
    },
    async asyncGetSeoTestiongPage(): Promise<void> {
      const contentJs = useContentJsStore()
      try {
        const result = await contentJs.contentCallMethod('analizeSeo')
        if (!result) {
          throw new Error('Error during getting seo testing data')
        }
        this.seoAnalizeResult = result
      } catch (error) {
        this.loadPageTestResult = null
      }
    },
  },
})
