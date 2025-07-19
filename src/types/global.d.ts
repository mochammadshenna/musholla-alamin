declare global {
  interface Window {
    google: typeof google;
  }
}

declare namespace google.maps {
  class Map {
    constructor(element: HTMLElement, options: any);
  }
  
  class Marker {
    constructor(options: any);
    addListener(event: string, handler: () => void): void;
  }
  
  class InfoWindow {
    constructor(options: any);
    open(map: Map, marker?: Marker): void;
  }
  
  const SymbolPath: {
    CIRCLE: any;
  };
}

export {};