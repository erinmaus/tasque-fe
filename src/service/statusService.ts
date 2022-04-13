import { get } from '../adapter/httpAdapter';
import { getBackendEndpoint } from '../config';
import { getToken } from './authService';

export interface Status {
  id: number,
  title: string,
  content: string
}

export async function getStatuses(): Promise<Status[]> {
  const { data } = await get(`${getBackendEndpoint()}/api/v1/status`, {
    headers: { Authorization: `Bearer ${getToken().accessToken}` },
  });
  return data;
}
