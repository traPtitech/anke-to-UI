<template>
  <PageTemplate>
    <template #header>
      <div :class="$style.container">
        <div :class="$style.title">
          {{ resultsPerQuestion.questionnaire.title }}
        </div>
        <div v-if="tabType === '概要'" :class="$style.rightcontent">
          <icon :name="'download'" @click="isOpen = !isOpen" />
          <dropdown-contents
            :contents="downloadTypes"
            :is-open="isOpen"
            @close="isOpen = !isOpen"
            @change-option="downloadType"
          />
        </div>
      </div>
      <div :class="$style.container">
        <Tab v-model="tabType" :tabs="tabTypes" />
        <dropdown-form
          v-if="tabType === '概要'"
          v-model="formType"
          :contents="formTypes"
          :class="$style.rightcontent"
        />
      </div>
    </template>
    <template #content>
      <Statistics
        v-if="tabType === '概要'"
        :form-type="formType"
        :results-per-question="resultsPerQuestion"
      />
      <Individual v-if="tabType === '個別'" />
    </template>
  </PageTemplate>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import Tab from '/@/components/UI/Tab.vue'
import DropdownContents from '/@/components/Explorer/DropdownContents.vue'
import Icon from '/@/components/UI/Icon.vue'
import DropdownForm from './DropdownForm.vue'
import PageTemplate from './PageTemplate.vue'
import Individual from './Individual.vue'
import Statistics from './Statistics.vue'
import {
  tabTypes,
  TabTypes,
  downloadTypes,
  formTypes,
  FormTypes
} from './use/utils'
import { ResultsPerQuestion } from './use/statistics'
import {
  generateQuestionMarkdownSpreadseet,
  generateQuestionCSVSpreadseet,
  download
} from './use/DownloadForm'

export default defineComponent({
  name: 'ResultTab',
  components: {
    PageTemplate,
    Icon,
    DropdownForm,
    Individual,
    Statistics,
    DropdownContents,
    Tab
  },
  props: {
    resultsPerQuestion: {
      type: Object as PropType<ResultsPerQuestion>,
      required: true
    }
  },
  setup(props) {
    const tabType = ref<TabTypes>('概要')
    const isOpen = ref<boolean>(false)
    const formType = ref<FormTypes>('Markdown')
    const downloadType = (value: string) => {
      if (value === 'Markdownでダウンロード') {
        download(
          props.resultsPerQuestion.questionnaire.title,
          generateQuestionMarkdownSpreadseet(props.resultsPerQuestion),
          'md'
        )
      } else {
        download(
          props.resultsPerQuestion.questionnaire.title,
          generateQuestionCSVSpreadseet(props.resultsPerQuestion),
          'csv'
        )
      }
    }
    return {
      downloadType,
      isOpen,
      downloadTypes,
      formType,
      formTypes,
      tabType,
      tabTypes
    }
  }
})
</script>

<style lang="scss" module>
.title {
  @include size-head;
  @include font-bold;
  text-align: left;
}
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.rightcontent {
  margin-left: auto;
}
</style>
