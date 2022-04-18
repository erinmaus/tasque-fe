import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as authService from '../service/authService';
import {
  Credentials, ServiceCallStatus, TasqueState, UserState,
} from './types';

const initialState: UserState = {
  token: authService.hasToken() ? authService.getToken() : null,
  status: ServiceCallStatus.IDLE,
};

export const me = createAsyncThunk(
  'user/me',
  (token: authService.Token = authService.getToken()) => authService.me(token),
);

export const refresh = createAsyncThunk(
  'user/refresh',
  (token: authService.Token = authService.getToken()) => authService.refresh(token),
);

export const login = createAsyncThunk(
  'user/login',
  async ({ username, password }: Credentials, { dispatch }) => {
    const token = await authService.authenticate(username, password);
    await dispatch(me(token));

    return token;
  },
);

export const userSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      authService.setToken(null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = ServiceCallStatus.PENDING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
        state.status = ServiceCallStatus.SUCCESS;
      })
      .addCase(login.rejected, (state) => {
        state.token = null;
        state.status = ServiceCallStatus.FAILURE;
      })
      .addCase(me.pending, (state) => {
        state.status = ServiceCallStatus.PENDING;
      })
      .addCase(me.fulfilled, (state, { payload: { username, email } }) => {
        state.username = username;
        state.email = email;
        state.status = ServiceCallStatus.SUCCESS;
      })
      .addCase(me.rejected, (state) => {
        state.status = ServiceCallStatus.FAILURE;
      })
      .addCase(refresh.rejected, (state) => {
        state.token = null;
      })
      .addCase(refresh.fulfilled, (state, { payload }) => {
        state.token = payload;
      });
  },
});

export const selectIsLoggedIn = (state: TasqueState) => !!state.user.token;
export const selectUsername = (state: TasqueState) => state.user.username;
export const selectEmail = (state: TasqueState) => state.user.email;
export const selectToken = (state: TasqueState) => state.user.token;
export const selectLoginStatus = (state: TasqueState) => state.user.status;

export const userReducer = userSlice.reducer;
export const { logout } = userSlice.actions;
