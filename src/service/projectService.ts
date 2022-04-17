import { get } from '../adapter/httpAdapter';
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
