# welearn-map
This library is a wrapper to [DotAtlas](https://get.carrotsearch.com/dotatlas/latest/)

## Installation
Add the package as a depedencies in your package.json
```
welearn-map: git@github.com:CyberCRI/welearn-map.git#latest
```

## Integration
1. Get the dotatlas js file
2. Initialize the map

    ``` js
    <div id="atlas" style="width:1000px; height:400px;"></div>      
    import { setupMapView } from '../../../../src/renderer';
    import '../assets/dotatlas';
    const atlasEl = document.getElementById('atlas');
    setupMapView({element: atlasEl});
    ```

3. Listen to click event on the map for getting resources in selection

    ``` js
    window.addEventListener('searchMap', this.yourCallBack);
    ```

## Examples
We can find examples of integration in modern JS framwork
- [Vuejs](https://github.com/CyberCRI/welearn-map/tree/master/examples/vuejs-map)
