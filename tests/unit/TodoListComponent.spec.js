import { shallowMount } from '@vue/test-utils';
import TodoListComponent from '@/components/todo-list/TodoListComponent.vue';
import TodoListItemComponent from '@/components/todo-list/TodoListItemComponent.vue';

describe('TodoListComponent.vue', () => {
  let wrapper;

  describe('GIVEN an empty list', () => {
    beforeEach(() => {
      wrapper = shallowMount(TodoListComponent, {
        propsData: { items: [] },
      });
    });

    it('THEN should not render any TodoListItemComponent', () => {
      const todoItems = wrapper.findAllComponents(TodoListItemComponent);
      expect(todoItems).toHaveLength(0);
    });
  });

  describe('GIVEN a list with elements', () => {
    const items = [
      {
        id: 'id0',
        title: 'Title 0',
      },
      {
        id: 'id1',
        title: 'Title 1',
      },
      {
        id: 'id2',
        title: 'Title 2',
      },
    ];

    beforeEach(() => {
      wrapper = shallowMount(TodoListComponent, {
        propsData: { items },
      });
    });

    it('THEN should render all items', () => {
      const todoItems = wrapper.findAllComponents(TodoListItemComponent);
      expect(todoItems).toHaveLength(items.length);
    });

    describe('WHEN an delete event is emitted by a TodoListItemComponent', () => {
      beforeEach(() => {
        const todoItem = wrapper.findAllComponents(TodoListItemComponent).at(1);
        todoItem.vm.$emit('delete-todo-list-item', 123);
      });

      it('THEN should ', () => {
        expect(wrapper.emitted()['delete-todo-list-item']).toBeTruthy();
      });
    });
  });
});
