import * as React from "react";
import styles from "./portrait_skeleton.module.css";
import classNames from "classnames";

type PortraitSkeletonProps = {
  isPlayerVisible: boolean;
  Search: React.ComponentType;
  List: React.ComponentType;
  Player: React.ComponentType;
};

export const PortraitSkeleton = (props: PortraitSkeletonProps) => (
  <>
    <div className={styles.container}>
      <div className={styles.search}>
        <props.Search />
      </div>
      <div
        className={classNames([styles.list], {
          [styles.raised]: props.isPlayerVisible,
        })}
      >
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
  </>
);
