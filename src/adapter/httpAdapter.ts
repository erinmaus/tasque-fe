import axios, { AxiosRequestConfig } from 'axios';

export interface HttpAdapterConfig extends AxiosRequestConfig {
  // TODO: Retries.
  // Nothing for now.
}

export function get(url: string, config: HttpAdapterConfig = {}) {
  return axios({
    ...config,
    url,
    method: 'get',
  });
}

export function post<Body>(url: string, body: Body | undefined, config: HttpAdapterConfig = {}) {
  return axios({
    ...config,
    url,
    data: body,
    method: 'post',
  });
}

export function patch<Body>(url: string, body: Body | undefined, config: HttpAdapterConfig = {}) {
  return axios({
    ...config,
    url,
    data: body,
    method: 'patch',
  });
}
