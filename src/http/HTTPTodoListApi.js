import axios from 'axios';

const HOST = process.env.VUE_APP_API_HOST;
const PATH = process.env.VUE_APP_API_PATH;
axios.defaults.baseURL = HOST;

function getAllTodoItems() {
  return axios.get(`${PATH}.json`);
}

function createNewTodoItem(newItem) {
  return axios.post(`${PATH}.json`, newItem);
}

function deleteTodoItem(itemId) {
  return axios.delete(`${PATH}/${itemId}.json`);
}

export default {
  getAllTodoItems,
  createNewTodoItem,
  deleteTodoItem,
};
