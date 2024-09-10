import { FC } from "react";
import { Clavier } from "../Clavier/Clavier";
import styles from "./Octav.module.scss";
import { notes } from "~/utils";

export interface OctavProps {
  octavNumber: 2 | 3;
  showClavieNumber?: boolean;
}

export const Octav: FC<OctavProps> = (props) => {
  return (
    <div className={styles.Octav} style={{ direction: "ltr" }}>
      <Clavier
        note={notes[0]}
        octavNumber={props.octavNumber}
        noteNumber={0}
        showClavieNumber={props.showClavieNumber}
      />
      <div className={styles.ClavieWrapper}>
        <Clavier
          isBlack
          note={notes[1]}
          octavNumber={props.octavNumber}
          noteNumber={1}
          showClavieNumber={props.showClavieNumber}
        />
        <Clavier
          note={notes[2]}
          octavNumber={props.octavNumber}
          noteNumber={2}
          showClavieNumber={props.showClavieNumber}
        />
      </div>
      <div className={styles.ClavieWrapper}>
        <Clavier
          isBlack
          note={notes[3]}
          octavNumber={props.octavNumber}
          noteNumber={3}
          showClavieNumber={props.showClavieNumber}
        />
        <Clavier
          note={notes[4]}
          octavNumber={props.octavNumber}
          noteNumber={4}
          showClavieNumber={props.showClavieNumber}
        />
      </div>
      <Clavier
        note={notes[5]}
        octavNumber={props.octavNumber}
        noteNumber={5}
        showClavieNumber={props.showClavieNumber}
      />
      <div className={styles.ClavieWrapper}>
        <Clavier
          isBlack
          note={notes[6]}
          octavNumber={props.octavNumber}
          noteNumber={6}
          showClavieNumber={props.showClavieNumber}
        />
        <Clavier
          note={notes[7]}
          octavNumber={props.octavNumber}
          noteNumber={7}
          showClavieNumber={props.showClavieNumber}
        />
      </div>
      <div className={styles.ClavieWrapper}>
        <Clavier
          isBlack
          note={notes[8]}
          octavNumber={props.octavNumber}
          noteNumber={8}
          showClavieNumber={props.showClavieNumber}
        />
        <Clavier
          note={notes[9]}
          octavNumber={props.octavNumber}
          noteNumber={9}
          showClavieNumber={props.showClavieNumber}
        />
      </div>
      <div className={styles.ClavieWrapper}>
        <Clavier
          isBlack
          note={notes[10]}
          octavNumber={props.octavNumber}
          noteNumber={10}
          showClavieNumber={props.showClavieNumber}
        />
        <Clavier
          note={notes[11]}
          octavNumber={props.octavNumber}
          noteNumber={11}
          showClavieNumber={props.showClavieNumber}
        />
      </div>
    </div>
  );
};
