<template>
  <div :class="$style.container">
    <div :class="$style.header">{{ title }}</div>
    <div :class="$style.body">
      <div v-for="(group, groupIndex) in groups" :key="groupIndex">
        <UserListGroup :group="group" />
      </div>
    </div>
    <div :class="$style.footer">
      <button :class="$style.button" @click="close">
        <Icon name="check" :class="$style.icon" />
        <span>決定</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserListGroup from './UserListGroup.vue'
import Icon from '/@/components/UI/Icon.vue'
import { Group } from '/@/lib/apis'

export default defineComponent({
  name: 'UserList',
  components: {
    UserListGroup,
    Icon
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
    const groups: Group[] = [
      {
        groupId: '',
        name: '19B',
        description: '19B',
        adminUser: '',
        members: [
          [
            'aaaaaaaaaa',
            'bbbbbbbbbb',
            'cccccccccc',
            'dddddddddd',
            'eeeeeeeeee',
            'ffffffffff'
          ]
        ],
        createdAt: '',
        updatedAt: ''
      },
      {
        groupId: '',
        name: '20B',
        description: '20B',
        adminUser: '',
        members: [['aaaaaaaaaa', 'bbbbbbbbbb', 'cccccccccc']],
        createdAt: '',
        updatedAt: ''
      }
    ]

    const close = () => {
      context.emit('close')
    }

    return { groups, close }
  }
})
</script>

<style lang="scss" module>
.container {
  display: grid;
  grid-template-rows: max-content auto max-content;
  height: 90vh;
  width: 80vw;
  max-width: 50rem;
}
.header,
.footer {
  display: flex;
  background-color: #f5f5f5;
  padding: 0.75rem 1.5rem;
}
.header {
  border-radius: 0.5rem 0.5rem 0 0;
  font-size: 1.5rem;
}
.footer {
  border-radius: 0 0 0.5rem 0.5rem;
  justify-content: flex-end;
}
.body {
  overflow: auto;
  overflow-x: hidden;
  background-color: #ffffff;
  padding: 1rem;
}
.button {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: solid 1px #cfb998;
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  &:hover {
    background-color: #f4ecec;
  }
}
.icon {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
