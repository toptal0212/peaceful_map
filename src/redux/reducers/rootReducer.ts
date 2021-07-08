import { markerLocationReducer } from "./markerLocation";

export default function rootReducers() {
    return ({
        markerLocationState: markerLocationReducer
    }
    )
}