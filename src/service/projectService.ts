import { get, patch, post } from '../adapter/httpAdapter';
import { getBackendEndpoint } from '../config';
import { getToken, Token } from './authService';

interface ProjectResponse {
  id: number;
  title: string;
  project_id: number;
}

export interface Project {
  id: number;
  title: string;
  tickets?: Ticket[];
}

interface TicketResponse {
  id: number;
  title: string;
  content: string;
  status_id: number;
  label_id: number;
  project_id: number;
  points: number;
  parent_id: number;
}

export interface Ticket {
  id: number;
  title: string;
  content: string;
  status: number;
  label: number;
  project: number;
  points: number;
  parent: number;
  timestamp: number;
}

interface UpdateOrCreateTicketRequest extends Partial<Omit<TicketResponse, 'id' | 'project_id'>> {
  // Nothing.
}

export enum TicketLookupQueryType {
  ORPHAN = 'orphan',
  ALL = 'all',
}

export interface TicketLookupQuery {
  lookupType?: TicketLookupQueryType;
  label?: number;
  status?: number;
  offset?: number;
  limit?: number;
}

export async function updateTicket(ticket: Ticket, token: Token = getToken()): Promise<Ticket> {
  const updatedTicket: UpdateOrCreateTicketRequest = {
    title: ticket.title,
    content: ticket.content,
    status_id: ticket.status,
    label_id: ticket.label,
    parent_id: ticket.parent,
    points: ticket.points,
  };

  const { data } = await patch<TicketResponse, UpdateOrCreateTicketRequest>(
    `${getBackendEndpoint()}/api/v1/project/${ticket.project}/ticket/${ticket.id}`,
    updatedTicket,
    { headers: { Authorization: `Bearer ${token.accessToken}` } },
  );

  return {
    id: data.id,
    title: data.title,
    content: data.content,
    status: data.status_id,
    label: data.label_id,
    project: data.project_id,
    points: data.points,
    parent: data.parent_id,
    timestamp: Date.now(),
  };
}

export async function newTicket(
  ticket: Partial<Ticket>,
  token: Token = getToken(),
): Promise<Ticket> {
  const request: UpdateOrCreateTicketRequest = {
    title: ticket.title,
    content: ticket.content,
    status_id: ticket.status,
    label_id: ticket.label,
    parent_id: ticket.parent,
    points: ticket.points,
  };

  const { data } = await post<TicketResponse, UpdateOrCreateTicketRequest>(
    `${getBackendEndpoint()}/api/v1/project/${ticket.project}/ticket`,
    request,
    { headers: { Authorization: `Bearer ${token.accessToken}` } },
  );

  return {
    id: data.id,
    title: data.title,
    content: data.content,
    status: data.status_id,
    label: data.label_id,
    project: data.project_id,
    points: data.points,
    parent: data.parent_id,
    timestamp: Date.now(),
  };
}

export async function getAllProjects(token: Token = getToken()): Promise<Project[]> {
  const { data } = await get<ProjectResponse[]>(`${getBackendEndpoint()}/api/v1/project`, {
    headers: { Authorization: `Bearer ${token.accessToken}` },
  });

  return data.map(d => ({
    id: d.id,
    title: d.title,
  }));
}

export async function getAllTickets(
  id: number,
  params: TicketLookupQuery,
  token: Token = getToken(),
): Promise<Ticket[]> {
  const p = {
    lookup_type: params.lookupType,
    label: params.label,
    status: params.status,
    offset: params.offset,
    limit: params.limit,
  };

  const { data } = await get<TicketResponse[]>(`${getBackendEndpoint()}/api/v1/project/${id}/ticket`, {
    params: p,
    headers: { Authorization: `Bearer ${token.accessToken}` },
  });

  return data.map(d => ({
    id: d.id,
    title: d.title,
    content: d.content,
    status: d.status_id,
    label: d.label_id,
    project: d.project_id,
    points: d.points,
    parent: d.parent_id,
    timestamp: Date.now(),
  }));
}
