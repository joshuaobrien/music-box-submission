import { Album, Song } from "music_source/music_source";
import styles from "./landscale_player.module.css";
import { Text } from "ui/text/text";
import classNames from "classnames";

const DISC_RADIUS = 120;
const DISC_CUTOUT_RADIUS = 10;

type LandscapePlayerProps = {
  albumArtUrl?: string;
  title?: string;
  isPlaying: boolean;
  isSelectionPlaying: boolean;
  selectedAlbum: Album | undefined;
  activeSong: Song | undefined;
  onPlay: () => void;
  onPause: () => void;
};

export const LandscapePlayer = (props: LandscapePlayerProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <svg
          style={{
            width: `${2 * DISC_RADIUS}px`,
            height: `${2 * DISC_RADIUS}px`,
          }}
          className={classNames([styles.disc], {
            [styles.spin]: props.isSelectionPlaying,
          })}
        >
          <defs>
            <pattern
              id="image"
              patternUnits="userSpaceOnUse"
              height={2 * DISC_RADIUS}
              width={2 * DISC_RADIUS}
            >
              <image
                x="0"
                y="0"
                height={2 * DISC_RADIUS}
                width={2 * DISC_RADIUS}
                xlinkHref={props.albumArtUrl}
              ></image>
            </pattern>
          </defs>
          <circle
            id="top"
            cx={DISC_RADIUS}
            cy={DISC_RADIUS}
            r={DISC_RADIUS}
            fill="url(#image)"
          />
          <circle
            id="top"
            cx={DISC_RADIUS}
            cy={DISC_RADIUS}
            r={DISC_CUTOUT_RADIUS}
            fill="white"
          />
        </svg>
        {props.selectedAlbum && (
          <button
            className={styles.button}
            onClick={props.isSelectionPlaying ? props.onPause : props.onPlay}
          >
            {props.isSelectionPlaying ? "⏸️" : "▶️"}
          </button>
        )}
      </div>
      <ol className={styles.trackList}>
        {props.selectedAlbum &&
          props.selectedAlbum.songs.map((song) => (
            <li className={styles.track} key={song.id}>
              <Text
                size="huge"
                isHighlighted={props.activeSong?.id === song.id}
              >
                {song.name}
              </Text>
            </li>
          ))}
      </ol>
    </div>
  );
};
