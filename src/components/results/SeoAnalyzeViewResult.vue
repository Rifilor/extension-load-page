<template>
  <div>
    <h2 class="title title--medium text-align-left">SEO аналіз</h2>
    <div class="seo-item" v-for="(seoItem, i) in seoAnalizeResult" :key="i + 'ss2'">
      <h3 class="text text---bold text--title-mode">
        {{ seoItem.title }} - <span class="text--white">{{ seoItem.description }}</span>
      </h3>
      <p class="text seo-item__recomendation">{{ seoItem.recomendation }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
//imports
import { useTestingStore } from '@/stores/testingStore'
import { storeToRefs } from 'pinia'

//values
const testingStore = useTestingStore()
const { seoAnalizeResult } = storeToRefs(testingStore)
</script>

<style lang="scss">
.seo-item {
  margin-top: 12px;
  &__recomendation {
    margin-top: 4px;
  }
}
</style>
