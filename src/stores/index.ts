import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { labelReducer } from './labelSlice';
import { projectReducer } from './projectSlice';
import { statusReducer } from './statusSlice';
import { userReducer } from './userSlice';

export const store = configureStore({
  reducer: {
    label: labelReducer,
    project: projectReducer,
    status: statusReducer,
    user: userReducer,
  },
});

export type TasqueDispatch = typeof store.dispatch;
export type TasqueState = ReturnType<typeof store.getState>;
export type TasqueThunk<ReturnType = void> = ThunkAction<
ReturnType,
TasqueState,
unknown,
Action<string>
>;
