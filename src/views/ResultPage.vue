<template>
  <div class="page-default result">
    <div class="page-default__content">
      <h1 class="title text-align-left">Результат Аналізу:</h1>
      <SpeedTestViewResults
        class="result__speed"
        v-if="speedTestResult"
        :speed-result="speedTestResult"
        
      />
      {{ result }}
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
import { useContentJsStore } from '@/stores/contentJsStore'

//values
const contentJs = useContentJsStore()
const testingStore = useTestingStore()
const dataSettingsStore = useDataSettingsStore()
const { isGlobalLoading } = storeToRefs(dataSettingsStore)
const { speedTestResult } = storeToRefs(testingStore)
const metrics = ref<any>(null)
const text = ref<string>('')
const result = ref<any>(null)

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
    await testingStore.asyncGetSpeedTest()
    result.value = await contentJs.contentCallMethod('test')
  } finally {
    isGlobalLoading.value = false
  }

  // getData()
})
</script>
<style lang="scss" scoped>
.result {
  &__speed {
    margin-top: 12px;
  }
}
</style>
