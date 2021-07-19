export const setDestinationLocation = (newdestinationLocation: LatLng, newDestinationNameEn?: string | undefined): DestinationAction => {
    return {
        type: "SETDESTINATIONLOCATION", 
        locationPayload: newdestinationLocation,
        nameEnPayload: newDestinationNameEn
    }
}