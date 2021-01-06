<template>
  <thead>
    <tr>
      <th v-for="(header, k) in tableHeaders" :key="k">
        <HeaderElem :k="k" :header="header" />
      </th>
    </tr>
  </thead>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderElem from './HeaderElem.vue'
import { tableHeaders } from '../use/dummyData'
export default defineComponent({
  name: 'TableHeader',
  components: {
    HeaderElem
  },
  setup() {
    return {
      tableHeaders
    }
  }
})
</script>
