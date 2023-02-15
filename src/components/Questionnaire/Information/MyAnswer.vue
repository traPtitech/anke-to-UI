<template>
  <Card :has-padding="false">
    <template #content>
      <ul>
        <li
          v-for="data in myResponses"
          :key="data.modified_at"
          :class="[$style.card_row, $style.hover_effect]"
        >
          <router-link
            :to="`/responses/${data.responseID}`"
            :class="$style.card_item"
          >
            <div :class="$style.card_text">
              {{ getTimeLimit(data.submitted_at) }}
            </div>
            <Icon :name="'trash-can-outline'"
          /></router-link>
        </li>
        <li v-if="myResponses.length === 0" :class="$style.card_row">
          <div>回答はありません</div>
        </li>
      </ul>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Card from '/@/components/UI/Card.vue'
import Icon from '/@/components/UI/Icon.vue'
import { ResponseSummary } from '/@/lib/apis'
import { getTimeLimit } from '/@/components/UI/use/useOptions'

export default defineComponent({
  name: 'MyAnswer',
  components: { Card, Icon },
  props: {
    myResponses: {
      type: Array as PropType<ResponseSummary[]>,
      default: []
    }
  },
  setup() {
    return { getTimeLimit }
  }
})
</script>

<style lang="scss" module>
.card_row {
  text-align: left;
  position: relative;
  transition: 0.2s;
  padding: 1rem 1.5rem;
  border-bottom: solid 1px $border;
  &:first-child {
    border-radius: 0.5rem 0.5rem 0 0;
  }
  &:last-child {
    border-radius: 0 0 0.5rem 0.5rem;
  }
  &:last-child {
    border: none;
  }
  &:only-child {
    border-radius: 0.5rem;
  }
}

.hover_effect {
  &:hover {
    background-color: $bg-secondary-highlight;
  }
}
.card_item {
  display: flex;
  color: $ui-primary;
  text-decoration: none;
  @include size-head-small;
}
.card_text {
  flex-grow: 1;
}
</style>
