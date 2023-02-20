import IconEyeClose from "../../../assets/icons/iconEyeClose";
import IconEyeOpen from "../../../assets/icons/iconEyeOpen";
import React, { ReactNode, useState } from "react";
import style from "./passwordInput.module.css";

interface PasswordInputType {
  label: string;
  placeholder: string;
  onChange: any;
  value: any;
  id?: string;
  testId: string;
  className?: string;
  name?: string;
  StartIcon?: ReactNode;
}

const PasswordInput = ({
  id = "",
  label,
  placeholder,
  onChange,
  value,
  testId,
  name = "",
  className = "",
  StartIcon,
}: PasswordInputType) => {
  const [showPassword, setShowPassword] = useState(false);
  const changePasswordVisibility = (e: React.MouseEvent<SVGAElement>) => {
    const { id } = e.currentTarget;
    setShowPassword(id === "iconEyeClose" ? false : true);
  };
  return (
    <div className={`${style.holder} ${className}`}>
      <label htmlFor={id}>{label}</label>
      <div>
        <span className={style.inputHolder}>
          {StartIcon != null ? StartIcon : ""}
          <input
            name={name}
            placeholder={placeholder}
            data-testid={testId}
            id={id}
            onChange={onChange}
            value={value}
            type={showPassword ? "text" : "password"}
          />
        </span>
        {showPassword ? (
          <IconEyeClose
            className={style.eyeIcon}
            onClick={changePasswordVisibility}
            width="20"
            height="20"
            data-testid="iconEyeClose"
            id="iconEyeClose"
          />
        ) : (
          <IconEyeOpen
            className={style.eyeIcon}
            onClick={changePasswordVisibility}
            width="20"
            height="20"
            id="iconEyeOpen"
            data-testid="iconEyeOpen"
          />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
