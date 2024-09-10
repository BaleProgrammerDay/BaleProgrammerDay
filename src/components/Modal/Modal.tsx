import { FC, MouseEvent, ReactNode } from "react";

import styles from "./Modal.module.scss";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  active: boolean;
  contentClassName?: string;
}

export const Modal: FC<ModalProps> = ({
  children,
  active,
  onClose,
  contentClassName,
}) => {
  const modalClickHandler = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation(); // this because some modal are in another div and div maybe have click event and they call too
    onClose();
  };

  const modalContentClickHandler = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`${styles.modal} ${active ? styles["active-modal"] : ""}`}
      onClick={modalClickHandler}
    >
      <div
        className={`${styles["modal-content"]} ${
          active ? styles["active-content"] : ""
        } ${contentClassName ?? ""}`}
        onClick={modalContentClickHandler}
      >
        {children}
      </div>
    </div>
  );
};
