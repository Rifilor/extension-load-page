// import { testInternetSpeed } from '@/utils/speed-test'

console.log('✅ Content script loaded 2!')

import type { IMethodsContent } from './types/ContentMethods'
import { Page } from './modules/pageModule'

// const appendNoCacheParam = (url: string) => {
//   if (!url) return url
//   const sep = url.includes('?') ? '&' : '?'
//   return `${url}${sep}nocache=${Date.now()}`
// }

// const updateSrcOrHref = (el: HTMLElement) => {
//   if (el instanceof HTMLImageElement && el.src) {
//     el.src = appendNoCacheParam(el.src)
//   } else if (el instanceof HTMLScriptElement && el.src) {
//     el.src = appendNoCacheParam(el.src)
//   } else if (el instanceof HTMLLinkElement && el.href && el.rel === 'stylesheet') {
//     el.href = appendNoCacheParam(el.href)
//   }
// }

// const observeAndPatchResources = () => {
//   const observer = new MutationObserver((mutations) => {
//     for (const mutation of mutations) {
//       for (const node of mutation.addedNodes) {
//         if (!(node instanceof HTMLElement)) continue

//         updateSrcOrHref(node)

//         // обходимо дочірні елементи, якщо це контейнер
//         node
//           .querySelectorAll?.('img[src],script[src],link[rel="stylesheet"]')
//           .forEach(updateSrcOrHref)
//       }
//     }
//   })

//   observer.observe(document.documentElement || document.body, {
//     childList: true,
//     subtree: true,
//   })

//   // одразу патчимо вже наявні елементи на сторінці
//   document.querySelectorAll('img[src],script[src],link[rel="stylesheet"]').forEach(updateSrcOrHref)
// }

// // запускаємо
// observeAndPatchResources()

const func: IMethodsContent = {
  test: async () => {
    try {
      console.log('Starting page analysis...')
      const page = new Page()

      // Option 1: Get metrics
      await page.analyze()
      console.log('getResults:', page.getResults())
      // console.log('Resources:', metrics.resources)
      // console.log('metrics:', metrics)
      console.log(1)
      chrome.runtime.sendMessage({
        action: 'testResult',
        data: page.getResults(),
      })
      chrome.runtime.sendMessage({ action: 'sendData', data: 'Твої дані тут 11' })

      console.log(2)
      // // Option 2: Log detailed information
      // await page.logAnalysisResults()

      // // Clean up when done
      // page.destroy()
    } catch (error) {
      console.error('Page analysis failed:', error)
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
    // if (message.action === 'test') {
    try {
      const method = func[message.action]

      if (typeof method === 'function') {
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
  },
  // },
)

console.log(323423423)
