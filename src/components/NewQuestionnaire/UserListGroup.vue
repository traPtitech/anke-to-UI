<template>
  <SingleCheckbox
    v-model="isGroupChecked"
    :content="group.name"
    :class="$style.group"
  />
  <QuestionCheckbox
    v-model="checkedMembers"
    :contents="group.members[0]"
    :class="$style.members"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import SingleCheckbox from './SingleCheckbox.vue'
import QuestionCheckbox from '/@/components/UI/QuestionCheckbox.vue'
import { Group } from '/@/lib/apis'

export default defineComponent({
  name: 'UserListGroup',
  components: {
    SingleCheckbox,
    QuestionCheckbox
  },
  props: {
    group: {
      type: Object as PropType<Group>,
      required: true
    }
  },
  setup(props) {
    const isGroupChecked = ref(false)
    const checkedMembers = ref<string[]>([])

    watch(isGroupChecked, value => {
      if (value) {
        checkedMembers.value = props.group.members[0]
      } else {
        checkedMembers.value = []
      }
    })

    return { isGroupChecked, checkedMembers }
  }
})
</script>

<style lang="scss" module>
.group {
  transform: scale(1.25);
  transform-origin: left;
}
.members {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
