<template>
  <td :class="$style.table_item_title">
    <div :class="$style.boxTitle"></div>
  </td>
  <td :class="$style.table_item_date">
    <div :class="$style.box"></div>
  </td>
  <td :class="$style.table_item_date">
    <div :class="$style.box"></div>
  </td>
  <td :class="$style.table_item_date">
    <div :class="$style.box"></div>
  </td>
  <td :class="$style.result">
    <div :class="$style.boxResult"></div>
  </td>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'QuestionnaireTableRowMock'
})
</script>

<style lang="scss" module>
.table_item_title {
  min-width: 10rem;
  text-align: left;
  padding-left: 0.8rem;
}
.table_item_date {
  min-width: 8rem;
  padding-left: 0.8rem;
}
.result {
  text-align: left;
  padding: 0.2rem 0.8rem;
}
.boxTitle {
  border-radius: 4px;
  width: 320px;
  height: 16px;
}
.boxResult {
  margin: 4px auto;
  width: 64px;
  height: 32px;
}
.box {
  border-radius: 4px;
  margin: auto;
  width: 96px;
  height: 14px;
}

.boxTitle,
.boxResult,
.box {
  background: linear-gradient(45deg, #8b8b8b, #b6b6b6, #8b8b8b);
  background-size: 300% 300%;
  opacity: 0.5;
  animation: loading 2s ease infinite;
}

@keyframes loading {
  0% {
    background-position: 300% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
