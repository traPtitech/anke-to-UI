<template>
  <ManipulationBase :title="`${title}(${modelValue.length})`">
    <template #content>
      <div :class="$style.container">
        <div v-for="(id, index) in modelValue" :key="index">
          <IdConteinerBase :id="id" />
        </div>
        <AddIdButton @click="add" />
      </div>
    </template>
  </ManipulationBase>
</template>

<script lang="ts">
import { defineComponent, PropType, watchEffect, ref } from 'vue'
import ManipulationBase from './ManipulationBase.vue'
import IdConteinerBase from './IdConteinerBase.vue'
import AddIdButton from './AddIdButton.vue'

export default defineComponent({
  name: 'Deadline',
  components: {
    ManipulationBase,
    IdConteinerBase,
    AddIdButton
  },
  props: {
    title: {
      type: String,
      required: true
    },
    modelValue: {
      type: Object as PropType<string[]>,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (value: string[]) => true
  },
  setup(props, context) {
    const idList = ref(props.modelValue)
    const add = () => {
      // 要修正
      idList.value.push('jjjjjfklajdfl;asjkfsda;lfja')
    }

    watchEffect(() => {
      context.emit('update:modelValue', idList.value)
    })
    return { add }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
}
</style>
