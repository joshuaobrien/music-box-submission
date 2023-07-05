import { Text } from "ui/text/text";
import styles from "./track_tile.module.css";
import classNames from "classnames";

type TrackTileProps = {
  title: string;
  artist: string;
  album: string;
  albumArtUrl: string;
  isSelected: boolean;
  isActive: boolean;
  isPlaying: boolean;
  onClick: () => void;
  onClickPlay: () => void;
  onClickPause: () => void;
};

export const TrackTile = (props: TrackTileProps) => {
  return (
    <div className={styles.container} onClick={props.onClick}>
      <img
        src={props.albumArtUrl}
        className={styles.albumArt}
        alt={`Album art for ${props.album}`}
      />
      <div className={styles.metadata}>
        <Text size="large" isPrimary={true} isHighlighted={props.isSelected}>
          {props.title}
        </Text>
        <Text size="medium">{props.artist}</Text>
        <Text size="medium">{props.album}</Text>
      </div>
      <div className={styles.spacer}></div>
      {props.isActive && (
        <TrackIcon
          isPlaying={props.isPlaying}
          onClickPause={props.onClickPause}
        />
      )}
    </div>
  );
};

const TrackIcon = (
  props: Pick<TrackTileProps, "isPlaying" | "onClickPause">
) => {
  return (
    <button
      onClick={props.onClickPause}
      className={classNames([styles.button], {
        [styles.spin]: props.isPlaying,
      })}
    >
      {"💿"}
    </button>
  );
};
