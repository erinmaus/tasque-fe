import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as labelService from '../service/labelService';
import { LabelState, ServiceCallStatus, TasqueState } from './types';

const initialState: LabelState = {
  labels: [],
  status: ServiceCallStatus.IDLE,
};

export const refreshLabels = createAsyncThunk(
  'label/getLabels',
  () => labelService.getLabels(),
);

export const labelSlice = createSlice({
  name: 'label',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(refreshLabels.pending, (state) => {
        state.status = ServiceCallStatus.PENDING;
      })
      .addCase(refreshLabels.fulfilled, (state, action) => {
        state.labels = action.payload;
        state.status = ServiceCallStatus.SUCCESS;
      })
      .addCase(refreshLabels.rejected, (state) => {
        state.status = ServiceCallStatus.FAILURE;
      });
  },
});

export const selectLabels = (state: TasqueState) => state.label.labels;
export const selectLabel = (id: number) => (state: TasqueState) => (
  state.label.labels.find((l) => l.id === id)
);
export const selectLabelStatus = (state: TasqueState) => state.label.status;

export const labelReducer = labelSlice.reducer;
