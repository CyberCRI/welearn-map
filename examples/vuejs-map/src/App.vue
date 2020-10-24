<template>
  <div id="app">
    <p>WeLearn Concept Map Demo</p>
    <concept-map/>
    <we-learn/>
  </div>
</template>

<script>
import ConceptMap from './components/ConceptMap.vue'
import WeLearn from './components/WeLearn.vue'

export default {
  name: 'App',
  components: {
    ConceptMap,
    WeLearn,
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

// #app > .mapcard {
//   position: absolute;
//   z-index: 10;
//   width: 100%;

//   .d3-root {

//   }
// }

</style>
