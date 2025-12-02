/**
 * Generate allowed origins for CORS
 * Supports both root domain and www subdomain
 */
export const getAllowedOrigins = (
  frontUrl: string,
  isProduction: boolean
): string[] => {
  const origins = new Set<string>();

  // Always allow localhost for development
  origins.add('http://localhost:4200');
  origins.add('http://localhost:3000');
  origins.add(frontUrl);

  if (!isProduction) {
    return Array.from(origins);
  }

  try {
    const url = new URL(frontUrl);
    const protocol = url.protocol;
    const hostname = url.hostname;
    const port = url.port ? `:${url.port}` : '';

    // If it's a www subdomain, also add root domain
    if (hostname.startsWith('www.')) {
      const rootDomain = hostname.replace(/^www\./, '');
      origins.add(`${protocol}//${rootDomain}${port}`);
    } else {
      // If it's root domain, also add www subdomain
      // Skip for localhost and IP addresses
      if (hostname !== 'localhost' && !/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
        origins.add(`${protocol}//www.${hostname}${port}`);
      }
    }
  } catch {
    // If URL parsing fails, just use the original value
    origins.add(frontUrl);
  }

  return Array.from(origins);
};
