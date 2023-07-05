import styles from "./portrait_player.module.css";
import { Text } from "ui/text/text";

type PortraitPlayerProps = {
  albumArtUrl?: string;
  title?: string;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
};

export const PortraitPlayer = (props: PortraitPlayerProps) => {
  return (
    <div className={styles.container}>
      <img
        className={styles.albumArt}
        src={props.albumArtUrl}
        alt={`Album art for ${props.title}`}
      />
      <Text size="large" isPrimary={true}>
        {props.title}
      </Text>
      <div className={styles.spacer}></div>
      <button
        tabIndex={-1}
        className={styles.button}
        onClick={props.isPlaying ? props.onPause : props.onPlay}
      >
        {props.isPlaying ? "⏸️" : "▶️"}
      </button>
    </div>
  );
};
