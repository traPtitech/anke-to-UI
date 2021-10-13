<template>
  <div>
    <Icon name="chevron-up" />
    <Icon name="chevron-down" />
  </div>
  <input type="checkbox" value="true" v-if="!isRadio" />
  <input type="radio" value="true" v-if="isRadio" />
  <QuestionInput :model-value="label" @update:modelValue="updateLabel" />
  <Icon name="delete" @click="deleteChoice" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
    const updateLabel = (text: string) => {
      context.emit('update:label', text, props.index)
    }
    const deleteChoice = () => {
      context.emit('delete', props.index)
    }
    return {
      updateLabel,
      deleteChoice
    }
  }
})
</script>
