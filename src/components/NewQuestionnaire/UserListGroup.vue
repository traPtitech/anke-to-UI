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
    @update:modelValue="updateMembers"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { useStore } from '/@/store'
import SingleCheckbox from './SingleCheckbox.vue'
import QuestionCheckbox from '/@/components/UI/QuestionCheckbox.vue'
import { Group } from '/@/lib/apis'
import { updateTargets, updateAdministrators } from './use/updateMembers'

export default defineComponent({
  name: 'UserListGroup',
  components: {
    SingleCheckbox,
    QuestionCheckbox
  },
  props: {
    title: {
      type: String,
      required: true
    },
    group: {
      type: Object as PropType<Group>,
      required: true
    }
  },
  setup(props) {
    const store = useStore()

    const checkedAll = computed({
      get: () => props.group.members[0].length === checkedMembers.value.length,
      set: value => {
        const temp = [...props.group.members[0]]
        checkedMembers.value = value ? temp : []

        updateMembers(checkedMembers.value)
      }
    })

    let pastMembers: string[] = []
    if (props.title === '対象者') {
      pastMembers = store.state.newQuestionnaire.targets.filter(target =>
        props.group.members[0].includes(target)
      )
    } else if (props.title === '管理者') {
      pastMembers = store.state.newQuestionnaire.administrators.filter(
        administrator => props.group.members[0].includes(administrator)
      )
    }

    const checkedMembers = ref<string[]>([])
    checkedMembers.value = [...pastMembers]

    const updateMembers = (newMembers: string[]) => {
      if (props.title === '対象者') {
        updateTargets(pastMembers, newMembers)
      } else if (props.title === '管理者') {
        updateAdministrators(pastMembers, newMembers)
      }
      pastMembers = [...newMembers]
    }

    return { checkedAll, checkedMembers, updateMembers }
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
