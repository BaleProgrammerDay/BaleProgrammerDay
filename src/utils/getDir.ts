const hasPersianChar = (text: string): boolean => {
  return /[\u0600-\u06ef]/g.test(text);
};

export const getDir = (text: string): "rtl" | "ltr" =>
  hasPersianChar(text) ? "rtl" : "ltr";
