<template>
  <div :class="[$style.container, isMobile ? $style.mobile : '']">
    <div :class="$style.informations">
      <div :class="$style.title">{{ questionnaire.title }}</div>
      <Manipulation
        v-if="isMobile"
        :questionnaire="questionnaire"
        :class="[$style.manipulation, isMobile ? $style.mobile : '']"
      />
      <Tab v-model="tabType" :tabs="tabTypes" />
      <div v-if="tabType === '概要'" :class="$style.abstract">
        <Summary :questionnaire="questionnaire" />
        <Detail :information="questionnaire" />
      </div>
      <div v-if="tabType === '自分の回答'">
        <MyAnswer :my-responses="myResponses" />
      </div>
    </div>
    <Manipulation
      v-if="!isMobile"
      :questionnaire="questionnaire"
      :class="$style.manipulation"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { QuestionnaireByID, ResponseSummary } from '/@/lib/apis'
import Summary from './Information/Summary.vue'
import Detail from './Information/Detail.vue'
import Manipulation from '/@/components/Questionnaire/Information/Manipulation.vue'
import MyAnswer from './Information/MyAnswer.vue'
import useIsMobile from '/@/use/isMobile'
import { TabTypes, tabTypes } from './usequestonnaire'
import Tab from '/@/components/UI/Tab.vue'

export default defineComponent({
  name: 'Informations',
  components: { Summary, Detail, Manipulation, MyAnswer, Tab },
  props: {
    questionnaire: {
      type: Object as PropType<QuestionnaireByID>,
      required: true
    },
    myResponses: {
      type: Array as PropType<ResponseSummary[]>,
      default: []
    }
  },
  setup() {
    const { isMobile } = useIsMobile()
    const tabType = ref<TabTypes>('概要')
    return { isMobile: isMobile, tabType, tabTypes }
  }
})
</script>

<style lang="scss" module>
.container {
  max-width: 1024px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 4rem;
  margin: auto;
}
.title {
  @include size-head;
  @include weight-bold;
  text-align: left;
}
.informations {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.abstract {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.manipulation {
  min-width: 12rem;
  position: sticky;
  top: 0px;
  margin: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: left;
}
.mobile {
  position: unset;
  grid-template-columns: unset;
}
</style>
