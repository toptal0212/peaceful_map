export const initialState: MarkerLocationState = {
    markerLocation: {
        lat: 0,
        lng: 0,
    }
};

// State of the marker placed on the map
export const markerLocationReducer = (state: MarkerLocationState = initialState, action: MarkerLocationAction) => {
    switch (action.type) {
        case "SETMARKERLOCATION":
            return {
                markerLocation: action.payload
            }

        default:
            return state;
    }
}