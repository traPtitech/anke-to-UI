<template>
  <div :class="$style.container">
    <div v-for="(sidebarContent, index) in sidebarContents" :key="index">
      <side-bar-link
        :title="sidebarContent.title"
        :to="sidebarContent.to"
        :name="sidebarContent.icon"
      />
    </div>
    <div :class="$style.new">
      <side-bar-link
        :title="'新規作成'"
        :to="'/questionnaires/new'"
        :name="'plus'"
      />
    </div>
    <div :class="$style.help">
      <side-bar-link
        :title="'ヘルプ'"
        :to="'https://wiki.trap.jp/SysAd/docs/anke-to'"
        :name="'open-in-new'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SideBarLink from '/@/components/Navigation/SideBarLink.vue'

export default defineComponent({
  name: 'SideBar',
  components: { SideBarLink },
  setup() {
    const sidebarContents = [
      { title: 'アンケート', to: '/explorer', icon: 'form-select' },
      { title: '自分の回答', to: '/responses', icon: 'history' },
      { title: '管理者', to: '/administrates', icon: 'auto-fix' }
    ]

    return { sidebarContents }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  background-color: $bg-tertiary;
  padding: 2rem 1.5rem 1rem;
  gap: 16px;
  grid-area: sidebar;
  text-align: left;
  min-width: fit-content;
  box-sizing: border-box;
}
.new {
  margin-top: 20px;
  border-radius: 9999px;
  @include colors($ui-white, $accent-primary);
}
.help {
  margin-top: auto;
}
</style>
