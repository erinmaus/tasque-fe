import { Label } from '../service/labelService';
import { Status } from '../service/statusService';

export const enum ServiceCallStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILURE = 'failure',
}

export interface LabelState {
  labels: Label[],
  status: ServiceCallStatus;
}

export interface StatusState {
  statuses: Status[],
  status: ServiceCallStatus;
}

export interface TasqueState {
  label: LabelState
  status: StatusState
}
