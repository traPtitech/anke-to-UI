<template>
  <SingleCheckbox
    v-model="checkedAll"
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
import { computed, defineComponent, PropType, ref } from 'vue'
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
    const checkedAll = computed({
      get: () => props.group.members[0].length === checkedMembers.value.length,
      set: value => {
        const temp = props.group.members[0].map(value => value)
        checkedMembers.value = value ? temp : []
      }
    })
    const checkedMembers = ref<string[]>([])

    return { checkedAll, checkedMembers }
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
