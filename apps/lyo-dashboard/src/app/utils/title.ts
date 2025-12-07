enum PageTitle {
  ROOT = 'Dashboard',
}

export enum AppPath {
  ROOT = '/',
}

export const getPageTitleFromPath = (pathname: string): string => {
  switch (pathname as AppPath) {
    case AppPath.ROOT:
      return PageTitle.ROOT;
    default:
      return 'Dashboard';
  }
};
