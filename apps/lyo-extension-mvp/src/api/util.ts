import { useAppConfig } from '#imports';

const appConfig = useAppConfig();

const { serverUrl } = appConfig.serverConfig;
const { clientDomain } = appConfig.clientConfig;

export const api = {
  serverUrl,
  clientDomain,
};
