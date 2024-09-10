import { Octav } from "~/components";
import styles from "./Piano.module.scss";

import { useEffect, useState } from "react";

export const Piano = () => {
  const [lastLetterEntered, setLastLetterEntered] = useState<string>("");

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      const letterPress = e.key;
      if (letterPress === " ") {
        e.preventDefault();
      }
      setLastLetterEntered(letterPress);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={styles.Piano}>
      <Octav octavNumber={3} showClavieNumber />
      <Octav octavNumber={2} />
    </div>
  );
};
