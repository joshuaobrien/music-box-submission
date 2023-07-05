import { observer } from "mobx-react";
import { Song } from "music_source/music_source";
import * as React from "react";
import { TrackTile } from "track_tile/track_tile";
import styles from "./track_list.module.css";

type TrackListProps = {
  isPlaying: boolean;
  songs: Song[];
  selectedSong?: Song;
  activeSong?: Song;
  onClickSong: (id: string) => void;
  onClickPause: () => void;
  onClickPlay: () => void;
  onKeyUp: (e: React.KeyboardEvent<HTMLLIElement>, songId: string) => void;
};

export const TrackList = observer((props: TrackListProps) => {
  return (
    <ol className={styles.listContainer}>
      {props.songs.map((song, i) => {
        const onKeyUp = React.useCallback(
          (e: React.KeyboardEvent<HTMLLIElement>) => {
            props.onKeyUp(e, song.id);
          },
          [song]
        );

        const onClick = React.useCallback(() => {
          props.onClickSong(song.id);
        }, [song]);

        return (
          <li
            className={styles.item}
            tabIndex={i + 2} // account for the address bar and input
            onKeyUp={onKeyUp}
            key={song.id}
          >
            <TrackTile
              title={song.name}
              artist={song.artist}
              album={song.album}
              albumArtUrl={song.albumArtUrl}
              isSelected={props.selectedSong?.id === song.id}
              isActive={props.activeSong?.id === song.id}
              isPlaying={props.isPlaying}
              onClick={onClick}
              onClickPlay={props.onClickPlay}
              onClickPause={props.onClickPause}
            />
          </li>
        );
      })}
    </ol>
  );
});
