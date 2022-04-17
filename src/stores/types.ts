import { Token } from '../service/authService';
import { Label } from '../service/labelService';
import { Project } from '../service/projectService';
import { Status } from '../service/statusService';

export const enum ServiceCallStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILURE = 'failure',
}

export interface Credentials {
  username: string;
  password: string;
}

export interface LabelState {
  labels: Label[];
  status: ServiceCallStatus;
}

export interface ProjectState {
  projects: Project[];
  status: ServiceCallStatus;
}

export interface StatusState {
  statuses: Status[];
  status: ServiceCallStatus;
}

export interface UserState {
  token: Token | null;
  username?: string;
  email?: string;
  status: ServiceCallStatus;
}

export interface TasqueState {
  label: LabelState;
  project: ProjectState;
  status: StatusState;
  user: UserState;
}
