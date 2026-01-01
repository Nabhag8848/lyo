import { api } from './util';

const { clientDomain } = api;

export async function getAccessToken(): Promise<string | null> {
  const cookies = await browser.cookies.getAll({ domain: clientDomain });
  const accessTokenCookie = cookies.find(
    (cookie) => cookie.name === 'access_token'
  );
  return accessTokenCookie?.value || null;
}
