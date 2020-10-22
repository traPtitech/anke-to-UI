<template>
  <div :class="$style.tableItemTitle">
    <icon name="open-in-new" :size="iconsize" />
    <router-link
      :to="'/questionnaires/' + id"
      :class="$style.link"
      :style="fontSize"
    >
      {{ title }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'CardTitle',
  components: {
    Icon
  },
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    iconsize: {
      type: Number,
      default: 24
    },
    textsize: {
      type: Number,
      required: false,
      default: 24
    }
  },
  setup(props) {
    const fontSize = computed(() => `font-size: ${props.textsize}px;`)
    return {
      fontSize
    }
  }
})
</script>

<style lang="scss" module>
.tableItemTitle {
  display: flex;
  align-items: center;
  margin-bottom: 0.8em;
}
.link {
  cursor: pointer;
  color: #92413b;
  text-decoration: none;
  &:hover {
    color: #cfb998;
  }
  margin-left: 8px;
}
</style>
