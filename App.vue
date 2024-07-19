<template>
  <div id="app">
    <Cube />
  </div>
</template>

<script>
import Cube from './Cube.vue';

export default {
  name: 'App',
  components: {
    Cube,
  },
};
</script>

<style>
#app {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #222;
    margin: 0;
}
</style>
