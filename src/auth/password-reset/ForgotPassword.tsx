import React, { useState /*, {useState}*/ } from "react";
import { Link } from "react-router-dom";
import "../auth-style.css";

import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import SpinnerNew from "../../common/components/SpinnerNew";
import { API_ROUTES, APP_ROUTES } from "../../lib/Routes";
import { ApiClient } from "../../lib/api/ApiClient";
import { LoginResponse, UsernameFormPayload } from "../../lib/model/AuthModel";
import {
  FormMessageType,
  MessageType,
  MessageTypeAlert,
} from "../../lib/model/Model";
import {
  extractErrorMessage,
  parseFormDatav2,
  UsernameValidation,
} from "../../lib/utils/Helpers";
const apiClient = new ApiClient();

const validationSchema = Yup.object({
  username: UsernameValidation.label("Username"),
});

const ForgotPassword: React.FC = () => {
  const [messageType, setMessageType] = useState<FormMessageType>();

  const formik = useFormik<UsernameFormPayload>({
    initialValues: {
      username: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        const payload = parseFormDatav2(values) as UsernameFormPayload;

        await apiClient.post<LoginResponse, UsernameFormPayload>({
          url: API_ROUTES.AUTH.INIT_PASSWORD_RESET,
          data: payload,
        });

        resetForm();
        setMessageType({
          messageType: MessageType.SUCCESS,
          message: "Check your inbox for the password reset link",
        });
      } catch (err) {
        const errorMessage = extractErrorMessage(err);
        setMessageType({
          messageType: MessageType.ERROR,
          message: errorMessage || "Failed to generate report link",
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
            <p className="h1-bold primary-text mb-0">Forgot Password.</p>
            <p className=" body-regular primary-text">
              You will receive a password reset link in your inbox.
            </p>
          </div>
          {messageType && messageType.message && (
            <div className="col-12">
              <div
                className={`alert alert-${
                  MessageTypeAlert[messageType.messageType]
                }`}
              >
                {messageType.message}
              </div>
            </div>
          )}
          <div className="col-12">
            <FormikProvider value={formik}>
              <Form className="col-12">
                <label
                  className="body-regular primary-text col-12 auth-start-aligned-text"
                  htmlFor="username"
                >
                  Username *
                </label>

                <div className="col-12 mb-3">
                  <Field
                    name="username"
                    className="form-control body-regular mb-0"
                    type="username"
                    autoComplete="true"
                    placeholder="Enter username here"
                  />
                  <div className="text-danger small my-0">
                    <ErrorMessage name="username" />
                  </div>
                </div>

                <label className="col-12" id="remember-me-div">
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
                        Request password reset link
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

export default ForgotPassword;
