import styles from "./ScoreBoard.module.scss";

import { Header } from "~/components/Header/Header";
import image from "~/assets/images/روز برنامه نویس.png";
import first from "~/assets/images/1.png";
import second from "~/assets/images/2.png";
import third from "~/assets/images/3.png";
import star1 from "~/assets/images/11.png";
import star2 from "~/assets/images/22.png";
import star3 from "~/assets/images/33.png";
import star from "~/assets/images/Diamond star.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "~/store";
import { Loading } from "~/components";
import { useEffect } from "react";
import { scoreBoardActions } from "~/store/score-board.slice";
import { fetchMoreThanUThink } from "~/utils";
import clsx from "clsx";

export const ScoreBoard = () => {
  const { teams } = useSelector((state: RootState) => state.scoreBoard);
  const { token } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    fetchMoreThanUThink(
      () => dispatch(scoreBoardActions.getAllTeams(token)),
      10000
    );
  }, []);

  return (
    <div className={styles.ScoreBoard}>
      <Header />
      {teams.length < 2 ? (
        <Loading />
      ) : (
        <div className={styles.body}>
          <div className={styles.upper}>
            <div className={styles.section}>
              <img src={image} className={styles.image} alt="" />
              <div className={styles.upperBox2}>
                <img src={second} className={styles.second} alt="" />
                <span className={styles.uppername}>{teams[2].name}</span>
                <div className={styles.upperScore}>
                  <span
                    className={styles.upperText}
                    style={{ color: "#a0a0a0" }}
                  >
                    {teams[2].point}
                  </span>
                  <img className={styles.star} src={star2} alt="" />
                </div>
              </div>
            </div>
            <div className={styles.section}>
              <img src={image} className={styles.image} alt="" />
              <div className={styles.upperBox1}>
                <img src={first} className={styles.first} alt="" />
                <span className={styles.uppername}>{teams[0].name}</span>
                <div className={styles.upperScore}>
                  <span className={styles.upperText} style={{ color: "#fc0" }}>
                    {teams[0].point}
                  </span>
                  <img className={styles.star} src={star1} alt="" />
                </div>
              </div>
            </div>
            <div className={styles.section}>
              <img src={image} className={styles.image} alt="" />
              <div className={styles.upperBox3}>
                <img src={third} className={styles.third} alt="" />
                <span className={styles.uppername}>{teams[1].name}</span>
                <div className={styles.upperScore}>
                  <span
                    className={styles.upperText}
                    style={{ color: "#d9a962" }}
                  >
                    {teams[1].point}
                  </span>
                  <img className={styles.star} src={star3} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.down}>
            <div className={styles.title}>
              <div className={styles.texts}>
                <div className={styles.titleText}>امتیاز</div>
                <div className={styles.titleText}>گروه</div>
                <div className={styles.titleText}>رتبه</div>
              </div>
              <div className={styles.Line}></div>
            </div>
            <div className={styles.ranks}>
              {teams.map((team, index) => (
                <div
                  className={clsx(styles.rankBox, { [styles.Self]: team.self })}
                >
                  <div className={styles.inside}>
                    <div className={styles.part}>
                      <span
                        className={styles.text}
                        style={{ width: "fit-content" }}
                      >
                        {team.point}
                      </span>
                      <img className={styles.dimond} src={star} alt="" />
                    </div>
                    <span className={styles.text}>{team.name}</span>
                    <span className={styles.text}>{index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
