import { post } from '../adapter/httpAdapter';
import { getBackendEndpoint } from '../config';

export interface Token {
  access_token: string
  token_type: string
}

export async function authenticate(username: string, password: string): Promise<Token> {
  const credentials: FormData = new FormData();
  credentials.append('username', username);
  credentials.append('password', password);

  const { data } = await post(
    `${getBackendEndpoint()}/api/v1/auth/token`,
    credentials,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return data;
}
