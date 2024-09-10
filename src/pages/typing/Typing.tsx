import clsx from "clsx";
import styles from "./Typing.module.scss";
import { FC, HTMLAttributes, useEffect, useRef, useState } from "react";

export interface TypingProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  onSuccess?: (time: number, accuracy: number) => void;
}

export const Typing: FC<TypingProps> = (props) => {
  const [lastLetterEntered, setLastLetterEntered] = useState<string>("");
  const [currentLetterState, setCurrentLetterState] = useState<{
    used: boolean;
    index: number;
  }>({ used: false, index: 0 });
  const [wrongs, setWrongs] = useState<string[]>([]);

  const timeRef = useRef<number>(0);
  const renderOneRef = useRef(true);

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      const letterPress = e.key;
      if (letterPress === " ") {
        e.preventDefault();
      }
      setLastLetterEntered(letterPress);
      if (renderOneRef.current) {
        timeRef.current = new Date().getTime();
      }
      renderOneRef.current = false;
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (renderOneRef.current) return;

    const handleCorrectLetter = () => {
      if (currentLetterState.index === props.text.length - 1) {
        const timeNow = new Date().getTime();
        const totalTime = Math.floor((timeNow - timeRef.current) / 1000);

        const accuarcy = Number(
          ((wrongs.length / props.text.length) * 100).toFixed(2)
        );
        props.onSuccess?.(totalTime, accuarcy);
      }
      setCurrentLetterState((prev) => ({ used: false, index: prev.index + 1 }));
    };

    const handleWrongLetter = (wrongs: string[], expectedLetter: string) => {
      setCurrentLetterState((prev) => ({ ...prev, used: true }));
      if (!wrongs.includes(expectedLetter)) {
        setWrongs((prev) => [...prev, expectedLetter]);
      }
    };

    const expectedLetter = props.text[currentLetterState.index];
    if (lastLetterEntered === expectedLetter) {
      handleCorrectLetter();
    } else {
      handleWrongLetter(wrongs, expectedLetter);
    }
  }, [lastLetterEntered]);

  return (
    <div className={styles.Typing}>
      <div className={styles.TextWanted}>
        {props.text.split("").map((letter, index) => {
          return (
            <div
              className={clsx(styles.Letter, {
                [styles.Space]: letter === " ",
                [styles.Correct]: index < currentLetterState.index,
                [styles.Wrong]:
                  index === currentLetterState.index && currentLetterState.used,
                [styles.Next]:
                  index === currentLetterState.index &&
                  !currentLetterState.used,
              })}
              key={`${letter}-${index}`}
            >
              {letter}
            </div>
          );
        })}
      </div>
    </div>
  );
};
