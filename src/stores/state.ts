import { Token } from '../service/authService';
import { Label } from '../service/labelService';
import { Status } from '../service/statusService';
import { ServiceCallStatus } from './status';

export interface AccountState {
  token: Token;
  username?: string;
  email?: string;
  status: ServiceCallStatus;
}

export interface StatusState {
  statuses: Status[];
  status: ServiceCallStatus;
}

export interface LabelState {
  labels: Label[];
  status: ServiceCallStatus;
}

export interface TasqueState {
  label: LabelState;
  status: StatusState;
  account: AccountState;
}
