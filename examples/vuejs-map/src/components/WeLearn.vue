<template>
    <div>
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
        window.atlas = setupMapView({element: atlasEl});
    }
}
</script>

<style scoped>
    .container {
        background-color: white;
    }
    #atlas {
        width: 100%;
        height: 50vh;
    }

    div#atlas { text-align: left !important;}
</style>
