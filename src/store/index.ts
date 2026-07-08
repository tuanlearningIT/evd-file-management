import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";

import { thunk } from "redux-thunk";

import documentReducer from "./reducer";
export * from "./types";
export * from "./actions";
export * from "./selectors";

const rootReducer = combineReducers({
  documents: documentReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
