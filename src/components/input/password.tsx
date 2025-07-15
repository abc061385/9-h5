import { FC, InputHTMLAttributes, useState } from "react";
import { Icon } from "../icon";
import { TextError } from "./text-error";

type IProps = InputHTMLAttributes<HTMLInputElement> & {
  err?: string;
};

export const InputPassword: FC<IProps> = ({ err, ...props }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <label className="input w-full">
        <Icon name="lock" />
        <input type={open ? "text" : "password"} className="grow" {...props} />
        <Icon
          name={open ? "eye-open" : "eye-close"}
          onClick={() => setOpen(!open)}
        />
      </label>
      <TextError>{err}</TextError>
    </>
  );
};
