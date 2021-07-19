import { combineReducers } from "@reduxjs/toolkit";
import { destinationReducer } from "./destination";

// Accesses all reducers from the root. 
export const rootReducers = combineReducers({
    destinationState: destinationReducer
})
