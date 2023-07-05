import styles from "./loading_track_tile.module.css";

type LoadingTrackTileProps = {
  index: number;
};

export const LoadingTrackTile = (props: LoadingTrackTileProps) => (
  <div
    className={styles.container}
    style={{ animationDelay: `${props.index * 100}ms` }}
  ></div>
);
