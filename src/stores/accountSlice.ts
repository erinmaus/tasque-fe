import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AccountState, TasqueState } from './state';
import {
  authenticate, Credentials, getToken, getAccountDetails as authGetAccountDetails,
} from '../service/authService';
import { ServiceCallStatus } from './status';

const initialState: AccountState = {
  token: getToken(),
  status: ServiceCallStatus.IDLE,
};

export const getAccountDetails = createAsyncThunk(
  'account/getAccountDetails',
  () => authGetAccountDetails(),
);

export const authenticateAccount = createAsyncThunk(
  'account/authenticateAccount',
  async (credentials: Credentials, { dispatch }) => {
    const token = await authenticate(credentials.username, credentials.password);
    dispatch(getAccountDetails());
    return token;
  },
);

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authenticateAccount.pending, (state) => {
        state.status = ServiceCallStatus.PENDING;
      })
      .addCase(authenticateAccount.fulfilled, (state, action) => {
        state.token = action.payload;
        state.status = ServiceCallStatus.SUCCESS;
      })
      .addCase(authenticateAccount.rejected, (state) => {
        state.status = ServiceCallStatus.FAILURE;
      })
      .addCase(getAccountDetails.pending, (state) => {
        state.status = ServiceCallStatus.PENDING;
      })
      .addCase(getAccountDetails.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.status = ServiceCallStatus.SUCCESS;
      })
      .addCase(getAccountDetails.rejected, (state) => {
        state.status = ServiceCallStatus.FAILURE;
      });
  },
});

export const selectUsername = (state: TasqueState) => state.account.username;
export const selectEmail = (state: TasqueState) => state.account.email;
export const selectIsLoggedIn = (state: TasqueState) => !!state.account.token.accessToken;

export const accountReducer = accountSlice.reducer;
