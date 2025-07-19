import { Link } from "react-router-dom";

import * as Yup from "yup";

import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";

import { useAuth } from "../../../lib/context/AuthContext.tsx";
import { LoginFormPayload, LoginView } from "../../../lib/model/AuthModel.ts";
import { APP_ROUTES } from "../../../lib/Routes.ts";
import {
  parseFormDatav3,
  UsernameValidation,
} from "../../../lib/utils/Helpers.ts";
const validationSchema = Yup.object({
  loginView: Yup.string().trim().required().label("Auth View"),
  username: UsernameValidation.label("Username"),
});

const LoginForm = () => {
  const { setCurrentLoginView, setUsername } = useAuth();

  const formik = useFormik<LoginFormPayload>({
    initialValues: {
      loginView: LoginView.LOGIN,
      username: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = parseFormDatav3(values) as LoginFormPayload;
      setCurrentLoginView(payload.loginView);
      setUsername(payload.username);
    },
  });

  return (
    <>
      {/* <div> */}
      <div
        className="col-12"
        style={{ backgroundColor: "var(--Background, #F5F5F5)" }}
      >
        <div className="row justify-content-center align-items-center px-4">
          <div className="col-12 col-md-5">
            <div className="col-12">
              <p className="h1-bold primary-text mb-0">
                Login to your account.
              </p>
              <p className=" body-regular primary-text">
                Join the Future of Farming - Easy, Fast and Reliable.
              </p>
            </div>

            <div className="col-12">
              <FormikProvider value={formik}>
                <Form className="col-12">
                  <label
                    className="body-regular primary-text mb-0"
                    htmlFor="email"
                  >
                    Email address/Phone number *
                  </label>

                  <div className="col-12 mb-4">
                    <Field
                      name="username"
                      className="form-control body-regular mb-0"
                      type="text"
                      placeholder="example@gmail.com/+254712345678"
                    />
                    <div className="text-danger small my-0">
                      <ErrorMessage name="username" />
                    </div>
                  </div>

                  <div className="col-12">
                    <button
                      type="submit"
                      name="pass"
                      className="col-12 mx-0 auth-accept-button body-bold"
                      onClick={() => {
                        formik.setFieldValue("loginView", LoginView.PASSWORD);
                        formik.submitForm();
                      }}
                    >
                      Login with password
                    </button>
                  </div>

                  <div className="col-12 px-0 mx-0 my-3">
                    <div className="row px-0 mx-0 justify-content-center align-items-center">
                      <div className="col-4 mx-0 px-0">
                        <hr className="mx-0 col-12" />
                      </div>
                      <div className="col-1 mx-0 px-0">
                        <p className="mx-0 col-12 auth-center-aligned-text body-regular primary-text">
                          or
                        </p>
                      </div>
                      <div className="col-4 mx-0 px-0">
                        <hr className="mx-0 col-12" />
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <button
                      type="submit"
                      name="otp"
                      className="col-12 auth-white-button body-regular"
                      onClick={() => {
                        formik.setFieldValue("loginView", LoginView.OTP);
                        formik.submitForm();
                      }}
                    >
                      Login with O.T.P
                    </button>
                  </div>
                </Form>
              </FormikProvider>
            </div>

            <div className="col-12">
              <div className="text-center">
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

          <div className="col-12 col-md-6 d-none d-md-flex">
            <img
              src="/shamba_bot_logo.svg"
              alt="logo"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
      {/* </div > */}
    </>
  );
};
export default LoginForm;
