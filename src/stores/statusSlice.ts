import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as statusService from '../service/statusService';
import { ServiceCallStatus, StatusState, TasqueState } from './types';

const initialState: StatusState = {
  statuses: [],
  status: ServiceCallStatus.IDLE,
};

export const refreshStatuses = createAsyncThunk(
  'status/getStatuses',
  () => statusService.getStatuses(),
);

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(refreshStatuses.pending, (state) => {
        state.status = ServiceCallStatus.PENDING;
      })
      .addCase(refreshStatuses.fulfilled, (state, action) => {
        state.statuses = action.payload;
        state.status = ServiceCallStatus.SUCCESS;
      })
      .addCase(refreshStatuses.rejected, (state) => {
        state.status = ServiceCallStatus.FAILURE;
      });
  },
});

export const selectStatuses = (state: TasqueState) => state.status.statuses;
export const selectStatus = (id: number) => (state: TasqueState) => (
  state.status.statuses.find((s) => s.id === id)
);
export const selectStatusTitle = (id: number) => (state: TasqueState) => (
  state.status.statuses.find((l) => l.id === id)?.title
);
// Horrible name.
export const selectStatusStatus = (state: TasqueState) => state.status.status;

export const statusReducer = statusSlice.reducer;
