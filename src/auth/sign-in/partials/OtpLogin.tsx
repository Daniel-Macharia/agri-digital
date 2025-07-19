/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from "react-router-dom";

import "../../auth-style.css";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SpinnerNew from "../../../common/components/SpinnerNew";
import { ApiClient } from "../../../lib/api/ApiClient";
import { useAuth } from "../../../lib/context/AuthContext";
import {
  LoginResponse,
  LoginView,
  OtpLoginFormPayload,
  UsernameFormPayload,
} from "../../../lib/model/AuthModel";
import {
  AUTHORIZATION_HEADER_NAME,
  LOCAL_STORAGE_SESSION_KEY,
} from "../../../lib/model/Model";
import { API_ROUTES, APP_ROUTES } from "../../../lib/Routes";
import LocalStorageUtil from "../../../lib/storage/LocalStorageUtil";
import {
  buildAuthorizationHeader,
  extractErrorMessage,
  getOtpLength,
} from "../../../lib/utils/Helpers";
const apiClient = new ApiClient();

const OtpLoginForm: React.FC = () => {
  const navigate = useNavigate();
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const { username, mfaAccessToken, setCurrentLoginView } = useAuth();
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [OtpLogin, setOtpLogin] = useState<string[]>(
    new Array(getOtpLength()).fill("")
  );
  const [errorMessage, setErrorMessage] = useState<string>();

  const OtpLoginLength = useMemo(() => getOtpLength(), []);

  const canSubmit = useMemo(() => {
    const findFirstWithNoData = OtpLogin.find((val) => val.trim().length === 0);
    return typeof findFirstWithNoData === "undefined";
  }, [OtpLogin]);

  const handleOtpLoginChange = useCallback(
    (element: HTMLInputElement, index: number) => {
      if (!inputsRef || !inputsRef.current) return;

      const value = element.value.replace(/[^0-9]/g, "");

      if (!value) return;

      const newOtpLogin = [...OtpLogin];
      newOtpLogin[index] = value.charAt(0);

      setOtpLogin(newOtpLogin);

      if (index < OtpLoginLength - 1 && inputsRef.current[index + 1]) {
        inputsRef.current[index + 1]?.focus();
      }
    },
    [OtpLogin, OtpLoginLength]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (event.key === "Backspace") {
        if (OtpLogin[index]) {
          const newOtpLogin = [...OtpLogin];
          newOtpLogin[index] = "";
          setOtpLogin(newOtpLogin);
        } else if (index > 0 && inputsRef && inputsRef.current) {
          if (inputsRef.current[index - 1]) {
            inputsRef.current[index - 1]?.focus();
          }
        }
      }
    },
    [OtpLogin]
  );

  const handlePaste = useCallback(
    (event: React.ClipboardEvent<HTMLDivElement>) => {
      event.preventDefault();
      const pastedData = event.clipboardData
        .getData("Text")
        .slice(0, OtpLoginLength);

      const newOtpLogin = [...OtpLogin];

      for (let i = 0; i < OtpLoginLength; i++) {
        newOtpLogin[i] = pastedData[i] || "";
      }

      setOtpLogin(newOtpLogin);
    },
    [OtpLogin, OtpLoginLength]
  );

  const submitForm = useCallback(async () => {
    if (!canSubmit) return;

    try {
      if (!username) return;
      setIsVerifying(true);

      const parsedOTP = OtpLogin.join("");

      const headers: Record<string, any> = {};
      if (mfaAccessToken) {
        // mfaAccessToken
        headers[AUTHORIZATION_HEADER_NAME] =
          buildAuthorizationHeader(mfaAccessToken);
      }

      const loginRes = await apiClient.post<LoginResponse, OtpLoginFormPayload>(
        {
          url: API_ROUTES.AUTH.PASSWORD_LESS_VALIDATE,
          data: { username, otp: parsedOTP },
          config: { headers },
        }
      );
      LocalStorageUtil.setItem(LOCAL_STORAGE_SESSION_KEY, loginRes);

      navigate(APP_ROUTES.AUTH.FULL.DASHBOARD);
    } catch (err) {
      const errorMessage = extractErrorMessage(err);
      setErrorMessage(errorMessage || "Could not validate OTP");
    } finally {
      setIsVerifying(false);
    }
  }, [canSubmit, username, OtpLogin, mfaAccessToken]);

  const remotelyRequestOTP = useCallback(async () => {
    try {
      if (!username || mfaAccessToken) return;

      await apiClient.post<LoginResponse, UsernameFormPayload>({
        url: API_ROUTES.AUTH.PASSWORD_LESS_REQUEST,
        data: { username },
      });
    } catch (err) {}
  }, [username, mfaAccessToken]);

  useEffect(() => {
    if (canSubmit) {
      submitForm();
    }
  }, [canSubmit, submitForm]);

  useEffect(() => {
    remotelyRequestOTP();
  }, [remotelyRequestOTP]);

  return (
    <div
      className="col-12"
      style={{ backgroundColor: "var(--Background, #F5F5F5)" }}
    >
      <div className="row justify-content-center align-items-center px-4">
        <div className="col-12 col-md-5">
          <div className="col-12">
            <p className="h1-bold primary-text mb-0">
              <button
                type="button"
                className="btn bg-transparent border-0 rounded-circle p-2 auth-transparent-round-btn text-decoration-none me-1"
                onClick={() => setCurrentLoginView(LoginView.LOGIN)}
              >
                <i className="fas fa-arrow-left"></i>
              </button>
              Enter Verification Code.
            </p>
            <p className=" body-regular primary-text">
              We've sent you the One Time Password(Check inbox)
            </p>
          </div>

          {errorMessage && (
            <div className="col-12">
              <div className="alert alert-danger">{errorMessage}</div>
            </div>
          )}

          <div className="col-12">
            <div className="sign-up-form">
              {/* <label className="body-regular primary-text" htmlFor='OtpLogin' >
                                        One-time Pin(O.T.P)
                                    </label> */}

              <div
                className="d-flex gap-2 justify-content-center"
                onPaste={handlePaste}
              >
                {OtpLogin.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="form-control h2-semibold "
                    value={digit}
                    ref={(el) => (inputsRef.current[index] = el)}
                    onChange={(e) => handleOtpLoginChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    style={{ color: "var(--Dark-500, #16151C)" }}
                  />
                ))}
              </div>

              <div className="col-12">
                <button
                  type="submit"
                  name="create-button"
                  className="col-12 body-bold auth-accept-button"
                  disabled={!canSubmit || isVerifying}
                  style={{ opacity: isVerifying ? "0.8" : "1" }}
                  onClick={submitForm}
                >
                  {isVerifying ? <SpinnerNew /> : "Verify"}
                </button>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-4 text-start">
              <Link
                to="#"
                className="text-decoration-none text-dark"
                onClick={() => remotelyRequestOTP()}
              >
                Request OTP
              </Link>
            </div>
            <div className="col-8 text-end">
              <Link
                to={APP_ROUTES.AUTH.FULL.SIGN_UP}
                className="text-decoration-none text-dark"
              >
                Do not have an account ?
                <span
                  className="ms-1 body-semibold"
                  style={{ color: " var(--Primary, #457900)" }}
                >
                  Sign up
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-0 col-md-6 d-none d-md-flex">
          <img
            src="/shamba_bot_logo.svg"
            alt="logo"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default OtpLoginForm;
