import "./actual-yield.css";
import { Field, Form, Formik } from "formik";
import "./expected-yield.css";

import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
const ActualYield: React.FC = ()=>{

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string|null>(null);

    const [selectedDate, setSelectedDate] = useState<Date|null>(null);
    
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
                        className="input-group"
                        >
                            <label htmlFor="fieldType"
                            className="input-label"
                             >
                                Environment
                            </label>

                            <Field
                            className="input-field"
                            name="fieldType" 
                            type="text"
                            placeholder="Open Field"
                            />
                        </div>

                        <div 
                        className="input-group"
                        >
                            <label htmlFor="quantity"
                            className="input-label"
                             >
                                Quantity
                            </label>

                            <Field
                            className="input-field"
                            name="quantity" 
                            type="text"
                            placeholder="80Kg"
                            />
                        </div>

                        <div 
                        className="input-group"
                        >
                            <label htmlFor="qualityGrade"
                            className="input-label"
                             >
                                Quality Grade
                            </label>

                            <Field
                            className="input-field"
                            name="qualityGrade" 
                            type="text"
                            placeholder="Grade A"
                            />
                        </div>

                        <div 
                        className="input-group date col-sm-12"
                        >
                            <div 
                            className="input-group date-time-div col-sm-5"
                            >
                                <label htmlFor="harvestingDate" 
                                className="input-label col-sm-4">
                                    Harvesting Date
                                </label>

                                <DatePicker
                                className="input-field col-sm-6"
                                name="harvestingDate" 
                                
                                dateFormat='MM/dd/yyyy'
                                minDate={new Date()}

                                selected={selectedDate}
                                onChange={date => setSelectedDate( date ) }

                                placeholderText="select harvesting date"
                                />
                            </div>

                            <div 
                            className="input-group date-time-div col-sm-5"
                            >
                                <label htmlFor="harvestingTime" 
                                className="input-label col-sm-4"
                                >
                                    Harvesting Time
                                </label>

                                <Field
                                className="input-field col-sm-6"
                                name="harvestingTime" 
                                type="time"
                                />
                            </div>
                        </div>

                        <div 
                        className="input-group"
                        >
                            <label htmlFor="uploadCrop" 
                            className="input-label"
                            >
                                Upload Crop
                            </label>

                            <div
                                className="input-field"
                                onClick={handleFileUpload}
                                style={{
                                    borderStyle: "dashed"
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

                        <div 
                        className="input-group"
                        >
                            <label htmlFor="additionalNotes" 
                            className="input-label"
                            >
                                Additional Notes
                            </label>

                            <textarea
                            className="input-field"
                            name="additionalNotes" 
                            placeholder="additional notes"
                            />
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