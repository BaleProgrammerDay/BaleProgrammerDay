import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { AppDispatch, RootState } from "~/store";

import styles from "./Question.module.scss";

import { Header } from "~/components/Header/Header";

import fullStar from "~/assets/images/پر.png";
import emptyStar from "~/assets/images/خالی.png";
import image from "~/assets/images/روز برنامه نویس.png";
import { Question as QuestionType, QuestionInfo } from "~/types";
import { questionActions } from "~/store/questions.slice";
import { Loading } from "~/components";
import clsx from "clsx";
import { getDir } from "~/utils";
import { GetAxiosInstance } from "~/api/configApi";

export const Question = () => {
  const { questions } = useSelector((state: RootState) => state.questions);
  const { id } = useParams();
  const [questionInfo, setQuestionInfo] = useState<QuestionInfo | null>(null);
  const [result, setResult] = useState<string>("");
  const [question, setQuestion] = useState<QuestionType | null>(null);
  const { token } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  useEffect(() => {
    const question = questions.find((_, index) => index + 1 === +id!);

    if (question?.id) {
      setQuestion(question);
      const cb = (questionInfo: QuestionInfo) => setQuestionInfo(questionInfo);
      dispatch(
        questionActions.getOneQusetion({
          id: question.id,
          cb,
          user_token: token,
        })
      );
    }
  }, [questions, id]);

  const handleSubmit = () => {
    const cb = () => navigate("/score-board");
    if (id && result.trim().length !== 0) {
      dispatch(
        questionActions.sendQuestionResult({
          id: question?.id ?? "1",
          result,
          cb,
          user_token: token,
          point: question?.score ?? 100,
        })
      );
    }
  };

  const convertTextToValidText = (text?: string) => {
    if (!text) return { text: "", links: [] };
    const linkAndText = text.split(";;");
    let links: string[] | string | [] =
      linkAndText.length === 2 ? linkAndText[0] : [];
    const validText =
      linkAndText.length === 2 ? linkAndText[1] : linkAndText[0];

    if (links.length > 0) {
      links = (links as string).split(",");
    }
    return { text: validText, links: links as string[] };
  };

  const handleChangeResult = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setResult(value);
  };

  const { text, links } = convertTextToValidText(questionInfo?.text);

  return (
    <div className={styles.Question} dir="rtl">
      <Header />
      {!questionInfo ? (
        <Loading />
      ) : (
        <div className={styles.body}>
          <div className={styles.QuestionBox}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div className={styles.TitleBar}>
                <div className={styles.QuestionTitle}>
                  {questionInfo?.title}
                </div>
                <div className={styles.QuestionOther}>
                  <div className={styles.category}>
                    <span className={styles.categoryText}>درجه سختی</span>
                    <div className={styles.StarBox}>
                      {Array(questionInfo.level)
                        .fill(0)
                        .map((_, index) => (
                          <img
                            key={index}
                            src={
                              index > questionInfo.level ? emptyStar : fullStar
                            }
                            className={styles.icon}
                            alt=""
                          />
                        ))}
                    </div>
                  </div>
                  <div className={styles.category}>
                    <span className={styles.categoryText}>سوال </span>
                    <span className={styles.greenText}>
                      {questionInfo.isStarred ? "طلایی" : "عادی"}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.Line} />
            </div>
            <span className={styles.QuestionText}>{text}</span>
            <div className={styles.assets}>
              {links.length > 0 &&
                links.map((link) => (
                  <div className={styles.assetBox} key={link}>
                    <img className={styles.assetImg} src={link} alt="" />
                    <span className={styles.assetText}>
                      {link.split("//")[1].split(".")[0]}
                    </span>
                  </div>
                ))}
              {questionInfo.has_zip && (
                <div className={styles.assetBox}>
                  <a
                    href={`http://188.121.122.87:80/${questionInfo.zip_file_url}`}
                    className={styles.assetZip}
                    dir="ltr"
                    target="_blank"
                  >
                    File Zip!
                  </a>
                </div>
              )}
            </div>
            {!question?.isAnswerd && (
              <div className={styles.SubmitBar}>
                <input
                  className={styles.SubmitBox}
                  type="text"
                  placeholder="پاسخ خود را وارد کنید"
                  onChange={handleChangeResult}
                  style={{ direction: result ? getDir(result) : "rtl" }}
                />
                <div>
                  <button
                    className={clsx(styles.Submit, styles.SubmitTxt)}
                    onClick={handleSubmit}
                  >
                    ثبت
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
