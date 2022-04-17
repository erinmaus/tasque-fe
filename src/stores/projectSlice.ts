import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as projectService from '../service/projectService';
import {
  ProjectState, ServiceCallStatus, TasqueState, TicketLookupQueryWithID,
} from './types';

const initialState: ProjectState = {
  projects: [],
  status: ServiceCallStatus.IDLE,
};

export const getAllTickets = createAsyncThunk(
  'status/getAllTickets',
  (query: TicketLookupQueryWithID) => projectService.getAllTickets(query.id, query),
);

export const getAllProjects = createAsyncThunk(
  'status/getAllProjects',
  async (_, { dispatch }) => {
    const projects = await projectService.getAllProjects();
    projects.forEach(p => {
      dispatch(getAllTickets({ id: p.id, lookupType: projectService.TicketLookupQueryType.ALL }));
    });
    return projects;
  },
);

const updateProjectCallStatus = (
  state: ProjectState,
  id: number,
  status: ServiceCallStatus,
  tickets?: projectService.Ticket[],
) => {
  const project = state.projects.find(p => p.id === id);
  if (project) {
    project.status = status;
    if (tickets) {
      project.tickets = tickets;
    }
  }
};

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
        state.projects = action.payload.map(p => ({ ...p, status: ServiceCallStatus.IDLE }));
        state.status = ServiceCallStatus.SUCCESS;
      })
      .addCase(getAllProjects.rejected, (state) => {
        state.status = ServiceCallStatus.FAILURE;
      })
      .addCase(getAllTickets.pending, (state, { meta: { arg: { id } } }) => {
        updateProjectCallStatus(state, id, ServiceCallStatus.PENDING);
      })
      .addCase(getAllTickets.fulfilled, (state, { meta: { arg: { id } }, payload }) => {
        updateProjectCallStatus(state, id, ServiceCallStatus.SUCCESS, payload);
      })
      .addCase(getAllTickets.rejected, (state, { meta: { arg: { id } } }) => {
        updateProjectCallStatus(state, id, ServiceCallStatus.FAILURE);
      });
  },
});

export const selectProjects = (state: TasqueState) => state.project.projects;
export const selectProjectsStatus = (state: TasqueState) => state.project.status;
export const selectProject = (id: number) => (
  (state: TasqueState) => state.project.projects.find(p => p.id === id)
);
export const selectProjectStatus = (id: number) => (
  (state: TasqueState) => state.project.projects.find(p => p.id === id)?.status
);
export const selectProjectTitle = (id: number) => (
  (state: TasqueState) => state.project.projects.find(p => p.id === id)?.title
);
export const selectTickets = (id: number) => (state: TasqueState) => (
  state.project.projects.find(p => p.id === id)?.tickets
);
export const selectTicket = (projectID: number, ticketID: number) => (
  (state: TasqueState) => {
    const tickets = state.project.projects.find(p => p.id === projectID)?.tickets;
    return tickets && tickets.find(t => t.id === ticketID);
  }
);

export const projectReducer = projectSlice.reducer;
