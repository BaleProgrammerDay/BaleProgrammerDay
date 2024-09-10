import { FC } from "react";
import styles from "./Clavier.module.scss";
import clsx from "clsx";
import { Note } from "~/utils";

export interface ClavierProps {
  isBlack?: boolean;
  note: Note;
  octavNumber: 2 | 3;
  noteNumber: number;
  showClavieNumber?: boolean;
}

export const Clavier: FC<ClavierProps> = (props) => {
  const audio = new Audio();

  const clickHandler = () => {
    audio.src = `src/assets/audios/piano/${props.note}${props.octavNumber}.mp3`;
    audio.play();
  };

  return (
    <button
      onMouseDown={clickHandler}
      className={clsx(styles.Clavier, { [styles.Black]: props.isBlack })}
    >
      {props.showClavieNumber && props.noteNumber}
    </button>
  );
};
