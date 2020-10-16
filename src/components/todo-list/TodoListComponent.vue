<template>
  <ul class="todo-list" data-test="todo-list">
    <TodoListItemComponent
      v-for="item of items"
      :key="item.id"
      :item="item"
      @delete-todo-list-item="deleteTodoListItem"
    ></TodoListItemComponent>
  </ul>
</template>

<script>
import TodoListItemComponent from './TodoListItemComponent.vue';

export default {
  name: 'TodoListComponent',
  components: {
    TodoListItemComponent,
  },
  props: {
    items: {
      required: true,
    },
  },
  methods: {
    deleteTodoListItem(itemId) {
      this.$emit('delete-todo-list-item', itemId);
    },
  },
};
</script>

<style scoped>
.todo-list {
  display: flex;
  flex: 0 1 auto;
  flex-direction: column;
  width: 100%;
  min-height: 0;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
}

.todo-list-item {
  margin-bottom: 10px;
}
</style>
