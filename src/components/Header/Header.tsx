import styles from "./Header.module.scss";
import bale from "../../assets/images/لوگو ترنسپرنت.png";
import profile from "../../assets/images/روز برنامه نویس.png";
import star from "../../assets/images/Diamond star.png";
import key from "../../assets/images/key-svgrepo-com (1) 1.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
export const Header = () => {
  const { keys, score } = useSelector((state: RootState) => state.profile);

  return (
    <div className={styles.Header} dir="rtl">
      <div className={styles.Wrapper}>
        <div className={styles.right}>
          <div className={styles.logo}>
            <img className={styles.image} src={bale} width={28} alt="" />
            <div>
              <span className={styles.txt}>کارزار</span>
              <span className={styles.textstyle1}>بله</span>
            </div>
          </div>
          <div className={styles.parts}>
            <Link className={styles.part} to="/">
              سوالات
            </Link>
            <Link className={styles.part} to="/score-board">
              جدول امتیازات
            </Link>
          </div>
        </div>
        <div className={styles.left}>
          <div className={styles.button}>
            <img className={styles.icon} src={key} alt="" />
            <div className={styles.txt1}>{keys}</div>
          </div>
          <div className={styles.button}>
            <img className={styles.icon} src={star} alt="" />
            <div className={styles.txt1}>{score}</div>
          </div>
          {/* <Link to="/profile" className={styles.Profile}>
            <img src={profile} className={styles.profileImg} alt="" />
          </Link> */}
        </div>
      </div>
    </div>
  );
};
