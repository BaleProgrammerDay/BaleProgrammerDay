import styles from "./Login.module.scss";
import user from "~/assets/images/user-svgrepo-com.png";
import key from "~/assets/images/key-svgrepo-com.svg";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "~/store";
import { authActions } from "~/store/auth.slice";
import { getDir } from "~/utils";

export const Login = () => {
  const [states, setStates] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>();

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement>,
    prop: "username" | "password"
  ) => {
    setStates((prev) => ({ ...prev, [prop]: e.target.value }));
  };

  const submitHandler = () => {
    dispatch(authActions.loginAction(states));
  };

  return (
    <div className={styles.Login} dir="rtl">
      <div className={styles.Container}>
        <div className={styles.Header}>
          <span className={styles.text1}>
            وارد حساب گروه خود شوید
            <span className={styles.textstyle1}>.</span>
          </span>
          <span className={styles.text2}>
            اطلاعات ورود خود را نمی‌دانید؟
            <span className={styles.textstyle1}>
              {" "}
              به برگزارکنندگان مسابقه مراجعه کنید.
            </span>
          </span>
        </div>
        <div className={styles.inputes}>
          <div className={styles.box}>
            <img className={styles.image} src={user} alt="" />
            <input
              className={styles.inputtext}
              placeholder="نام کاربری"
              onChange={(e) => changeHandler(e, "username")}
              style={{
                direction: states.username ? getDir(states.username) : "rtl",
              }}
            />
          </div>
          <div className={styles.box}>
            <img className={styles.image} src={key} alt="" />
            <input
              className={styles.inputtext}
              placeholder="رمز عبور"
              type="password"
              onChange={(e) => changeHandler(e, "password")}
              style={{
                direction: states.password ? getDir(states.password) : "rtl",
              }}
            />
          </div>
          <button className={styles.button} onClick={submitHandler}>
            ورود
          </button>
        </div>
      </div>
    </div>
  );
};
