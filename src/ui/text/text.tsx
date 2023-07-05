import * as React from "react";
import styles from "./text.module.css";

type Size = "small" | "medium" | "large" | "huge";
const SIZE_MAP: Record<Size, number> = {
  small: 8,
  medium: 12,
  large: 14,
  huge: 20,
};

type TextProps = {
  size: Size;
  isPrimary?: boolean;
  isHighlighted?: boolean;
};

export const Text = (props: React.PropsWithChildren<TextProps>) => (
  <span
    className={styles.text}
    style={{
      fontSize: `${SIZE_MAP[props.size]}px`,
      fontWeight: `${props.isPrimary ? "bold" : undefined}`,
      color: props.isHighlighted ? "green" : undefined,
    }}
  >
    {props.children}
  </span>
);
