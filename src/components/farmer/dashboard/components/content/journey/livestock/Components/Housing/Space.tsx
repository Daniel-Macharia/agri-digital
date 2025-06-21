import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import Saved from '../../Shared/Saved';

const Space = () => {
  const [showSaved, setShowSaved] = useState(false);
  const formik = useFormik({
    initialValues: {
      area: '',
      animalCapacity: '',
      density: '',
      notes: '',
    },
    validationSchema: Yup.object({
      area: Yup.string().required('Area is required'),
      animalCapacity: Yup.string().required('Animal Capacity is required'),
      density: Yup.string().required('Density is required'),
      notes: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      setShowSaved(true);
      resetForm();
    },
  });

  return (
    <>
      {showSaved && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.2)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Saved onDone={() => setShowSaved(false)} />
        </div>
      )}
      <div
        className="d-flex flex-column p-4 rounded-4"
        style={{
          background: '#FFF',
        }}
      >
        <h3 className="h3-semibold mb-4" style={{ color: 'var(--Primary-Text, #333)' }}>Space</h3>
        <form onSubmit={formik.handleSubmit} className="w-100">
          {/* Area */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="area" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Area in (m²)
            </label>
            <div className="col-md-9">
              <input
                id="area"
                type="text"
                {...formik.getFieldProps('area')}
                placeholder="15,000m²"
                className="form-control bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem', color: 'var(--Primary-Text, #333)' }}
              />
              {formik.touched.area && formik.errors.area && (
                <div className="text-danger small">{formik.errors.area}</div>
              )}
            </div>
          </div>

          {/* Animal Capacity */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="animalCapacity" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Animal Capacity
            </label>
            <div className="col-md-9">
              <input
                id="animalCapacity"
                type="text"
                {...formik.getFieldProps('animalCapacity')}
                placeholder="15 Cows"
                className="form-control bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem', color: 'var(--Primary-Text, #333)' }}
              />
              {formik.touched.animalCapacity && formik.errors.animalCapacity && (
                <div className="text-danger small">{formik.errors.animalCapacity}</div>
              )}
            </div>
          </div>

          {/* Density */}
          <div className="row mb-3 align-items-center">
            <label htmlFor="density" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Density
            </label>
            <div className="col-md-9">
              <input
                id="density"
                type="text"
                {...formik.getFieldProps('density')}
                placeholder="1 cow per 1000m²"
                className="form-control bg-light"
                style={{ height: '2.5rem', borderRadius: '0.5rem', color: 'var(--Primary-Text, #333)' }}
              />
              {formik.touched.density && formik.errors.density && (
                <div className="text-danger small">{formik.errors.density}</div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="row mb-3 align-items-start">
            <label htmlFor="notes" className="col-md-3 col-form-label body-regular" style={{ color: 'var(--Primary-Text, #333)' }}>
              Notes
            </label>
            <div className="col-md-9">
              <textarea
                id="notes"
                {...formik.getFieldProps('notes')}
                placeholder="Lorem Ipsum"
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

export default Space;