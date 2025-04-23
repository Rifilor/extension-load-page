import type { IParseFormatTime } from "@/types/Analize"

export const formatToNumber = (value: string | number, fractionDigits: number = 2): number => {
  const num = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(num)) return NaN

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: fractionDigits,
    useGrouping: false,
  })

  return parseFloat(formatter.format(num))
}


export const parseFormatTime = (time: number): IParseFormatTime => {
  const isSecond = time > 1000
  return { time: isSecond ? time / 1000 : time, typeTime: isSecond ? 's' : 'ms' }
}
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Б'

  const k = 1024

  const sizes = ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  const value = bytes / Math.pow(k, i)

  return `${formatToNumber(value)} ${sizes[i]}`
}