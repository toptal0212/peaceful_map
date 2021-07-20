import { combineReducers } from "@reduxjs/toolkit";
import { destinationReducer } from "./destination";
import { userLocationReducer } from "./userLocation";


// Accesses all reducers from the root. 
export const rootReducers = combineReducers({
    destinationState: destinationReducer,
    userLocationState: userLocationReducer
})
