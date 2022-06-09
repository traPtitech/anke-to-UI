<template>
  <input :type="[isRadio ? 'radio' : 'checkbox']" value="true" />
  <InputText v-model="labelRef" :model-value="label" :placeholder="'選択肢を入力'" />
  <Icon name="trash-can-outline" @click="deleteChoice" />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import Icon from '../../UI/Icon.vue'
import InputText from '../../UI/InputText.vue'

export default defineComponent({
  name: 'ChoiceElement',
  components: {
    Icon,
    InputText
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
