import type {
  INavigatorResult,
  INetworkSetting,
  IPerformanceResult,
  ICalculatedPerformance,
  IResultsPageLoad,
} from '@/types/Analize'
export class Page {
  private networkSettings: INetworkSetting | null
  private iframe: HTMLIFrameElement | null
  private iframeOnLoadListener: EventListener | null = null
  private iframeUrl: string = ''
  private observedProccess: PerformanceObserver | null = null
  private resources: PerformanceEntry[] | [] = []
  private navigatorResult: INavigatorResult | null = null
  private performanceResult: IPerformanceResult | null = null
  private calculatedPerformance: ICalculatedPerformance | null = null
  private startTimeObserve: number = 0
  private finishTimeObserve: number = 0

  constructor(networkSettings?: INetworkSetting) {
    this.networkSettings = networkSettings ? networkSettings : null
    this.iframe = null
    this.setUrlForUploadPage()
  }
  private createIframeElement(): void {
    // if ('caches' in window) {
    //   caches.keys().then(function (cacheNames) {
    //     cacheNames.forEach(function (cacheName) {
    //       caches.delete(cacheName).then(function () {
    //         // console.log('Кеш очищено для: ' + cacheName)
    //       })
    //     })
    //   })
    // }
    const timestamp = Date.now()

    this.iframe = document.createElement('iframe')
    this.iframe.style.position = 'absolute'
    this.iframe.style.top = '-9999px' // Розміщуємо iframe поза екраном
    this.iframe.style.left = '-9999px'
    this.iframe.style.width = '0'
    this.iframe.style.height = '0'
    // this.iframe.style.top = '0px' // Розміщуємо iframe поза екраном
    // this.iframe.style.left = '0px'
    // this.iframe.style.width = '100vw'
    // this.iframe.style.height = '100vh'

    // Отримуємо HTML поточної сторінки
    let html = JSON.parse(JSON.stringify(document.documentElement.outerHTML))

    // Поточний час

    // Додаємо ?nocache до всіх ресурсів
    // html = html.replace(
    //   /(src|href)=["']([^"']+\.(js|css|png|jpg|jpeg|webp|svg|gif))["']/g,
    //   (match, attr, url) => {
    //     const sep = url.includes('?') ? '&' : '?'
    //     console.log(url, attr, `${attr}="${url + sep}nocache=${timestamp}"`)
    //     return `${attr}="${url + sep}nocache=${timestamp}"`
    //   },
    // )
    // html = html.replace(
    //   /(?:src|href)=["']([^"']+\.(js|css|png|jpg|jpeg|webp|svg|gif))["']/g,
    //   (match, attr, url) => {
    //     const sep = url.includes('?') ? '&' : '?'
    //     return `${attr}="${url + sep}nocache=${timestamp} - ${Date.now()}"`
    //   },
    // )

    // Створюємо iframe
    // this.iframe.srcdoc = html
  }
  private removeIframe(): void {
    if (this.iframe && this.iframe.parentNode) {
      this.iframe.parentNode.removeChild(this.iframe)
      this.iframe = null
    }
  }
  private setUrlForUploadPage(): void {
    let currentUrl = window.location.origin + window.location.pathname
    let separator = currentUrl.includes('?') ? '&' : '?'
    this.iframeUrl = currentUrl + separator + `is_iframe=true&nocache=${Date.now()}`
  }
  private setPerformanceResult(timing: PerformanceNavigationTiming): void {
    this.performanceResult = {
      startTime: timing.startTime,
      fetchStart: timing.fetchStart,
      requestStart: timing.requestStart,
      responseStart: timing.responseStart,
      responseEnd: timing.responseEnd,
      domContentLoadedEventEnd: timing.domContentLoadedEventEnd,
      domInteractive: timing.domInteractive,
      loadEventEnd: timing.loadEventEnd,
      duration: timing.duration,
    }
  }
  public getPerformanceResult(): PerformanceNavigationTiming | null {
    return this.performanceResult as PerformanceNavigationTiming | null
  }
  private setCalculatedPerformance(): void {
    const resources = this.getResources()
    const performanceResult = this.getPerformanceResult()
    if (!resources || !performanceResult) return
    const firstRequestTime: number = Math.min(...resources.map((r) => r.startTime))
    const lastResponseTime: number = (resources[resources.length - 1] as any).responseEnd
    // const totalRequestTime: number = lastResponseTime - firstRequestTime
    const domContentLoaded =
      performanceResult.domContentLoadedEventEnd - performanceResult.startTime
    let totalRequestTime: number = lastResponseTime + domContentLoaded
    const loadEventEnd = performanceResult.loadEventEnd - performanceResult.startTime
    totalRequestTime = loadEventEnd > totalRequestTime ? loadEventEnd + 50 : totalRequestTime
    // console.log('totalRequestTime', totalRequestTime, firstRequestTime, lastResponseTime)
    this.calculatedPerformance = {
      responseStart: performanceResult.responseStart - performanceResult.startTime,
      domContentLoaded: domContentLoaded,
      loadEventEnd: loadEventEnd,
      timeToFirstByte: performanceResult.responseStart - performanceResult.startTime,
      totalLoadPageEnd: totalRequestTime,
    }
  }
  public getCalculatePerformance(): ICalculatedPerformance | null {
    return this.calculatedPerformance
  }
  private startPerformanceObserved(): void {
    this.observedProccess = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      // console.log(list.getEntries())
      entries.forEach((entry) => {
        // console.log('Запит у iframe:', entry)
      })
    })
    this.observedProccess.observe({
      entryTypes: [
        'navigation',
        'resource',
        'paint',
        'longtask',
        'first-input',
        'largest-contentful-paint',
        'layout-shift',
      ],
      buffered: false,
    })
  }
  private stopPerformanceObserving(): void {
    if (!this.observedProccess) return
    this.observedProccess.disconnect()
    // console.log('Observation stopped');
  }
  private async startLoadPage(): Promise<void> {
    this.createIframeElement()
    this.startPerformanceObserved()
    this.startLoadIframeSetSrc()
    await this.registerEventIframeOnLoad() // wait load page and set data
    this.setCalculatedPerformance()
  }
  private stopPage(): void {
    this.stopPerformanceObserving()
    this.removeIframeOnLoadListener()
    this.removeIframe()
  }
  private removeIframeOnLoadListener(): void {
    if (this.iframe && this.iframeOnLoadListener) {
      this.iframe.onload = null // Видаляємо слухач події
      this.iframeOnLoadListener = null // Очищаємо змінну
    }
  }
  private startLoadIframeSetSrc(): void {
    if (!this.iframe) return
    document.body.appendChild(this.iframe)
    this.iframe.src = this.iframeUrl
  }
  private setResources(entries: PerformanceEntry[]): void {
    let entriesFilter: PerformanceEntry[] = entries
    const index: number = entriesFilter.findIndex((r: any) => r.initiatorType === 'iframe')
    entriesFilter = index !== -1 ? entriesFilter.slice(0, index) : entriesFilter
    this.resources = entriesFilter.sort((a: any, b: any) => a.responseEnd - b.responseEnd)
  }
  public getResources(): PerformanceResourceTiming[] {
    return this.resources.filter(
      (el: any) => el.entryType && el.entryType == 'resource',
    ) as PerformanceResourceTiming[]
  }
  public getRequests(): PerformanceEntry[] {
    return this.resources
  }
  private setNavigatorResult(navigatorConnection: INavigatorResult) {
    this.navigatorResult = navigatorConnection
  }
  public getNavigatorResult(): INavigatorResult | null {
    return this.navigatorResult
  }
  private async registerEventIframeOnLoad(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.iframe) {
        reject(new Error('Iframe not created'))
        return
      }
      this.startTimeObserve = performance.now()
      performance.mark('start')
      this.iframeOnLoadListener = () => {
        // console.log('Сторінка в iframe завантажена')
        if (!this.iframe) {
          reject(new Error('Iframe not created'))
          return
        }

        // Коли сторінка в iframe завантажена, відслідковуємо запити в цьому iframe
        const iframeDocument =
          (this.iframe && this.iframe.contentDocument) ||
          (this.iframe.contentWindow && this.iframe.contentWindow.document)

        // Перевіряємо, чи документ iframe доступний
        if (!iframeDocument) {
          reject(new Error('IiframeDocument not allowed'))
          return
        }
        // Додаємо PerformanceObserver для iframe

        // Можна додатково додати таймер для логу запитів
        setTimeout(() => {
          if (!this.iframe) return
          const iframePerf = this.iframe.contentWindow?.performance

          if (iframePerf) {
            const entries = iframePerf.getEntriesByType('resource')
            this.setResources(entries)
          }
          // this.setResources(performance.getEntries())
          const connection =
            navigator && (navigator as Navigator & { connection?: any }).connection
              ? (navigator as Navigator & { connection?: any }).connection
              : null
          if (connection) this.setNavigatorResult(connection)
          const timing = performance.getEntriesByType(
            'navigation',
          )[0] as PerformanceNavigationTiming
          if (timing) this.setPerformanceResult(timing)
          // this.startTimeObserve = performance.now()
          // performance.mark('end')
          // Вимірюємо час між мітками 'start' і 'end'
          // performance.measure('codeExecution', 'start', 'end')

          // Отримуємо записи вимірювань
          // const entries = performance.getEntriesByName('codeExecution')
          // console.log('entries', entries) // Виводимо результат вимірювання
          resolve()
        }, 3000)
      }

      this.iframe.onload = this.iframeOnLoadListener
    })
  }

  public async analyze(): Promise<void> {
    await this.startLoadPage()
    this.stopPage()
  }

  public getResults(): IResultsPageLoad {
    return {
      resources: this.getResources(),
      allRequsts: this.getRequests(),
      navigator: this.getNavigatorResult(),
      performance: this.getPerformanceResult(),
      calculatedPerformance: this.getCalculatePerformance(),
    }
  }
}
