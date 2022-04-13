import { get, post } from '../adapter/httpAdapter';
import { getBackendEndpoint } from '../config';

interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface Token {
  readonly accessToken: string | null;
  readonly tokenType: string | null;
}

export interface AccountDetails {
  username: string;
  email: string;
}

let accessToken: Token = {
  accessToken: null,
  tokenType: null,
};

export function isAuthenticated(): boolean {
  return accessToken.accessToken !== null && accessToken.tokenType !== null;
}

export function getToken(): Token {
  if (!isAuthenticated()) {
    const token = sessionStorage.getItem('token');
    if (token) {
      accessToken = JSON.parse(token);
    }
  }

  return accessToken;
}

function setToken(token: TokenResponse) {
  accessToken = {
    accessToken: token.access_token,
    tokenType: token.token_type,
  };

  sessionStorage.setItem('token', JSON.stringify(accessToken));
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

  const token: TokenResponse = data;

  setToken(token);

  return accessToken;
}

export async function getAccountDetails(): Promise<AccountDetails> {
  const { data } = await get(`${getBackendEndpoint()}/api/v1/auth/me`, {
    headers: { Authorization: `Bearer ${getToken().accessToken}` },
  });

  return data;
}
