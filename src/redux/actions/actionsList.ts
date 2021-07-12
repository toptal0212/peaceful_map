export const setDestinationLocation = (newdestinationLocation: LatLngObject): MarkerLocationAction => {
    return {
        type: "SETDESTINATIONLOCATION", 
        payload: newdestinationLocation,
    }
}