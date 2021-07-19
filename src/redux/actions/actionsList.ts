export const setDestinationLocation = (newdestinationLocation: LatLngObject, newDestinationNameEn?: string | undefined): DestinationAction => {
    return {
        type: "SETDESTINATIONLOCATION", 
        locationPayload: newdestinationLocation,
        nameEnPayload: newDestinationNameEn
    }
}