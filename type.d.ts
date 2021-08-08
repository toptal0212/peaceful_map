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

type Position = number[];

type GeoJsonObject = { 
    type: string, 
    properties?: any,
    geometry: {
        type: string,
        coordinates: Position,
    }
}

type Itinerary = {
    type: string, 
    features: GeoJsonObject[]
}

/**** Redux Store ****/

interface RootState {
    destinationState: DestinationState,
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


