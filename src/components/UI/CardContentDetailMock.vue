<template>
  <div
    v-for="(questionnaire, index) of 20"
    :key="index"
    :class="$style.container"
  >
    <td :class="$style.tableItemTitle">
      <div :class="$style.boxTitle"></div>
    </td>
    <div :class="$style.tableItemDescription">
      <div :class="$style.boxDescription"></div>
    </div>
    <div :class="$style.tableItemDate">
      <div :class="$style.column">
        <td :class="$style.tableItemDate">
          <div :class="$style.box"></div>
        </td>
        <td :class="$style.tableItemDate">
          <div :class="$style.box"></div>
        </td>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'QuestionnaireTableRowMock'
})
</script>

<style lang="scss" module>
.container {
  border-bottom: solid 1.5px #d9d9d9;
  text-align: left;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.container:first-of-type {
  padding-top: 0;
}
.container:last-of-type {
  padding-bottom: 0;
  border: none;
}
.tableItemTitle {
  min-width: 10rem;
  text-align: left;
}
.tableItemDate {
  min-width: 8rem;
  padding-left: 0.8rem;
}
.boxTitle {
  border-radius: 4px;
  margin-bottom: 0.8rem;
  min-width: 320px;
  height: 20px;
}
.boxDescription {
  border-radius: 4px;
  margin-bottom: 0.8rem;
  height: 16px;
}
.box {
  border-radius: 4px;
  margin: auto;
  width: 96px;
  height: 16px;
}

.boxTitle,
.boxDescription,
.box {
  background: linear-gradient(45deg, #8b8b8b, #b6b6b6, #8b8b8b);
  background-size: 300% 300%;
  opacity: 0.5;
  animation: loading 2s ease infinite;
}
.tableItemDate {
  padding-left: 24px;
}
.column {
  div:first-of-type {
    margin-right: 100px;
  }
  display: flex;
  align-items: center;
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
