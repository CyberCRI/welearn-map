<template>
    <div class='mapcard'>
        <div id="d3-root"></div>
    </div>
</template>

<script>
import ConceptMap from '.'

export default {
    name: 'ConceptMap',
    methods: {
        displayData: function(e) {
            console.log(e.nearbyConcepts)
        }
    },
    mounted() {
        window.cmap = new ConceptMap({
          filters: { user: 'projects@import.bot' },
          mountPoint: '#d3-root',
          onSearchMap: this.displayData, // [!todo @nicolas]
        })
        window.cmap.init()
    },

}
</script>

<style lang='scss'>
:root {
  --cornerRadius: 6px;
}

.mapcard {
  border-radius: var(--cornerRadius);
  overflow: hidden;
}
</style>
