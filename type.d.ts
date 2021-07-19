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

type LatLng = { 
    lat: number | Value, 
    lng: number | Value
};

/**** Redux Store ****/

interface RootState {
    destinationState: DestinationLocationState,
}

interface DestinationState {
    location?: LatLng,
    nameEn?: string | undefined,
}

type DestinationAction = { 
    type: string,
    locationPayload: LatLng, 
    nameEnPayload: string | undefined 
}

