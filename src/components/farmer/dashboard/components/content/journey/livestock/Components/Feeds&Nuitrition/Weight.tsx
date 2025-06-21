import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import 'bootstrap/dist/css/bootstrap.min.css';

interface FormValues {
  identification: string;
  feedType: string;
  previousWeight: string;
  currentWeight: string;
  notes: string;
}

const validationSchema = Yup.object({
  identification: Yup.string().required('Identification is required'),
  feedType: Yup.string().required('Feed Type is required'),
  previousWeight: Yup.string()
    .required('Previous Weight is required')
    .matches(/^\d+kg$/, 'Weight must be in kg format (e.g., 32kg)'),
  currentWeight: Yup.string()
    .required('Current Weight is required')
    .matches(/^\d+kg$/, 'Weight must be in kg format (e.g., 32kg)'),
  notes: Yup.string(),
});

const initialValues: FormValues = {
  identification: '',
  feedType: '',
  previousWeight: '',
  currentWeight: '',
  notes: '',
};

const identificationOptions = [
  { value: '', label: 'Select the Livestock identification' },
  { value: '1', label: 'Livestock 1' },
  { value: '2', label: 'Livestock 2' },
];

const FeedingWeight: React.FC = () => {
  return (
    <div className="container-fluid p-3 p-md-4 p-lg-5">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title mb-4">Weight</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2));
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="row mb-3">
                  <label htmlFor="identification" className="col-md-3 col-form-label">Livestock Identification</label>
                  <div className="col-md-9">
                    <Field
                      as="select"
                      name="identification"
                      id="identification"
                      className="form-select bg-light"
                    >
                      {identificationOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="identification" component="div" className="text-danger small" />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="feedType" className="col-md-3 col-form-label">Feed Type</label>
                  <div className="col-md-9">
                    <Field
                      name="feedType"
                      type="text"
                      id="feedType"
                      className="form-control bg-light"
                      placeholder="Hay, Grain, Silage, etc."
                    />
                    <ErrorMessage name="feedType" component="div" className="text-danger small" />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="previousWeight" className="col-md-3 col-form-label">Previous Weight</label>
                  <div className="col-md-9">
                    <Field
                      name="previousWeight"
                      type="text"
                      id="previousWeight"
                      className="form-control bg-light"
                      placeholder="32kg"
                    />
                    <ErrorMessage name="previousWeight" component="div" className="text-danger small" />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="currentWeight" className="col-md-3 col-form-label">Current Weight</label>
                  <div className="col-md-9">
                    <Field
                      name="currentWeight"
                      type="text"
                      id="currentWeight"
                      className="form-control bg-light"
                      placeholder="32kg"
                    />
                    <ErrorMessage name="currentWeight" component="div" className="text-danger small" />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="notes" className="col-md-3 col-form-label">Notes</label>
                  <div className="col-md-9">
                    <Field
                      as="textarea"
                      name="notes"
                      id="notes"
                      rows={5}
                      className="form-control bg-light"
                      placeholder="Lorem Ipsum"
                    />
                    <ErrorMessage name="notes" component="div" className="text-danger small" />
                  </div>
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <button type="button" className="btn btn-outline-warning">Cancel</button>
                  <button type="submit" className="btn btn-success" disabled={isSubmitting}>Save</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default FeedingWeight;