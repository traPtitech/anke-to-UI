<template>
  <input :type="[isRadio ? 'radio' : 'checkbox']" value="true" />
  <QuestionInput v-model="labelRef" :model-value="label" />
  <Icon name="trash-can-outline" @click="deleteChoice" />
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
