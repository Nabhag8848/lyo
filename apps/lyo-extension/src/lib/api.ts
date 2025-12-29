const API_BASE_URL = 'https://api.lyo.fashion/v1';

export const api = {
  baseUrl: API_BASE_URL,

  endpoints: {
    generateTryon: `${API_BASE_URL}/tryon/gen`,
    sseGeneration: `${API_BASE_URL}/sse/generation`,
  },
};

export async function getAccessToken(): Promise<string | null> {
  try {
    // Get cookies from the domain
    const cookies = await browser.cookies.getAll({ domain: 'lyo.fashion' });
    const accessTokenCookie = cookies.find(
      (cookie) => cookie.name === 'access_token'
    );
    return accessTokenCookie?.value || null;
  } catch (error) {
    console.error('Failed to get access token:', error);
    return null;
  }
}

export interface GenerateTryonRequest {
  garmentImageUrl: string;
  garmentSourceUrl: string;
  brandName?: string;
  garmentBrandName?: string;
  garmentName?: string;
  garmentDescription?: string;
}

export interface GenerateTryonResponse {
  id: string;
}

export async function generateTryon(
  data: GenerateTryonRequest,
  accessToken: string
): Promise<GenerateTryonResponse> {
  const response = await fetch(api.endpoints.generateTryon, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `access_token=${accessToken}`,
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to generate tryon: ${response.statusText}`);
  }

  return response.json();
}
