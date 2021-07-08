/**** Stack Navigators Param List ****/

type RootStackParamList = {
    Root: undefined;
}

type BottomParamList = { 
    Map: undefined;
    SavedItinerary: undefined;
}


/**** MapComponent Param List ****/

type LatLngObject = { lat: number; lng: number };

/**** Redux Store ****/

type RootState = {
    setMarkerPosition: LatLngObject,
}
type MarkerPositionAction = { type: string; payload: LatLngObject}