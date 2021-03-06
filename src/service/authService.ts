import jwt_decode from 'jwt-decode';
import { get, post } from '../adapter/httpAdapter';
import { getBackendEndpoint } from '../config';

interface TokenResponse {
  data: {
    access_token: string;
    token_type: string;
  };
}

export interface Token {
  accessToken: string;
  tokenType: string;
}

export interface TokenDetails {
  username: string;
  expires: number;
}

interface AccountResponse {
  id: number;
  username: string;
  email: string;
  organization_id: number;
}

export interface Account {
  id: number;
  username: string;
  email: string;
  organization: number;
}

let currentToken: Token | null = null;

export function setToken(token: Token | null) {
  currentToken = token;

  if (token) {
    sessionStorage.setItem('access_token', JSON.stringify(token));
  } else {
    sessionStorage.removeItem('access_token');
  }
}

function validateTokenImpl(paddingSeconds: number, token: Token) {
  const payload = jwt_decode<TokenDetails>(token.accessToken);
  const now = Math.floor(Date.now() / 1000);

  return now < payload.expires - paddingSeconds;
}

export function getToken(): Token {
  if (currentToken === null) {
    const sessionStorageToken = sessionStorage.getItem('access_token');
    if (sessionStorageToken) {
      const token = JSON.parse(sessionStorageToken);
      if (token && validateTokenImpl(0, token)) {
        setToken(token);
        return token;
      }
    }

    throw new Error('Authorizaiton token not set.');
  }

  return currentToken;
}

export function hasToken(): boolean {
  try {
    getToken();
    return true;
  } catch (error) {
    return false;
  }
}

export function validateToken(paddingSeconds: number = 0): boolean {
  if (!hasToken()) {
    return false;
  }

  return validateTokenImpl(paddingSeconds, getToken());
}

export async function authenticate(username: string, password: string): Promise<Token> {
  const credentials: FormData = new FormData();
  credentials.append('username', username);
  credentials.append('password', password);

  const { data }: TokenResponse = await post(
    `${getBackendEndpoint()}/api/v1/auth/token`,
    credentials,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );

  const token: Token = {
    accessToken: data.access_token,
    tokenType: data.token_type,
  };

  setToken(token);

  return token;
}

export async function me(token: Token = getToken()): Promise<Account> {
  const { data } = await get<AccountResponse>(
    `${getBackendEndpoint()}/api/v1/auth/me`,
    { headers: { Authorization: `Bearer ${token.accessToken}` } },
  );

  return {
    id: data.id,
    username: data.username,
    email: data.email,
    organization: data.organization_id,
  };
}

export async function refresh(token: Token = getToken()): Promise<Token> {
  const { data }: TokenResponse = await post(
    `${getBackendEndpoint()}/api/v1/auth/refresh`,
    undefined,
    { headers: { Authorization: `Bearer ${token.accessToken}` } },
  );

  const newToken: Token = {
    accessToken: data.access_token,
    tokenType: data.token_type,
  };

  setToken(newToken);

  return newToken;
}
