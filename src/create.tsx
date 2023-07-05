import { MusicPlayerPresenter } from "music_player_presenter";
import { MusicPlayerStore } from "music_player_store";
import * as mobxReact from "mobx-react";
import { PortraitSkeleton } from "skeleton/portrait_skeleton";
import { ItunesMusicSource } from "music_source/itunes_music_source";
import { LayoutStore } from "layout_store";
import { LandscapeSkeleton } from "skeleton/landscape_skeleton";
import { createTrackList } from "track_list/create";
import { createLandscapePlayer, createPortraitPlayer } from "player/create";
import { createSearch } from "track_search/create";

export function createMediaPlayer({
  layoutStore,
}: {
  layoutStore: LayoutStore;
}) {
  const musicSource = new ItunesMusicSource();

  const store = new MusicPlayerStore();
  const presenter = new MusicPlayerPresenter(
    layoutStore,
    store,
    musicSource,
    new Audio()
  );

  // Handles anything relating to searching for music
  const Search = createSearch({ store, presenter });

  // Responsible for rendering the list of tracks found
  const List = createTrackList({ store: store, presenter: presenter });

  // The controls for playback, with a separate experience for portrait and
  // landscape
  const PortraitPlayer = createPortraitPlayer({
    store: store,
    presenter: presenter,
  });
  const LandscapePlayer = createLandscapePlayer({
    store: store,
    presenter: presenter,
  });

  return mobxReact.observer(() => {
    // Two distinct layouts for portrait and landscape
    return layoutStore.isPortrait ? (
      <PortraitSkeleton
        isPlayerVisible={store.isPlayerVisible}
        Search={Search}
        List={List}
        Player={PortraitPlayer}
      />
    ) : (
      <LandscapeSkeleton
        isPlayerVisible={store.isPlayerVisible}
        Search={Search}
        List={List}
        Player={LandscapePlayer}
      />
    );
  });
}
