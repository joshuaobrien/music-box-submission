import { MusicSource } from "music_source/music_source";
import * as mobx from "mobx";
import { MusicPlayerStore } from "music_player_store";
import { LayoutStore } from "layout_store";
import debounce from "lodash.debounce";

const NUMBER_OF_SONGS_TO_PRELOAD = 6;
export const DEBOUNCE_DELAY_MS = 400;
export const PRELOAD_DELAY_MS = 200;

export class MusicPlayerPresenter {
  constructor(
    private readonly layoutStore: LayoutStore,
    private readonly store: MusicPlayerStore,
    private readonly musicSource: MusicSource,
    private readonly audio: Pick<
      HTMLAudioElement,
      "paused" | "pause" | "onended" | "play" | "src"
    >
  ) {
    audio.onended = () => mobx.runInAction(() => (store.isPlaying = false));

    // each time the songs array reference changes,
    // perform a side effect. in this case, we start
    // loading the album art and the audio of some of
    // the songs
    mobx.reaction(
      () => this.store.songs,
      (songs) => {
        songs.forEach((song) => {
          const image = new Image();
          image.src = song.albumArtUrl;
        });

        songs.slice(0, NUMBER_OF_SONGS_TO_PRELOAD).forEach((song) => {
          const audio = new Audio();
          audio.src = song.previewUrl;
          audio.load();
        });
      }
    );
  }

  async performSearch(term: string) {
    mobx.runInAction(() => {
      this.store.searchTerm = term;
      this.store.loadState = "loading";
    });

    this.debouncedSearch(term);
  }

  async onClickSong(id: string) {
    await this.onSelectSong(id);
    if (this.layoutStore.isPortrait) {
      this.onPlay();
    }
  }

  // todo(josh.o): make this private, refactor tests accordingly
  async onSelectSong(id: string) {
    const songToPlay = this.store.songs.find((song) => song.id === id);

    if (songToPlay == null) {
      throw new Error(`Unable to find song with id ${id}`);
    }

    const album = await this.getSongsForAlbum(songToPlay.albumId);

    mobx.runInAction(() => {
      this.store.selectedAlbum = album;
      this.store.selectedSong = songToPlay;
    });
  }

  onPlay() {
    if (
      this.audio.src !== this.store.selectedSong?.previewUrl &&
      this.store.selectedSong?.previewUrl != null
    ) {
      this.audio.src = this.store.selectedSong?.previewUrl;
    }
    mobx.runInAction(() => {
      this.store.isPlaying = true;
      this.store.activeAlbum = this.store.selectedAlbum;
      this.store.activeSong = this.store.selectedSong;
    });
    this.audio.play();
  }

  onPause() {
    mobx.runInAction(() => (this.store.isPlaying = false));
    this.audio.pause();
  }

  private async getSongsForAlbum(albumId: string) {
    return this.musicSource.searchByAlbum(albumId);
  }

  private readonly debouncedSearch = debounce(async (term: string) => {
    const results = await this.musicSource.search(term);
    mobx.runInAction(() => (this.store.songs = results));

    setTimeout(() => {
      mobx.runInAction(() => {
        this.store.loadState = "ready";
      });
    }, PRELOAD_DELAY_MS); // give the preloads a little bit of a chance
  }, DEBOUNCE_DELAY_MS);
}
