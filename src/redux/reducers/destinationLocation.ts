export const initialState: DestinationLocationState = {
    destinationLocation: {
        lat: 0,
        lng: 0,
    }
};

// State of the marker placed on the map.
export const destinationLocationReducer = (state: DestinationLocationState = initialState, action: MarkerLocationAction) => {
    switch (action.type) {
        case "SETDESTINATIONLOCATION":{
            return {
                destinationLocation: action.payload,
            }
        }
        default:
            return state;
    }
}