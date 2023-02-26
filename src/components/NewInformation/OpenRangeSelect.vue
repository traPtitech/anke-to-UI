<template>
  <ManipulationBase :title="'結果の公開範囲'">
    <template #title>
      <DropdownForm
        :model-value="shareTypelist[modelValue]"
        :contents="shareType"
        @update:model-value="update"
      />
    </template>
  </ManipulationBase>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ResShareType } from '/@/lib/apis'
import ManipulationBase from './ManipulationBase.vue'
import DropdownForm from '/@/components/UI/DropdownForm.vue'

export default defineComponent({
  name: 'OpenRnageSelect',
  components: {
    ManipulationBase,
    DropdownForm
  },
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (value: ResShareType) => true
  },
  setup(props, context) {
    const shareType = ['全体', '回答済みの人', '管理者のみ']
    const shareTypelist: { [key: string]: string } = {
      administrators: '管理者のみ',
      respondents: '回答済みの人',
      public: '全体'
    }
    const update = (e: string) => {
      let type = ''
      if (e === '全体') {
        type = ResShareType.Public
      } else if (e === '回答済みの人') {
        type = ResShareType.Respondents
      } else {
        type = ResShareType.Administrators
      }
      context.emit('update:modelValue', type)
    }

    return { shareType, shareTypelist, update }
  }
})
</script>

<style lang="scss" module></style>
