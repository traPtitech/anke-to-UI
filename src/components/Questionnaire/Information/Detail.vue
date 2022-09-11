<template>
  <div :class="$style.container">
    <DetailTextRow
      :term="'管理者'"
      :description="information.administrators.join(', ')"
    />
    <DetailTextRow
      :term="'対象者'"
      :description="information.targets.join(', ')"
    />
    <!-- ここに対照グループを追加 -->
    <DetailTextRow
      :term="'回答済み'"
      :description="information.respondents.join(', ')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { QuestionnaireByID } from '/@/lib/apis'
import DetailTextRow from './DetailTextRow.vue'

export default defineComponent({
  name: 'Summary',
  components: { DetailTextRow },
  props: {
    information: {
      type: Object as PropType<QuestionnaireByID>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.container {
  background: $bg-secondary;
  display: flex;
  flex-direction: column;
  padding: 0.75rem 1rem;
  gap: 2rem;
  border-radius: 0.5rem;
}
</style>
