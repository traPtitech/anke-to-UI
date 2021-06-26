<template>
  <div>
    <ul>
      <li v-for="tab in tableFormTabs" :key="tab">
        <a @click="() => changeTableForm(tab)">{{ tab }}</a>
      </li>
    </ul>
    <button v-if="canDownload" @click="downloadTable">
      <Icon name="download" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import { TableFormStyle } from '../use/utils'

export default defineComponent({
  name: 'Tab',
  components: {
    Icon
  },
  props: {
    tableForm: {
      type: String as PropType<TableFormStyle>,
      reqiured: true,
      default: 'view'
    },
    tableFormTabs: {
      type: Array as PropType<TableFormStyle[]>,
      required: true
    },
    changeTableForm: {
      type: Function,
      required: true
    }
  },
  setup() {
    const downloadTable = () => {
      // ダウンロード処理
    }
    const canDownload = computed(() => {
      // ダウンロードできるかの判断
      return true
    })

    return {
      canDownload,
      downloadTable
    }
  }
})
</script>
