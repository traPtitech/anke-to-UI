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
    <div
      v-if="current < 5 || totalPage <= 7"
      :class="$style.pagination_wrapper"
    >
      <PaginationButton
        v-if="totalPage > 2"
        :number="2"
        :is-current="current === 2"
        @click="updatePage(2)"
      />
      <PaginationButton
        v-if="totalPage > 3"
        :number="3"
        :is-current="current === 3"
        @click="updatePage(3)"
      />
      <PaginationButton
        v-if="totalPage > 4"
        :number="4"
        :is-current="current === 4"
        @click="updatePage(4)"
      />
      <PaginationButton
        v-if="totalPage > 5"
        :number="5"
        :is-current="current === 5"
        @click="updatePage(5)"
      />
      <icon v-if="totalPage > 7" name="dots-horizontal" :class="$style.dots" />
      <PaginationButton
        v-else-if="totalPage > 6"
        :number="6"
        :is-current="current === 6"
        @click="updatePage(6)"
      />
    </div>
    <div v-else-if="current > totalPage - 3" :class="$style.pagination_wrapper">
      <icon name="dots-horizontal" :class="$style.dots" />
      <PaginationButton
        :number="totalPage - 4"
        :is-current="current === totalPage - 4"
        @click="updatePage(totalPage - 4)"
      />
      <PaginationButton
        :number="totalPage - 3"
        :is-current="current === totalPage - 3"
        @click="updatePage(totalPage - 3)"
      />
      <PaginationButton
        :number="totalPage - 2"
        :is-current="current === totalPage - 2"
        @click="updatePage(totalPage - 2)"
      />
      <PaginationButton
        :number="totalPage - 1"
        :is-current="current === totalPage - 1"
        @click="updatePage(totalPage - 1)"
      />
    </div>
    <div v-else :class="$style.pagination_wrapper">
      <icon name="dots-horizontal" :class="$style.dots" />
      <PaginationButton
        :number="current - 1"
        :is-current="false"
        @click="updatePage(current - 1)"
      />
      <PaginationButton
        :number="current"
        :is-current="true"
        @click="updatePage(current)"
      />
      <PaginationButton
        :number="current + 1"
        :is-current="false"
        @click="updatePage(current + 1)"
      />
      <icon name="dots-horizontal" :class="$style.dots" />
    </div>
    <PaginationButton
      v-if="totalPage >= 2"
      :number="totalPage"
      :is-current="current === totalPage"
      @click="updatePage(totalPage)"
    />
    <icon
      v-if="current == totalPage"
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
import { defineComponent } from 'vue'
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
    return { updatePage }
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
}
.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
