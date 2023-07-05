import { it, describe, expect, beforeEach, vi } from "vitest";
import { MusicPlayerPresenter } from "../music_player_presenter";
import { MusicPlayerStore } from "../music_player_store";
import { Album, MusicSource, Song } from "../music_source/music_source";

const FAKE_SONG: Song = {
  id: "some song",
  name: "some name",
  artist: "some artist",
  album: "some album",
  albumId: "some value",
  albumArtUrl: "some album art url",
  previewUrl: "some preview url",
};
const FAKE_ALBUM: Album = {
  id: "some album",
  name: "some name",
  artist: "some artist",
  albumArtUrl: "some album art url",
  songs: [FAKE_SONG],
};

describe("MusicPlayerPresenter", () => {
  let musicSource: MusicSource;
  let presenter: MusicPlayerPresenter;
  let store: MusicPlayerStore;
  let audio: Pick<
    HTMLAudioElement,
    "paused" | "pause" | "onended" | "play" | "src"
  >;

  beforeEach(() => {
    store = new MusicPlayerStore();
    musicSource = {
      search: vi.fn(),
      searchByAlbum: vi.fn().mockResolvedValue(FAKE_ALBUM),
    };
    audio = {
      paused: false,
      pause: () => 0,
      onended: () => 0,
      play: () => new Promise(() => 0),
      src: "",
    };
    presenter = new MusicPlayerPresenter(
      { isPortrait: false },
      store,
      musicSource,
      audio
    );
  });

  describe("performSearch", () => {
    it("sets the load state to loading initially", () => {
      presenter.performSearch("Andrew Bird");

      expect(store.loadState).toBe("loading");
    });
    it("sets the search term", () => {
      presenter.performSearch("Andrew Bird");

      expect(store.searchTerm).toBe("Andrew Bird");
    });
    it("calls search", async () => {
      vi.useFakeTimers();
      presenter.performSearch("Andrew Bird");

      vi.advanceTimersByTime(400);

      expect(musicSource.search).toBeCalled();
    });
  });

  describe("onSelectSong", () => {
    beforeEach(() => {
      store.songs = [FAKE_SONG];
    });
    it("throws if the song does not exist", async () => {
      const FAKE_ID = "does not exist";
      expect(() => presenter.onSelectSong(FAKE_ID)).rejects.toThrow();
    });
    it("sets the selected song", async () => {
      await presenter.onSelectSong("some song");

      expect(store.selectedSong?.id).toEqual("some song");
    });
    it("does not start playing", () => {
      presenter.onSelectSong("some song");

      expect(store.isPlaying).toBe(false);
    });
    it("sets the selected album", async () => {
      await presenter.onSelectSong("some song");

      expect(musicSource.searchByAlbum).toBeCalledTimes(1);
      expect(musicSource.searchByAlbum).toBeCalledWith("some value");
      expect(store.selectedAlbum?.id).toEqual(FAKE_ALBUM.id);
    });
  });

  describe("onPlay", () => {
    it("sets the value of isPlaying to true", () => {
      presenter.onPlay();

      expect(store.isPlaying).toBeTruthy();
    });
  });
  describe("onPause", () => {
    it("sets the value of isPlaying to false", () => {
      presenter.onPlay();
      presenter.onPause();

      expect(store.isPlaying).toBeFalsy();
    });
  });
});
