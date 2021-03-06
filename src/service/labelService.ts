import { get } from '../adapter/httpAdapter';
import { getBackendEndpoint } from '../config';
import { getToken, Token } from './authService';

export interface Label {
  id: number;
  title: string;
  content: string;
}

export enum BuiltInLabelTypes {
  MILESTONE = 'Milestone',
  EPIC = 'Epic',
  FEATURE = 'Feature',
  STORY = 'Story',
  TASK = 'Task',
}

export async function getLabels(token: Token = getToken()): Promise<Label[]> {
  const { data } = await get<Label[]>(`${getBackendEndpoint()}/api/v1/label`, {
    headers: { Authorization: `Bearer ${token.accessToken}` },
  });
  return data;
}
