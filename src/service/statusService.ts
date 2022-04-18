import { get } from '../adapter/httpAdapter';
import { getBackendEndpoint } from '../config';
import { getToken, Token } from './authService';

export enum BuiltinStatusTypes {
  NOT_STARTED = 'Not Started',
  DONE = 'Done',
  PENDING = 'Pending',
}

export interface Status {
  id: number;
  title: BuiltinStatusTypes;
  content: string;
}

export async function getStatuses(token: Token = getToken()): Promise<Status[]> {
  const { data } = await get<Status[]>(
    `${getBackendEndpoint()}/api/v1/status`,
    { headers: { Authorization: `Bearer ${token.accessToken}` } },
  );
  return data;
}
