<template>
  <div
    v-for="(questionnaire, index) of 20"
    :key="index"
    :class="$style.container"
  >
    <div :class="$style.questionnaire">
      <div :class="$style.content">
        <td :class="$style.title_container">
          <div :class="$style.box_title"></div>
        </td>
        <div :class="$style.column_container">
          <td :class="$style.res_time_container">
            <div :class="$style.box"></div>
          </td>
          <td :class="$style.modified_at_container">
            <div :class="$style.box"></div>
          </td>
        </div>
        <div v-if="!isResponse" :class="$style.box_description"></div>
      </div>
      <Icon :name="'chevron-right'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from './Icon.vue'
export default defineComponent({
  name: 'QuestionnaireTableRowMock',
  components: {
    Icon
  },
  props: {
    isResponse: {
      type: Boolean,
      default: false
    }
  }
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
.questionnaire {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.content {
  flex-grow: 1;
}
.title_container {
  display: block;
  text-align: left;
}
.column_container {
  margin: 0.5rem 0;
  display: grid;
  grid-template-columns: 50%;
}

.res_time_container {
  grid-column: 1/2;
}
.modified_at_container {
  grid-column: 2/3;
}
.res_time_container,
.modified_at_container {
  grid-row: 1/2;
  text-align: left;
}
.box_title {
  border-radius: 1rem;
  width: min(20rem, 100%);
  height: 1.6875rem;
}
.box_description {
  border-radius: 1rem;
  height: 1.5rem;
}
.box {
  border-radius: 1rem;
  width: min(6rem, 100%);
  height: 1.3125rem;
}

.box_title,
.box_description,
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
