import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export const SEO = () => {
  const location = useLocation();

  // Get actual website URL (supports both www and non-www versions)
  // Uses the actual current domain so both www.lyo.fashion and lyo.fashion unfurl correctly
  const getWebsiteUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.protocol}//${window.location.host}`;
    }
    return 'https://lyo.fashion';
  };

  // Get canonical URL (always www version since that's the preferred domain)
  const getCanonicalUrl = () => {
    if (typeof window !== 'undefined') {
      const host = window.location.host;
      const protocol = window.location.protocol;
      // Normalize to www version for canonical (matches your redirect)
      const canonicalHost = host.startsWith('www.') ? host : `www.${host}`;
      return `${protocol}//${canonicalHost}`;
    }
    return 'https://www.lyo.fashion';
  };

  const siteUrl = getWebsiteUrl(); // Actual host for images and meta tags
  const canonicalUrl = getCanonicalUrl(); // Always www for canonical
  const currentUrl = `${siteUrl}${location.pathname}`;
  const canonicalCurrentUrl = `${canonicalUrl}${location.pathname}`;
  const title = 'LYO';
  const description = 'Virtual Fitting Room';
  const image = `${siteUrl}/opengraph.png`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="LYO - Virtual Fitting Room" />
      <meta name="twitter:site" content="@lyofashion" />
      <meta name="twitter:creator" content="@lyofashion" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <link rel="canonical" href={canonicalCurrentUrl} />
    </Helmet>
  );
};
