import React, { useState /*, {useState}*/ } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../auth-style.css";

import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import SpinnerNew from "../../../common/components/SpinnerNew";
import { API_ROUTES, APP_ROUTES } from "../../../lib/Routes";
import { ApiClient } from "../../../lib/api/ApiClient";
import { useAuth } from "../../../lib/context/AuthContext";
import {
  LoginResponse,
  LoginView,
  PasswordLoginFormPayload,
} from "../../../lib/model/AuthModel";
import { LOCAL_STORAGE_SESSION_KEY } from "../../../lib/model/Model";
import LocalStorageUtil from "../../../lib/storage/LocalStorageUtil";
import {
  extractErrorMessage,
  parseFormDatav2,
  UsernameValidation,
} from "../../../lib/utils/Helpers";
const apiClient = new ApiClient();

const validationSchema = Yup.object({
  username: UsernameValidation.label("Username"),
  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .required()
    .label("Password"),
});

const EnterPassword: React.FC = () => {
  const navigate = useNavigate();
  const { username, setCurrentLoginView, setMfaAccessToken } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>();

  const formik = useFormik<PasswordLoginFormPayload>({
    initialValues: {
      username: username || "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const payload = parseFormDatav2(values) as PasswordLoginFormPayload;

        const loginRes = await apiClient.post<
          LoginResponse,
          PasswordLoginFormPayload
        >({
          url: API_ROUTES.AUTH.LOGIN,
          data: payload,
        });

        if (!loginRes.id) {
          //MFA Enabled, show OTP Page
          setSubmitting(false);
          setMfaAccessToken(loginRes.accessToken);
          setCurrentLoginView(LoginView.OTP);
          return;
        }

        LocalStorageUtil.setItem(LOCAL_STORAGE_SESSION_KEY, loginRes);

        navigate(APP_ROUTES.AUTH.FULL.DASHBOARD);
      } catch (err) {
        const errorMessage = extractErrorMessage(err);
        setErrorMessage(errorMessage || "Failed to generate report link");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div
      className="col-12"
      style={{ backgroundColor: "var(--Background, #F5F5F5)" }}
    >
      <div className="row justify-content-center align-items-center px-4">
        <div className="col-12 col-md-5">
          <div className="col-12">
            <p className="h1-bold primary-text mb-0">Login to your account.</p>
            <p className=" body-regular primary-text">
              Join the Future of Farming - Easy, Fast and Reliable.
            </p>
          </div>
          {errorMessage && (
            <div className="col-12">
              <div className="alert alert-danger">{errorMessage}</div>
            </div>
          )}
          <div className="col-12">
            <FormikProvider value={formik}>
              <Form className="col-12">
                <label
                  className="body-regular primary-text col-12 auth-start-aligned-text"
                  htmlFor="password"
                >
                  Password *
                </label>

                <div className="col-12 mb-3">
                  <Field
                    name="password"
                    className="form-control body-regular mb-0"
                    type="password"
                    autoComplete="true"
                    placeholder="Enter password here"
                  />
                  <div className="text-danger small my-0">
                    <ErrorMessage name="password" />
                  </div>
                </div>

                <label className="col-12" id="remember-me-div">
                  <div className="row">
                    <div className="col-4">
                      <div className="row">
                        <div className="col-1">
                          <input type="checkbox" />
                        </div>
                        <p className="col-10 small-regular primary-text">
                          Remember me
                        </p>
                      </div>
                    </div>

                    <div className="col-4">
                      <div className="row justify-content-end">
                        <Link
                          to="#"
                          onClick={() => setCurrentLoginView(LoginView.LOGIN)}
                          className="react-link auth-end-aligned-text small-semibold text-capitalize"
                          style={{ color: "var(--Primary, #457900)" }}
                        >
                          Go back to login
                        </Link>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="row justify-content-end">
                        <Link
                          to={APP_ROUTES.AUTH.FULL.FORGOT_PASSWORD}
                          className="react-link auth-end-aligned-text small-semibold"
                          style={{ color: "var(--Primary, #457900)" }}
                        >
                          Forgot password ?
                        </Link>
                      </div>
                    </div>
                  </div>
                </label>

                <div className="col-12">
                  <button
                    type="submit"
                    className="col-12 auth-accept-button"
                    disabled={formik.isSubmitting || !formik.isValid}
                  >
                    {!formik.isSubmitting && (
                      <span className="indicator-label">Login</span>
                    )}
                    {formik.isSubmitting && <SpinnerNew />}
                  </button>
                </div>
              </Form>
            </FormikProvider>
          </div>

          <div className="col-12">
            <div className="text-end">
              <Link
                to={APP_ROUTES.AUTH.FULL.SIGN_UP}
                className="text-decoration-none body-regular primary-text"
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

export default EnterPassword;
