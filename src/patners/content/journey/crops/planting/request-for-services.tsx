import { ErrorMessage, Field, Form, Formik } from "formik";

import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import React, { useRef, useState } from "react";

import DatePicker from "react-datepicker";

interface RequestForServiceProps{
    location: string,
    contactInformation: string,
    additionalNotes: string,
    selectedDate: Date|null,
    previewUrl: string|null,
    serviceType: string|null
};

const RequestForService: React.FC = () => {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    
    const [selectedService, setSelectedService] = useState<string|null>(null);

    const navigate = useNavigate();
    const backUrl = useLocation().state;

    const [show, setShow] = useState<boolean>(false);

    const serviceTypeOptions = ["Equipments", "Fertilizers", "Packaging", "Storage",
        "Delivery", "Expert", "Pesticide",
        "Feeds", "Seeds", "Laborer"
    ];
    
    const initialValues: RequestForServiceProps = {
        location: '',
        contactInformation: '',
        additionalNotes: '',
        selectedDate: null,
        previewUrl: null,
        serviceType: null
    };

    const validationSchema = Yup.object({
        location: Yup.string().required("required"),
        contactInformation: Yup.string()
        .required("required")
        .test( phone => /^0[17]{1}[0-9]{8}$/.test(phone) || /^\+?254[17]{1}[0-9]{8}$/.test(phone)),
        additionalNotes: Yup.string().nullable("required"),
        selectedDate: Yup.date().required("select date"),
        previewUrl: Yup.string().required("upload a photo"),
        serviceType: Yup.string().required("select a service")
    });

    const handleFileUpload = () => {
        fileInputRef.current?.click();
    };

    const handleDoneAction = () => {
        console.log("finished requesting for service");
        setShow(false);
        handleBackNavigation();
    }

    const handleRequestForService = (data: RequestForServiceProps, {}: any) => {

        if( selectedDate == null )
        {
            console.log("select a date");
            return;
        }

        if( previewUrl == null || previewUrl == "")
        {
            console.log("select an image");
            return;
        }

        if( selectedService == null || selectedService == "")
        {
            console.log("select a service");
            return;
        }

        data.selectedDate = selectedDate;
        data.previewUrl = previewUrl;
        data.serviceType = selectedService;
        console.log(data);
        setShow(true);
    };

    const handleBackNavigation = () => {
        navigate(backUrl);
        setShow(false)
    };


    return (<>
    <div className="col-12 ">
        <div className="row justify-content-start"
        >
            <div className="col-2 col-md-1">
                <div className="row justify-content-start">
                    <img
                    src="/assets/images/back-icon.svg" 
                    onClick={handleBackNavigation}
                    className="col-sm-12 col-md-10 col-lg-8 col-xl-6 col-xxl-4"
                    />
                </div>
            </div>
        </div>

        <div className="col-12 crops-container bg-white mt-3 px-4" >
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRequestForService}
            >

                {({setFieldValue}) => (
                    <Form className="col-12"
                    >
                        <div className="row my-0 px-0" >
                            <h3 className="col-12 p-0 mx-0 crops-start-aligned-text" >
                                Request form
                            </h3>
                        </div>

                        <div className="row" >
                            <div className="col-12 col-md-4 p-0">
                                <label htmlFor="serviceType"
                                className="crops-start-aligned-text col-12 p-0 m-0"
                                >
                                    Request type
                                </label>
                            </div>

                            <div className="col-12 col-md-8 p-0">
                                <select name="serviceType"
                                className="col-12 form-control"
                                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                    const selected = event.target?.value;

                                    console.log("selected: ",selected);
                                    setSelectedService(selected);
                                    setFieldValue("serviceType", selected);
                                }}
                                >
                                    <option value='' >Service Type</option>
                                    {
                                        serviceTypeOptions.map(
                                            option => {
                                                return (<option value={option} >{option}</option>);
                                            }
                                        )
                                    }
                                </select>
                                <div className="text-danger small crops-start-aligned-text">
                                    <ErrorMessage name="serviceType" />
                                </div>
                            </div>
                            
                        </div>

                        <div className="row mt-2" >
                            <div className="col-12 col-md-4 p-0">
                                <label htmlFor="dateOfService"
                                className="crops-start-aligned-text col-12 m-0 p-0"
                                >
                                    Date of service
                                </label>
                            </div>

                            <div className="col-12 col-md-8 p-0">
                                <DatePicker
                                name="selectedDate"
                                className="form-control col-12"
                                selected={selectedDate}
                                onChange={(date) => {setSelectedDate( date );
                                    setFieldValue("selectedDate", date);
                                } }
                                dateFormat={'MM/dd/yyyy'}
                                placeholderText="select date of service"
                                minDate={new Date()}

                                wrapperClassName="w-100"
                                />
                                <div className="text-danger small crops-start-aligned-text" >
                                    <ErrorMessage name="selectedDate" />
                                </div>
                            </div>
                        </div>

                        <div className="row mt-2" >
                            <div className="col-12 col-md-4 p-0">
                                <label htmlFor="location"
                                className="col-12 m-0 p-0 crops-start-aligned-text"
                            
                                >
                                    Location
                                </label>
                            </div>
                            <div className="col-12  col-md-8" style={{padding: "0px"}} >
                                <Field
                                className="form-control col-12"
                                name="location"
                                type="text"
                                placeholder="Kiambu"
                                style={{margin: "0px"}}
                                />
                                <div className="col-12 m-0 p-0 text-danger small crops-start-aligned-text" 
                                >
                                    <ErrorMessage name="location" />
                                </div>
                            </div>
                        </div>

                        <div className=" row mt-2" >
                            <div className="col-12 col-md-4 p-0">
                                <label htmlFor="contactInformation"
                                className=" col-12 p-0 crops-start-aligned-text"
                            
                                >
                                    Contact Information
                                </label>
                            </div>
                            <div className="col-12 col-md-8 p-0" >
                                <Field
                                className="form-control col-12 m-0"
                                name="contactInformation"
                                type="text"
                                placeholder="+254 712345678"

                                />
                                <div className="col-sm-12 text-danger small crops-start-aligned-text m-0 p-0" 
                                
                                >
                                    <ErrorMessage name="contactInformation" />
                                </div>
                            </div>
                        </div>

                        <div className=" row mt-2" >
                            <div className="col-12 col-md-4 p-0">
                                <label htmlFor="uploadPhoto"
                                className=" col-12 m-0 p-0 crops-start-aligned-text"
                            
                                >
                                    Upload Photo
                                </label>
                            </div>
                            
                            <div
                            className=" col-12 col-md-8"
                            style={{borderStyle: "dashed",
                                display:"flex",
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: "1px",
                                borderColor: "var(--Secondary-Text, #777)"
                            }}
                            onClick={handleFileUpload}
                            >
                                <img  src={previewUrl || "/assets/images/upload_photo.svg"}
                                className={previewUrl ? "col-10 col-md-6" : "col-1"}
                                style={{
                                
                                }}/>

                                <input
                                ref={fileInputRef}
                                className="image-upload-field"
                                name="previewUrl"
                                type="file"
                                accept="image/*"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    const file = event.target.files?.[0];

                                    if( file )
                                    {
                                        console.log("uploaded file: ", file.name);
                                        setPreviewUrl( URL.createObjectURL(file));
                                        setFieldValue( "previewUrl", file.name );
                                    }
                                    else{
                                        console.log("uploaded file is null!");
                                    }
                                }}
                                style={{display:"none"}}
                                />

                                <p>Upload Photo of the Product<br/>PDF,PNG,JPG up to 10 MB </p>
                                <div className="text-danger small">
                                    <ErrorMessage name="previewUrl" />
                                </div>
                            </div>
                        </div>

                        <div className=" row mt-2" >
                            <div className="col-12 col-md-4 p-0">
                                <label htmlFor="additionalNotes"
                                className="crops-start-aligned-text col-12 p-0 m-0"
                                style={{textAlign: 'start'}}
                                >
                                    Additional Notes
                                </label>
                            </div>

                            <div className="col-12 col-md-8 p-0">
                                
                                <textarea
                                className="form-control  col-12 m-0"
                                name="additionalNotes"
                                placeholder="additional notes"
                                style={{height: "88px", textAlign: "start"}}

                                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    const value = event.target?.value;

                                    console.log(value);
                                    setFieldValue("additionalNotes", value);
                                }}
                                />

                                <div className="col-sm-12 text-danger small crops-start-aligned-text" 
                                style={{margin: "0px", padding: "0px"}}
                                >
                                    <ErrorMessage name="additionalNotes" />
                                </div>
                            </div>
                        </div>


                        <div
                        className="row mt-2 justify-content-center"
                        >
                            <div className="col-12 col-md-6">
                                <div className="row justify-content-start" >
                                    <button
                                    onClick={handleBackNavigation}
                                    className="other-button col-12 col-md-8 m-0 mt-1 py-2 crops-other-button"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className="row justify-content-end">
                                    <button
                                    className="col-12 col-md-8 m-0 mt-1 py-2 crops-accept-button"
                                    type="submit"
                                    >
                                        Request
                                    </button>
                                </div>
                            </div>

                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    </div>

    <Modal
    show={show}
    onHide={() => setShow(false)}


    centered
    dialogClassName="mx-auto"
    style={{width: "min-content", marginLeft: "40%", marginRight: "40%"}}
    >
        <Modal.Body style={{width: "max-content"}}>
            <div className="col-12 justify-content-center">
                <div className="row justify-content-center">
                    <img src="/assets/images/request_successful.svg" 
                    style={{width: "88px"}}/>
                </div>
                <div className="col-12" >
                    <p className="col-12 crops-center-aligned-text">
                        Request Successful
                    </p>
                </div>
            </div>
            <p className="crops-center-aligned-text col-12">
                Your request was successful. You can <br/> track the progress.
            </p>
            <div className="row p-1" >
                <button
                className="col-12 crops-accept-button m-0"
                onClick={()=> {
                    handleDoneAction()
                }}
                >
                    Done
                </button>
            </div>
        </Modal.Body>

    </Modal>
    </>);
}

export default RequestForService;