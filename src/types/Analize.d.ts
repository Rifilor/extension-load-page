export interface INetworkSetting {
  upload: number
  download: number
  pong: number
}
export interface INavigatorResult {
  effective_connection_type: string
  downlink: string
  rtt: string
}
export interface IPerformanceResult {
  startTime: number
  fetchStart: number
  requestStart: number
  responseStart: number
  responseEnd: number
  domContentLoadedEventEnd: number
  domInteractive: number
  loadEventEnd: number
  duration: number
}
export interface ICalculatedPerformance {
  responseStart: number
  domContentLoaded: number
  loadEventEnd: number
  timeToFirstByte: number
  totalLoadPageEnd: number
}
export interface IResultsPageLoad {
  resources: PerformanceResourceTiming[]
  allRequsts: PerformanceEntry[]
  navigator: INavigatorResult | null
  performance: PerformanceNavigationTiming | null
  calculatedPerformance: ICalculatedPerformance | null
}

export interface IParseFormatTime {
  time: number
  typeTime: 'ms' | 's'
}
