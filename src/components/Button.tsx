import { ButtonHTMLAttributes } from "react";
import cn from "../utils/cn";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, className, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className={cn(
        "bg-blue-600 disabled:opacity-50 text-white py-2 px-4 rounded hover:bg-blue-700 transition ease-in",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
