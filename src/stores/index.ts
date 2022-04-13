import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { accountReducer } from './accountSlice';
import { labelReducer } from './labelSlice';
import { TasqueState } from './state';
import { statusReducer } from './statusSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    label: labelReducer,
    status: statusReducer,
  },
});

export type { TasqueState } from './state';

export type TasqueDispatch = typeof store.dispatch;
export type TasqueThunk<ReturnType = void> = ThunkAction<
ReturnType,
TasqueState,
unknown,
Action<string>
>;
