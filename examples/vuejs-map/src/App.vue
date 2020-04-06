<template>
  <div id="app">
    <we-learn/>
  </div>
</template>

<script>
import WeLearn from './components/WeLearn.vue'

export default {
  name: 'App',
  components: {
    WeLearn
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
