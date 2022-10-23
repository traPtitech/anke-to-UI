<template>
  <table :class="$style.table">
    <tbody :class="$style.container">
      <tr v-for="[choice, ids] of choiceIds" :key="choice" :class="$style.body">
        <td :class="isText ? $style.texttype : $style.defaulttype">
          {{ choice }}
        </td>
        <td v-if="!isText" :class="$style.numbers">{{ ids.length }}件</td>
        <td v-if="!isText" :class="$style.percent">
          {{
            `(${(
              (ids.length /
                (question.results.length !== 0 ? question.results.length : 1)) *
              100
            ).toFixed(2)}%)`
          }}
        </td>
        <td :class="[isText ? $style.text : '', $style.icons]">
          <div v-for="(id, i) of ids" :key="i" :class="$style.icon">
            <user-icon :user-name="id" :class="$style.usericon" />
            <dropdown-detail :content="id" :class="$style.dropdown_detail" />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import {
  AllTypeQuestionUnion,
  isTextQuestion,
  generateChoiceIdsArray
} from '../use/statistics'
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
      type: Object as PropType<AllTypeQuestionUnion>,
      required: true
    }
  },
  setup(props) {
    const choiceIds = computed(() => generateChoiceIdsArray(props.question))
    const isText = computed(() => isTextQuestion(props.question))
    return {
      choiceIds,
      isText
    }
  }
})
</script>

<style lang="scss" module>
.table {
  width: 100%;
  color: $ui-primary;
  @include size-body;
}
.container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.body {
  display: flex;
  flex-direction: row;
  align-items: center;
  word-break: break-all;
  text-align: left;
}
.texttype {
  width: 70%;
}
.defaulttype {
  width: 20%;
}
.numbers {
  width: 15%;
  text-align: right;
}
.percent {
  width: 25%;
  word-break: normal;
  text-align: right;
}
.icons {
  width: 50%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  margin-left: 16px;
}
.texticons {
  width: 30%;
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
</style>
