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

type GeoFeatures = { 
    type: string, 
    properties?: undefined,
    geometry: {
        type: string,
        coordinates: number[][],
    }
}

type Itinerary = {
    type: string, 
    features: GeoFeatures
}

/**** Redux Store ****/

interface RootState {
    destinationState: DestinationLocationState,
    userLocationState: UserLocationState,
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

type UserLocationState = {
    location: LatLng,
}

type UserLocationAction = {
    type: string, 
    locationPayload: LatLng, 
}


