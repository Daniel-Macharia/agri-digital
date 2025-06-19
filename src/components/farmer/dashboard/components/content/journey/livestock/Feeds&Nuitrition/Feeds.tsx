import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LuUpload } from "react-icons/lu";
import { Button } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


// Define the form values type
type FormValues = {
  feedName: string;
  feedType: string;
  feedVariety: string;
  nutritionValue: string;
  purchaseDate: Date | null;
  quantity: string;
  pricePerKg: string;
  supplier: string;
  notes: string;
  uploadPhoto: File | null;
};

const FeedsForm = () => {
  const validationSchema = Yup.object({
    feedName: Yup.string().max(100, 'Must be 100 characters or less').required('Feed Name is required'),
    feedType: Yup.string().max(100, 'Must be 100 characters or less').required('Feed Type is required'),
    feedVariety: Yup.string().max(100, 'Must be 100 characters or less').required('Feed Variety is required'),
    nutritionValue: Yup.string().max(200, 'Must be 200 characters or less').required('Nutrition Value is required'),
    purchaseDate: Yup.date().required('Purchase Date is required').nullable(),
    quantity: Yup.number().typeError('Quantity must be a number').positive('Quantity must be positive').required('Quantity is required'),
    pricePerKg: Yup.number().typeError('Price/Kg must be a number').positive('Price/Kg must be positive').required('Price/Kg is required'),
    supplier: Yup.string().max(100, 'Must be 100 characters or less').required('Supplier is required'),
    notes: Yup.string().max(500, 'Must be 500 characters or less'),
    uploadPhoto: Yup.mixed()
      .test('fileSize', 'File too large (max 10MB)', (value) => !value || (value && (value as File).size <= 10 * 1024 * 1024))
      .test('fileType', 'Unsupported File Format (PDF, PNG, JPG)', (value) => !value || (value && ['application/pdf', 'image/png', 'image/jpeg'].includes((value as File).type))),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      feedName: '',
      feedType: '',
      feedVariety: '',
      nutritionValue: '',
      purchaseDate: null,
      quantity: '',
      pricePerKg: '',
      supplier: '',
      notes: '',
      uploadPhoto: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form data', values);
      alert('Form submitted! Check console for data.');
    },
  });

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <Button
          variant="success"
          style={{ background: '#457900', borderRadius: '0.375rem', padding: '0.5rem 1.5rem' }}
          type="button"
        >
          Request for Feeds
        </Button>
      </div>
      <div className="p-4 rounded-4" style={{ background: '#FFF' }}>
        <h3 className="h3-semibold mb-4" style={{ color: 'var(--Primary-Text, #333)' }}>Feeds</h3>
        <form onSubmit={formik.handleSubmit} className="w-100">
          {/* Feed Name */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="feedName" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Feed Name
            </label>
            <div className="col-md-9">
              <input
                id="feedName"
                name="feedName"
                type="text"
                placeholder="Lorem Ipsum"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.feedName}
                className="form-control bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              />
              {formik.touched.feedName && formik.errors.feedName && (
                <div className="text-danger small">{formik.errors.feedName}</div>
              )}
            </div>
          </div>

          {/* Feed Type */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="feedType" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Feed Type
            </label>
            <div className="col-md-9">
              <input
                id="feedType"
                name="feedType"
                type="text"
                placeholder="Lorem Ipsum"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.feedType}
                className="form-control bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              />
              {formik.touched.feedType && formik.errors.feedType && (
                <div className="text-danger small">{formik.errors.feedType}</div>
              )}
            </div>
          </div>

          {/* Feed Variety */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="feedVariety" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Feed Variety
            </label>
            <div className="col-md-9">
              <input
                id="feedVariety"
                name="feedVariety"
                type="text"
                placeholder="Lorem Ipsum"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.feedVariety}
                className="form-control bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              />
              {formik.touched.feedVariety && formik.errors.feedVariety && (
                <div className="text-danger small">{formik.errors.feedVariety}</div>
              )}
            </div>
          </div>

          {/* Nutrition Value */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="nutritionValue" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Nutrition Value
            </label>
            <div className="col-md-9">
              <input
                id="nutritionValue"
                name="nutritionValue"
                type="text"
                placeholder="Lorem Ipsum"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nutritionValue}
                className="form-control bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              />
              {formik.touched.nutritionValue && formik.errors.nutritionValue && (
                <div className="text-danger small">{formik.errors.nutritionValue}</div>
              )}
            </div>
          </div>

          {/* Purchase Date */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="purchaseDate" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Purchase Date
            </label>
            <div className="col-md-9">
              <DatePicker
                id="purchaseDate"
                name="purchaseDate"
                selected={formik.values.purchaseDate}
                onChange={(date) => formik.setFieldValue('purchaseDate', date)}
                onBlur={formik.handleBlur}
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YYYY"
                className="form-control bg-light"
                wrapperClassName="w-100"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              />
              {formik.touched.purchaseDate && formik.errors.purchaseDate && (
                <div className="text-danger small">{formik.errors.purchaseDate as string}</div>
              )}
            </div>
          </div>

          {/* Quantity of Feed */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="quantity" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Quantity of Feed
            </label>
            <div className="col-md-9">
              <input
                id="quantity"
                name="quantity"
                type="text"
                placeholder="Lorem Ipsum"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.quantity}
                className="form-control bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              />
              {formik.touched.quantity && formik.errors.quantity && (
                <div className="text-danger small">{formik.errors.quantity}</div>
              )}
            </div>
          </div>

          {/* Price/Kg */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="pricePerKg" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Price/Kg
            </label>
            <div className="col-md-9">
              <input
                id="pricePerKg"
                name="pricePerKg"
                type="text"
                placeholder="Lorem Ipsum"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pricePerKg}
                className="form-control bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              />
              {formik.touched.pricePerKg && formik.errors.pricePerKg && (
                <div className="text-danger small">{formik.errors.pricePerKg}</div>
              )}
            </div>
          </div>

          {/* Supplier */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="supplier" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Supplier
            </label>
            <div className="col-md-9">
              <input
                id="supplier"
                name="supplier"
                type="text"
                placeholder="Lorem Ipsum"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.supplier}
                className="form-control bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem' }}
              />
              {formik.touched.supplier && formik.errors.supplier && (
                <div className="text-danger small">{formik.errors.supplier}</div>
              )}
            </div>
          </div>

          {/* Upload Photo */}
          <div className="row mb-3">
            <label htmlFor="uploadPhoto" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Upload Photo
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
                  id="uploadPhoto"
                  name="uploadPhoto"
                  type="file"
                  accept=".pdf, .png, .jpg, .jpeg"
                  className="position-absolute w-100 h-100 opacity-0"
                  style={{ cursor: "pointer", top: 0, left: 0 }}
                  onChange={(event) => {
                    if (event.currentTarget.files && event.currentTarget.files[0]) {
                      formik.setFieldValue('uploadPhoto', event.currentTarget.files[0]);
                    }
                  }}
                  onBlur={formik.handleBlur}
                />
                <LuUpload size={23} color="#457900" />
                <p className="body-regular mb-1" style={{ color: "var(--Secondary-Text, #777)" }}>
                  {formik.values.uploadPhoto ? formik.values.uploadPhoto.name : 'Upload Photos'}
                </p>
                <p className="body-regular text-center" style={{ color: "var(--Secondary-Text, #777)", fontSize: "0.875rem" }}>
                  PDF, PNG, JPG up to 10MB
                </p>
              </div>
              {formik.touched.uploadPhoto && formik.errors.uploadPhoto && (
                <div className="text-danger small">{formik.errors.uploadPhoto}</div>
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
                placeholder="Lorem Ipsum"
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

export default FeedsForm;
