import clsx from "clsx";
import styles from "./Typing.module.scss";
import {
  FC,
  HTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { LocalModal, ModalStates } from "~/components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "~/store";
import { questionActions } from "~/store/questions.slice";

export interface TypingProps extends HTMLAttributes<HTMLDivElement> {
  onSuccess?: (time: number, accuracy: number) => void;
  qid: string;
  qPoint: number;
  qTitle: string;
}

const text =
  "In today's world, Face book, Twitter, MySpace, are common websites for people to meet and make acquaintances. It has become a part of our daily lives. with the fast developing world and the increasing use of internet it has led us to a point where  we prefer 'liking' photos, writing 'comments' and wishing our friends over the social networking sites. Using the social networking sites is quite easy, morever, it keeps us updated about what is going on in other people's life, it reminds us of their important days as well as helps us keep a check on our exes.".toLocaleLowerCase();

const newText =
  "در این قسمت قصد داریم تا یک نمونه متن تمرین تایپ ده انگشتی فارسی که می تواند کمک زیادی به شما نماید را عنوان کنیم. این متن از کتاب Beyond the Black Waters که نوشته Guy de maupassant می باشد اقتباس شده است.«با این حال شامی که توسط خانواده خورده شد چیزی جز یک غذای ساده و معمولی نبود. برای نخستین بار آیو غمگین و ساکت جلوی شوهرش نشست و به سختی غذای مقابلش را نگاه کرد.- حالت خوب نیست عشقم؟اسکار با نگرانی پرسید.من نباید به شما اجازه می دادم که در این گرما به کلیسا بروید. آیو با خونسردی پاسخ داد؛ این اراده من بود که راه برونم. اسکار نگاهی نگران و پرسشگر به او انداخت‌. آیو با خود گفت من ترحم را نمیخواهم. سپس مکثی طولانی و تلخ در فضا حاکم شده بود.»این یک متن معمولی با سطح متوسط بود که می تواند برای بالا بردن مهارت های تایپ شما مورد استفاده قرار می گیرد.".toLocaleLowerCase();

export const Typing: FC<TypingProps> = (props) => {
  const [lastLetterEntered, setLastLetterEntered] = useState<string>("");
  const [currentLetterState, setCurrentLetterState] = useState<{
    used: boolean;
    index: number;
  }>({ used: false, index: 0 });
  const [wrongs, setWrongs] = useState<string[]>([]);

  const navigate = useNavigate();

  const timeRef = useRef<number>(0);
  const renderOneRef = useRef(true);
  const [timer, setTimer] = useState<number>(0);

  // const isLtr = true;
  const isLtr = props.qTitle === "TypingLtr";

  const [modalStates, setModalStates] = useState<ModalStates>({
    active: false,
    exist: false,
  });

  const dispatch = useDispatch<AppDispatch>();

  const realText = useMemo(() => {
    return isLtr ? text : newText;
  }, [isLtr]);

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      const letterPress = e.key;
      if (letterPress === " ") {
        e.preventDefault();
      }
      setLastLetterEntered(letterPress);
      renderOneRef.current = false;
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setInterval(
      () =>
        setTimer((prev) => {
          const newTime = prev + 1;
          if (newTime === 75) {
            setModalStates((prev) => ({ ...prev, exist: true }));
            return prev;
          }
          return newTime;
        }),
      1000
    );
  }, []);

  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (renderOneRef.current) return;

    const handleCorrectLetter = () => {
      if (currentLetterState.index === realText.length - 1) {
        dispatch(
          questionActions.sendQuestionResult({
            id: props.qid,
            user_token: token,
            cb: () => navigate("/"),
            point: props.qPoint,
            result: "answer",
          })
        );
      }
      setCurrentLetterState((prev) => ({ used: false, index: prev.index + 1 }));
    };

    const handleWrongLetter = (wrongs: string[], expectedLetter: string) => {
      setCurrentLetterState((prev) => ({ ...prev, used: true }));
      if (!wrongs.includes(expectedLetter)) {
        setWrongs((prev) => [...prev, expectedLetter]);
      }
    };

    const expectedLetter = realText[currentLetterState.index];
    if (lastLetterEntered === expectedLetter) {
      handleCorrectLetter();
    } else {
      handleWrongLetter(wrongs, expectedLetter);
    }
  }, [lastLetterEntered]);

  return (
    <div className={styles.Typing} style={{ direction: isLtr ? "ltr" : "rtl" }}>
      <div className={styles.Info}>
        {isLtr
          ? "if you can fast typing then u can write more programm"
          : "اگه بتونی سریع تر تایپ کنی یعنی بیشتر میتونی برنامه نویسی کنی :))"}
        <div style={{ width: "50px", height: "100%" }}></div>
        {isLtr ? "wrongs" : "اشتباهات"}:{" "}
        {wrongs.map((wrong) => (
          <span>{wrong},</span>
        ))}
        <div style={{ width: "50px", height: "100%" }}></div>
        <div className={styles.Timer}>
          {isLtr ? " time" : "زمان"}:{" "}
          <p>
            {timer}
            {isLtr ? " s" : " ثانیه"}
          </p>
        </div>
      </div>
      <div className={styles.TextWanted}>
        {realText.split("").map((letter, index) => {
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
      {modalStates.exist && (
        <LocalModal
          states={modalStates}
          setStates={setModalStates}
          onReset={() => {
            navigate("/");
          }}
        >
          <div className={styles.Loser}>{isLtr ? "You Lose" : "باختی"}</div>
        </LocalModal>
      )}
    </div>
  );
};
