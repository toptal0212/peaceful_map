export const initialState: DestinationState = {
    location: {
        lat: 0,
        lng: 0,
    },
    nameEn: "",
};

// State of the marker placed on the map.
export const destinationReducer = (state: DestinationState = initialState, action: DestinationAction) => {
    switch (action.type) {
        case "SETDESTINATIONLOCATION":{
            return {
                location: action.locationPayload,
                nameEn: action.nameEnPayload
            }
        }
        default:
            return state;
    }
}