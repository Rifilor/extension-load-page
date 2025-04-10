<template>
  <div>
    <div class="selection">
      <button
        class="selection__button"
        :class="{ 'selection__button--active': settings.name == settingItem.name }"
        v-for="settings in settingsTypes"
        :key="settings.name"
        @click="selectPresset(settings)"
      >
        {{ settings.name }}
      </button>
    </div>
    <div class="input-block">
      <div class="input-block__title">
        <p>Download</p>
        <p>Upload</p>
        <p>Ping</p>
      </div>
      <div class="input-block__list">
        <div class="wrap-input">
          <input
            class="wrap-input__element wrap-input__element--right-padding"
            type="number"
            v-model="settingItem.download"
            @change="changeItem()"
          />
          <p class="wrap-input__text">Mb/s</p>
        </div>
        <div class="wrap-input">
          <input
            class="wrap-input__element wrap-input__element--right-padding"
            type="number"
            v-model="settingItem.upload"
            @change="changeItem()"
          />
          <p class="wrap-input__text">Mb/s</p>
        </div>
        <div class="wrap-input">
          <input
            class="wrap-input__element"
            type="number"
            v-model="settingItem.latency"
            @change="changeItem()"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useSpeedLimitStore } from '@/stores/speedLimitStore'
import type { ISettingsType } from '@/types/speedLimitSettings'
import { ref } from 'vue'

//emit
const emit = defineEmits<{
  (event: 'change', item: ISettingsType): void
}>()

//props
const props = defineProps<{
  item: ISettingsType
}>()

//values {
const { settingsTypes } = useSpeedLimitStore()
const settingItem = ref<ISettingsType>(JSON.parse(JSON.stringify(props.item)))

//methods
const selectPresset = (presset: ISettingsType): void => {
  settingItem.value = presset
  changeItem()
}
const changeItem = (): void => {
  emit('change', settingItem.value)
}
</script>
<style lang="scss" scoped>
.selection {
  display: flex;
  border: 1px solid #5f5b5b;
  border-radius: 8px 8px 0 0;
  &__button {
    height: 32px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    &--active {
      color: #eac81f;
    }
  }
  & > *:not(:last-child) {
    border-right: 1px solid #5f5b5b;
  }
}
.input-block {
  padding: 10px;
  border: 1px solid #5f5b5b;
  border-radius: 0 0 8px 8px;
  & > div > *:nth-child(-n + 2) {
    flex: 2;
  }
  & > div > *:last-child {
    flex: 1;
  }
  &__list,
  &__title {
    display: flex;
    gap: 8px;
  }
  &__list {
    margin-top: 8px;
  }
}
.wrap-input {
  display: flex;
  align-items: center;
  position: relative;
  &__text {
    position: absolute;
    right: 5px;
    font-size: 10px;
    line-height: 12px;
    color: #bfbfbf;
  }
  &__element {
    &--right-padding {
      padding-right: 35px;
    }
  }
}
</style>
