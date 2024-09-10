import { FC, HTMLAttributes } from "react";
import { clsx } from "clsx";

import styles from "./Button.module.scss";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button {...props} className={clsx(styles.Button, className)}>
      {children}
    </button>
  );
};
