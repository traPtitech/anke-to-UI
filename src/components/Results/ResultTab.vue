<template>
  <PageTemplate>
    <template #header>
      <div :class="$style.container">
        <div :class="$style.title">
          {{ resultsPerQuestion.questionnaire.title }}
        </div>
        <dropdown-icon
          v-if="tabType === '概要'"
          :name="'download'"
          :contents="downloadTypes"
          :class="$style.dropdown"
          @change-option="onClickDownload"
        />
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
import DropdownIcon from '/@/components/UI/DropdownIcon.vue'

export default defineComponent({
  name: 'ResultTab',
  components: {
    PageTemplate,
    DropdownForm,
    Individual,
    Statistics,
    Tab,
    DropdownIcon
  },
  props: {
    resultsPerQuestion: {
      type: Object as PropType<ResultsPerQuestion>,
      required: true
    }
  },
  setup(props) {
    const tabType = ref<TabTypes>('概要')
    const formType = ref<FormTypes>('Markdown')
    const onClickDownload = (downloadType: string) => {
      if (downloadType === 'Markdownでダウンロード') {
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
      onClickDownload,
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
  @include weight-bold;
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
.dropdown {
  margin-left: auto;
}
</style>
