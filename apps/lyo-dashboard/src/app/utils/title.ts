enum PageTitle {
  ROOT = 'Dashboard',
  ONBOARDING = 'Onboarding',
  SETTINGS = 'Settings',
}

export enum AppPath {
  ROOT = '/',
  ONBOARDING = '/onboarding',
  SETTINGS = '/settings',
}

export const getPageTitleFromPath = (pathname: string): string => {
  switch (pathname as AppPath) {
    case AppPath.ROOT:
      return PageTitle.ROOT;
    case AppPath.ONBOARDING:
      return PageTitle.ONBOARDING;
    case AppPath.SETTINGS:
      return PageTitle.SETTINGS;
    default:
      return 'Dashboard';
  }
};
