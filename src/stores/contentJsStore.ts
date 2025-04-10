// import type { IMethodsContent } from './../types/ContentMethods.d'
// import { defineStore } from 'pinia'

// interface IState {
//   //   isGlobalLoading: boolean
// }

// export const useContentJsStore = defineStore('contentJs', {
//   state: (): IState => ({
//     // isGlobalLoading: false
//   }),

//   getters: {
//     // doubleCount: (state) => state.count * 2,
//     // greeting: (state) => `Hello, ${state.name}!`
//   },

//   actions: {
//     async contentCallMethod<K extends keyof IMethodsContent>(
//       methodName: K,
//       methodsData?: Parameters<IMethodsContent[K]>[0],
//     ): Promise<any> {
//       return new Promise((resolve, reject) => {
//         try {
//           chrome.tabs.query({ active: true, currentWindow: true }, async (tabs: any) => {
//             // if (!tabs.length) {
//             //   throw new Error('Немає активної вкладки')
//             // }
//             const tab = tabs[0]
//             if (!tab || !tab.id) {
//               return reject(new Error('Active tab not found'))
//             }

//             const tabId = tab.id

//             // Генеруємо тип відповіді
//             const resultAction = `${methodName}Result`

//             // Слухаємо відповіді
//             const listener = (message: any, sender: any, sendResponse: any) => {
//               alert(11 + ' ' + JSON.stringify(message.data))

//               if (message?.action === resultAction && sender.tab?.id === tabId) {
//                 chrome.runtime.onMessage.removeListener(listener)
//                 resolve(message.data)
//               }
//             }

//             chrome.runtime.onMessage.addListener(listener)

//             chrome.tabs.sendMessage(
//               tabId,
//               {
//                 action: methodName,
//                 data: methodsData,
//               },
//               (response) => {
//                 // alert('await chrome.tabs.send - ' + response)
//                 console.log('await chrome.tabs.sendM', JSON.stringify(response))
//                 if (chrome.runtime.lastError) {
//                   // alert('lastError')
//                   // console.log('chrome.runtime.lastError')
//                   // chrome.runtime.onMessage.removeListener(listener)
//                   // return reject(chrome.runtime.lastError)
//                 }
//               },
//             )
//           })
//         } catch (error) {
//           console.error('Error contentJsStore.ts: ' + error)
//           return reject(error)
//         }
//       })
//     },
//     // increment() {
//     //   this.count++
//     // },
//     // async fetchData() {
//     //   const response = await fetch('https://api.example.com/data')
//     //   this.data = await response.json()
//     // }
//   },
// })

import type { IMethodsContent } from './../types/ContentMethods.d'
import { defineStore } from 'pinia'

interface IState {
  //   isGlobalLoading: boolean
}

export const useContentJsStore = defineStore('contentJs', {
  state: (): IState => ({
    // isGlobalLoading: false
  }),

  getters: {
    // doubleCount: (state) => state.count * 2,
    // greeting: (state) => `Hello, ${state.name}!`
  },

  actions: {
    async contentCallMethod<K extends keyof IMethodsContent>(
      methodName: K,
      methodsData?: Parameters<IMethodsContent[K]>[0],
    ): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          chrome.tabs.query({ active: true, currentWindow: true }, async (tabs: any) => {
            // if (!tabs.length) {
            //   throw new Error('Немає активної вкладки')
            // }
            const tab = tabs[0]
            if (!tab || !tab.id) {
              return reject(new Error('Active tab not found'))
            }

            const tabId = tab.id

            // Генеруємо тип відповіді
            const resultAction = `${methodName}Result`

            // Слухаємо відповіді
            const listener = (message: any, sender: any, sendResponse: any) => {
              // alert(11 + ' ' + JSON.stringify(message.data))

              if (message?.action === resultAction && sender.tab?.id === tabId) {
                chrome.runtime.onMessage.removeListener(listener)
                resolve(message.data)
              }
            }

            chrome.runtime.onMessage.addListener(listener)

            chrome.tabs.sendMessage(
              tabId,
              {
                action: methodName,
                data: methodsData,
              },
              (response) => {
                // alert('await chrome.tabs.send - ' + response)
                console.log('await chrome.tabs.sendM', JSON.stringify(response))
                if (chrome.runtime.lastError) {
                  // alert('lastError')
                  // console.log('chrome.runtime.lastError')
                  // chrome.runtime.onMessage.removeListener(listener)
                  // return reject(chrome.runtime.lastError)
                }
              },
            )
          })
        } catch (error) {
          console.error('Error contentJsStore.ts: ' + error)
          return reject(error)
        }
      })
    },
    // increment() {
    //   this.count++
    // },
    // async fetchData() {
    //   const response = await fetch('https://api.example.com/data')
    //   this.data = await response.json()
    // }
  },
})
