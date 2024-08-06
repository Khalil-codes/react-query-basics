import { ComponentPropsWithRef } from "react";
import cn from "../utils/cn";

interface Props extends ComponentPropsWithRef<"input"> {
  label: string;
}

const Input = ({ id, name, label, className, ...rest }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id || name}>{label}</label>
      <input
        type="text"
        id={id || name}
        name={name}
        className={cn("border border-gray-300 rounded-md p-2", className)}
        {...rest}
      />
    </div>
  );
};

export default Input;
