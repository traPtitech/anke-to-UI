<template>
  <CardWithHeader>
    <template #header>情報</template>
    <template #content>
      <div>結果:{{ information.res_shared_to }}</div>
      <div>
        <details open>
          <summary>管理者({{ information.administrators.length }})</summary>
          {{ information.administrators.join(', ') }}
        </details>
      </div>
      <div>
        <details open>
          <summary>回答済みの人({{ information.respondents.length }})</summary>
          {{ information.respondents.join(', ') }}
        </details>
      </div>
      <div>
        <details open>
          <summary>対象者({{ information.targets.length }})</summary>
          {{ information.targets.join(', ') }}
        </details>
      </div>
      <div>更新日時：{{ information.modified_at }}</div>
      <div>作成日時：{{ information.created_at }}</div>
    </template>
  </CardWithHeader>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import CardWithHeader from '/@/components/UI/CardWithHeader.vue'
import { QuestionnaireByID } from '/@/lib/apis'

export default defineComponent({
  name: 'Summary',
  components: { CardWithHeader },
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
