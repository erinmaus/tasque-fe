import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as projectService from '../service/projectService';
import { ProjectState, ServiceCallStatus, TasqueState } from './types';

const initialState: ProjectState = {
  projects: [],
  status: ServiceCallStatus.IDLE,
};

export const getAllProjects = createAsyncThunk(
  'status/getAllProjects',
  () => projectService.getAllProjects(),
);

export const projectSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjects.pending, (state) => {
        state.status = ServiceCallStatus.PENDING;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.status = ServiceCallStatus.SUCCESS;
      })
      .addCase(getAllProjects.rejected, (state) => {
        state.status = ServiceCallStatus.FAILURE;
      });
  },
});

export const selectProjects = (state: TasqueState) => state.project.projects;
export const selectProjectStatus = (state: TasqueState) => state.project.status;

export const projectReducer = projectSlice.reducer;
