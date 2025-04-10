import type { ISpeedTestResult } from '@/types/speedTest'

export const testInternetSpeed = async (): Promise<ISpeedTestResult> => {
  //   console.log('testInternetSpeed')

  try {
    const [downloadSpeed, uploadSpeed, ping] = await Promise.all([
      downloadSpeedPromise(),
      uploadSpeedPromise(),
      pingPromise(),
    ])
    console.log
    return {
      download: downloadSpeed,
      upload: uploadSpeed,
      ping: '' + ping,
    }
  } catch (error) {
    throw new Error(`Помилка вимірювання швидкості ${error}`)
  }
}

// Тест завантаження
const downloadSpeedPromise = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const time_start: number = new Date().getTime()
    const downloadUrl: string =
      'https://upload.wikimedia.org/wikipedia/commons/3/3e/Tokyo_Sky_Tree_2012.JPG'
    const fileSizeInBytes: number = 8185374 // Розмір файлу для завантаження (8MB)
    const downloadImg: HTMLImageElement = new Image()
    downloadImg.src = downloadUrl + '?nn=' + time_start // щоб уникнути кешування
    downloadImg.onload = function () {
      const time_end: number = new Date().getTime()
      const duration: number = (time_end - time_start) / 1000 // Вимірюємо час завантаження
      const downloadSpeed: number = (fileSizeInBytes * 8) / (duration * 1024 * 1024) // Mbps
      resolve(downloadSpeed.toFixed(2))
    }
    downloadImg.onerror = reject
  })
}

// Тест відправки
const uploadSpeedPromise = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadUrl: string = 'https://postman-echo.com/post' // Використовуємо Postman Echo для тесту відправки

    const uploadData: Blob = new Blob([new ArrayBuffer(0.5 * 1024 * 1024)]) // 2MB тестові дані

    const uploadStart: number = new Date().getTime()
    fetch(uploadUrl, { method: 'POST', body: uploadData })
      .then(() => {
        const uploadEnd: number = new Date().getTime()
        const uploadDuration: number = (uploadEnd - uploadStart) / 1000
        const uploadSpeed: number = (5 * 1024 * 1024 * 8) / (uploadDuration * 1024 * 1024) // Mbps
        resolve(uploadSpeed.toFixed(2))
      })
      .catch(reject)
  })
}

// Тест Ping
const pingPromise = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    const pingStart: number = new Date().getTime()
    fetch('https://www.google.com', {
      method: 'HEAD',
      mode: 'no-cors', // Обходимо CORS, але не отримуємо відповіді
    })
      .then(() => {
        const pingEnd: number = new Date().getTime()
        const pingDuration: number = pingEnd - pingStart // ms
        resolve(pingDuration)
      })
      .catch(reject)
  })
}
