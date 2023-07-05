import { LoadingTrackTile } from "track_tile/loading_track_tile";
import styles from "./loading_list.module.css";

type LoadingListProps = {
  count: number;
};

export const LoadingList = (props: LoadingListProps) => (
  <ol className={styles.list}>
    {Array(props.count)
      .fill(null)
      .map((_, i) => (
        <li className={styles.item} key={i}>
          <LoadingTrackTile index={i} />
        </li>
      ))}
  </ol>
);
