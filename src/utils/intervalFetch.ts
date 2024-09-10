export const fetchMoreThanUThink = (cb: () => void, timeout: number) => {
  cb();
  setInterval(cb, timeout);
};
