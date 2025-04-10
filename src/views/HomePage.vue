<template>
  <div class="page-home page-default">
    <h1 class="title">PageSpeed Inspect</h1>
    <div class="page-home__content page-default__content">
      <div class="block-switch flex items-center w-full">
        <p class="text text---bold text--white">Обмеження швидкості:</p>
        <Switch class="ml-3" v-model="speedLimitTest" />
      </div>
      <Transition name="fade-slide">
        <SpeedLimitSettings
          v-if="speedLimitTest"
          class="page-home__selection"
          v-model="speedLimits"
        />
      </Transition>
      <div class="block-switch flex items-center w-full">
        <p class="text text---bold text--white">Аналіз швидкості інтернету:</p>
        <Switch class="ml-3" v-model="speedTest" />
      </div>
      <div class="block-switch flex items-center w-full">
        <p class="text text---bold text--white">Аналіз завантаження ресурсів:</p>
        <Switch class="ml-3" v-model="loadRequestTest" />
      </div>
      <div class="block-switch flex items-center w-full">
        <p class="text text---bold text--white">Аналіз SEO оптимізації:</p>
        <Switch class="ml-3" v-model="seoTest" />
      </div>
      <div class="page-home__wrap-btn-analiz">
        <button class="btn-main" @click="clickAnalize">Аналізувати</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Switch from '@/components/Switch.vue'
import SpeedLimitSettings from '@/components/SpeedLimitsSettings/SpeedLimitSettings.vue'
import type { ISettingsType } from '@/types/speedLimitSettings'
import { useDataSettingsStore } from '@/stores/dataSettingsStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useTestingStore } from '@/stores/testingStore'
import { useContentJsStore } from '@/stores/contentJsStore'

//values
const contentJs = useContentJsStore()
const testingStore = useTestingStore()
const dataSettingsStore = useDataSettingsStore()
const { isGlobalLoading } = storeToRefs(dataSettingsStore)
const speedLimitTest = ref<boolean>(false)
const speedLimits = ref<ISettingsType[]>([])
const speedTest = ref<boolean>(true)
const loadRequestTest = ref<boolean>(true)
const seoTest = ref<boolean>(true)
const router = useRouter()
const text = ref<any>('')
const result = ref<any>(null)

//methods
const clickAnalize = async (): Promise<void> => {
  isGlobalLoading.value = true
  setTimeout(() => {
    router.push({ name: 'results' })
  }, 200)

  // try {
  //   isGlobalLoading.value = true
  //   await testingStore.asyncGetSpeedTest()
  // } finally {
  //   isGlobalLoading.value = false
  // }
}

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === 'sendData') {
//     alert(22)
//     console.log('Отримано повідомлення: ', message.data)
//     // Тепер тут можна обробити ці дані, наприклад, відобразити в popup
//   }
// })
//hook
onMounted(async () => {
  // text.value = await testInternetSpeed()
  // console.log('mount')
  // result.value = await contentJs.contentCallMethod('test')
  // alert(JSON.stringify(JSON.stringify(result)))
})
</script>
<style scoped lang="scss">
.page-home {
  &__content {
    margin-top: 16px;
    gap: 12px;
  }
  &__selection {
    margin-top: 12px;
  }
  &__wrap-btn-analiz {
    display: flex;
    justify-content: center;
    margin-top: auto;
  }
}
</style>
