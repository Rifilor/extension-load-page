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
  background-color: var(--bg-color);
  border: 1px solid var(--border-app);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  &__content {
    flex: 1;
    overflow: auto;
  }
}
</style>
