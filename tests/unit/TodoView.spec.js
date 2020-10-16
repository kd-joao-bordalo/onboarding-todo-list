import TodoListComponent from '@/components/todo-list/TodoListComponent.vue';
import TodoListItemComponent from '@/components/todo-list/TodoListItemComponent.vue';
import LoaderComponent from '@/components/ui/LoaderComponent.vue';
import TodoView from '@/components/views/TodoView.vue';
import HTTPTodoListApi from '@/http/HTTPTodoListApi';
import { mount, shallowMount } from '@vue/test-utils';

jest.mock('@/http/HTTPTodoListApi', () => {
  return {
    getAllTodoItems: jest.fn(),
    createNewTodoItem: jest.fn(),
    deleteTodoItem: jest.fn(),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('TodoView.vue', () => {
  const itemsObject = {
    id0: { title: 'Title 0' },
    id1: { title: 'Title 1' },
    id2: { title: 'Title 2' },
  };
  let wrapper;

  describe('GIVEN an empty list', () => {
    beforeEach(() => {
      HTTPTodoListApi.getAllTodoItems.mockResolvedValue(Promise.resolve({ data: {} }));
      wrapper = shallowMount(TodoView);
    });

    it('THEN items list should remain empty', () => {
      expect(wrapper.vm.items.length).toBe(0);
    });
  });

  describe('GIVEN a list with elements', () => {
    beforeEach(() => {
      HTTPTodoListApi.getAllTodoItems.mockResolvedValue(Promise.resolve({ data: itemsObject }));
      wrapper = shallowMount(TodoView);
    });

    it('THEN items list should remain empty', () => {
      expect(wrapper.vm.items.length).toBe(3);
    });
  });

  describe('GIVEN an shallow mounted component', () => {
    let inputText;
    let addButton;

    beforeEach(() => {
      HTTPTodoListApi.getAllTodoItems.mockResolvedValue(Promise.resolve({ data: itemsObject }));
      wrapper = shallowMount(TodoView);
      inputText = wrapper.find('[data-test="input-text"]');
      addButton = wrapper.find('[data-test="btn-add-todo-item"]');
    });

    it('THEN should render LoaderComponent', () => {
      const loaderComponent = wrapper.findComponent(LoaderComponent);
      expect(loaderComponent.exists()).toBe(true);
    });

    it('THEN should render TodoListComponent', () => {
      const listItems = wrapper.findAllComponents(TodoListComponent);
      expect(listItems.exists()).toBe(true);
    });

    describe('WHEN new item title input field is empty', () => {
      beforeEach(async () => {
        inputText.element.value = '';
        inputText.trigger('input');
        await inputText.trigger('input');
      });

      it('THEN should update `newTodoItemTitle`', () => {
        expect(wrapper.vm.newTodoItemTitle).toBe('');
      });

      it('THEN Add button should be disabled', () => {
        expect(addButton.attributes('disabled')).toBe('disabled');
      });
    });

    describe('WHEN new item title input field is not empty', () => {
      const newTitle = 'New Title';

      beforeEach(async () => {
        inputText.element.value = newTitle;
        inputText.trigger('input');
        await inputText.trigger('input');
      });

      it('THEN should update `newTodoItemTitle`', () => {
        expect(wrapper.vm.newTodoItemTitle).toBe(newTitle);
      });

      it('THEN Add button should be enabled', () => {
        expect(addButton.attributes('disabled')).toBe(undefined);
      });
    });

    describe('WHEN form is submitted', () => {
      const newId = 'id3';
      const newTitle = 'New Title 3';

      beforeEach(async () => {
        const form = wrapper.find('[data-test="form-add-todo-item"]');
        HTTPTodoListApi.createNewTodoItem.mockResolvedValue(
          Promise.resolve({ data: { name: newId } })
        );
        inputText.element.value = newTitle;
        inputText.trigger('input');
        await inputText.trigger('input');
        await form.trigger('submit');
      });

      it('THEN should push a new item', () => {
        expect(wrapper.vm.items[3].id).toBe(newId);
        expect(wrapper.vm.items[3].title).toBe(newTitle);
      });
    });

    describe('WHEN delete event is emitted', () => {
      const deletedId = 'id2';
      let spyDeleteTodoListItem;

      beforeEach(() => {
        HTTPTodoListApi.deleteTodoItem.mockResolvedValue(Promise.resolve());
        wrapper.vm.deleteTodoListItem(deletedId);
        spyDeleteTodoListItem = jest.spyOn(HTTPTodoListApi, 'deleteTodoItem');
      });

      it('THEN should remove the item', () => {
        const itemArray = wrapper.vm.items.filter((item) => item.id === deletedId);
        expect(itemArray.length).toBe(0);
      });

      it('THEN should call service with item id', () => {
        expect(spyDeleteTodoListItem).toBeCalledWith(deletedId);
      });
    });
  });

  describe('GIVEN a fully mounted TodoView component', () => {
    let spyDeleteTodoListItem;

    beforeEach(() => {
      HTTPTodoListApi.getAllTodoItems.mockResolvedValue(Promise.resolve({ data: itemsObject }));
      wrapper = mount(TodoView);
      spyDeleteTodoListItem = jest.spyOn(wrapper.vm, 'deleteTodoListItem').mockImplementation();
    });

    it('THEN should render all items', () => {
      const listItems = wrapper.findAllComponents(TodoListItemComponent);
      expect(listItems).toHaveLength(3);
    });

    describe('WHEN new item is added', () => {
      const newTitle = 'New Title 3';

      beforeEach(() => {
        const newItem = { title: newTitle, id: 'id3' };
        const newItems = [...wrapper.vm.items, newItem];
        wrapper.setData({ items: newItems });
      });

      it('THEN should render the new item', () => {
        const inputTitle = wrapper
          .findAllComponents(TodoListItemComponent)
          .at(wrapper.vm.items.length - 1)
          .find('[data-test="todo-list-item-input"]');
        expect(inputTitle.element.value).toMatch(newTitle);
      });
    });

    describe('WHEN a item is deleted', () => {
      beforeEach(() => {
        const newItem = wrapper.findAllComponents(TodoListItemComponent).at(1);
        newItem.vm.deleteTodoListItem();
      });

      it('THEN should emit the item id', () => {
        expect(spyDeleteTodoListItem).toBeCalledWith(wrapper.vm.items[1].id);
      });
    });
  });
});
