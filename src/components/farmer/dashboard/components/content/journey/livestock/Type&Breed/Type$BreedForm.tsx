import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LuUpload } from "react-icons/lu";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

type FormValues = {
  livestockName: string;
  breed: string;
  purpose: string;
  weight: string;
  sex: string;
  age: string;
  source: string;
  notes: string;
  attachPhoto: File | null;
  longDescription: string;
};

const Type$BreedForm = () => {
  const validationSchema = Yup.object({
    livestockName: Yup.string()
      .max(100, 'Must be 100 characters or less')
      .required('Livestock Name is required'),
    breed: Yup.string()
      .max(50, 'Must be 50 characters or less')
      .required('Breed is required'),
    purpose: Yup.string()
      .max(200, 'Must be 200 characters or less')
      .required('Purpose is required'),
    weight: Yup.number()
      .typeError('Weight must be a number')
      .positive('Weight must be a positive number')
      .required('Weight is required'),
    sex: Yup.string()
      .oneOf(['Male', 'Female'], 'Invalid Sex')
      .required('Sex is required'),
    age: Yup.number()
      .typeError('Age must be a number')
      .positive('Age must be a positive number')
      .integer('Age must be an integer')
      .required('Age is required'),
    source: Yup.string()
      .max(100, 'Must be 100 characters or less')
      .required('Source is required'),
    notes: Yup.string()
      .max(500, 'Must be 500 characters or less'),
    attachPhoto: Yup.mixed()
      .test(
        'fileSize',
        'File too large (max 10MB)',
        (value) => !value || (value && (value as File).size <= 10 * 1024 * 1024) // 10MB
      )
      .test(
        'fileType',
        'Unsupported File Format (PDF, PNG, JPG)',
        (value) =>
          !value || (value && ['application/pdf', 'image/png', 'image/jpeg'].includes((value as File).type))
      ),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      livestockName: '',
      breed: '',
      purpose: '',
      weight: '',
      sex: 'Male', // Default value
      age: '',
      source: '',
      notes: '',
      attachPhoto: null,
      longDescription: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form data', values);
      alert('Form submitted! Check console for data.');
    },
  });

  return (
    <>
      <div
        className="p-4 rounded-4"
        style={{
          background: '#FFF',
        }}
      >
        <h3 className="h3-semibold mb-4" style={{ color: 'var(--Primary-Text, #333)' }}>Type & Breed</h3>
        <form onSubmit={formik.handleSubmit} className="w-100">
          {/* Livestock Name */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="livestockName" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Livestock Name
            </label>
            <div className="col-md-9">
              <input
                id="livestockName"
                name="livestockName"
                type="text"
                placeholder="Enter Livestock Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.livestockName}
                className="form-control bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              />
              {formik.touched.livestockName && formik.errors.livestockName && (
                <div className="text-danger small">{formik.errors.livestockName}</div>
              )}
            </div>
          </div>

          {/* Breed */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="breed" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Breed
            </label>
            <div className="col-md-9">
              <input
                id="breed"
                name="breed"
                type="text"
                placeholder="Enter Breed"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.breed}
                className="form-control bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              />
              {formik.touched.breed && formik.errors.breed && (
                <div className="text-danger small">{formik.errors.breed}</div>
              )}
            </div>
          </div>

          {/* Purpose */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="purpose" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Purpose
            </label>
            <div className="col-md-9">
              <input
                id="purpose"
                name="purpose"
                type="text"
                placeholder="Enter Purpose"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.purpose}
                className="form-control bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              />
              {formik.touched.purpose && formik.errors.purpose && (
                <div className="text-danger small">{formik.errors.purpose}</div>
              )}
            </div>
          </div>

          {/* Weight */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="weight" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Weight
            </label>
            <div className="col-md-9">
              <input
                id="weight"
                name="weight"
                type="text"
                placeholder="Enter Weight in kg"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.weight}
                className="form-control bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              />
              {formik.touched.weight && formik.errors.weight && (
                <div className="text-danger small">{formik.errors.weight}</div>
              )}
            </div>
          </div>

          {/* Sex */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="sex" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Sex
            </label>
            <div className="col-md-9">
              <select
                id="sex"
                name="sex"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sex}
                className="form-select bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {formik.touched.sex && formik.errors.sex && (
                <div className="text-danger small">{formik.errors.sex}</div>
              )}
            </div>
          </div>

          {/* Age */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="age" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Age
            </label>
            <div className="col-md-9">
              <input
                id="age"
                name="age"
                type="text"
                placeholder="Enter Age in months" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.age}
                className="form-control bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              />
              {formik.touched.age && formik.errors.age && (
                <div className="text-danger small">{formik.errors.age}</div>
              )}
            </div>
          </div>

          {/* Source */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="source" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Source
            </label>
            <div className="col-md-9">
              <input
                id="source"
                name="source"
                type="text"
                placeholder="Enter Source"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.source}
                className="form-control bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              />
              {formik.touched.source && formik.errors.source && (
                <div className="text-danger small">{formik.errors.source}</div>
              )}
            </div>
          </div>

          {/* Long Description */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="longDescription" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Long Description
            </label>
            <div className="col-md-9">
              <input
                id="longDescription"
                name="longDescription"
                type="text"
                placeholder="Enter Long Description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.longDescription}
                className="form-control bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              />
              {formik.touched.longDescription && formik.errors.longDescription && (
                <div className="text-danger small">{formik.errors.longDescription}</div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="row mb-3">
            <label htmlFor="notes" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Notes
            </label>
            <div className="col-md-9">
              <textarea
                id="notes"
                name="notes"
                placeholder="Enter Notes"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.notes}
                className="form-control bg-light"
                style={{ borderRadius: '0.5rem' }}
                rows={5}
              />
              {formik.touched.notes && formik.errors.notes && (
                <div className="text-danger small">{formik.errors.notes}</div>
              )}
            </div>
          </div>

          {/* Attach Photo */}
          <div className="row mb-3">
            <label htmlFor="attachPhoto" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Attach Photo
            </label>
            <div className="col-md-9">
              <div
                className="d-flex flex-column align-items-center justify-content-center position-relative p-3"
                style={{
                  border: "2px dashed var(--Border, #ECECEC)",
                  borderRadius: "0.5rem",
                  background: "#f8f9fa",
                  minHeight: '10rem',
                }}
              >
                <input
                  id="attachPhoto"
                  name="attachPhoto"
                  type="file"
                  accept=".pdf, .png, .jpg, .jpeg"
                  className="position-absolute w-100 h-100 opacity-0"
                  style={{ cursor: "pointer", top: 0, left: 0 }}
                  onChange={(event) => {
                    if (event.currentTarget.files && event.currentTarget.files[0]) {
                      formik.setFieldValue('attachPhoto', event.currentTarget.files[0]);
                    }
                  }}
                  onBlur={formik.handleBlur}
                />
                <LuUpload size={23} color="#457900" />
                <p className="body-regular mb-1" style={{ color: "var(--Secondary-Text, #777)" }}>
                  {formik.values.attachPhoto ? formik.values.attachPhoto.name : 'Upload Photos'}
                </p>
                <p className="body-regular text-center" style={{ color: "var(--Secondary-Text, #777)", fontSize: "0.875rem" }}>
                  PDF, PNG, JPG up to 10MB
                </p>
              </div>
              {formik.touched.attachPhoto && formik.errors.attachPhoto && (
                <div className="text-danger small">{formik.errors.attachPhoto}</div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <Button
              variant="outline-warning"
              style={{ padding: '0.625rem 1rem', borderRadius: '0.375rem' }}
              type="button"
              onClick={() => formik.resetForm()}
            >
              Cancel
            </Button>
            <Button
              variant="success"
              style={{ padding: '0.625rem 1rem', borderRadius: '0.375rem', background: 'var(--Primary, #457900)' }}
              type="submit"
              disabled={!formik.isValid || !formik.dirty}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Type$BreedForm;