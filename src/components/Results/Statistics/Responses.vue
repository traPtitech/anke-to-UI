<template>
  <table :class="$style.table">
    <tbody>
      <tr
        v-for="[choice, ids] of question.data"
        :key="choice"
        :class="$style.container"
      >
        <td :class="isText ? $style.texttype : $style.defaulttype">
          {{ choice }}
        </td>
        <td v-if="!isText" :class="$style.numbers">{{ ids.length }}件</td>
        <td v-if="!isText" :class="$style.percent">
          {{
            `(${(
              (ids.length / (question.length !== 0 ? question.length : 1)) *
              100
            ).toFixed(2)}%)`
          }}
        </td>
        <td :class="$style.icons">
          <div v-for="id of ids" :key="id" :class="$style.icon">
            <user-icon :user-name="id" :class="$style.usericon" />
            <dropdown-detail :content="id" :class="$style.dropdown_detail" />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { CountedData, isTextType } from '../use/utils'
import UserIcon from '/@/components/UI/UserIcon.vue'
import DropdownDetail from '/@/components/UI/DropdownDetail.vue'

export default defineComponent({
  name: 'Responces',
  components: {
    UserIcon,
    DropdownDetail
  },
  props: {
    question: {
      type: Object as PropType<CountedData>,
      required: true
    }
  },
  setup(props) {
    const isText = isTextType(props.question.type)
    return {
      isText
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  word-break: break-word;
  text-align: left;
}
.texttype {
  width: 70%;
}
.defaulttype {
  width: 25%;
}
.numbers {
  width: 25%;
  text-align: right;
}
.percent {
  width: 7.5%;
  text-align: right;
}
.icons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
}
.icon {
  position: relative;
  height: 16px;
}
.dropdown_detail {
  pointer-events: none;
  opacity: 0;
  transition: 0.1s;
  .usericon:hover ~ & {
    opacity: 1;
  }
}
.table {
  width: 100%;
  color: $ui-primary;
  @include size-body;
}
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
