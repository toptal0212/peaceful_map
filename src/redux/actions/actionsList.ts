export const setMarkerPosition = (newMarkerLocation: LatLngObject): MarkerLocationAction => {
    return {
        type: "SETMARKERLOCATION", 
        payload: newMarkerLocation
    }
}