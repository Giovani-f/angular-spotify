import { IArtist } from '../interfaces/artists';

export function newArtist(): IArtist {
  return {
    id: '',
    name: '',
    imageUrl: '',
  };
}
