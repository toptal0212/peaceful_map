export const initialState: LatLngObject = {lat: 0, lng: 0}; 

export const markerLocation = (state: LatLngObject = initialState, action: LatLngObject) => {
    switch(action.type) {
        case "setMarkerPosition": {
            return state = action.payLoad;
        }
        default: 
            return state;
    }
}