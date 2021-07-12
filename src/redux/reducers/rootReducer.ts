import { combineReducers } from "@reduxjs/toolkit";
import { destinationLocationReducer } from "./destinationLocation";

export const rootReducers = combineReducers({
    destinationLocationState: destinationLocationReducer
})
