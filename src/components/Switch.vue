<template>
  <input type="checkbox" :checked="state" class="theme-checkbox" @click="state = !state" />
</template>
<script setup lang="ts">
//imports
//value
const state = defineModel<boolean>({ default: false })
</script>
<style scoped lang="scss">
.theme-checkbox {
  --toggle-size: 16px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 40px;
  height: 20px;
  background: -webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(50%, #efefef),
      color-stop(50%, #2a2a2a)
    )
    no-repeat;
  background: -o-linear-gradient(left, #efefef 50%, #eac81f 50%) no-repeat;
  background: linear-gradient(to right, #efefef 50%, #eac81f 50%) no-repeat;
  background-size: 205%;
  background-position: 0;
  -webkit-transition: 0.4s;
  -o-transition: 0.4s;
  transition: 0.4s;
  border-radius: 99em;
  position: relative;
  cursor: pointer;
  font-size: var(--toggle-size);
}

.theme-checkbox::before {
  content: '';
  width: 16px;
  height: 16px;
  position: absolute;
  top: 2px;
  left: 3px;
  background: -webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(50%, #efefef),
      color-stop(50%, #2a2a2a)
    )
    no-repeat;
  background: -o-linear-gradient(left, #2a2a2a 50%, #2a2a2a 50%) no-repeat;
  background: linear-gradient(to right, #2a2a2a 50%, #2a2a2a 50%) no-repeat;
  background-size: 205%;
  background-position: 100%;
  border-radius: 50%;
  -webkit-transition: 0.4s;
  -o-transition: 0.4s;
  transition: 0.4s;
}

.theme-checkbox:checked::before {
  left: calc(100% - 19px);
  background-position: 0;
}

.theme-checkbox:checked {
  background-position: 100%;
}
</style>
