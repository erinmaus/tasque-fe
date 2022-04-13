import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { labelReducer } from "./labelSlice";
import { statusReducer } from "./statusSlice";

export const store = configureStore({
  reducer: {
    label: labelReducer,
    status: statusReducer
  }
});

export type TasqueDispatch = typeof store.dispatch;
export type TasqueState = ReturnType<typeof store.getState>;
export type TasqueThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  TasqueState,
  unknown,
  Action<string>
>;
