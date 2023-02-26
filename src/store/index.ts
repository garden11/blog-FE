import {
  configureStore,
  CombinedState,
  Reducer,
  AnyAction,
} from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import logger from "redux-logger";
import { combineReducers } from "redux";

// slices
import modalSlice, { ModalState } from "./slices/modalSlice";

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export type State = {
  modal: ModalState;
};

const reducer = (state: State, action: AnyAction): CombinedState<State> => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;

    default: {
      const combinedReducer = combineReducers({
        modal: modalSlice.reducer,
      });
      return combinedReducer(state, action);
    }
  }
};

export const createStore = () =>
  configureStore({
    reducer: reducer as Reducer<State, AnyAction>,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV === "development",
  });

export const wrapper = createWrapper<AppStore>(createStore, {
  debug: process.env.NODE_ENV === "development",
});
