import * as React from "react";
import * as mobxReact from "mobx-react";
import { MusicPlayerStore } from "music_player_store";
import { MusicPlayerPresenter } from "music_player_presenter";
import { TrackSearch } from "./track_search";

export function createSearch({
  store,
  presenter,
}: {
  store: MusicPlayerStore;
  presenter: MusicPlayerPresenter;
}) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    presenter.performSearch(value);
  };

  return mobxReact.observer(() => (
    <TrackSearch value={store.searchTerm} onChange={onChange} />
  ));
}
