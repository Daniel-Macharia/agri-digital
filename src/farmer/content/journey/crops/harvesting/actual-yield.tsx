import "./actual-yield.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "./expected-yield.css";

import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
const ActualYield: React.FC = ()=>{

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string|null>(null);

    const [selectedDate, setSelectedDate] = useState<Date|null>(null);
    const [selectedTime, setSelectedTime] = useState<string|null>(null);
    
    const navigate = useNavigate();

    const initialValues = {

    };

    const validationSchema = Yup.object({

    });

    const handleSubmit = ()=>{
        console.log("submitting");
    };

    const handleSaveYield = ()=>{
        console.log("saving yield");
    };

    const handleContinue = ()=>{
        console.log("continuing");
    };

    const handleFileUpload = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        const file = event.target.files?.[0];

        if( file )
        {
            console.log("Uploaded file: ", file.name );

            setPreviewUrl( URL.createObjectURL( file ) );

        }
        else{
            console.log("failed to upload file!");
        }
    };

    const handleNewTimeSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        const time = event.target?.value;

        console.log("selected: " + time);
    };

    const render = ()=>{
        return (<>
        <div id="wrapper">
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            >
                {({}) => (
                    <Form className="form">
                        <div 
                        className="row col-sm-12"
                        >
                            <label htmlFor="fieldType"
                            className="harvesting-input-label col-sm-12 col-md-4"
                             >
                                Environment
                            </label>

                            <div className="col-sm-12 col-md-8">
                                <Field
                                className="harvesting-input-field col-sm-12"
                                name="fieldType" 
                                type="text"
                                placeholder="Open Field"
                                />
                                <div className="text-danger small harvesting-input-label col-sm-12"
                                style={{margin: "0px"}}
                                >
                                    <ErrorMessage name="fieldType" />
                                </div>
                            </div>
                        </div>

                        <div 
                        className="row col-sm-12"
                        >
                            <label htmlFor="quantity"
                            className="harvesting-input-label col-sm-12 col-md-4"
                            style={{margin: "0px"}}
                             >
                                Quantity
                            </label>

                            <div className="col-sm-12 col-md-8"
                            >
                                <Field
                                className="harvesting-input-field col-sm-12"
                                name="quantity" 
                                type="text"
                                placeholder="80Kg"
                                />
                                <div className="text-danger small harvesting-input-label col-sm-12"
                                style={{margin: "0px"}}
                                >
                                    <ErrorMessage name="fieldType" />
                                </div>
                            </div>
                        </div>

                        <div 
                        className="row col-sm-12"
                        >
                            <label htmlFor="qualityGrade"
                            className="harvesting-input-label col-sm-12 col-md-4"
                             >
                                Quality Grade
                            </label>

                            <div className="col-sm-12 col-md-8">
                                <Field
                                className="harvesting-input-field col-sm-12"
                                name="qualityGrade" 
                                type="text"
                                placeholder="Grade A"
                                />
                                <div className="text-danger small harvesting-input-label col-sm-12"
                                style={{margin: "0px"}}
                                >
                                    <ErrorMessage name="fieldType" />
                                </div>
                            </div>
                        </div>

                        <div 
                        className="row col-sm-12"
                        >
                            <div 
                            className="row col-sm-12 col-md-6"
                            >
                                <label htmlFor="harvestingDate" 
                                className="harvesting-input-label col-sm-12 col-md-6">
                                    Harvesting Date
                                </label>

                                <DatePicker
                                className="harvesting-input-field col-sm-12 col-md-6"
                                name="harvestingDate" 
                                
                                dateFormat='MM/dd/yyyy'
                                minDate={new Date()}

                                selected={selectedDate}
                                onChange={date => setSelectedDate( date ) }

                                placeholderText="select harvesting date"
                                />
                            </div>

                            <div 
                            className="row col-sm-12 col-md-6"
                            >
                                <label htmlFor="harvestingTime" 
                                className="harvesting-input-label col-sm-12 col-md-6"
                                >
                                    Harvesting Time
                                </label>

                                <TimePicker
                                className="harvesting-input-field col-sm-12 col-md-6"
                                name="harvestingTime" 
                                
                                
                                value={selectedTime}
                                onChange={value => setSelectedTime(value)}
                                disableClock={true}
                                clearIcon={null}
                                />
                            </div>
                        </div>

                        <div 
                        className="row col-sm-12"
                        >
                            <label htmlFor="uploadCrop" 
                            className="harvesting-input-label col-sm-12 col-md-4"
                            >
                                Upload Crop
                            </label>

                            <div className="col-sm-12 col-md-8"
                            >
                                <div
                                className="col-sm-12"
                                onClick={handleFileUpload}
                                style={{
                                    borderStyle: "dashed",
                                    borderWidth: "1px",
                                    borderColor: "#777"
                                }}
                                >

                                    <input
                                    ref={fileInputRef}
                                    name="uploadCrop" 
                                    type="file"
                                    accept="images/*"

                                    onChange={handleFileChange}

                                    style={{display: "none"}}
                                    />

                                    <img src={previewUrl || "/assets/images/upload_photo.svg"} 
                                    className={previewUrl ? "col-sm-8" : "col-sm-1"}/>
                                    <p>Upload Photo of the Product<br/>PDF,PNG,JPG up to 10 MB </p>
                                </div>
                            </div>
                        </div>

                        <div 
                        className="row col-sm-12"
                        >
                            <label htmlFor="additionalNotes" 
                            className="harvesting-input-label col-sm-12 col-md-4"
                            style={{margin: "0px"}}
                            >
                                Additional Notes
                            </label>

                            <div className="col-sm-12 col-md-8">
                                <textarea
                                className="harvesting-input-field col-sm-12"
                                name="additionalNotes" 
                                placeholder="additional notes"
                                />
                                <div className="text-danger small harvesting-input-label col-sm-12"
                                style={{margin: "0px"}}
                                >
                                    <ErrorMessage name="additionalNotes" />
                                </div>
                            </div>
                        </div>

                        <div className="actions-div" >
                            <Button
                            onClick={handleSaveYield}
                            variant="secondary"
                            className="other-button"

                            >
                                Save
                            </Button>

                            <Button
                            onClick={handleContinue}
                            variant="primary"

                            >
                                Continue
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
        </>);
    };

    return render();
};

export default ActualYield;