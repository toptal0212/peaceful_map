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
    destinationLocationState: DestinationLocationState,
}

interface DestinationLocationState {
    destinationLocation: LatLngObject,
}

type DestinationLocationAction = { 
    type: string,
    payload: LatLngObject 
}