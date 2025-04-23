<template>
  <div class="wrap-content">
    <div class="resources-table resources-table--title">
      <div class="resources-table__name">Name</div>
      <div class="resources-table__type">Type</div>
      <div class="resources-table__status">Status</div>
      <div class="resources-table__size">Size</div>
      <div class="resources-table__duration">Duration</div>
      <div class="resources-table__request-start">Start</div>
      <div class="resources-table__request-end">End</div>
    </div>
    <div class="resources-table" v-for="(resource, i) in resources" :key="'iss' + i">
      <div class="resources-table__name" :title="resource.name">{{ resource.name }}</div>
      <div class="resources-table__type">{{ resource.initiatorType }}</div>
      <div class="resources-table__status">{{ resource.responseStatus }}</div>
      <div class="resources-table__size">{{ getTransferSize(resource) }}</div>
      <div class="resources-table__duration">{{ resource.duration }}</div>
      <div class="resources-table__request-start">{{ resource.responseStart }}</div>
      <div class="resources-table__request-end">{{ resource.responseEnd }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
//imports
import { useTestingStore } from '@/stores/testingStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

//values
const testingStore = useTestingStore()
const { loadPageTestResult } = storeToRefs(testingStore)

//methods
const getTransferSize = (entry: PerformanceResourceTiming): number => {
  return entry.transferSize || 0
}

//computed
const resources = computed((): PerformanceResourceTiming[] => {
  return loadPageTestResult.value ? loadPageTestResult.value.resources : []
})
</script>
<style lang="scss" scoped>
.wrap-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #949494;
  border-radius: 4px;
  overflow: auto;
  min-height: 200px;
  & > *:last-child {
    border-bottom: none !important;
  }
}
.resources-table {
  display: grid;
  grid-template-columns: 100px 65px 75px 50px 80px 80px 80px;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: 'name type size status duration request-start request-end ';
  position: relative;

  &--title {
    background-color: var(--bg-color);
    position: sticky;
    top: 0;
    z-index: 5;
  }

  & > * {
    padding: 5px;
    font-size: 13px;
    line-height: 16px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-bottom: 1px solid #949494;
  }
  & > *:not(:last-child) {
    border-right: 1px solid #949494;
  }

  &__name {
    grid-area: name;
  }

  &__type {
    grid-area: type;
  }

  &__size {
    grid-area: size;
  }

  &__duration {
    grid-area: duration;
  }

  &__request-start {
    grid-area: request-start;
  }

  &__request-end {
    grid-area: request-end;
  }

  &__status {
    grid-area: status;
  }
}
</style>
