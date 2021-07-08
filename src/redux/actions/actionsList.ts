export const setMarkerPosition = (position: LatLngObject) => {
    return {
        type: "SETMARKERPOSITION", 
        payload: position
    }
}