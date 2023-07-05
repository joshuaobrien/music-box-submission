import * as mobxReact from "mobx-react";
import { MusicPlayerStore } from "music_player_store";
import { MusicPlayerPresenter } from "music_player_presenter";
import { PortraitPlayer } from "./portrait_player";
import { LandscapePlayer } from "./landscape_player";

export function createLandscapePlayer({
  store,
  presenter,
}: {
  store: MusicPlayerStore;
  presenter: MusicPlayerPresenter;
}) {
  const onPlay = () => presenter.onPlay();
  const onPause = () => presenter.onPause();

  return mobxReact.observer(() => (
    <LandscapePlayer
      albumArtUrl={store.selectedAlbum?.albumArtUrl}
      title={store.activeSong?.name}
      isPlaying={store.isPlaying}
      isSelectionPlaying={store.isSelectionPlaying}
      selectedAlbum={store.selectedAlbum}
      activeSong={store.activeSong}
      onPlay={onPlay}
      onPause={onPause}
    />
  ));
}

export function createPortraitPlayer({
  store,
  presenter,
}: {
  store: MusicPlayerStore;
  presenter: MusicPlayerPresenter;
}) {
  const onPlay = () => presenter.onPlay();
  const onPause = () => presenter.onPause();

  return mobxReact.observer(() => (
    <PortraitPlayer
      albumArtUrl={store.selectedAlbum?.albumArtUrl}
      title={store.activeSong?.name}
      isPlaying={store.isPlaying}
      onPlay={onPlay}
      onPause={onPause}
    />
  ));
}
