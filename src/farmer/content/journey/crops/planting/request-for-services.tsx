import { Field, Form, Formik } from "formik";
import "./request-for-services.css";

import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useRef, useState } from "react";

import DatePicker from "react-datepicker";

const RequestForService: React.FC = () => {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const navigate = useNavigate();
    const backUrl = useLocation().state;

    const [show, setShow] = useState<boolean>(false);

    const serviceTypeOptions = ["Equipments", "Fertilizers", "Packaging", "Storage",
        "Delivery", "Expert", "Pesticide",
        "Feeds", "Seeds", "Laborer"
    ];
    
    const initialValues = {
        type: [],
        dateOfService: '',
        location: '',
        contactInformation: '',
        uploadPhoto: '',
        additionNotes: ''
    };

    const validationSchema = Yup.object({
        type: Yup.string().required("required"),
        dateOfService: Yup.date().required("required"),
        location: Yup.string().required("required"),
        contactInformation: Yup.string().required("required"),
        uploadPhoto: Yup.string().required("required"),
        additionalNotes: Yup.string().required("required")
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
    }

    const handleRequestForService = (data: typeof initialValues, {}: any) => {
        console.log(data);
        setShow(true);
    };

    const handleBackNavigation = () => {
        navigate(backUrl);
        setShow(false)
    };


    const render = () => {
        return (<>
        <div>
            <div id="request-for-services-top-bar">
                <img
                src="/assets/images/back-icon.svg" 
                onClick={handleBackNavigation}
                />
            </div>
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRequestForService}
            >

                {({}) => (
                    <Form className="form content-wrapper">
                        <h3>
                            Request form
                        </h3>

                        <div className="input-group row col-sm-12" >
                            <label htmlFor="type"
                            className="input-label col col-sm-12 col-md-2"
                            >
                                Request type
                            </label>
                            <select name="type"
                            className="input-field col-sm-12 col-md-10"
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

                        <div className="input-group row col-sm-12" >
                            <label htmlFor="dateOfService"
                            className="input-label col col-sm-12 col-md-2 order-2"
                            >
                                Date of service
                            </label>

                            <DatePicker
                            name="dateOfService"
                            className="input-field col-sm-12 col-md-8 order-1"
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate( date ) }
                            dateFormat={'MM/dd/yyyy'}
                            placeholderText="select date of service"
                            minDate={new Date()}
                            />
                            {/* <Field 
                            className="input-field"
                            name="dateOfService"
                            type="date"

                            /> */}
                        </div>

                        <div className="input-group row col-sm-12" >
                            <label htmlFor="location"
                            className="input-label col col-sm-12 col-md-2"
                            >
                                Location
                            </label>
                            <Field
                            className="input-field col-sm-12 col-md-10"
                            name="location"
                            type="text"
                            placeholder="Kiambu"

                            />
                        </div>

                        <div className="input-group row col-sm-12" >
                            <label htmlFor="contactInformation"
                            className="input-label col col-sm-12 col-md-2"
                            >
                                Contact Information
                            </label>
                            <Field
                            className="input-field col-sm-12 col-md-10"
                            name="contactInformation"
                            type="text"
                            placeholder="+254 12345678"

                            />
                        </div>

                        <div className="input-group row col-sm-12" >
                            <label htmlFor="uploadPhoto"
                            className="input-label col col-sm-12 col-md-2"
                            >
                                Upload Photo
                            </label>
                            
                            <div
                            className="input-field col-sm-12 col-md-8"
                            style={{borderStyle: "dashed",
                                display:"flex",
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
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

                        <div className="input-group row col-sm-12" >
                            <label htmlFor="additionalNotes"
                            className="input-label col col-sm-12 col-md-2"
                            >
                                Additional Notes
                            </label>

                            <textarea 
                            className="input-field col-sm-12 col-md-10"
                            name="additionalNotes"
                            placeholder="additional notes"/>
                        </div>


                        <div
                        id="action-div"
                        className="row col-sm-12"
                        >
                            <Button
                            variant="secondary"
                            onClick={handleBackNavigation}
                            className="other-button col-sm-12 col-md-2"
                            >
                                Cancel
                            </Button>

                            <Button
                            variant="primary"
                            className={`col-sm-12 col-md-2`}
                            >
                                Request
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
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
                        handleDoneAction
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