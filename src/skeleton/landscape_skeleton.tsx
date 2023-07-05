import * as React from "react";
import styles from "./landscape_skeleton.module.css";
import classNames from "classnames";

type LandscapeSkeletonProps = {
  isPlayerVisible: boolean;
  Search: React.ComponentType;
  List: React.ComponentType;
  Player: React.ComponentType;
};

export const LandscapeSkeleton = (props: LandscapeSkeletonProps) => (
  <div className={styles.skeleton}>
    <div className={styles.container}>
      <div className={styles.search}>
        <props.Search />
      </div>
      <div className={styles.list}>
        <props.List />
      </div>
    </div>
    <div
      className={classNames([styles.player], {
        [styles.visible]: props.isPlayerVisible,
      })}
    >
      <props.Player />
    </div>
  </div>
);
