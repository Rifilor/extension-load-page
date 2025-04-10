<template>
  <div class="speed">
    <h2 class="mini-title">Швидкість інтернету</h2>
    <div class="speed-view">
      <div class="speed-view__title">
        <p class="text">Download</p>
        <p class="text">Upload</p>
        <p class="text">Ping</p>
      </div>
      <div class="speed-view__result">
        <p class="title title--medium text-align-left">
          {{ speedResult.download || 0 }} <span class="text text--white">Mbps</span>
        </p>
        <p class="title title--medium text-align-left">
          {{ speedResult.upload || 0 }} <span class="text text--white">Mbps</span>
        </p>
        <p class="title title--medium text-align-left">
          {{ speedResult.ping || 0 }} <span class="text text--white">ms</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { ISpeedTestResult } from '@/types/speedTest'

//imports

//props
const props = defineProps<{
  speedResult: ISpeedTestResult
}>()
</script>
<style scoped lang="scss">
.speed-view {
  margin-top: 8px;
  // border-radius: 8px;
  // border: 1px solid #5f5b5b;
  &__title {
    // border-bottom: 1px solid #5f5b5b;
  }
  &__result {
    margin-top: 4px;
  }
  &__title,
  &__result {
    display: grid;
    grid-template-columns: 1fr 1fr 65px;
    & > * {
      // padding-left: 5px;
    }
    & > *:not(:last-child) {
      // border-right: 1px solid #5f5b5b;
    }
  }
}
</style>
