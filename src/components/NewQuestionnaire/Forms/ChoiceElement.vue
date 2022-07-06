<template>
  <div :class="$style.choice">
    <div :class="$style.choiceName">
      <RadioButton v-if="isRadio" :disabled="true" />
      <Checkbox v-else :disabled="true" />
      <InputTextNoBorder
        v-model="labelRef"
        :model-value="label"
        :placeholder="'選択肢を入力'"
        :class="$style.input"
      />
    </div>
    <Icon name="close" :class="$style.close" @click="deleteChoice" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import Icon from '../../UI/Icon.vue'
import Checkbox from '/@/components/UI/QuestionCheckboxIcon.vue'
import RadioButton from '/@/components/UI/QuestionRadioButtonIcon.vue'
import InputTextNoBorder from '/@/components/UI/InputTextNoBorder.vue'

export default defineComponent({
  name: 'ChoiceElement',
  components: {
    Icon,
    Checkbox,
    RadioButton,
    InputTextNoBorder
  },
  props: {
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
    'update:label': (text: string) => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    delete: () => true
  },
  setup(props, context) {
    const labelRef = ref(props.label)
    watch(labelRef, newLabel => {
      context.emit('update:label', newLabel)
    })
    const deleteChoice = () => {
      context.emit('delete')
    }
    return {
      labelRef,
      deleteChoice
    }
  }
})
</script>

<style lang="scss" module>
.choice {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}
.choiceName {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
}
.input {
  flex-grow: 1;
}
</style>
