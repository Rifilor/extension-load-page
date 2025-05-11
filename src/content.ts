console.log('✅ Content script loaded 2!')
import type { IMethodsContent } from './types/ContentMethods'
import { Page } from './modules/pageModule'
import { getAnalyzeSeo } from './utils/seo-analyze'

const func: IMethodsContent = {
  testLoadPage: async () => {
    try {
      // console.log('Starting page analysis...')
      const page = new Page()

      // Option 1: Get metrics
      await page.analyze()
      // console.log('getResults:', page.getResults())
      // console.log('Resources:', metrics.resources)
      // console.log('metrics:', metrics)
      chrome.runtime.sendMessage({
        action: 'testLoadPageResult',
        data: page.getResults(),
      })
      // chrome.runtime.sendMessage({ action: 'sendData', data: 'Твої дані тут 11' })

      // // Option 2: Log detailed information
      // await page.logAnalysisResults()

      // // Clean up when done
      // page.destroy()
    } catch (error) {
      console.error('Page analysis failed:', error)
    }
  },
  analizeSeo: async () => {
    try {
      console.log('analizeSeo')
      chrome.runtime.sendMessage({
        action: 'analizeSeoResult',
        data: getAnalyzeSeo(),
      })
    } catch (error) {
      console.error('Seo analysis failed:', error)
    }
  },
}

chrome.runtime.onMessage.addListener(
  <K extends keyof IMethodsContent>(
    message: { action: K; data: Parameters<IMethodsContent[K]>[0] },
    sender: any,
    sendResponse: any,
  ) => {
    console.log('message', message)
    // if (message.action === 'testLoadPage') {
    try {
      console.log(1)
      const method = func[message.action]
      console.log(typeof method)
      if (typeof method === 'function') {
        console.log(method.length > 0 && message.data !== undefined)
        if (method.length > 0 && message.data !== undefined) {
          //@ts-ignore
          method(message.data)
        } else if (method.length === 0) {
          method()
        } else {
          console.error(`Method ${message.action} expects no arguments but received data.`)
        }
      }
      sendResponse({ result: 'ok' }) // ОБОВ’ЯЗКОВО

      return true
    } catch (error) {
      sendResponse({ result: 'ne ok' }) // ОБОВ’ЯЗКОВО

      return false
    }
    // }
  },
)

console.log(323423423)
