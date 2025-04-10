<template>
  <TransitionGroup name="list" class="speed-settings" tag="div">
    <SpeedlimitsSettingItem
      v-for="(setting, i) in selectedSetttings"
      :key="i"
      :item="setting"
      @change="(item) => changeItem(item, i)"
    />
    <div class="speed-settings__buttons-block">
      <button class="btn-main speed-settings__button-add" @click="addTest">Додати тест</button>
      <button
        class="btn-delete speed-settings__button-remove"
        @click="removeTest()"
        v-if="selectedSetttings.length > 1"
      >
        Видалити
      </button>
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from 'vue'
import SpeedlimitsSettingItem from './SpeedlimitsSettingItem.vue'
import type { ISettingsType } from '@/types/speedLimitSettings'
import { useSpeedLimitStore } from '@/stores/speedLimitStore'

// Значення
const { settingsTypes } = useSpeedLimitStore()

const selectedSetttings = defineModel<ISettingsType[]>({ required: true })

// Методи
const changeItem = (item: ISettingsType, index: number): void => {
  selectedSetttings.value[index] = item
}
const addTest = (): void => {
  selectedSetttings.value.push(JSON.parse(JSON.stringify(settingsTypes[0])))
}
const removeTest = (indexToRemove: number = selectedSetttings.value.length - 1): void => {
  selectedSetttings.value.splice(indexToRemove, 1)
}

// Хук
onMounted(() => {
  selectedSetttings.value = [settingsTypes[0]]
})
</script>

<style scoped lang="scss">
.speed-settings {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  &__button-remove {
    margin-left: auto;
  }
  &__buttons-block {
    display: flex;
  }
}
</style>
