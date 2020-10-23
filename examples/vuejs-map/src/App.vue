<template>
  <div id="app">
    <concept-map/>
    <we-learn class='dotatlas-root'/>
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app > .mapcard {
  position: absolute;
  z-index: 10;
  width: 100%;
  pointer-events: none;
}

</style>
