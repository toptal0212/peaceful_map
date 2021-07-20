export const initialState: UserLocationState = {
    location: {
        lat: 0,
        lng: 0,
    },
};

// State of the marker placed on the map.
export const userLocationReducer = (state: UserLocationState = initialState, action: UserLocationAction) => {
    switch (action.type) {
        case "SETUSERLOCATION":{
            return {
                location: action.locationPayload,
            }
        }
        default:
            return state;
    }
}