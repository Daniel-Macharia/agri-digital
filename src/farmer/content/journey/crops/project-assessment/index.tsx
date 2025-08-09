/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  FormikProvider,
  useFormik,
} from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { ApiClient } from "../../../../../lib/api/ApiClient";
import { useCropJourney } from "../../../../../lib/context/CropJourneyContext";
import {
  CropJourneyInitFormPayload,
  CropJourneySummaryPayload,
} from "../../../../../lib/model/CropJourneyModel";
import {
  SystemWideSelectString,
  TOASTIFY_AUTO_CLOSE_TIMEOUT,
} from "../../../../../lib/model/Model";
import { API_ROUTES } from "../../../../../lib/Routes";
import {
  customSelectStyles,
  extractErrorMessage,
  parseFormDatav3,
} from "../../../../../lib/utils/Helpers";
import { JOURNEY_ROUTES } from "../../journey-routes";
import ExpenseErrorMessageArray from "../common/ExpenseErrorMessageArray";
import { CROP_ROUTES } from "../crop-routes";
const apiClient = new ApiClient();

const validationSchema = Yup.object()
  .shape({
    name: Yup.string().trim().required().label("Project Name"),
    revenueEstimate: Yup.number().min(0).required().label("Expected Revenue"),
    expenseEstimate: Yup.number().min(0).required().label("Expected Expense"),
    cropExpenseEstimates: Yup.array()
      .of(
        Yup.object().shape({
          expense: Yup.object()
            .shape({
              label: Yup.string().required(),
              value: Yup.string().required(),
            })
            .required()
            .label("Expense"),
          amount: Yup.number().min(0).required().label("Amount"),
          description: Yup.string().optional().trim().label("Description"),
        })
      )
      .min(1, "At least one expense is required"),
  })
  .test(
    "amounts-match-expenseEstimate",
    "Total of cropExpenseEstimates.amount must equal Expected Expense",
    function (values) {
      const { expenseEstimate, cropExpenseEstimates } = values || {};
      if (!Array.isArray(cropExpenseEstimates)) return true;

      const total = cropExpenseEstimates.reduce(
        (sum, item) => sum + (Number(item.amount) || 0),
        0
      );
      return total === expenseEstimate;
    }
  );

