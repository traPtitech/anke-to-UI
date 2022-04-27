<template>
  <div
    v-for="(questionnaire, index) of 20"
    :key="index"
    :class="$style.container"
  >
    <td :class="$style.tableItemTitle">
      <div :class="$style.boxTitle"></div>
    </td>
    <div :class="$style.column">
      <td :class="$style.resTimeLimit">
        <div :class="$style.box"></div>
      </td>
      <td :class="$style.modifiedAt">
        <div :class="$style.box"></div>
      </td>
    </div>
    <div :class="$style.tableItemDescription">
      <div :class="$style.boxDescription"></div>
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
  text-align: left;
  padding: 1rem;
  border-bottom: solid 1px $border;
  &:last-child {
    border: none;
  }
}
.tableItemTitle {
  min-width: 10rem;
  text-align: left;
}
.column {
  margin: 0.5rem 0;
  display: grid;
  grid-template-columns: 50%;
}

.resTimeLimit {
  grid-row: 1/2;
  grid-column: 1/2;
  text-align: left;
}
.modifiedAt {
  grid-row: 1/2;
  grid-column: 2/3;
  text-align: left;
}
.boxTitle {
  border-radius: 1rem;
  min-width: 20rem;
  height: 1.25rem;
}
.boxDescription {
  border-radius: 1rem;
  height: 1rem;
}
.box {
  border-radius: 1rem;
  width: 6rem;
  height: 1rem;
}

.boxTitle,
.boxDescription,
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
