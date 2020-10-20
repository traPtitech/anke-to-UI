<template>
  <div :class="$style.tableItemTitle">
    <icon name="open-in-new" :size="iconsize" />
    <router-link
      :font-size="textsize"
      :to="'/questionnaires/' + id"
      :class="$style.link"
    >
      {{ title }}
    </router-link>
  </div>
</template>

<script lang="ts">
import Icon from '/@/components/UI/Icon.vue'

export default {
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
  }
}
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
