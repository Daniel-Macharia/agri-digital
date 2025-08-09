
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Saved from "../../journey/livestock/Shared/Saved";
import Popup from 'reactjs-popup';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

// Define form values type
interface FormValues {
  voucherType: string;
  amount: string;
  comments: string;
}

// Validation schema
const validationSchema = Yup.object({
  voucherType: Yup.string().required("Type of voucher is required"),
  amount: Yup.string().required("Amount is required"),
  comments: Yup.string(),
});

const initialValues: FormValues = {
  voucherType: "",
  amount: "",
  comments: "",
};

const CreatingVoucher = () => {
  const navigate = useNavigate();
  const [showSaved, setShowSaved] = useState(false);

  return (
    <>
      <Popup
        open={showSaved}
        modal
        closeOnDocumentClick={false}
        onClose={() => setShowSaved(false)}
        contentStyle={{ borderRadius: '1rem', padding: 0, maxWidth: 400 }}
      >
        <div className="d-flex flex-column align-items-center justify-content-center p-4">
          <button
            type="button"
            className="btn-close align-self-end mb-2"
            aria-label="Close"
            onClick={() => setShowSaved(false)}
          ></button>
          <Saved onDone={() => navigate("/farmer/wallet")} />
        </div>
      </Popup>
      <div className="bg-background" style={{ minHeight: "100vh", padding: 24 }}>
        {/* Back to Wallets */}
        <div className="mb-3">
          <button
            className="btn p-0 d-flex align-items-center"
            style={{ fontSize: 20, background: "none", border: "none" }}
            onClick={() => navigate("/farmer/wallet")}
          >
            <FaArrowLeft />
            <span className="ms-2 small-medium">Back to Wallets</span>
          </button>
        </div>
        <div className="w-100 rounded-4 bg-white border mt-3 p-4">
          <div className="h3-semibold mb-4">Create a Voucher</div>
          <Formik<FormValues>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(_values, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
              setTimeout(() => {
                setShowSaved(true);
                setSubmitting(false);
                resetForm();
              }, 400);
            }}
          >
            {({ isSubmitting, resetForm }) => (
              <Form>
                {/* Voucher ID */}
                <div className="row mb-4 align-items-center">
                  <label className="col-md-2 col-form-label d-flex align-self-stretch fw-semibold">
                    Voucher ID
                  </label>
                  <div className="col-md-10">
                    <span className="fw-semibold">456789356</span>
                  </div>
                </div>
                {/* Type of Voucher */}
                <div className="row mb-4 align-items-center">
                  <label
                    htmlFor="voucherType"
                    className="col-md-2 col-form-label d-flex align-self-stretch"
                  >
                    Type of Voucher
                  </label>
                  <div className="col-md-10">
                    <Field
                      as="select"
                      id="voucherType"
                      name="voucherType"
                      className="form-control bg-light border rounded w-100"
                    >
                      <option value="" disabled>
                        Type
                      </option>
                      <option value="Open">Open</option>
                      <option value="Closed">Closed</option>
                    </Field>
                    <ErrorMessage
                      name="voucherType"
                      component="div"
                      className="text-danger small text-start"
                    />
                  </div>
                </div>
                {/* Amount */}
                <div className="row mb-4 align-items-center">
                  <label
                    htmlFor="amount"
                    className="col-md-2 col-form-label d-flex align-self-stretch"
                  >
                    Amount
                  </label>
                  <div className="col-md-7 d-flex">
                    <Field
                      type="text"
                      id="amount"
                      name="amount"
                      className="form-control bg-light border rounded w-100"
                      placeholder="KES 1,000,000"
                    />
                  </div>
                  <div className="col-md-3">
                    <button
                      type="button"
                      className="btn btn-warning w-100 fw-semibold rounded"
                      style={{ color: "#fff" }}
                    >
                      TOP UP
                    </button>
                  </div>
                  <div className="col-md-7 offset-md-2">
                    <ErrorMessage
                      name="amount"
                      component="div"
                      className="text-danger small text-start"
                    />
                  </div>
                </div>
                {/* Comments */}
                <div className="row mb-5 align-items-center">
                  <label
                    htmlFor="comments"
                    className="col-md-2 col-form-label d-flex align-self-stretch"
                  >
                    Comments
                  </label>
                  <div className="col-md-10">
                    <Field
                      type="text"
                      id="comments"
                      name="comments"
                      className="form-control bg-light border rounded w-100"
                      placeholder="Lorem Ipsum"
                    />
                    <ErrorMessage
                      name="comments"
                      component="div"
                      className="text-danger small text-start"
                    />
                  </div>
                </div>
                {/* Buttons */}
                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-warning fw-semibold rounded px-4"
                    onClick={() => resetForm()}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success fw-semibold rounded px-4"
                    disabled={isSubmitting}
                  >
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default CreatingVoucher;