import { get } from '../adapter/httpAdapter';
import { getBackendEndpoint } from '../config';
import { getToken, Token } from './authService';

export interface Status {
  id: number;
  title: string;
  content: string;
}

export async function getStatuses(token: Token = getToken()): Promise<Status[]> {
  const { data } = await get<Status[]>(
    `${getBackendEndpoint()}/api/v1/status`,
    { headers: { Authorization: `Bearer ${token.accessToken}` } },
  );
  return data;
}
