import { combineReducers } from "@reduxjs/toolkit";
import { markerLocationReducer } from "./markerLocation";

export const rootReducers = combineReducers({
    markerLocationState: markerLocationReducer
})
