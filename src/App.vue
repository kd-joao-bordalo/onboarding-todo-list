<template>
  <div id="app">
    <HeaderComponent></HeaderComponent>
    <TodoView></TodoView>
  </div>
</template>

<script>
import HeaderComponent from './components/layout/HeaderComponent.vue';
import TodoView from './components/views/TodoView.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    TodoView,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
}
</style>
