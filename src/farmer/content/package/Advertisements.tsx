import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button, Row, Col } from 'react-bootstrap';



interface FormValues {
  advertisementTitle: string;
  advertType: string;
  targetAudience: string;
  mainContent: string;
  photo: File | null;
  video: File | null;
  documents: File | null;
  visibility: string[];
  startDate: string;
  duration: string;
  callToAction: string;
}

const validationSchema = Yup.object({
  advertisementTitle: Yup.string().required('Title is required'),
  advertType: Yup.string().required('Advert type is required'),
  targetAudience: Yup.string().required('Target audience is required'),
  mainContent: Yup.string().required('Main content is required'),
  photo: Yup.mixed().nullable(),
  video: Yup.mixed().nullable(),
  documents: Yup.mixed().nullable(),
  visibility: Yup.array().min(1, 'Select at least one visibility option'),
  startDate: Yup.date().required('Start date is required'),
  duration: Yup.number().required('Duration is required').positive('Must be positive').integer(),
  callToAction: Yup.string().required('Call to action is required'),
});

const initialValues: FormValues = {
  advertisementTitle: '',
  advertType: '',
  targetAudience: '',
  mainContent: '',
  photo: null,
  video: null,
  documents: null,
  visibility: [],
  startDate: '',
  duration: '',
  callToAction: '',
};

const Advertisements: React.FC = () => {
  const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div className="w-100 rounded-4 bg-white border mt-3 p-4">
      <h5 className="mb-4 text-start" style={{ color: '#333' }}>
        Add an Advertisement
      </h5>
      <Formik<FormValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            {/* Advertisement Title */}
            <div className="row mb-3 align-items-center">
              <label htmlFor="advertisementTitle" className="col-md-2 col-form-label">Advertisement Title</label>
              <div className="col-md-10">
                <Field type="text" id="advertisementTitle" name="advertisementTitle" className="form-control bg-light" placeholder="Lorem Ipsum" />
                <ErrorMessage name="advertisementTitle" component="div" className="text-danger small text-start" />
              </div>
            </div>

            {/* Advert Type & Target Audience */}
            <div className="row mb-3 align-items-center">
              <label htmlFor="advertType" className="col-md-2 col-form-label">Advert Type</label>
              <div className="col-md-4">
                <Field as="select" id="advertType" name="advertType" className="form-select bg-light">
                  <option value="">Select</option>
                  <option value="type1">Type 1</option>
                </Field>
                <ErrorMessage name="advertType" component="div" className="text-danger small text-start" />
              </div>
              <label htmlFor="targetAudience" className="col-md-2 col-form-label text-md-end">Target Audience</label>
              <div className="col-md-4">
                <Field as="select" id="targetAudience" name="targetAudience" className="form-select bg-light">
                  <option value="">Select</option>
                  <option value="audience1">Audience 1</option>
                </Field>
                <ErrorMessage name="targetAudience" component="div" className="text-danger small text-start" />
              </div>
            </div>

            {/* Main Content */}
            <div className="row mb-3 align-items-start">
              <label htmlFor="mainContent" className="col-md-2 col-form-label">Main Content</label>
              <div className="col-md-10">
                <div className="border rounded-top p-2 bg-light"><strong>B</strong> / <em>U</em></div>
                <Field as="textarea" id="mainContent" name="mainContent" rows={5} className="form-control bg-light" />
                <ErrorMessage name="mainContent" component="div" className="text-danger small text-start" />
              </div>
            </div>

            {/* File Uploads */}
            {[ { name: 'photo', title: 'Upload Photo', accept: 'image/*' }, { name: 'video', title: 'Upload Video', accept: 'video/*' }, { name: 'documents', title: 'Attach Documents', accept: '.pdf,.doc,.docx' } ].map(f => (
                <div className="row mb-3 align-items-center" key={f.name}>
                    <label htmlFor={f.name} className="col-md-2 col-form-label">{f.title}</label>
                    <div className="col-md-10">
                        <div className="w-100 text-center p-4 border rounded" style={{ borderStyle: 'dashed', backgroundColor: '#f8f9fa' }}>
                            <input id={f.name} name={f.name} type="file" className="d-none" onChange={(event) => setFieldValue(f.name, event.currentTarget.files ? event.currentTarget.files[0] : null)} accept={f.accept} />
                            <label htmlFor={f.name} className="w-100" style={{cursor: 'pointer'}}>
                                <p className="body-regular mb-1" style={{ color: "#457900", fontWeight: 500, fontSize: "1rem" }}>{f.title}</p>
                                {/* @ts-ignore */}
                                {values[f.name] ? <p>{values[f.name].name}</p> : <p className="text-muted small">Click to upload</p>}
                            </label>
                        </div>
                        <ErrorMessage name={f.name} component="div" className="text-danger small text-start" />
                    </div>
                </div>
            ))}

            {/* Preferred Visibility */}
            <div className="row mb-3 align-items-start">
              <label className="col-md-2 col-form-label">Preferred Visibility</label>
              <div className="col-md-10">
                <div role="group" aria-labelledby="checkbox-group">
                  <label className="form-check">
                    <Field type="checkbox" name="visibility" value="platform" className="form-check-input" />
                    Entire Platform
                  </label>
                  <label className="form-check">
                    <Field type="checkbox" name="visibility" value="counties" className="form-check-input" />
                    Specific Counties
                  </label>
                  <label className="form-check">
                    <Field type="checkbox" name="visibility" value="groups" className="form-check-input" />
                    Tagged Groups
                  </label>
                </div>
                <ErrorMessage name="visibility" component="div" className="text-danger small text-start" />
              </div>
            </div>

            {/* Schedule & Budget */}
            <div className="row mb-3 align-items-center">
                <label className="col-md-2 col-form-label">Schedule & Budget</label>
                <div className="col-md-10">
                    <Row>
                        <Col md={6}>
                            <label htmlFor="startDate">Preferred Start Date</label>
                            <Field type="date" id="startDate" name="startDate" className="form-control bg-light" />
                            <ErrorMessage name="startDate" component="div" className="text-danger small text-start" />
                        </Col>
                        <Col md={6}>
                            <label htmlFor="duration">Duration days</label>
                            <Field type="text" id="duration" name="duration" className="form-control bg-light" />
                            <ErrorMessage name="duration" component="div" className="text-danger small text-start" />
                        </Col>
                    </Row>
                </div>
            </div>

            {/* Call to Action */}
            <div className="row mb-3 align-items-center">
              <label htmlFor="callToAction" className="col-md-2 col-form-label">Call to Action</label>
              <div className="col-md-10">
                <Field type="text" id="callToAction" name="callToAction" className="form-control bg-light" placeholder="Purchase Now" />
                <ErrorMessage name="callToAction" component="div" className="text-danger small text-start" />
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-end mt-4">
              <Button type="button" variant="outline-warning" className="me-3">Cancel</Button>
              <Button type="submit" style={{ backgroundColor: '#457900', color: 'white', border: 'none' }} disabled={isSubmitting}>
                Submit for Review
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Advertisements;