export interface ISong {
  id: string;
  name: string;
  artists: {
    id: string;
    name: string;
  }[];
  album: {
    id: string;
    name: string;
    imageUrl: string;
  };
  durationMs: number;
}
