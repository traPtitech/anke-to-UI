<template>
  <div :class="$style.container">
    <div :class="$style.title">{{ questionnaire.title }}</div>
    <div :class="$style.dataAndShare">
      <div :class="[$style.date, isMobile ? $style.mobile : '']">
        <div>作成 : {{ getTimeLimit(questionnaire.created_at) }}</div>
        <div>更新 : {{ getTimeLimit(questionnaire.modified_at) }}</div>
      </div>
      <div :class="$style.icon" @click="open">
        <icon name="export-variant" />
        <dropdown-contents
          :is-open="isContentShown"
          :contents="['traQで共有', 'リンクをコピー']"
          :class="isMobile ? $style.dropdownMobile : ''"
          @close="close"
          @change-option="change"
        />
      </div>
    </div>
    <div :class="$style.description">{{ questionnaire.description }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { QuestionnaireMyTargeted } from '/@/lib/apis'
import { getTimeLimit } from '/@/components/UI/use/useOptions'
import icon from '/@/components/UI/Icon.vue'
import DropdownContents from '../../UI/DropdownContents.vue'
import useIsMobile from '/@/use/isMobile'

export default defineComponent({
  name: 'Summary',
  components: { icon, DropdownContents },
  props: {
    questionnaire: {
      type: Object as PropType<QuestionnaireMyTargeted>,
      required: true
    }
  },
  setup() {
    const isContentShown = ref(false)
    const open = () => (isContentShown.value = !isContentShown.value)
    const show = false
    const { isMobile } = useIsMobile()
    return {
      getTimeLimit,
      open,
      close,
      show,
      isMobile: isMobile,
      isContentShown
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
.title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: left;
}
.description {
  font-size: 1rem;
  font-weight: 400;
  text-align: left;
}
.dataAndShare {
  display: flex;
}
.date {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 2rem;
  width: 100%;
  font-size: 0.875rem;
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
.icon {
  margin: auto;
}
</style>