const ProjectAssessment: React.FC = () => {
  const { transactionId } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const projectName = searchParams.get("name");
  const navigate = useNavigate();
  const { setTransactionId, cropsExpenseList, setCropJourneySummary } =
    useCropJourney();

  const formik = useFormik<CropJourneyInitFormPayload>({
    initialValues: {
      name: projectName || "",
      revenueEstimate: 0,
      expenseEstimate: 0,
      location: {
        latitude: 0,
        longitude: 0,
      },
      cropExpenseEstimates: [{ expense: null, amount: 0, description: "" }],
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload = parseFormDatav3(values);
        setSubmitting(true);

        const cropJourneySummary = await apiClient.post<
          CropJourneySummaryPayload,
          any
        >({
          url: API_ROUTES.CROP_JOURNEY.INIT,
          data: payload,
        });

        setCropJourneySummary(cropJourneySummary);

        navigate(
          `..${JOURNEY_ROUTES.CROPS}${CROP_ROUTES.CROP_SOIL_TESTING}`.replace(
            ":transactionId",
            cropJourneySummary.transactionId
          )
        );
      } catch (err) {
        const errorMessage = extractErrorMessage(err);
        toast.error(errorMessage || "Expense & revenue estimate failed", {
          autoClose: TOASTIFY_AUTO_CLOSE_TIMEOUT,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const expensesList: SystemWideSelectString[] = useMemo(() => {
    if (!cropsExpenseList || cropsExpenseList.length === 0) return [];
    return cropsExpenseList.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [cropsExpenseList]);

  useEffect(() => {
    if (transactionId) {
      setTransactionId(transactionId);
    }
  }, [transactionId]);

  return (
    <>
      <div className="crops-container bg-white col-12 p-4 ">
        <FormikProvider value={formik}>
          <Form className="col-12 ">
            <div className="col-12">
              <p className="h3-semibold primary-text col-12 crops-start-aligned-text">
                Project Assessment
              </p>
              <p className="body-regular col-12 crops-start-aligned-text secondary-text">
                Let's assess the financial aspects of your project.
              </p>
            </div>

            <div className="col-12 card">
              <div className="row ">
                <div className="col-12 col-md-4">
                  <label className="col-12 body-regular primary-text crops-start-aligned-text">
                    Expected revenue
                  </label>
                </div>
                <div className="col-12">
                  <Field
                    className="form-control body-regular my-0 col-12"
                    type="text"
                    name="revenueEstimate"
                    placeholder="ksh 250,000.00"
                  />
                  <div className="text-danger small crops-start-aligned-text col-sm-12">
                    <ErrorMessage name="revenueEstimate" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 card mt-3">
              <div className="col-12">
                <div className="row ">
                  <div className="col-12">
                    <label className="crops-start-aligned-text primary-text body-regular col-12">
                      Total Expected expenses
                    </label>
                  </div>
                  <div className="col-12 ">
                    <Field
                      type="text"
                      name="expenseEstimate"
                      className="form-control body-regular my-0 "
                      placeholder="ksh 250,000.00"
                    />
                    <div className="text-danger small col-sm-12 crops-start-aligned-text">
                      <ErrorMessage name="expenseEstimate" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 mt-2">
                <div className="row px-1 ">
                  <label className="col-12 mx-0 mb-1 mt-3 body-regular primary-text crops-start-aligned-text">
                    Expense breakdown
                  </label>
                </div>

                <div className="col-md-12">
                  <FieldArray name="cropExpenseEstimates">
                    {({ push, remove }) => (
                      <div className="row">
                        <div className="col-md-12">
                          {formik.values.cropExpenseEstimates.map(
                            (item, index) => (
                              <div key={index} className="row mb-2">
                                <div className="col-12 col-md-3 my-1">
                                  <div className="form-group mt-3" >
                                    <label>Expense</label>
                                    <Select
                                      {...formik.getFieldProps(
                                        `cropExpenseEstimates[${index}].expense`
                                      )}
                                      placeholder="Expense"
                                      options={expensesList}
                                      value={item.expense}
                                      onChange={(option) =>
                                        formik.setFieldValue(
                                          `cropExpenseEstimates[${index}].expense`,
                                          option
                                        )
                                      }
                                      styles={customSelectStyles}
                                      className="text-capitalize p-0 py-2"
                                    />
                                    <div className="fv-plugins-message-container text-danger">
                                      <ExpenseErrorMessageArray
                                        fieldName="expense"
                                        index={index}
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="col-12 col-md-3 my-1">
                                  <div className="form-group mt-3">
                                    <label>Amount</label>
                                    <input
                                      {...formik.getFieldProps(
                                        `cropExpenseEstimates[${index}].amount`
                                      )}
                                      value={item.amount || 0}
                                      className=" form-control body-regular my-0"
                                      autoComplete="off"
                                      type="text"
                                    />
                                    <div className="fv-plugins-message-container text-danger">
                                      <ExpenseErrorMessageArray
                                        fieldName="amount"
                                        index={index}
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="col-12 col-md-4 my-1">
                                  <div className="form-group mt-3">
                                    <label>Description</label>
                                    <input
                                      {...formik.getFieldProps(
                                        `cropExpenseEstimates[${index}].description`
                                      )}
                                      value={item.description || ""}
                                      className=" form-control body-regular my-0"
                                      autoComplete="off"
                                      type="text"
                                    />
                                  </div>
                                </div>

                                <div className="col-12 col-md-2 my-1">
                                  <div className="form-group mt-3">
                                    <label>&nbsp;</label>
                                    <br />
                                    <Link
                                      to="#"
                                      onClick={() => remove(index)}
                                      className="text-danger"
                                    >
                                      Remove
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                        <div className="col-md-12 mt-3">
                          <button
                            type="button"
                            className="btn btn-sm btn-info"
                            onClick={() => push({})}
                          >
                            Add Expense
                          </button>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </div>
                <div className="col-md-12 mt-3">
                  {formik.errors &&
                    typeof formik.errors.cropExpenseEstimates === "string" && (
                      <div className="fv-plugins-message-container text-danger fw-bold">
                        <ErrorMessage name="cropExpenseEstimates" />
                      </div>
                    )}
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="row px-2">
                <div className="col-12 col-md-6 mt-2 ">
                  <div className="row justify-content-start"></div>
                </div>
                <div className="col-12 col-md-6 mt-2">
                  <div className="row justify-content-end ">
                    <button
                      type="submit"
                      name="start"
                      className="col-12 col-md-8 mx-0 crops-accept-button"
                    >
                      Start Journey
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </>
  );
};

export default ProjectAssessment;
