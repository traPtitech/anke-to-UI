<template>
  <div :class="$style.container">
    <div :class="$style.dataAndShare">
      <div :class="[$style.date, isMobile ? $style.mobile : '']">
        <div>作成 : {{ getTimeLimit(questionnaire.created_at) }}</div>
        <div>更新 : {{ getTimeLimit(questionnaire.modified_at) }}</div>
      </div>
      <dropdown-icon
        :name="'export-variant'"
        :contents="['traQで共有', 'リンクをコピー']"
        :is-popout-right="!isMobile"
        :class="isMobile ? $style.dropdownMobile : ''"
      />
    </div>
    <div :class="$style.description">{{ questionnaire.description }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { QuestionnaireByID } from '/@/lib/apis'
import { getTimeLimit } from '/@/components/UI/use/useOptions'
import DropdownIcon from '/@/components/UI/DropdownIcon.vue'
import useIsMobile from '/@/use/isMobile'

export default defineComponent({
  name: 'Summary',
  components: { DropdownIcon },
  props: {
    questionnaire: {
      type: Object as PropType<QuestionnaireByID>,
      required: true
    }
  },
  setup() {
    const { isMobile } = useIsMobile()
    return {
      getTimeLimit,
      open,
      isMobile: isMobile
    }
  }
})
</script>

<style lang="scss" module>
.container {
  gap: 1rem;
  display: flex;
  flex-direction: column;
}
.description {
  @include size-body;
  text-align: left;
}
.dataAndShare {
  display: flex;
  align-items: center;
}
.date {
  @include size-body-small;
  @include weight-bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 2rem;
  width: 100%;
}
.mobile {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-content: flex-start;
  flex-direction: column;
}
.dropdownMobile {
  right: 1rem;
}
</style>
