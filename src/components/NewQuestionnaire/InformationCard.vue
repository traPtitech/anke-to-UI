<template>
  <Card :class="$style.card">
    <template #header>情報</template>
    <template #content>
      <div :class="$style.disclosureRange">
        <span>結果の公開範囲</span>
        <DropdownMenu
          v-model="range"
          title="結果の公開範囲"
          :contents="Object.values(disclosureRange)"
          :show-option="true"
          :class="$style.dropdown"
        />
      </div>
      <div :class="$style.target">
        <span>対象者</span>
        <Icon name="pencil" :class="$style.icon" />
      </div>
      <div :class="$style.administrator">
        <span>管理者</span>
        <Icon name="pencil" :class="$style.icon" />
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Card from '/@/components/UI/Card.vue'
import DropdownMenu from '/@/components/UI/DropdownMenu.vue'
import Icon from '/@/components/UI/Icon.vue'
import { disclosureRange } from './use/disclosureRange'

export default defineComponent({
  name: 'InformationCard',
  components: {
    Card,
    DropdownMenu,
    Icon
  },
  setup() {
    const range = ref(disclosureRange.all)

    return { disclosureRange, range }
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
  }
}
</style>
