import * as mobx from "mobx";
import { Album, Song } from "music_source/music_source";

export class MusicPlayerStore {
  @mobx.observable.ref
  loadState: "loading" | "error" | "ready" = "ready";

  @mobx.observable.ref
  searchTerm = "";

  @mobx.observable.ref
  songs: Song[] = [];

  // the song that has most recently been playing
  @mobx.observable.ref
  activeSong?: Song;

  // the album that has most recently been playing
  @mobx.observable.ref
  activeAlbum?: Album;

  // the song that is currently selected
  @mobx.observable.ref
  selectedSong?: Song;

  // the album associated with the song that is currently selected
  @mobx.observable.ref
  selectedAlbum?: Album;

  @mobx.observable.ref
  isPlaying = false;

  @mobx.computed
  get isPlayerVisible() {
    return this.selectedSong != null;
  }

  @mobx.computed
  get isSelectionPlaying() {
    return (
      this.isPlaying &&
      !!this.activeAlbum?.songs.some(
        (song) => song.id === this.selectedSong?.id
      )
    );
  }

  constructor() {
    mobx.makeObservable(this);
  }
}
