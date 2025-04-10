<!-- <template>
  <div class="container">
    <button @click="getData" class="analyze-button">Аналізувати</button>
    <div class="output-container">
      <p v-if="text" class="error-text">Помилка: {{ text }}</p>
      <div v-if="metrics" class="metrics">
        <h3>Загальна оцінка: {{ metrics.score }}</h3>

        <div class="metric-block">
          <h4>Час завантаження:</h4>
          <ul>
            <li>Час завантаження: {{ metrics.performanceMetrics.loadTime }} мс</li>
            <li>Час до DOM готовності: {{ metrics.performanceMetrics.domReadyTime }} мс</li>
            <li>Час першого малюнка: {{ metrics.performanceMetrics.firstPaint }} мс</li>
            <li>Кількість запитів: {{ metrics.performanceMetrics.networkData.totalRequests }}</li>
            <li>Передано: {{ metrics.performanceMetrics.networkData.totalTransferredMB }} MB</li>
            <li>Finish {{ metrics.performanceMetrics.networkData.finishTime }}</li>
          </ul>
        </div>

        <div class="metric-block">
          <h4>Оцінка після оптимізації:</h4>
          <ul>
            <li>Приблизний час завантаження після оптимізації: {{ optimizedLoadTime }} мс</li>
            <li>Приблизний розмір сайту після оптимізації: {{ optimizedSize }} МБ</li>
          </ul>
        </div>

        <div class="metric-block">
          <h4>Файли:</h4>
          <table class="file-table">
            <thead>
              <tr>
                <th>Назва файлу</th>
                <th>Тип</th>
                <th>Час завантаження (мс)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="file in metrics.fileMetrics" :key="file.name">
                <td>{{ file.name }}</td>
                <td>{{ file.type }}</td>
                <td>{{ file.duration }} мс</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="metric-block">
          <h4>Lazy loading:</h4>
          <ul>
            <li>Загальна кількість зображень: {{ metrics.lazyLoading.totalImages }}</li>
            <li>Кількість зображень з lazy loading: {{ metrics.lazyLoading.lazyImages }}</li>
          </ul>
        </div>

        <div class="metric-block">
          <h4>SEO:</h4>
          <ul>
            <li>Title: {{ metrics.seoData.title }}</li>
            <li>Meta description: {{ metrics.seoData.metaDescription }}</li>
            <li>Кількість тегів H1: {{ metrics.seoData.h1Count }}</li>
            <li>Canonical link: {{ metrics.seoData.canonicalLink }}</li>
          </ul>
        </div>

        <div class="metric-block">
          <h4>Формати зображень:</h4>
          <ul>
            <li>Загальна кількість зображень: {{ metrics.imageFormats.totalImages }}</li>
            <li>
              Зображення в сучасних форматах (WebP, AVIF):
              {{ metrics.imageFormats.modernFormatImages }}
            </li>
          </ul>
        </div>

        <div class="metric-block">
          <h4>Рекомендації:</h4>
          <ul>
            <li v-for="rec in metrics.recommendations" :key="rec">{{ rec }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const metrics = ref<any>(null)
const text = ref('')
const optimizedLoadTime = ref<number>(0)
const optimizedSize = ref<number>(0)

const calculateOptimizedMetrics = () => {
  const loadTime = metrics.value.performanceMetrics.loadTime
  const totalResources = metrics.value.totalResources
  const totalSize = metrics.value.totalDuration / 1000

  optimizedLoadTime.value = loadTime * 0.7
  optimizedSize.value = totalSize * 0.7
}

const getData = () => {
  try {
    console.log('🚀 Запит на збір метрик...')

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id!, { type: 'getPerformanceData' })
      } else {
        console.error('⚠️ Не знайдено активну вкладку!')
      }
    })

    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === 'performanceResult') {
        metrics.value = message.data
        calculateOptimizedMetrics()
      }
    })
  } catch (error) {
    text.value = 'Помилка: ' + error
  }
}
</script>

<style scoped>
.container {
  background-color: #121212;
  color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  max-width: 900px;
  margin: 0 auto;
}

.analyze-button {
  background-color: #1e88e5;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
}

.analyze-button:hover {
  background-color: #1565c0;
}

.output-container {
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 8px;
}

.error-text {
  color: red;
}

.metric-block {
  margin-bottom: 20px;
}

h3,
h4 {
  color: #81d4fa;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

.file-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.file-table th,
.file-table td {
  padding: 10px;
  border: 1px solid #333;
  text-align: left;
}

.file-table th {
  background-color: #333;
}

.file-table tr:nth-child(even) {
  background-color: #2a2a2a;
}

.file-table tr:nth-child(odd) {
  background-color: #1e1e1e;
}
</style> -->
<template>
  <div class="page">
    <router-view class="page__content" />
    <Transition name="fade">
      <AppLoader v-if="isGlobalLoading" />
    </Transition>
  </div>
</template>
<script setup lang="ts">
import AppLoader from './components/AppLoader.vue'
import { useDataSettingsStore } from './stores/dataSettingsStore'
import { storeToRefs } from 'pinia'

//values
const dataSettingsStore = useDataSettingsStore()
const { isGlobalLoading } = storeToRefs(dataSettingsStore)

//methods
</script>
<style lang="scss">
@use './app.scss';
</style>
<style scoped lang="scss">
.page {
  position: relative;
  width: 340px;
  height: 420px;
  background-color: #232222;
  border: 1px solid #2a2a2a;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  &__content {
    flex: 1;
    overflow: auto;
  }
}
</style>
