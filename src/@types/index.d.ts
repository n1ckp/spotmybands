declare global {
  interface Window {
    csrfToken: string,
    appData: {
      keys: { [key: string]: string },
      accessToken: string,
    }
    __REDUX_DEVTOOLS_EXTENSION__: Function,
  }
}

// declare module '*.scss' {
//   interface IClassNames {
//     [className: string]: string
//   }
//   const classNames: IClassNames;
//   export = classNames;
// }

export type Event = {

}

export type ArtistEventsType = {
  [key: string]: {
    events: Event[];
  };
}
