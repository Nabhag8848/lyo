/**
 * Generate allowed origins for CORS
 * Supports both root domain and www subdomain for both frontUrl and appUrl
 */
export const getAllowedOrigins = (
  frontUrl: string,
  appUrl: string,
  isProduction: boolean
): string[] => {
  const origins = new Set<string>();
  const fashnaiUrl = 'https://api.fashn.ai';

  // Always allow localhost for development
  origins.add('http://localhost:4200');
  origins.add('http://localhost:3001');
  origins.add('http://localhost:3000');
  origins.add(fashnaiUrl);
  origins.add(frontUrl);
  origins.add(appUrl);

  if (!isProduction) {
    return Array.from(origins);
  }

  // Process frontUrl (main website) - handle www/root domain variations
  const processFrontUrl = (urlString: string) => {
    try {
      const url = new URL(urlString);
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
        if (
          hostname !== 'localhost' &&
          !/^\d+\.\d+\.\d+\.\d+$/.test(hostname)
        ) {
          origins.add(`${protocol}//www.${hostname}${port}`);
        }
      }
    } catch {
      // If URL parsing fails, just use the original value
      origins.add(urlString);
    }
  };

  // Process appUrl (app subdomain) - handle app/root domain variations
  const processAppUrl = (urlString: string) => {
    try {
      const url = new URL(urlString);
      const protocol = url.protocol;
      const hostname = url.hostname;
      const port = url.port ? `:${url.port}` : '';

      // If it's an app subdomain, also add root domain
      if (hostname.startsWith('app.')) {
        const rootDomain = hostname.replace(/^app\./, '');
        origins.add(`${protocol}//${rootDomain}${port}`);
      } else {
        // If it's root domain, also add app subdomain
        // Skip for localhost and IP addresses
        if (
          hostname !== 'localhost' &&
          !/^\d+\.\d+\.\d+\.\d+$/.test(hostname)
        ) {
          origins.add(`${protocol}//app.${hostname}${port}`);
        }
      }
    } catch {
      // If URL parsing fails, just use the original value
      origins.add(urlString);
    }
  };

  // Process both URLs with their respective subdomain handling
  processFrontUrl(frontUrl);
  processAppUrl(appUrl);

  return Array.from(origins);
};
