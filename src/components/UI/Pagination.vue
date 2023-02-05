<template>
  <div :class="$style.pagination_wrapper">
    <icon v-if="current == 1" name="chevron-left" :class="$style.disabled" />
    <icon
      v-else
      name="chevron-left"
      :hover-animation="true"
      @click="updatePage(current - 1)"
    />
    <PaginationButton
      :number="1"
      :is-current="current === 1"
      @click="updatePage(1)"
    />
    <icon
      v-if="centerIndexes.at(0) && centerIndexes.at(0)! > 2"
      name="dots-horizontal"
      :class="$style.dots"
    />
    <PaginationButton
      v-for="(page, key) in centerIndexes"
      :key="key"
      :number="page"
      :is-current="current === page"
      @click="updatePage(page)"
    />
    <icon
      v-if="centerIndexes.at(-1) && totalPage - centerIndexes.at(-1)! > 1"
      name="dots-horizontal"
      :class="$style.dots"
    />
    <PaginationButton
      v-if="totalPage >= 2"
      :number="totalPage"
      :is-current="current === totalPage"
      @click="updatePage(totalPage)"
    />
    <icon
      v-if="current === totalPage"
      name="chevron-right"
      :class="$style.disabled"
    />
    <icon
      v-else
      name="chevron-right"
      :hover-animation="true"
      @click="updatePage(current + 1)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import Icon from './Icon.vue'
import PaginationButton from './PaginationButton.vue'

export default defineComponent({
  name: 'Pagination',
  components: {
    Icon,
    PaginationButton
  },
  props: {
    current: {
      type: Number,
      required: true
    },
    totalPage: {
      type: Number,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatePage: (value: number) => true
  },
  setup(props, context) {
    const updatePage = (page: number) => {
      context.emit('updatePage', page)
    }
    const centerIndexes = computed(() => {
      const min = 2
      const max = props.totalPage - 1
      const expandEdge = (arr: number[]) => {
        const res = [...arr]
        if (res.at(0) === 2) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          res.push(res.at(-1)! + 1)
        }
        if (res.at(-1) === props.totalPage - 1) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          res.unshift(res.at(0)! - 1)
        }
        if (res.at(0) === 3) {
          res.unshift(2)
        }
        if (res.at(-1) === props.totalPage - 2) {
          res.push(props.totalPage - 1)
        }
        return res.filter(v => v >= min && v <= max)
      }

      if (props.current <= min) {
        return expandEdge([3, 4, 5])
      }
      if (props.current >= max) {
        return expandEdge([
          props.totalPage - 4,
          props.totalPage - 3,
          props.totalPage - 2
        ])
      }

      return expandEdge([props.current - 1, props.current, props.current + 1])
    })
    return { updatePage, centerIndexes }
  }
})
</script>

<style lang="scss" module>
.pagination_wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1rem 0;
}
.dots {
  color: $ui-primary;
  margin: 0 0.625rem;
}
.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
