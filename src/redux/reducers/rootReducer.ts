import { combineReducers } from "@reduxjs/toolkit";
import { destinationLocationReducer } from "./destinationLocation";

// Accesses all reducers from the root. 
export const rootReducers = combineReducers({
    destinationLocationState: destinationLocationReducer
})
