<template>
  <div>
    <Icon name="chevron-up" />
    <Icon name="chevron-down" />
  </div>
  <input v-if="!isRadio" type="checkbox" value="true" />
  <input v-if="isRadio" type="radio" value="true" />
  <QuestionInput v-model="labelRef" />
  <Icon name="delete" @click="deleteChoice" />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import Icon from '../../UI/Icon.vue'
import QuestionInput from '../../UI/QuestionInput.vue'

export default defineComponent({
  name: 'ChoiceElement',
  components: {
    Icon,
    QuestionInput
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    isRadio: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:label': (text: string, index: number) => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    delete: (index: number) => true
  },
  setup(props, context) {
    const labelRef = ref(props.label)
    watch(labelRef, newLabel => {
      context.emit('update:label', newLabel, props.index)
    })
    const deleteChoice = () => {
      context.emit('delete', props.index)
    }
    return {
      labelRef,
      deleteChoice
    }
  }
})
</script>
