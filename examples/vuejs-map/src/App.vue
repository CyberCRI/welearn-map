<template>
  <div id="app">
    <p>WeLearn Concept Map Demo</p>
    <concept-map/>
  </div>
</template>

<script>
import ConceptMap from './components/ConceptMap.vue'

export default {
  name: 'App',
  components: {
    ConceptMap,
  }
}
</script>

<style lang='scss'>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  position: relative;
}

body > .dg.ac {
  z-index: 42;
}

// #app > .mapcard {
//   position: absolute;
//   z-index: 10;
//   width: 100%;

//   .d3-root {

//   }
// }

</style>
