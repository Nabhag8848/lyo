// Extend WXT UserConfig to include autoIcons from @wxt-dev/auto-icons
declare module 'wxt' {
  interface WxtUserConfig {
    autoIcons?: {
      enabled?: boolean;
      baseIconPath?: string;
      developmentIndicator?: 'grayscale' | 'overlay' | false;
      sizes?: number[];
    };
  }
}
