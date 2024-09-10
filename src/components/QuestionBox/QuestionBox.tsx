import { FC, useState } from "react";
import styles from "./QuestionBox.module.scss";
import { Question } from "~/types";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "~/store";
import { questionActions } from "~/store/questions.slice";
import { LocalModal, ModalStates } from "../Modal";
import { timeout } from "~/utils";

export const QuestionBox: FC<Question & { number: number }> = (props) => {
  const { token } = useSelector((state: RootState) => state.auth);

  const [modalStates, setModalStates] = useState<ModalStates>({
    active: false,
    exist: false,
  });

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const clickHandler = () => {
    if (!props.isPurchased) {
      setModalStates((prev) => ({ ...prev, exist: true }));
    } else {
      navigate(props.number.toString());
    }
  };

  const purchaseQuestion = () => {
    dispatch(
      questionActions.purchaseQusetion({
        user_token: token,
        id: props.id,
        cb: () => {
          navigate(props.number.toString());
        },
      })
    );
  };

  return (
    <>
      <div
        className={clsx(styles.QuestionBox, {
          [styles.isActive]: props.isActive,
          [styles.isPurchased]: props.isPurchased,
          [styles.isAnswerd]: props.isAnswerd,
          [styles.isStarred]: props.isStarred,
        })}
        onClick={clickHandler}
      >
        {props.number}
      </div>
      {modalStates.exist && (
        <LocalModal
          states={modalStates}
          setStates={setModalStates}
          onReset={() => {}}
        >
          <div className={styles.WantBuy}>
            <div className={styles.Info}>
              <p>سوال رو میخوای؟</p>
              <span>({props.cost} کلید میخواد)</span>
            </div>
            <div className={styles.Buttons}>
              <button onClick={purchaseQuestion}>بله بخر</button>
              <button
                onClick={async () => {
                  setModalStates((prev) => ({ ...prev, active: false }));
                  await timeout(500);
                  setModalStates((prev) => ({ ...prev, exist: false }));
                }}
              >
                نه
              </button>
            </div>
          </div>
        </LocalModal>
      )}
    </>
  );
};
