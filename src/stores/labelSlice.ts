import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TasqueState } from '.';
import { getLabels, Label } from '../service/labelService';
import { ServiceCallStatus } from './status';

export interface LabelState {
  labels: Label[],
  status: ServiceCallStatus;
}

const initialState: LabelState = {
  labels: [],
  status: ServiceCallStatus.IDLE,
}

export const refreshLabels = createAsyncThunk(
  'label/getLabels',
  () => {
    return getLabels();
  }
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
  }
});

export const selectLabels = (state: TasqueState) => state.label.labels;
export const selectLabel = (id: number) => (state: TasqueState) => state.label.labels.find(l => l.id === id);
export const selectLabelStatus = (state: TasqueState) => state.label.status;

export const labelReducer = labelSlice.reducer;
