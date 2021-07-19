/**** Stack Navigators Param List ****/

type RootStackParamList = {
    Root: undefined,
    Direction: undefined,
}

type BottomParamList = {
    Map: undefined,
    SavedItinerary: undefined,
}


/**** MapComponent Param List ****/

type LatLngObject = { lat: number | undefined; lng: number | undefined };

/**** Redux Store ****/

interface RootState {
    destinationState: DestinationLocationState,
}

interface DestinationState {
    location: LatLngObject,
    nameEn?: string | undefined,
}

type DestinationAction = { 
    type: string,
    locationPayload: LatLngObject, 
    nameEnPayload: string | undefined 
}

