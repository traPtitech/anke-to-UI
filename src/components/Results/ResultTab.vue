<template>
  <PageTemplate>
    <template #header>
      <div :class="$style.container">
        <div :class="$style.title">{{ questionnaire.title }}</div>
        <div :class="$style.rightcontent">
          <icon :name="'download'" @click="isOpen = !isOpen" />
          <dropdown-contents
            :contents="downloadTypes"
            :is-open="isOpen"
            @close="isOpen = !isOpen"
            @change-option="download"
          />
        </div>
      </div>
      <div :class="$style.container">
        <Tab v-model="tabType" :tabs="tabTypes" />
        <dropdown-form
          v-model="formType"
          :contents="formTypes"
          :class="$style.rightcontent"
        />
      </div>
    </template>
    <template #content>
      <Statistics
        v-if="tabType === '概要'"
        :questionnaire="questionnaire"
        :results="results"
        :questions="questions"
        :form-type="formType"
      />
      <Individual
        v-if="tabType === '個別'"
        :questionnaire="questionnaire"
        :results="results"
        :questions="questions"
      />
    </template>
  </PageTemplate>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { QuestionnaireByID, ResponseResult, QuestionDetails } from '/@/lib/apis'
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
  DownloadTypes,
  formTypes,
  FormTypes
} from './use/utils'
import { ResultsPerQuestion } from '/@/lib/util/statistics'

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
    questionnaire: {
      type: Object as PropType<QuestionnaireByID>,
      required: true
    },
    results: {
      type: Object as PropType<ResponseResult[]>,
      required: true
    },
    questions: {
      type: Object as PropType<QuestionDetails[]>,
      required: true
    },
    resultsPerQuestion: {
      type: Object as PropType<ResultsPerQuestion>,
      required: true
    }
  },
  setup() {
    const tabType = ref<TabTypes>('概要')
    const isOpen = ref<boolean>(false)
    const download = (value: string) => {
      alert(value)
    }
    const formType = ref<FormTypes>('Markdown')
    return {
      isOpen,
      downloadTypes,
      download,
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
  @include size-body;
  font-weight: 700;
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
