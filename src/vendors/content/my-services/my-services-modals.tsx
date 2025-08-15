import { Modal } from "react-bootstrap";
import { VendorMyServicesModalProps } from "./my-services";
import { ServiceItemProps } from "./my-services-models";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ServiceStatus, VendorCurrency } from "./my-services-enums";

import * as Yup from "yup";
import { toast } from "react-toastify";
import { useRef, useState } from "react";


const addServiceInitialValues: ServiceItemProps = {
    serviceName: "",
    serviceDuration: 0,
    serviceCost: 0,
    serviceDescription: "",
    serviceImageUrl: "",
    serviceStatus: ServiceStatus.AVAILABLE,
    currency: ""
};

const addServiceValidationSchema = Yup.object({
    serviceName: Yup.string().required("service name is required"),
    serviceDuration: Yup.number().required("service name is required").typeError("duration can only be a number"),
    serviceCost: Yup.number().required("service cost is required").typeError("service cost can only be a number"),
    serviceDescription: Yup.string().required("describe the service"),
    serviceImageUrl: Yup.string().required("select an image"),
    serviceStatus: Yup.string().notRequired(),//.required("status is required"),
    currency: Yup.string().required("select a currency")
});

const VendorMyServicesAddServiceModal: React.FC<VendorMyServicesModalProps> = (data: VendorMyServicesModalProps) => {

    const uploadImageRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string>();

    const handleAddService = ( data: ServiceItemProps) => {
        const dataString:string = `Name: ${data.serviceName}\n
        Cost: ${data.currency} ${data.serviceCost}\n
        Description: ${data.serviceDescription}\n
        Duration: ${data.serviceDuration}\n
        Image: ${data.serviceImageUrl}\n
        Status: ${data.serviceStatus}`;
        toast.info(dataString);
    };
    return (<>
    <Modal
    show={data.show}
    onHide={() => data.setShow(false)}
    >
        <Formik
        initialValues={addServiceInitialValues}
        validationSchema={addServiceValidationSchema}
        onSubmit={handleAddService}
        >
            {({setFieldValue}) => (<Form>
                    <Modal.Header closeButton
                    className="border-0 m-0 pb-0">
                        <Modal.Title className="m-0 p-0">
                            <p className="m-0 p-0 h3-bold primary-text">
                                Add Service
                            </p>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="col-12 form-group m-0 p-0">
                            <label htmlFor="serviceName" className="col-12 m-0 p-0 body-regular primary-text" >
                                Name
                            </label>

                            <div className="m-0 p-0">
                                <Field
                                name="serviceName"
                                className="form-control body-regular m-0"
                                placeholder="service name ..."
                                />
                                <div className="text-danger small m-0">
                                    <ErrorMessage name="serviceName"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 form-group mt-3 p-0">
                            <label className="col-12 m-0 p-0 body-regular primary-text" >
                                Price
                            </label>

                            <div className="d-flex m-0 p-0">
                                <div className="col-3 col-md-2">
                                    <select className="m-0 text-start form-control body-regular secondary-text"
                                    name="currency"
                                    onChange={(event) => {
                                        const val = event.target?.value;
                                        console.log(`selected: ${val}`);
                                        setFieldValue( "currency", val);
                                    }}
                                    >
                                        <option value={VendorCurrency.KES}>
                                            {VendorCurrency.KES}
                                        </option>
                                        <option value={VendorCurrency.UGSH}>
                                            {VendorCurrency.UGSH}
                                        </option>
                                        <option value={VendorCurrency.TZSH}>
                                            {VendorCurrency.TZSH}
                                        </option>
                                    </select>
                                    <div className="text-danger small m-0">
                                        <ErrorMessage name="currency"/>
                                    </div>
                                </div>

                                <div className="m-0 p-0 col-9 col-md-10">
                                    <Field
                                    className="form-control body-regular m-0"
                                    name="serviceCost"
                                    placeholder="service cost"
                                    />
                                    <div className="text-danger small m-0">
                                        <ErrorMessage name="serviceCost"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 form-group mt-3 p-0">
                            <label htmlFor="serviceDuration" className="col-12 m-0 p-0 body-regular primary-text" >
                                Duration
                            </label>

                            <div className="m-0 p-0">
                                <Field
                                name="serviceDuration"
                                className="form-control body-regular m-0"
                                placeholder="service duration ..."
                                />
                                <div className="text-danger small m-0">
                                    <ErrorMessage name="serviceDuration"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 form-group mt-3 p-0">
                            <label htmlFor="serviceDescription" className="col-12 m-0 p-0 body-regular primary-text" >
                                Description
                            </label>

                            <div className="m-0 p-0">
                                <Field
                                name="serviceDescription"
                                className="form-control body-regular m-0"
                                placeholder="service description ..."
                                />
                                <div className="text-danger small m-0">
                                    <ErrorMessage name="serviceDescription"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 form-group mt-3 p-0">
                            <label htmlFor="serviceImageUrl" className="col-12 m-0 p-0 body-regular primary-text" >
                                Upload Product
                            </label>

                            <div className="m-0 p-3 vendor-item-container"
                            onClick={() => {
                                uploadImageRef.current?.click();
                            }}
                            style={{borderStyle: "dashed", borderWidth: "1px", borderColor: "#777777"}}
                            >
                                <input
                                ref={uploadImageRef}
                                type="file"
                                accept=".pdf, .png, .jpg, application.pdf, image/png, image/jpeg"
                                name="serviceImageUrl"
                                className="d-none"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    const file = event.target.files?.[0];
                                    if( file )
                                    {
                                        setFieldValue("serviceImageUrl", file);
                                        setPreviewUrl(URL.createObjectURL(file));
                                    }

                                    toast.info(`selected: ${file}`);
                                }}
                                />

                                <div className="col-12 m-0 p-0 align-content-center">
                                    <div className="d-flex justify-content-center">
                                        {(!previewUrl) &&     <img
                                            src="/assets/images/vendor/my-services/upload_icon.svg"
                                            className="w-20"
                                            />
                                        }

                                        {(previewUrl) &&     <img
                                            src={previewUrl}
                                            className="w-100"
                                            />
                                        }
                                    </div>

                                    <p className="text-center body-regular secondary-text m-0">
                                        Upload Photos
                                        <br/>
                                        <span className="small-regular secondary-text m-0">
                                        PDF, PNG, JPG upto 10MB
                                        </span>
                                    </p>
                                </div>

                                <div className="text-danger text-center small m-0">
                                    <ErrorMessage name="serviceImageUrl"/>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer 
                    className="m-0 pt-0 border-0 d-flex justify-content-between">
                        <button
                        type="button"
                        className="col-4 m-0 p-2 vendor-other-button">
                            Cancel
                        </button>

                        <button
                        type="submit"
                        className="col-4 m-0 p-2 vendor-accept-button">
                            Save Product
                        </button>
                    </Modal.Footer>
                </Form>)
            }
        </Formik>
    </Modal>
    </>);
};

export default VendorMyServicesAddServiceModal;