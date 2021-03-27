declare global {
  interface Window {
    csrfToken: string;
    appData: {
      keys: { [key: string]: string };
      accessToken: string;
    };
  }
}

export type ArtistEventsType = {
  [key: string]: {
    events: Event[];
  };
};
