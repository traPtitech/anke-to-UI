<template>
  <Card :class="$style.card">
    <template #header>情報</template>
    <template #content>
      <div>
        <!-- 結果の公開範囲 -->
        結果:{{ information.res_shared_to }}
      </div>
      <div>
        <!-- 管理者 -->
        <details open>
          <summary>管理者({{ information.administrators.length }}}}</summary>
          {{ information.administrators.join(', ') }}
        </details>
      </div>
      <div>
        <!-- 回答済みの人 -->
        <details open>
          <summary>回答済みの人({{ information.respondents.length }})</summary>
          {{ information.respondents.join(', ') }}
        </details>
      </div>
      <div>
        <details open>
          <!-- 対象者 -->
          <summary>対象者({{ information.targets.length }})</summary>
          {{ information.targets.join(', ') }}
        </details>
      </div>
      <div>
        <!-- 更新日時 -->
        更新日時：{{ information.modified_at }}
      </div>
      <div>
        <!-- 作成日時 -->
        作成日時：{{ information.created_at }}
      </div>
    </template>
  </Card>
  <div>aaaaaaaaaaaaaaaaa</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Card from '/@/components/UI/Card.vue'
import { QuestionnaireByID } from '/@/lib/apis'

export default defineComponent({
  name: 'Information',
  components: { Card },
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
.card {
  border: solid 1.5px #d9d9d9;
  border-collapse: collapse;
  text-align: left;
  font-size: 1.25rem;
  padding: 1rem;
}
</style>
