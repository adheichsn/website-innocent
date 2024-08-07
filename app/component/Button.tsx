import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
  type?: "submit" | "button";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "font-semibold rounded-md px-4 py-1 transition ease-in-out duration-200 w-max relative text-sm lg:text-base",
  variant = "primary",
  type = "button",
}) => {
  const buttonClass = `${className} ${
    variant == "primary"
      ? "bg-primary03 text-white border-2 border-primary01 hover:bg-primary03/80"
      : "bg-primary03/10 hover:bg-primary03/5 text-primary border-2 border-primary01/10"
  }`;

  return (
    <button className={buttonClass} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
