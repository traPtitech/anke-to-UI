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
  .open {
    margin: 0;
  }
  .icon {
    height: 1rem;
    width: 1rem;
  }
}
.link {
  cursor: pointer;
  color: #92413b;
  text-decoration: none;
  &:hover {
    color: #cfb998;
  }
}
.boxTitle {
  border-radius: 4px;
  width: 320px;
  height: 16px;
  background: linear-gradient(45deg, #ececec, #d6d6d6);
}
.boxResult {
  margin: 4px auto;
  width: 64px;
  height: 32px;
  background: #e0e0e0;
}
.box {
  border-radius: 4px;
  margin: auto;
  width: 96px;
  height: 16px;
  background: #e0e0e0;
}
</style>
