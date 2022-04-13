import { get } from "../adapter/httpAdapter"
import { getBackendEndpoint } from "../config"

export interface Label {
  id: number,
  title: string,
  content: string
};

export async function getLabels(): Promise<Label[]> {
  const { data } = await get(`${getBackendEndpoint()}/api/v1/label`);
  return data;
}
