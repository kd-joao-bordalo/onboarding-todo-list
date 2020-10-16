import { shallowMount } from '@vue/test-utils';
import TodoListItemComponent from '@/components/todo-list/TodoListItemComponent.vue';

describe('TodoListItemComponent.vue', () => {
  const item = {
    id: 'id0',
    title: 'Title 0',
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TodoListItemComponent, {
      propsData: { item },
    });
  });

  it('THEN should set the item value in the input field', () => {
    const input = wrapper.find('[data-test="todo-list-item-input"]');
    expect(input.element.value).toMatch(item.title);
  });

  describe('WHEN delete button is clicked', () => {
    beforeEach(() => {
      const deleteButton = wrapper.find('[data-test="btn-delete"]');
      deleteButton.trigger('click');
    });

    it('THEN should emit the item id', () => {
      expect(wrapper.emitted()['delete-todo-list-item'][0]).toEqual([item.id]);
    });
  });
});
