<template>
  <li class="todo-list-item" data-test="todo-list-item">
    <input
      type="text"
      class="todo-list-item-input"
      data-test="todo-list-item-input"
      @change="onTodoListItemTitleChange"
      v-model="item.title"
    />
    <button class="btn-delete" data-test="btn-delete" @click="deleteTodoListItem">X</button>
  </li>
</template>

<script>
export default {
  name: 'TodoListItemComponent',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onTodoListItemTitleChange() {
      // TODO: save on blur
    },
    deleteTodoListItem() {
      this.$emit('delete-todo-list-item', this.item.id);
    },
  },
};
</script>

<style scoped>
.todo-list-item {
  display: flex;
  align-items: center;
  color: #2d2d2d;
  background-color: #d1ecf1;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 40px;
}

.todo-list-item-input {
  flex: 1;
  border: 0;
  padding: 0 10px;
  outline: none;
  background-color: transparent;
  height: 100%;
}

.todo-list-item-input:focus {
  background-color: #bee5eb;
}

.btn-delete {
  display: none;
  border: 0;
  width: 40px;
  height: 100%;
  border-top-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 5px;
  cursor: pointer;
}

.todo-list-item:hover .btn-delete {
  display: block;
}
</style>
