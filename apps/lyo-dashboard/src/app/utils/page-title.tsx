import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { getPageTitleFromPath } from './title';

export const PageTitle = () => {
  const { pathname } = useLocation();
  const title = getPageTitleFromPath(pathname);

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};
