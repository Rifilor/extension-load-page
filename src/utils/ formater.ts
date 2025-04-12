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
