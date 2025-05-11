<template>
  <div class="page-default result">
    <div class="page-default__content">
      <h1 class="title text-align-left">Результат Аналізу:</h1>
      <SpeedTestViewResults
        class="result__speed"
        v-if="speedTest && speedTestResult"
        :speed-result="speedTestResult"
      />
      <LoadTestViewResults class="result__load-page" />
      <h3 v-if="loadRequestTest" class="text text---bold text--white result__resources-title">
        Ресурси:
      </h3>
      <TableResourcesReults v-if="loadRequestTest" class="result__resources" />
      <SeoAnalyzeViewResult v-if="seoTest" class="result__seo" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useTestingStore } from '@/stores/testingStore'
import { useDataSettingsStore } from '@/stores/dataSettingsStore'
import { storeToRefs } from 'pinia'
import SpeedTestViewResults from '@/components/results/SpeedTestViewResults.vue'
import LoadTestViewResults from '@/components/results/LoadTestViewResults.vue'
import { useContentJsStore } from '@/stores/contentJsStore'
import TableResourcesReults from '@/components/results/TableResourcesReults.vue'
import SeoAnalyzeViewResult from '@/components/results/SeoAnalyzeViewResult.vue'

//values
const contentJs = useContentJsStore()
const testingStore = useTestingStore()
const dataSettingsStore = useDataSettingsStore()
const { isGlobalLoading, speedTest, loadRequestTest, seoTest } = storeToRefs(dataSettingsStore)
const { speedTestResult, loadPageTestResult, seoAnalizeResult } = storeToRefs(testingStore)
const metrics = ref<any>(null)
const text = ref<string>('')
// const result = ref<any>(null)

// const getData = () => {
//   try {
//     console.log('🚀 Запит на збір метрик...')

//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       if (tabs[0]?.id) {
//         chrome.tabs.sendMessage(tabs[0].id!, { type: 'getSpeed', settings: {} })
//       } else {
//         console.error('⚠️ Не знайдено активну вкладку!')
//       }
//     })

//     chrome.runtime.onMessage.addListener((message) => {
//       if (message.type === 'speedResult') {
//         metrics.value = message.data
//       }
//     })
//   } catch (error) {
//     text.value = 'Помилка: ' + error
//   }
// }

//hook
onMounted(async () => {
  console.log('onMounted')
  try {
    isGlobalLoading.value = true
    if (speedTest) {
      await testingStore.asyncGetSpeedTest()
    }
    await testingStore.asyncGetLoadPageDataTest()
    if (seoTest) {
      await testingStore.asyncGetSeoTestiongPage()
    }
  } finally {
    isGlobalLoading.value = false
  }

  // getData()
})
</script>
<style lang="scss" scoped>
.result {
  &__speed,
  &__load-page,
  &__resources-title,
  &__seo {
    margin-top: 12px;
  }
  &__resources {
    margin-top: 6px;
  }
}
</style>
