self.addEventListener('message', (event) => {
  if (event.data.action === 'throttle') {
    //@ts-ignore
    self.throttleConfig = event.data
  }
})

self.addEventListener('fetch', (event) => {
  //@ts-ignore
  if (!self.throttleConfig) return
  //@ts-ignore
  const { download, upload, latency } = self.throttleConfig
  const delay = latency / 1000 // Перетворюємо мс у сек

  // Імітація затримки
  //@ts-ignore
  event.respondWith(
    new Promise((resolve) => {
      setTimeout(async () => {
        //@ts-ignore
        const response = await fetch(event.request)
        const cloned = response.clone()
        resolve(cloned)
      }, delay * 1000)
    }),
  )
})
