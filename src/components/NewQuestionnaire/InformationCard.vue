<template>
  <Card :class="$style.card">
    <template #header>情報</template>
    <template #content>
      <div :class="$style.disclosureRange">
        <span>結果の公開範囲</span>
        <DropdownMenu
          v-model="range"
          title="結果の公開範囲"
          :contents="dropdownContents"
          :show-option="true"
          :class="$style.dropdown"
        />
      </div>
      <div :class="$style.target">
        <span>対象者</span>
        <Icon
          name="pencil"
          :class="$style.icon"
          @click="isTargetModalOpen = true"
        />
      </div>
      <UserListModal
        v-if="isTargetModalOpen"
        title="対象者"
        @close="isTargetModalOpen = false"
      />
      <div :class="$style.administrator">
        <span>管理者</span>
        <Icon
          name="pencil"
          :class="$style.icon"
          @click="isAdministratorModalOpen = true"
        />
      </div>
      <UserListModal
        v-if="isAdministratorModalOpen"
        title="管理者"
        @close="isAdministratorModalOpen = false"
      />
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from '/@/store'
import Card from '/@/components/UI/Card.vue'
import DropdownMenu from '/@/components/UI/DropdownMenu.vue'
import Icon from '/@/components/UI/Icon.vue'
import UserListModal from './UserListModal.vue'
import { disclosureRange, labelToValue } from './use/disclosureRange'

export default defineComponent({
  name: 'InformationCard',
  components: {
    Card,
    DropdownMenu,
    Icon,
    UserListModal
  },
  setup() {
    const range = ref(disclosureRange.public.label)
    const dropdownContents = Object.values(disclosureRange).map(v => v.label)

    const store = useStore()
    watch(range, label => {
      const newRange = labelToValue(label)
      store.commit.setNewQuestionnaireResSharedTo(newRange)
    })

    const isTargetModalOpen = ref(false)
    const isAdministratorModalOpen = ref(false)

    return {
      range,
      dropdownContents,
      isTargetModalOpen,
      isAdministratorModalOpen
    }
  }
})
</script>

<style lang="scss" module>
.card {
  border: solid 1px #e0d1c5;
  box-shadow: 0 0.25rem 0.5rem #00000030;
}
.disclosureRange,
.target,
.administrator {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  .dropdown {
    margin-left: 1rem;
  }
  .icon {
    margin-left: 0.5rem;
    cursor: pointer;
  }
}
</style>
