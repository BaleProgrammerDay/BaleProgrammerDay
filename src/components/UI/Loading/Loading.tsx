import styles from "./Loading.module.scss";

export const Loading = () => {
  const loaderArray = new Array(4).fill(0);

  return (
    <div className={styles.LoadingWrapper}>
      {loaderArray.map((_, index) => {
        const spanArray = new Array(20).fill(0);
        return (
          <div
            className={styles.Loading}
            style={{ "--i": index } as React.CSSProperties}
            key={index}
          >
            {spanArray.map((_, index) => (
              <span
                style={{ "--j": index } as React.CSSProperties}
                key={index}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};
