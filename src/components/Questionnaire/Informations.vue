<template>
  <div :class="[$style.container, isMobile ? $style.mobile : '']">
    <div :class="$style.informations">
      <div>
        <Summary :questionnaire="questionnaire" />
      </div>
      <Manipulation
        v-if="isMobile"
        :questionnaire="questionnaire"
        :class="[$style.manipulation, isMobile ? $style.mobile : '']"
      />
      <Detail :information="questionnaire" />
      <MyAnswer :my-responses="myResponses" />
    </div>
    <Manipulation
      v-if="!isMobile"
      :questionnaire="questionnaire"
      :class="$style.manipulation"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { QuestionnaireByID, ResponseSummary } from '/@/lib/apis'
import Summary from './Information/Summary.vue'
import Detail from './Information/Detail.vue'
import Manipulation from '/@/components/Questionnaire/Information/Manipulation.vue'
import MyAnswer from './Information/MyAnswer.vue'
import useIsMobile from '/@/use/isMobile'

export default defineComponent({
  name: 'Informations',
  components: { Summary, Detail, Manipulation, MyAnswer },
  props: {
    questionnaire: {
      type: Object as PropType<QuestionnaireByID>,
      required: true
    },
    myResponses: {
      type: Array as PropType<ResponseSummary[]>
    }
  },
  setup() {
    const { isMobile } = useIsMobile()
    return { isMobile: isMobile }
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

.informations {
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
