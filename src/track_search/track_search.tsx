import * as React from "react";
import styles from "./track_search.module.css";

type TrackSearchProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TrackSearch = (props: TrackSearchProps) => {
  return (
    <input
      tabIndex={1}
      className={styles.container}
      placeholder="🔍 Search artist"
      value={props.value}
      onChange={props.onChange}
    />
  );
};
