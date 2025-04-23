<template>
  <div class="load-test">
    <p class="text text---bold text--white">
      HTML готовий (DOMContentLoaded):
      <span class="title title--medium text-align-left">{{ getDOMContentLoaded }}</span>
    </p>
    <p class="text text---bold text--white">
      Час завантаження сторінки:
      <span class="title title--medium text-align-left">{{ getTimeLoadPage }}</span>
    </p>
    <p class="text text---bold text--white">
      Всі ресурси повністю завантажені:
      <span class="title title--medium text-align-left">{{ getTotalLoadPage }}</span>
    </p>
    <p class="text text---bold text--white">
      Час до першого байту:
      <span class="title title--medium text-align-left">{{ getTimeFirstByte }}</span>
    </p>
    <p class="text text---bold text--white">
      Кількість ресурсів:
      <span class="title title--medium text-align-left">{{ getCountResources }}</span>
    </p>
    <p class="text text---bold text--white">
      Об’єм переданих даних:
      <span class="title title--medium text-align-left">{{ getSizeTransferResources }}</span>
    </p>
    <p class="text text---bold text--white">
      Загальна вага всіх ресурсів:
      <span class="title title--medium text-align-left">{{ getSizeAllResources }}</span>
    </p>
  </div>
</template>
<script lang="ts" setup>
import { useTestingStore } from '@/stores/testingStore'
import { computed } from '@vue/reactivity'
import { storeToRefs } from 'pinia'
import { formatToNumber, parseFormatTime, formatBytes } from '@/utils/ formater'

//values
const testingStore = useTestingStore()
const { loadPageTestResult } = storeToRefs(testingStore)

//methods

//computed
const getCountResources = computed((): number => {
  return loadPageTestResult.value ? loadPageTestResult.value.resources.length : 0
})
const getSizeAllResources = computed((): string => {
  const resources = (loadPageTestResult.value?.resources as PerformanceResourceTiming[]) || []
  return formatBytes(
    resources.reduce(
      (total, entry) => total + (entry.encodedBodySize || entry.decodedBodySize || 0),
      0,
    ),
  )
})
const getSizeTransferResources = computed((): string => {
  const resources = (loadPageTestResult.value?.resources as PerformanceResourceTiming[]) || []
  return formatBytes(resources.reduce((total, entry) => total + (entry.transferSize || 0), 0))
})
const getTimeLoadPage = computed((): string => {
  if (!loadPageTestResult.value || !loadPageTestResult.value.calculatedPerformance) return ''
  const parsedFormat = parseFormatTime(loadPageTestResult.value.calculatedPerformance.loadEventEnd)
  return `${formatToNumber(parsedFormat.time)} ${parsedFormat.typeTime}`
})
const getDOMContentLoaded = computed((): string => {
  if (!loadPageTestResult.value || !loadPageTestResult.value.calculatedPerformance) return ''
  const parsedFormat = parseFormatTime(
    loadPageTestResult.value.calculatedPerformance.domContentLoaded,
  )
  return `${formatToNumber(parsedFormat.time)} ${parsedFormat.typeTime}`
})
const getTimeFirstByte = computed((): string => {
  if (!loadPageTestResult.value || !loadPageTestResult.value.calculatedPerformance) return ''
  const parsedFormat = parseFormatTime(
    loadPageTestResult.value.calculatedPerformance.timeToFirstByte,
  )
  return `${formatToNumber(parsedFormat.time)} ${parsedFormat.typeTime}`
})
const getTotalLoadPage = computed((): string => {
  if (!loadPageTestResult.value || !loadPageTestResult.value.calculatedPerformance) return ''
  const parsedFormat = parseFormatTime(
    loadPageTestResult.value.calculatedPerformance.totalLoadPageEnd,
  )
  return `${formatToNumber(parsedFormat.time)} ${parsedFormat.typeTime}`
})
</script>
<style lang="scss" scoped>
.load-test {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
