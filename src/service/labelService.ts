import { get } from '../adapter/httpAdapter';
import { getBackendEndpoint } from '../config';
import { getToken } from './authService';

export interface Label {
  id: number,
  title: string,
  content: string
}

export async function getLabels(): Promise<Label[]> {
  const { data } = await get(`${getBackendEndpoint()}/api/v1/label`, {
    headers: { Authorization: `Bearer ${getToken().accessToken}` },
  });
  return data;
}
