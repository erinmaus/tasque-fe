import { get } from '../adapter/httpAdapter';
import { getBackendEndpoint } from '../config';

export interface Status {
  id: number,
  title: string,
  content: string
}

export async function getStatuses(): Promise<Status[]> {
  const { data } = await get(`${getBackendEndpoint()}/api/v1/status`);
  return data;
}
