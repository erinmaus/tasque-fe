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

export const updateTicket = createAsyncThunk(
  'status/updateTicket',
  (ticket: projectService.Ticket) => projectService.updateTicket(ticket),
);

export const newTicket = createAsyncThunk(
  'status/newTicket',
  (ticket: Partial<projectService.Ticket>) => projectService.newTicket(ticket),
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
      })
      .addCase(updateTicket.fulfilled, (state, { payload }) => {
        const project = state.projects.find(p => p.id === payload.project);
        const index = project?.tickets?.findIndex(t => t.id === payload.id);
        if (index !== undefined && index >= 0) {
          if (project?.tickets && project?.tickets[index].timestamp < payload.timestamp) {
            project.tickets[index] = payload;
          }
        }
      })
      .addCase(newTicket.fulfilled, (state, { payload }) => {
        const project = state.projects.find(p => p.id === payload.project);
        if (project) {
          project.tickets?.push(payload);
        }
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
export const selectOrphanTickets = (id: number) => (
  (state: TasqueState) => {
    const tickets = state.project.projects.find(p => p.id === id)?.tickets;
    const orphans = tickets && tickets.filter(t => !t.parent);
    orphans?.sort((a, b) => a.id - b.id);
    return orphans;
  }
);
export const selectTicket = (projectID: number, ticketID: number) => (
  (state: TasqueState) => {
    const tickets = state.project.projects.find(p => p.id === projectID)?.tickets;
    return tickets && tickets.find(t => t.id === ticketID);
  }
);
export const selectTicketChildren = (projectID: number, ticketID: number) => (
  (state: TasqueState) => {
    const tickets = state.project.projects.find(p => p.id === projectID)?.tickets;
    const children = tickets && tickets.filter(t => t.parent === ticketID);
    children?.sort((a, b) => a.id - b.id);
    return children;
  }
);

const getPointsRemaining = (
  tickets: projectService.Ticket[],
  ticket: projectService.Ticket,
  status: number[],
): number => {
  const children = tickets.filter(t => t.parent === ticket.id);
  return children.reduce(
    (p, t) => getPointsRemaining(tickets, t, status) + p,
    status.includes(ticket.status) ? ticket.points : 0,
  );
};

export const selectTicketPoints = (
  projectID: number,
  ticketID: number,
  status: number[],
) => (
  (state: TasqueState) => {
    const tickets = state.project.projects.find(p => p.id === projectID)?.tickets;
    if (tickets) {
      const ticket = tickets?.find(t => t.id === ticketID);
      if (ticket) {
        return getPointsRemaining(tickets, ticket, status);
      }
    }
    return 0;
  }
);

export const projectReducer = projectSlice.reducer;
