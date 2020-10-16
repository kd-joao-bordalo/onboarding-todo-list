<template>
  <div class="todo-list-container">
    <LoaderComponent :isLoading="isLoading"></LoaderComponent>
    <TodoListComponent
      :items="items"
      @delete-todo-list-item="deleteTodoListItem"
    ></TodoListComponent>

    <form class="add-todo-item" data-test="form-add-todo-item" @submit.prevent="addTodoItem">
      <input
        class="input-text"
        type="text"
        data-test="input-text"
        v-model="newTodoItemTitle"
        placeholder="New item"
      />
      <button
        type="[type='submit']"
        class="btn-add-todo-item"
        data-test="btn-add-todo-item"
        :disabled="isAddButtonDisabled"
      >
        Add
      </button>
    </form>
  </div>
</template>

<script>
import LoaderComponent from '@/components/ui/LoaderComponent.vue';
import HTTPTodoListApi from '@/http/HTTPTodoListApi';
import TodoListComponent from '../todo-list/TodoListComponent.vue';

export default {
  name: 'TodoView',

  components: {
    TodoListComponent,
    LoaderComponent,
  },

  data() {
    return {
      items: [],
      newTodoItemTitle: '',
      isLoading: false,
    };
  },

  created() {
    this.getAllTodoItems();
  },

  computed: {
    isAddButtonDisabled() {
      return !this.newTodoItemTitle.trim();
    },
  },

  methods: {
    getAllTodoItems() {
      this.isLoading = true;
      HTTPTodoListApi.getAllTodoItems()
        .then(this.onGetItemsResponse)
        .catch(() => {
          this.isLoading = false;
        });
    },

    onGetItemsResponse({ data }) {
      this.items = Object.keys(data).map((key) => {
        const item = data[key];
        item.id = key;
        return item;
      });
      this.isLoading = false;
    },

    addTodoItem() {
      if (this.newTodoItemTitle.trim()) {
        this.isLoading = true;
        const newItem = this.buildNewItem(this.newTodoItemTitle);

        HTTPTodoListApi.createNewTodoItem(newItem)
          .then((res) => this.onCreateNewItemResponse(newItem, res))
          .catch(() => {
            this.isLoading = false;
          });
      }
    },

    buildNewItem(title) {
      return {
        title,
        checked: false,
      };
    },

    onCreateNewItemResponse(newItem, res) {
      this.newTodoItemTitle = '';
      const newItemCopy = { ...newItem };
      newItemCopy.id = res.data.name;
      this.items = [...this.items, newItemCopy];
      this.isLoading = false;
    },

    deleteTodoListItem(itemId) {
      this.isLoading = true;

      HTTPTodoListApi.deleteTodoItem(itemId)
        .then(() => {
          const items = this.items.filter((item) => item.id !== itemId);
          this.items = items;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
.todo-list-container {
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
  flex: 1;
  min-height: 0;
}

.add-todo-item {
  display: flex;
  width: 100%;
  height: 40px;
}

.input-text {
  flex: 1;
  border-radius: 5px;
  border: 1px solid #ced4da;
  padding: 10px;
  outline: none;
}

.btn-add-todo-item {
  margin-left: 10px;
  border-radius: 5px;
  border: 1px solid #ced4da;
}
</style>
