<template>
    <div class='mapcard'>
        <div id="d3-root"></div>
    </div>
</template>

<script>
import { ConceptMap } from '../../../../src/layer-d3'

export default {
    name: 'ConceptMap',
    methods: {
        displayData: function(e) {
            console.log(e.nearbyConcepts)
        }
    },
    mounted() {
        window.addEventListener('searchMap', this.displayData);
        const cmap = new ConceptMap({
          filters: { user: 'projects@import.bot' },
          mountPoint: '#d3-root',
          onSearchMap: this.displayData, // [!todo @nicolas]
        })
        cmap.init()
    },

}
</script>

<style lang='scss'>
    // Use these variables in next iteration.
    :root {
      --cornerRadius: 6px;
    }

    $white: #fff;
    $portal-fill-0: #000;
    $portal-fill-1: #444;
    $portal-fill-2: #444;
    $portal-fill-3: #444;
    $marker-fill: #042;

    @mixin fill-container($offset: 0px) {
      // Absolutely fill the element inside the parent element.
      // With offset it's possible to change the position evenly.
      // [!] Note that the element needs to be positioned as absolute.
      top: $offset;
      left: $offset;
      right: $offset;
      bottom: $offset;
    }

    .mapcard {
      border-radius: var(--cornerRadius);
      overflow: hidden;
    }


    #d3-root {
      overflow: hidden;
      position: relative;
      display: block;
      width: 100%;
      height: 50vh;
      text-align: left;
      font-size: small;

      z-index: 2;
      width: 100%;
      min-height: 400px;
      height: 55vh;
      background: #a8cff4;

      cursor: grab;

      &:after {
        position: absolute;
        content: '';
        opacity: .09;
        pointer-events: none;

        background: {
          image: url('/media/textures/whitenoise-100x100.png');
          size: 80px;
          color: transparent;
        }
      }

      &:active {
        cursor: grabbing;
      }

      svg.maproot {
        position: relative;
        display: block;
        @include fill-container(0);
      }

      .divroot {
        @include fill-container(0);
        position: absolute;
        pointer-events: none;
        overflow: hidden;

        div.layer {
          // fill the root container with the layers in here.
          @include fill-container(0);
          overflow: hidden;
          position: absolute;
          pointer-events: none;

          p.marker {
            position: absolute;
            display: inline;
            padding: 5px;
            margin: 0;

            line-height: 1;
            text-align: center;
            text-rendering: optimizeSpeed;
            border-radius: 4px;

            transition: .1s opacity, .1s font-size;

            // default state to make sure we do not crowd the map on first
            // render.
            visibility: hidden;
            opacity: 0;

            &.visible {
              opacity: 1;
              visibility: visible;
              pointer-events: visible;
            }
            &.occluded {
              opacity: 0;
              visibility: hidden;
              pointer-events: none;
            }
            &.interactive {
              cursor: pointer;
              &:hover {
                background: transparentize($white, .7);
              }
              &:focus {
                background: transparentize($white, .9);
              }
            }
            &.highlighted {
              background: transparentize($white, .5);
            }

            &.portal {
              font-size: 2em;
              background: transparentize($color: $white, $amount: .7);
              font-weight: 500;
              color: $portal-fill-0;
              max-width: 200px;
              text-shadow: 0 0 5px $white, 1px 1px 2px $white;
              letter-spacing: .2px;

              &[level='1'] {
                color: $portal-fill-1;
                font-size: 1.4em;
                font-weight: 600;
              }
              &[level='2'] {
                color: $portal-fill-2;
                font-size: 1.2em;
                font-weight: 500;
              }
              &[level='3'] {
                color: $portal-fill-3;
                font-size: 1em;
                font-weight: 400;
              }
            }
          }
        }
      }
      .contours {
        pointer-events: none;

        path {
          stroke: transparentize($color: $white, $amount: .8);
          stroke-width: 0;
        }
      }
    }
</style>
