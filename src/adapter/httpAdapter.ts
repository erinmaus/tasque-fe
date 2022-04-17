import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface HttpAdapterConfig extends AxiosRequestConfig {
  // TODO: Retries.
  // Nothing for now.
}

export function get<Response>(
  url: string,
  config: HttpAdapterConfig = {},
): Promise<AxiosResponse<Response>> {
  return axios({
    ...config,
    url,
    method: 'get',
  });
}

export function post<Response, Body>(
  url: string,
  body: Body | undefined,
  config: HttpAdapterConfig = {},
): Promise<AxiosResponse<Response>> {
  return axios({
    ...config,
    url,
    data: body,
    method: 'post',
  });
}

export function patch<Response, Body>(
  url: string,
  body: Body | undefined,
  config: HttpAdapterConfig = {},
): Promise<AxiosResponse<Response>> {
  return axios({
    ...config,
    url,
    data: body,
    method: 'patch',
  });
}
