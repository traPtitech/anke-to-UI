<template>
  <div :class="$style.card">
    <Card>
      <template #header>自分の回答</template>
      <template #content>
        <div :class="$style.fadeResponse">
          <transition name="fadeResponse">
            <div v-if="isFetched" :class="$style.container">
              <ATable>
                <template #tableheader>
                  <th
                    v-for="(header, index) in headers"
                    :key="index"
                    :class="$style.header"
                  >
                    {{ header }}
                  </th>
                </template>
                <template #tablecontent>
                  <table-row
                    v-for="(responseSummary, index) in responseSummaries"
                    :key="index"
                    :class="$style.table"
                  >
                    <responses-table-row :response-summary="responseSummary" />
                  </table-row>
                </template>
              </ATable>
            </div>
            <div v-else :class="$style.container">
              <ATable>
                <template #tableheader>
                  <th
                    v-for="(header, index) in headers"
                    :key="index"
                    :class="$style.header"
                  >
                    {{ header }}
                  </th>
                </template>
                <template #tablecontent>
                  <table-row
                    v-for="questionnaire of 20"
                    :key="questionnaire"
                    :class="$style.table"
                  >
                    <questionnaires-table-row-mock />
                  </table-row>
                </template>
              </ATable>
            </div>
          </transition>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Card from '/@/components/UI/Card.vue'
import ATable from '/@/components/UI/ATable.vue'
import apis, { ResponseSummary } from '/@/lib/apis'
import TableRow from '/@/components/UI/TableRow.vue'
import ResponsesTableRow from '/@/components/Responses/ResponsesTableRow.vue'
import QuestionnairesTableRowMock from '/@/components/Explorer/QuestionnairesTableRowMock.vue'

export default defineComponent({
  name: 'Responses',
  components: {
    Card,
    ATable,
    TableRow,
    ResponsesTableRow,
    QuestionnairesTableRowMock
  },
  setup() {
    const headers = ['', '回答期限', '回答日時', '更新日時', '回答']
    const responseSummaries = ref<ResponseSummary[]>([])
    const isFetched = ref(false)
    onMounted(async () => {
      const { data } = await apis.getMyResponses()
      responseSummaries.value = data
      isFetched.value = true
    })
    return {
      headers,
      responseSummaries,
      isFetched
    }
  }
})
</script>

<style lang="scss" module>
.card {
  max-width: 1280px;
}
.container {
  box-sizing: border-box;
  padding: 1rem;
  border: solid 1.5px #d9d9d9;
  overflow: auto;
  top: 0;
  position: absolute;
  width: 100%;
  max-width: 1280px;
}
.header {
  text-align: center;
  padding: 0.8rem;
}
.fadeResponse {
  position: relative;
  width: 100%;
}
:global {
  .fadeResponse-enter-active,
  .fadeResponse-leave-active {
    transition: opacity 0.1s;
  }
  .fadeResponse-enter-from,
  .fadeResponse-leave-to {
    opacity: 0;
  }
}
</style>
