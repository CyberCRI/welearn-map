<template>
    <div class="container">
        <h1>Test Welearn Map</h1>
        <div id="atlas"></div>
    </div>
</template>

<script>
import { setupMapView } from '../../../../src/renderer'
import '../assets/dotatlas'

export default {
    name: 'Welearn',
    methods: {
        displayData: function(e) {
            e.detail.selection.forEach(element => {
                console.log(element)
            });
        }
    },
    mounted() {
        window.addEventListener('searchMap', this.displayData);
        const atlasEl = document.getElementById('atlas');
        setupMapView({element: atlasEl});
    }
}
</script>

<style scoped>
    .container {
        background-color: white;
    }
    #atlas {
        width: 1000px;
        height: 400px;
    }
</style>