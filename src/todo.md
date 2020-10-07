# D3 Based Map Rendering

# Priorities
- The current version needs a static filters variable set to CRI-Project user
- An event handler for `onSelect`.

- Add babel transpilation step so to use a pre-transpiled es6 module of vue components.


## Requirements (in consideration)

- Abstract rendering pipeline
- Event hooks
- Global Variables
- Lookup Tables


## Map State Machine

[init] -> [render_initial] -> [apply_initial_data] -> [Apply visual transforms]

### Implementation Notes and Requirements.

1. Define the layers of abstraction and handlers.
    - Visual Base Layer: Contours
    - Interactive Layer: Hidden event dispatchers
        - Handles the click/mouse/keyboard events
        - Informs other layers to update with the given params
    - State Layer
    - Control Layer
2. Implement Socket.io based server for WeLearn Map.
    - At the moment we use a crude websocket connection which tries
      to back-off if there is unsuccesful connection, latency is high,
      or network connection is unstable (eg. while travelling in metro).
    - We also need to have a fail-safe fallback mechanism which should
      transparently work using long-polling method.
3. Clean Up the current visualisation code.
4. Ensure vuejs component API stays high level.
    - viewportEvent: { zoom, click, nudge, focusNode }
    - SelectionEvents: { highlight, focus, clear, undo }
    - StateEvents: { ready }


## Map Events and Dispatchers

[init] -> [Register Handlers]

1. High and low level events are emitted from the D3 map UI!
2. But, we are only focusing on the following main events:


## Core DataStructures

Note that most of these are only concerning the welearn rcarte server.

1. `FoV`: or, Field of View. Take you a circle with radius r=diagonal/2.
2. `Node`: { coordinate, priority, visibility, kind }
--
3. `Map`: Contains the global state of the map.

- didClickOnMap -> gives you the a list of wikidata IDs and a sequence number.
- use the sequence number to make sure there is no race conditions.
