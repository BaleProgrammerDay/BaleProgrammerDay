import { useEffect } from "react";
import styles from "./QuestionPool.module.scss";
import { Header } from "~/components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { questionActions } from "~/store/questions.slice";
import { RootState, AppDispatch } from "~/store";
import { Loading, QuestionBox } from "~/components";

export const QuestionPool = () => {
  const { questions } = useSelector((state: RootState) => state.questions);

  console.log(questions);

  return (
    <div className={styles.QuestionPool}>
      <Header />

      {questions.length > 0 ? (
        <div className={styles.Questions}>
          <div className={styles.body}>
            {questions.map((question, index) => (
              <QuestionBox key={question.id} {...question} number={index + 1} />
            ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
