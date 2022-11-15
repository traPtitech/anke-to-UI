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
      :is-current="1 == current"
      @click="updatePage(1)"
    />
    <div v-for="(page, key) in 5" :key="key">
      <icon
        v-if="
          (page == 5 && totalPage - current > 3) || (page == 1 && current > 4)
        "
        name="dots-horizontal"
        :class="$style.dots"
      />
      <PaginationButton
        v-else-if="4 < current && totalPage - current > 2"
        :number="current + page - 3"
        :is-current="current + page - 3 == current"
        @click="updatePage(current + page - 3)"
      />
      <PaginationButton
        v-else-if="current <= 4 && page + 1 < totalPage"
        :number="page + 1"
        :is-current="page + 1 == current"
        @click="updatePage(page + 1)"
      />
      <PaginationButton
        v-else-if="totalPage - current <= 2 && page + 1 < totalPage"
        :number="totalPage + page - 6"
        :is-current="totalPage + page - 6 == current"
        @click="updatePage(totalPage + page - 6)"
      />
    </div>
    <PaginationButton
      :number="totalPage"
      :is-current="totalPage == current"
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
