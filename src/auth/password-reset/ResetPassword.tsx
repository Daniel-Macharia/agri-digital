import clsx from "clsx";
import { Field, Form, FormikProvider, useFormik } from "formik";
import React, { useState /*, {useState}*/ } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import MessageDisplay from "../../common/components/MessageDisplay";
import SpinnerNew from "../../common/components/SpinnerNew";
import { API_ROUTES, APP_ROUTES } from "../../lib/Routes";
import { ApiClient } from "../../lib/api/ApiClient";
import {
  LoginResponse,
  PasswordResetFormPayload,
} from "../../lib/model/AuthModel";
import {
  FormMessageType,
  LOCAL_STORAGE_SESSION_KEY,
  MessageType,
  PasswordYupRules,
} from "../../lib/model/Model";
import LocalStorageUtil from "../../lib/storage/LocalStorageUtil";
import { extractErrorMessage, parseFormDatav2 } from "../../lib/utils/Helpers";
import "../auth-style.css";
import PasswordInput from "./PasswordInput";
import PasswordValidationRules from "./PasswordValidationRules";
const apiClient = new ApiClient();

const validationSchema = Yup.object({
  resetCode: Yup.string().trim().required().label("Reset Code"),
  password: PasswordYupRules.required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
});

const ResetPassword: React.FC = () => {
  const { resetCode } = useParams();
  const navigate = useNavigate();
  const [messageType, setMessageType] = useState<FormMessageType>();

  const formik = useFormik<PasswordResetFormPayload>({
    initialValues: {
      resetCode: resetCode || "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const payload = parseFormDatav2(values) as PasswordResetFormPayload;

        const loginRes = await apiClient.post<
          LoginResponse,
          PasswordResetFormPayload
        >({
          url: API_ROUTES.AUTH.RESET_PASSWORD,
          data: payload,
        });

        LocalStorageUtil.setItem(LOCAL_STORAGE_SESSION_KEY, loginRes);

        navigate(APP_ROUTES.AUTH.FULL.DASHBOARD);
      } catch (err) {
        const errorMessage = extractErrorMessage(err);
        setMessageType({
          messageType: MessageType.ERROR,
          message: errorMessage || "Failed to reset password",
        });
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
            <p className="h1-bold primary-text mb-0">Setup New Password</p>
          </div>

          <div className="col-12">
            <MessageDisplay messageType={messageType} />
          </div>

          <div className="col-12">
            <FormikProvider value={formik}>
              <Form className="col-12">
                <div className="col-12 mt-1">
                  <PasswordValidationRules password={formik.values.password} />
                </div>

                <div className="col-md-12 mt-1">
                  <div className="form-group">
                    <Field
                      name="password"
                      component={PasswordInput}
                      label="New Password"
                      className={clsx(
                        "form-control bg-transparent no-bg-image",
                        {
                          "is-invalid":
                            formik.touched.password && formik.errors.password,
                        },
                        {
                          "is-valid":
                            formik.touched.password && !formik.errors.password,
                        }
                      )}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className="fv-plugins-message-container text-danger">
                        <span role="alert">{formik.errors.password}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-12 mt-1">
                  <div className="form-group">
                    <Field
                      name="confirmPassword"
                      component={PasswordInput}
                      label="Confirm Password"
                      className={clsx(
                        "form-control bg-transparent no-bg-image",
                        {
                          "is-invalid":
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword,
                        },
                        {
                          "is-valid":
                            formik.touched.confirmPassword &&
                            !formik.errors.confirmPassword,
                        }
                      )}
                    />
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <div className="fv-plugins-message-container text-danger">
                          <span role="alert">
                            {formik.errors.confirmPassword}
                          </span>
                        </div>
                      )}
                  </div>
                </div>

                <label className="col-12 mt-3" id="remember-me-div">
                  <div className="row">
                    <div className="col-12">
                      <div className="row justify-content-end">
                        <Link
                          to={APP_ROUTES.AUTH.FULL.LOGIN}
                          className="react-link auth-end-aligned-text small-semibold text-capitalize"
                          style={{ color: "var(--Primary, #457900)" }}
                        >
                          Go back to login
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
                      <span className="indicator-label text-capitalize">
                        Save Password
                      </span>
                    )}
                    {formik.isSubmitting && <SpinnerNew />}
                  </button>
                </div>
              </Form>
            </FormikProvider>
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

export default ResetPassword;
