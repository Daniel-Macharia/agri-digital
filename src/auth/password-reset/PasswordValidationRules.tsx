import { PasswordSpecialChars } from "../../lib/model/Model";

interface PasswordValidationProps {
  password: string;
}

const PasswordValidationRules: React.FC<PasswordValidationProps> = ({
  password,
}) => {
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = PasswordSpecialChars.test(password);
  //   {hasMinLength ? "✓" : "✗"}{" "}
  return (
    <div className="password-validation-rules mt-3">
      <ul className="list-unstyled">
        <li className={hasMinLength ? "text-success" : "text-danger"}>
          <i
            className={`fa fa-circle-${
              hasMinLength ? "check text-success" : "xmark text-danger"
            } fs-13`}
          ></i>{" "}
          At least 8 characters
        </li>
        <li className={hasUpperCase ? "text-success" : "text-danger"}>
          <i
            className={`fa fa-circle-${
              hasUpperCase ? "check text-success" : "xmark text-danger"
            } fs-13`}
          ></i>{" "}
          One uppercase letter
        </li>
        <li className={hasLowerCase ? "text-success" : "text-danger"}>
          <i
            className={`fa fa-circle-${
              hasLowerCase ? "check text-success" : "xmark text-danger"
            } fs-13`}
          ></i>{" "}
          One lowercase letter
        </li>
        <li className={hasNumber ? "text-success" : "text-danger"}>
          <i
            className={`fa fa-circle-${
              hasNumber ? "check text-success" : "xmark text-danger"
            } fs-13`}
          ></i>{" "}
          One number
        </li>
        <li className={hasSpecialChar ? "text-success" : "text-danger"}>
          <i
            className={`fa fa-circle-${
              hasSpecialChar ? "check text-success" : "xmark text-danger"
            } fs-13`}
          ></i>{" "}
          One special character (@$!%*?&#)
        </li>
      </ul>
    </div>
  );
};

export default PasswordValidationRules;
