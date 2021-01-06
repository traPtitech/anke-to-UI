<template>
  <thead>
    <tr>
      <th v-for="(headerName, headerKey) in tableHeaders" :key="headerKey">
        <HeaderElem :header-key="k" :header-name="header" />
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
