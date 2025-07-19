/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import "../auth-style.css";

import { useCallback, useEffect, useMemo, useState } from "react";
import Select from "react-select";
import * as Yup from "yup";
import MessageDisplay from "../../common/components/MessageDisplay";
import SpinnerNew from "../../common/components/SpinnerNew";
import { ApiClient } from "../../lib/api/ApiClient";
import { LoginResponse, RegisterFormPayload } from "../../lib/model/AuthModel";
import {
  FormMessageType,
  IdName,
  LOCAL_STORAGE_SESSION_KEY,
  MessageType,
  SystemWideSelectString,
} from "../../lib/model/Model";
import { API_ROUTES, APP_ROUTES } from "../../lib/Routes";
import LocalStorageUtil from "../../lib/storage/LocalStorageUtil";
import { extractErrorMessage, parseFormDatav3 } from "../../lib/utils/Helpers";
const apiClient = new ApiClient();

const validationSchema = Yup.object({
  firstName: Yup.string().trim().required().label("First Name"),
  otherNames: Yup.string().trim().required().label("Other Names"),
  email: Yup.string().trim().email().label("Email"),
  phoneNumber: Yup.string().trim().required().label("Phone Number"), //todo change this to number and validate min length is supposed to be 7
  rightGroups: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
    )
    .min(1)
    .required()
    .label("Roles"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [rightsGroups, setRightGroups] = useState<IdName[]>([]);
  const [messageType, setMessageType] = useState<FormMessageType>();

  const formik = useFormik<RegisterFormPayload>({
    initialValues: {
      firstName: "",
      otherNames: "",
      longitude: 0,
      latitude: 0,
      email: "",
      phoneNumber: 0,
      rightGroups: [],
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload = parseFormDatav3(values);
        // return;

        setSubmitting(true);
        const loginRes = await apiClient.post<LoginResponse, any>({
          url: API_ROUTES.AUTH.REGISTER,
          data: payload,
        });

        LocalStorageUtil.setItem(LOCAL_STORAGE_SESSION_KEY, loginRes);

        navigate(APP_ROUTES.AUTH.FULL.DASHBOARD);
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

  const rightsGroupsSelect: SystemWideSelectString[] = useMemo(() => {
    if (!rightsGroups || rightsGroups.length <= 0) return [];

    return rightsGroups.map((item) => ({ value: item.id, label: item.name }));
  }, [rightsGroups]);

  const fetchPublicRightGroups = useCallback(async () => {
    try {
      //fetch data
      const listData = await apiClient.get<IdName[]>({
        url: API_ROUTES.AUTH.PUBLIC_RIGHT_GROUPS,
      });

      setRightGroups(listData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
    } catch (err) {}
  }, []);

  useEffect(() => {
    fetchPublicRightGroups();
  }, [fetchPublicRightGroups]);

  return (
    <div
      className="col-12"
      style={{ backgroundColor: "var(--Background, #F5F5F5)" }}
    >
      <div className="row justify-content-center align-items-center px-4">
        <div className="col-12 col-md-5">
          <div className="col-12">
            <p className="h1-bold primary-text mb-0">Create your account.</p>
            <p className=" body-regular primary-text">
              Join the Future of Farming - Easy, Fast and Reliable.
            </p>
          </div>

          <div className="col-12">
            <MessageDisplay messageType={messageType} />
          </div>

          <div className="col-12">
            <FormikProvider value={formik}>
              <Form className="sign-up-form">
                <div className="col-12">
                  <label
                    className="body-regular primary-text mb-0"
                    htmlFor="First-name"
                  >
                    First Name
                  </label>

                  <div className="col-12">
                    <Field
                      required
                      name="firstName"
                      className="form-control body-regular"
                      type="text"
                      id="First-name"
                      placeholder="Kelvin Mutuku"
                    />
                    <div className="text-danger small my-0">
                      <ErrorMessage name="firstName" />
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <label
                    className="body-regular primary-text mb-0"
                    htmlFor="Other-name"
                  >
                    Other Names
                  </label>

                  <div className="col-12">
                    <Field
                      required
                      name="otherNames"
                      className="form-control body-regular"
                      type="text"
                      id="Other-name"
                      placeholder="Kelvin Mutuku"
                    />
                    <div className="text-danger small my-0">
                      <ErrorMessage name="otherNames" />
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <label
                    className="body-regular primary-text mb-0"
                    htmlFor="email"
                  >
                    Email
                  </label>

                  <div className="col-12">
                    <Field
                      required
                      name="email"
                      className="form-control body-regular"
                      type="email"
                      placeholder="example@gmail.com"
                    />
                    <div className="text-danger small my-0">
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <label
                    className="body-regular primary-text mb-0"
                    htmlFor="phone-number"
                  >
                    Phone number
                  </label>

                  <div className="col-12">
                    <Field
                      required
                      name="phoneNumber"
                      className="form-control body-regular"
                      type="telephone"
                      placeholder="+254712345678"
                    />
                    <div className="text-danger small my-0">
                      <ErrorMessage name="phoneNumber" />
                    </div>
                  </div>
                </div>

                <div className="col-12 mb-3">
                  <label
                    className="body-regular primary-text mb-0"
                    htmlFor="user-role"
                  >
                    Role *
                  </label>

                  <div className="col-12">
                    <Select
                      isMulti
                      name="rightGroups"
                      placeholder="I am a .."
                      options={rightsGroupsSelect}
                      value={formik.values.rightGroups}
                      onChange={(option) =>
                        formik.setFieldValue("rightGroups", option)
                      }
                    />
                    <div className="text-danger small my-0">
                      <ErrorMessage name="rightGroups" />
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="auth-accept-button body-bold col-12"
                    disabled={formik.isSubmitting || !formik.isValid}
                  >
                    {!formik.isSubmitting && (
                      <span className="indicator-label text-capitalize">
                        Register
                      </span>
                    )}
                    {formik.isSubmitting && <SpinnerNew />}
                  </button>
                </div>
              </Form>
            </FormikProvider>
          </div>

          <div className="col-12">
            <div className="col-12 text-center">
              <Link
                to={APP_ROUTES.AUTH.FULL.LOGIN}
                className="text-decoration-none body-regular primary-text"
              >
                Already have an account ?
                <span
                  className="ms-1 body-semibold"
                  style={{ color: " var(--Primary, #457900)" }}
                >
                  Login
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

export default SignUp;
