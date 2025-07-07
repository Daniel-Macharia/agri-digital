import { ErrorMessage, Field, Form, Formik } from "formik";
import "./request-for-services.css";

import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useRef, useState } from "react";

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
        .test( phone => /^0[17]{1}[0-9]{8}$/.test(phone) || /^\+?254[17]{1}[0-9]{8}$/.test(phone))
        .required("required"),
        additionalNotes: Yup.string().required("required"),
        selectedDate: Yup.date().notRequired(),
        previewUrl: Yup.string().notRequired(),
        serviceTyoe: Yup.string().notRequired()
    });

    const handleFileUpload = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if( file )
        {
            console.log("uploaded file: ", file.name);
            setPreviewUrl( URL.createObjectURL(file));
        }
        else{
            console.log("uploaded file is null!");
        }

    };

    const handleDoneAction = () => {
        console.log("finished requesting for service");
        setShow(false);
        handleBackNavigation();
    }

    const handleServiceTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target?.value;

        console.log("selected: ",selected);
        setSelectedService(selected);
    };
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


    const render = () => {
        return (<>
        <div className="col-sm-12 ">
            <div id="request-for-services-top-bar col-sm-12"
            style={{display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
                <img
                src="/assets/images/back-icon.svg" 
                onClick={handleBackNavigation}
                />
            </div>
            <div className="col-sm-12 content-wrapper" >
                <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleRequestForService}
                >

                    {({}) => (
                        <Form className="form col-sm-12"
                        >
                            <h3 className="col-sm-12" style={{textAlign: "start"}}>
                                Request form
                            </h3>

                            <div className="row col-sm-12" >
                                <label htmlFor="serviceType"
                                className="planting-input-label col col-sm-12 col-md-4"
                                style={{padding: "0px", textAlign: "start"}}
                                >
                                    Request type
                                </label>
                                <select name="serviceType"
                                className="planting-input-field  col-sm-12 col-md-8"
                                onChange={handleServiceTypeChange}
                                >
                                    <option value='' >Service Type</option>
                                    {
                                        serviceTypeOptions.map(
                                            option => {
                                                //console.log(option);
                                                return (<option value={option} >{option}</option>);
                                            }
                                        )
                                    }
                                </select>
                            </div>

                            <div className="row col-sm-12" >
                                <label htmlFor="dateOfService"
                                className="planting-input-label col col-sm-12 col-md-4 order-0"
                                style={{margin: "0px", textAlign: "start", padding: "0px"}}
                                >
                                    Date of service
                                </label>

                                <div className="col-sm-12 col-md-8 order-1" 
                                style={{padding: "0px"}}>
                                    <DatePicker
                                    name="dateOfService"
                                    className="form-control col-sm-12"
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate( date ) }
                                    dateFormat={'MM/dd/yyyy'}
                                    placeholderText="select date of service"
                                    minDate={new Date()}

                                    wrapperClassName="w-100"
                                    />
                                </div>
                            </div>

                            <div className="row col-sm-12" >
                                <label htmlFor="location"
                                className="col-sm-12 col-md-4 planting-input-label"
                                style={{margin: "0px", textAlign: "start",  padding: "0px"}}
                                >
                                    Location
                                </label>
                                <div className="col-sm-12  col-md-8" style={{padding: "0px"}} >
                                    <Field
                                    className="planting-input-field col-sm-12"
                                    name="location"
                                    type="text"
                                    placeholder="Kiambu"
                                    style={{margin: "0px"}}
                                    />
                                    <div className="col-sm-12 text-danger small planting-input-label" 
                                    style={{margin: "0px", padding: "0px"}}
                                    >
                                        <ErrorMessage name="location" />
                                    </div>
                                </div>
                            </div>

                            <div className=" row col-sm-12" >
                                <label htmlFor="contactInformation"
                                className=" col col-sm-12 col-md-4 planting-input-label"
                                style={{textAlign: "start", padding: "0px"}}
                                >
                                    Contact Information
                                </label>
                                <div className="col-sm-12 col-md-8" style={{padding: "0px"}} >
                                    <Field
                                    className="planting-input-field col-sm-12"
                                    name="contactInformation"
                                    type="text"
                                    placeholder="+254 712345678"
                                    style={{margin: "0px"}}

                                    />
                                    <div className="col-sm-12 text-danger small planting-input-label" 
                                    style={{margin: "0px", padding: "0px"}}
                                    >
                                        <ErrorMessage name="contactInformation" />
                                    </div>
                                </div>
                            </div>

                            <div className=" row col-sm-12" >
                                <label htmlFor="uploadPhoto"
                                className=" col col-sm-12 col-md-4"
                                style={{textAlign: "start", padding: "0px"}}
                                >
                                    Upload Photo
                                </label>
                                
                                <div
                                className=" col-sm-12 col-md-8"
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
                                    className={previewUrl ? "col-sm-10 col-md-6" : "col-sm-1"}
                                    style={{
                                    
                                    }}/>

                                    <input
                                    ref={fileInputRef}
                                    className="image-upload-field"
                                    name="uploadPhoto"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{display:"none"}}
                                    />

                                    <p>Upload Photo of the Product<br/>PDF,PNG,JPG up to 10 MB </p>
                                </div>
                            </div>

                            <div className=" row col-sm-12" >
                                <label htmlFor="additionalNotes"
                                className="planting-input-label col col-sm-12 col-md-4"
                                style={{margin: "0px", textAlign: 'start', padding: "0px"}}
                                >
                                    Additional Notes
                                </label>

                                <div className="col-sm-12 col-md-8" style={{padding: "0px"}}>
                                    
                                    <textarea
                                    className="planting-input-field  col-sm-12"
                                    name="additionalNotes"
                                    placeholder="additional notes"
                                    style={{margin: "0px", height: "88px", textAlign: "start"}}

                                    />

                                    <div className="col-sm-12 text-danger small planting-input-label" 
                                    style={{margin: "0px", padding: "0px"}}
                                    >
                                        <ErrorMessage name="additionalNotes" />
                                    </div>
                                </div>
                            </div>


                            <div
                            className="row col-sm-12"
                            style={{
                                display: 'flex', 
                                flexDirection: "row",
                            justifyContent: "space-between"}}
                            >
                                <button
                                onClick={handleBackNavigation}
                                className="other-button col-sm-4"
                                style={{margin: "0px"}}
                                >
                                    Cancel
                                </button>

                                <button
                                className="col-sm-4"
                                style={{margin: "0px"}}
                                type="submit"
                                >
                                    Request
                                </button>
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
        >
            <Modal.Header>
                <img src="/assets/images/bank.svg" />
                <Modal.Title >
                    Request Successful
                </Modal.Title>

                <Modal.Body>
                    Your request was successful. You can track the progress.
                </Modal.Body>
                <Modal.Footer>
                    <Button
                    variant="primary"
                    onClick={()=> {
                        handleDoneAction()
                    }}
                    >Done</Button>
                </Modal.Footer>
            </Modal.Header>
        </Modal>
        </>);
    };

    return render();
}

export default RequestForService;