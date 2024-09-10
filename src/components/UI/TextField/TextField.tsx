import { FC, HtmlHTMLAttributes } from "react";

export interface TextFieldProps extends HtmlHTMLAttributes<HTMLInputElement> {}

export const TextFild: FC<TextFieldProps> = (props) => {
  return <input {...props} />;
};
