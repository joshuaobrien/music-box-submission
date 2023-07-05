import * as React from "react";
import * as mobxReact from "mobx-react";
import { MusicPlayerStore } from "music_player_store";
import { MusicPlayerPresenter } from "music_player_presenter";
import { TrackList } from "./track_list";
import { LoadingList } from "./loading_list";
import { Text } from "ui/text/text";
import { UnreachableCaseError } from "utils";

export function createTrackList({
  store,
  presenter,
}: {
  store: MusicPlayerStore;
  presenter: MusicPlayerPresenter;
}) {
  const onClickSong = (id: string) => presenter.onClickSong(id);
  const onPlay = () => presenter.onPlay();
  const onPause = () => presenter.onPause();
  const onKeyUp = (e: React.KeyboardEvent<HTMLLIElement>, songId: string) => {
    if (e.key === "Enter") {
      if (store.isPlaying && store.activeSong?.id === songId) {
        onPause();
        return;
      }
      if (store.activeSong?.id === songId) {
        onPlay();
        return;
      }

      onClickSong(songId);
    }
  };

  return mobxReact.observer(() => {
    switch (store.loadState) {
      case "error":
        return <Text size="medium">Please try again later.</Text>;
      case "loading":
        return <LoadingList count={20} />;
      case "ready":
        return (
          <TrackList
            isPlaying={store.isPlaying}
            songs={store.songs}
            selectedSong={store.selectedSong}
            activeSong={store.activeSong}
            onClickSong={onClickSong}
            onClickPause={onPause}
            onClickPlay={onPlay}
            onKeyUp={onKeyUp}
          />
        );
      default:
        throw new UnreachableCaseError(store.loadState);
    }
  });
}
