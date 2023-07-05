import { MusicSource, Song } from "./music_source";

type Response = {
  resultCount: number;
  results: ITunesEntity[];
};

type ITunesTrack = {
  wrapperType: "track";
  trackId: number;
  collectionId: number;
  artistName: string;
  trackName: string;
  collectionCensoredName: string;
  artworkUrl100: string;
  previewUrl: string;
};
type ITunesCollection = {
  wrapperType: "collection";
  collectionId: number;
  artistName: string;
  trackName: string;
  collectionCensoredName: string;
  artworkUrl100: string;
};

type ITunesEntity = ITunesTrack | ITunesCollection;

// During development, it's okay to query the API directly.
// However, in production, we may want to consider our own
// server.
const BASE_URL_DEV = "https://itunes.apple.com";

export class ItunesMusicSource implements MusicSource {
  constructor(private readonly baseUrl = BASE_URL_DEV) {}
  async search(term: string): Promise<Song[]> {
    const url = `${this.baseUrl}/search?term=${term.replace(
      " ",
      "+"
    )}&limit=25&entity=song`;

    const response = (await this.fetchJson(url)) as Response;

    return (response.results as ITunesTrack[]).map((result) => ({
      id: `${result.trackId}`,
      albumId: `${result.collectionId}`,
      artist: result.artistName,
      name: result.trackName,
      album: result.collectionCensoredName,
      albumArtUrl: result.artworkUrl100,
      previewUrl: result.previewUrl,
    }));
  }

  async searchByAlbum(id: string) {
    const url = `${this.baseUrl}/lookup?id=${id}&entity=song`;

    const response = (await this.fetchJson(url)) as Response;
    // According to the documentation, when looking up a collection the
    // first item in the results array pertains to the collection itself
    const albumInfo = response.results[0];

    return {
      id: `${albumInfo.collectionId}`,
      name: albumInfo.collectionCensoredName,
      artist: albumInfo.artistName,
      // We always grab the larger one so that we can
      // use it for the spinning disc too.
      albumArtUrl: albumInfo.artworkUrl100,
      songs: (response.results as ITunesTrack[]).slice(1).map((song) => ({
        id: `${song.trackId}`,
        artist: song.artistName,
        name: song.trackName,
        album: song.collectionCensoredName,
        albumArtUrl: song.artworkUrl100,
        previewUrl: song.previewUrl,
        albumId: song.collectionId,
      })),
    };
  }

  private async fetchJson(url: string) {
    const response = await fetch(url);
    return await response.json();
  }
}
