export type Song = {
  id: string;
  name: string;
  artist: string;
  album: string;
  albumId: string;
  albumArtUrl: string;
  previewUrl: string;
};

export type Album = {
  id: string;
  name: string;
  artist: string;
  albumArtUrl: string;
  songs: Pick<Song, "name" | "id">[];
};

export interface MusicSource {
  search(term: string): Promise<Song[]>;
  searchByAlbum(albumId: string): Promise<Album>;
}
