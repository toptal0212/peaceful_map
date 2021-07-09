import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducers } from "./reducers/rootReducer";


export const store = createStore(rootReducers, composeWithDevTools())