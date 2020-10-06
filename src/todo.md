# D3 Based Map Rendering

## Requirements (in consideration)

- Abstract rendering
- Event hooks
- Globals
- Lookup tables


## Map State Machine

[init] -> [render_initial] -> [apply_initial_data]

1. Define the layers of abstraction and handlers.
    - Visual Base Layer: Contours
    - Interactive Layer: Hidden event dispatchers
        - Handles the click/mouse/keyboard events
        - Informs other layers to update with the given params
    - State Layer
    - Control Layer
2. Implement the Data Flow
3. Use some magic


## Map Events and Dispatchers

[init] -> [Register Handlers]

1. High and low level events are emitted from the D3 map UI!
2. 
