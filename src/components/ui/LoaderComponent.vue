<template>
  <div v-if="isLoading" class="loader-container">
    <img class="image" alt="loading" src="@/assets/images/loader.gif" />
  </div>
</template>

<script>
export default {
  name: 'LoaderComponent',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.loader-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.image {
  width: 30px;
  height: 30px;
}
</style>
