/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

interface PasswordInputProps {
  field: any;
  form: any;
  label: string;
  className?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  field,
  label,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="position-relative">
      <label>
        {label}
        <sup className="text-danger">*</sup>
      </label>
      <input
        {...field}
        className={className}
        type={showPassword ? "text" : "password"}
        autoComplete="off"
      />
      <button
        type="button"
        className="btn btn-link position-absolute end-0 top-50 mt-1"
        onClick={() => setShowPassword(!showPassword)}
        style={{ transform: "translateY(-30%)", marginLeft: "2% !important" }}
      >
        {showPassword ? (
          <i className="fa fa-eye-slash text-muted fs-13"></i>
        ) : (
          <i className="fa fa-eye text-muted fs-13"></i>
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
