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
import { formatToNumber } from '@/utils/ formater'

//values
const testingStore = useTestingStore()
const { loadPageTestResult } = storeToRefs(testingStore)

//computed
const getCountResources = computed((): number => {
  return loadPageTestResult.value ? loadPageTestResult.value.resources.length : 0
})
const getSizeAllResources = computed((): number => {
  const resources = (loadPageTestResult.value?.resources as PerformanceResourceTiming[]) || []
  return formatToNumber(
    resources.reduce(
      (total, entry) => total + (entry.encodedBodySize || entry.decodedBodySize || 0),
      0,
    ),
  )
})
const getSizeTransferResources = computed((): number => {
  const resources = (loadPageTestResult.value?.resources as PerformanceResourceTiming[]) || []
  return formatToNumber(resources.reduce((total, entry) => total + (entry.transferSize || 0), 0))
})
const getTimeLoadPage = computed(() => {
  if (!loadPageTestResult.value || !loadPageTestResult.value.calculatedPerformance) return 0
  return formatToNumber(loadPageTestResult.value.calculatedPerformance.loadEventEnd)
})
const getDOMContentLoaded = computed(() => {
  if (!loadPageTestResult.value || !loadPageTestResult.value.calculatedPerformance) return 0
  return formatToNumber(loadPageTestResult.value.calculatedPerformance.domContentLoaded)
})
const getTimeFirstByte = computed(() => {
  if (!loadPageTestResult.value || !loadPageTestResult.value.calculatedPerformance) return 0
  return formatToNumber(loadPageTestResult.value.calculatedPerformance.timeToFirstByte)
})
const getTotalLoadPage = computed(() => {
  if (!loadPageTestResult.value || !loadPageTestResult.value.calculatedPerformance) return 0
  return formatToNumber(loadPageTestResult.value.calculatedPerformance.totalLoadPageEnd)
})
</script>
<style lang="scss" scoped>
.load-test {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
