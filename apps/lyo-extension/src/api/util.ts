import axios from 'axios';
import { useAppConfig } from '#imports';

const appConfig = useAppConfig();

const { serverUrl } = appConfig.serverConfig;
const { clientDomain } = appConfig.clientConfig;

export const apiClient = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
});

export const api = {
  serverUrl,
  clientDomain,
};
