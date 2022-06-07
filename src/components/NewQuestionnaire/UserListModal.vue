<template>
  <transition name="modal" appear>
    <div :class="$style.modalMask" @click.self="close">
      <div :class="$style.modal">
        <UserList :title="title" @close="close" />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserList from './UserList.vue'

export default defineComponent({
  name: 'UserListModal',
  components: {
    UserList
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  emits: {
    close: () => true
  },
  setup(props, context) {
    const close = () => {
      context.emit('close')
    }

    return { close }
  }
})
</script>

<style lang="scss" module>
:global {
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.5s ease;
  }
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }
}

.modalMask {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
</style>
