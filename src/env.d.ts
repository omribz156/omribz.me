import "../.astro/types";

declare global {
  interface Window {
    __omribzAnalyticsHandler?: boolean;
    __omribzMenuHandler?: boolean;
    twttr?: {
      widgets?: {
        load: () => void;
      };
    };
  }
}
