export const initialState: LatLngObject = {lat: 0, lng: 0}; 

// State of the marker placed on the map
export const markerLocation = (state: LatLngObject = initialState, action: MarkerPositionAction) => {
    switch(action.type) {
        case "SETMARKERPOSITION": {
            return state = action.payload;
        }
        default: 
            return state;
    }
}