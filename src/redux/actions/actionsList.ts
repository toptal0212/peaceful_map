export const setMarkerPosition = (position: MarkerPositionState) => {
    return {
        type: "SETMARKERPOSITION", 
        payload: position
    }
}