<template>
  <div class="tabs">
    <ul>
      <li
        v-for="tab in tableFormTabs"
        :key="tab"
        class="tab"
        :class="{ 'is-active': tableForm === tab }"
      >
        <a @click="() => {}">{{ tab }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { tableFormTabs } from '/@/components/Results/use/utils'
import { tableForm } from '/@/components/Results/use/dummyData'

export default defineComponent({
  name: 'Tab',
  setup() {
    return {
      tableForm,
      tableFormTabs
    }
  }
})
</script>
