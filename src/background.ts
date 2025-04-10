// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === 'getPerformanceData') {
//     const performanceData = [
//       { id: 1, name: 'Load Time', value: '1.2s' },
//       { id: 2, name: 'Render Time', value: '500ms' },
//     ]
//     sendResponse(performanceData)
//   } else {
//     console.log(message.data)
//   }
//   return true
// })

// chrome.runtime.onInstalled.addListener(() => {
//   console.log('loaded')
//   chrome.scripting.registerContentScripts([
//     {
//       id: 'content-script',
//       matches: ['<all_urls>'],
//       js: ['content.js'],
//       runAt: 'document_idle',
//     },
//   ])
// })
// background.js
// background.js
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log('🔊 Message received:', message);

//     if (message.type === 'performanceData') {
//       console.log('📊 Performance Data Received:', message.data);

//       // Відправляємо ці дані до popup
//       chrome.runtime.sendMessage({
//         type: 'performanceResult',
//         data: message.data
//       });
//     }

//     if (message.type === 'performanceError') {
//       console.log('⚠️ Performance Error:', message.data);
//       chrome.runtime.sendMessage({
//         type: 'performanceError',
//         data: message.data
//       });
//     }

//     return true;
//   });

// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('🔊 Message received:', message)

  if (message.type === 'performanceResult') {
    console.log('📊 Performance Data Received:', message.data)

    // Отримуємо поточний сайт (протокол + домен)
    const currentOrigin = window.location.origin

    // Очищаємо кеш для поточного сайту
    chrome.browsingData.remove(
      {
        origins: [currentOrigin],
      },
      {
        cache: true,
      },
      function () {
        console.log(`Кеш для сайту ${currentOrigin} очищено`)
      },
    )
    // Відправляємо ці дані до popup
    chrome.runtime.sendMessage({
      type: 'performanceResult',
      data: message.data,
    })
  }

  return true
})

function throttleNetwork(tabId: any, latency = 200, downloadKbps = 500, uploadKbps = 500) {
  // imitation throtling
  chrome.debugger.attach({ tabId: tabId }, '1.3', () => {
    chrome.debugger.sendCommand({ tabId: tabId }, 'Network.enable', () => {
      chrome.debugger.sendCommand({ tabId: tabId }, 'Network.emulateNetworkConditions', {
        offline: false,
        latency: latency,
        downloadThroughput: (downloadKbps * 1024) / 8,
        uploadThroughput: (uploadKbps * 1024) / 8,
        connectionType: 'cellular3g', // опціонально, просто для інформації
      })
    })
  })
}

function resetNetworkConditions(tabId: any) {
  // reset throtling
  chrome.debugger.sendCommand({ tabId: tabId }, 'Network.disable', () => {
    chrome.debugger.detach({ tabId: tabId }, () => {
      console.log(`Throttle disabled on tab ${tabId}`)
    })
  })
}

//Приклад використання можна перекигути у content.js я так думаю
// chrome.action.onClicked.addListener((tab) => {
//   // Toggle throttling
//   const isThrottled = true; // Зроби тут логіку, якщо хочеш перемикання
//   if (isThrottled) {
//     throttleNetwork(tab.id, 200, 500, 500);
//   } else {
//     resetNetworkConditions(tab.id);
//   }
// });

//потрібно очищення кешу зробити окремим методом і визивати його окремо і також функції тротлінга скоріше за всі підвязати до content.js до метода аналізу а тауда передавати що юзер натикав у світчах при аналізі
