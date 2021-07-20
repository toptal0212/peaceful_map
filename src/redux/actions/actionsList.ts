export const setDestinationLocation = (newdestinationLocation: LatLng, newDestinationNameEn?: string | undefined): DestinationAction => {
    return {
        type: "SETDESTINATIONLOCATION", 
        locationPayload: newdestinationLocation,
        nameEnPayload: newDestinationNameEn
    }
}; 

export const setUserLocation = (newUserLocation: LatLng): UserLocationAction => {
    return {
        type: "SETUSERLOCATION", 
        locationPayload: newUserLocation,
    }
}