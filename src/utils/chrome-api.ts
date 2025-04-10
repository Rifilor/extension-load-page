export const checkChromeAPI = () => {
  if (typeof chrome === 'undefined') {
    throw new Error('Обʼєкт chrome не знайдено (код виконується не в розширенні)')
  }

  const requiredAPIs = ['tabs', 'scripting', 'runtime']
  const missingAPIs = requiredAPIs.filter((api) => !(api in chrome))

  if (missingAPIs.length > 0) {
    throw new Error(`Відсутні API: ${missingAPIs.join(', ')}`)
  }

  return true
}

export const measurePageSpeed = async () => {
  checkChromeAPI()

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  if (!tab?.id) throw new Error('Активна вкладка не знайдена')

  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        // Сучасний спосіб (PerformanceNavigationTiming)
        if ('getEntriesByType' in performance) {
          const [navigation] = performance.getEntriesByType('navigation')
          return navigation ? navigation.duration : 0
        }
        // Запасний варіант (legacy)
        const timing = (performance as any).timing
        return timing ? timing.loadEventEnd - timing.navigationStart : 0
      },
    })

    return results[0]?.result ?? 0
  } catch (error) {
    console.error('Помилка вимірювання:', error)
    return null
  }
}
