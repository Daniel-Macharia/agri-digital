import { ErrorMessage, Field, Form, Formik } from "formik";

import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";


interface YieldProps{
    fieldType: string,
    quantity: number | null,
    qualityGrade: string,
    harvestingDate: Date | null,
    harvestingTime: string | null,
    previewUrl: string | null,
    additionalNotes: string
};

const ActualYield: React.FC = ()=>{

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string|null>(null);

    const [selectedDate, setSelectedDate] = useState<Date|null>(null);
    const [selectedTime, setSelectedTime] = useState<string|null>(null);
    
    const navigate = useNavigate();

    const initialValues: YieldProps = {
        fieldType: '',
        quantity: null,
        qualityGrade: "",
        harvestingDate: null,
        harvestingTime: "",
        previewUrl: "",
        additionalNotes: ""
    };

    const validationSchema = Yup.object({
        fieldType: Yup.string().required("required").typeError("field type is required"),
        quantity: Yup.number().required("required").typeError("quantity must be a number"),
        qualityGrade: Yup.string().required("required").typeError("quality is required"),
        harvestingDate: Yup.date().required("harvesting date is required"),
        harvestingTime: Yup.string().required("harvesting time is required"),
        previewUrl: Yup.string().required("select an image"),
        additionalNotes: Yup.string().notRequired()
    });

    const handleSubmit = (data : YieldProps )=>{

        if( selectedDate == null )
        {
            console.log("date not selected");
            return;
        }

        if( selectedTime == null )
        {
            console.log("time not selected");
            return;
        }

        if( previewUrl == null )
        {
            console.log("image not selected");
            return;
        }

        data.previewUrl = previewUrl;
        data.harvestingDate = selectedDate;
        data.harvestingTime = selectedTime;

        console.log(data);
        console.log("submitting");
    };

    const handleContinue = ()=>{
        console.log("continuing");
        navigate("/farmer/projects/crops/post-harvesting")
    };

    const handleFileUpload = () => {
        fileInputRef.current?.click();
    };

    return (<>
    <div className="col-12">
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
            {({setFieldValue}) => (
                <Form className="col-12">
                    <div 
                    className="row"
                    >
                        <div className="col-12 col-md-2" >
                            <label htmlFor="fieldType"
                            className="crops-start-aligned-text col-12 m-0 body-regular primary-text"
                            >
                                Environment
                            </label>
                        </div>

                        <div className="col-12 col-md-10">
                            <Field
                            className="form-control body-regular mb-0"
                            name="fieldType" 
                            type="text"
                            placeholder="Open Field"
                            />
                            <div className="text-danger small crops-start-aligned-text col-12 m-0"
                            >
                                <ErrorMessage name="fieldType" />
                            </div>
                        </div>
                    </div>

                    <div 
                    className="row mt-2"
                    >
                        <div className="col-12 col-md-2">
                            <label htmlFor="quantity"
                            className="crops-start-aligned-text col-12 m-0 body-regular primary-text"
                            >
                                Quantity
                            </label>
                        </div>

                        <div className="col-12 col-md-10"
                        >
                            <Field
                            className="form-control body-regular mb-0"
                            name="quantity" 
                            type="text"
                            placeholder="80Kg"
                            />
                            <div className="text-danger small crops-start-aligned-text col-12 m-0"
                            >
                                <ErrorMessage name="quantity" />
                            </div>
                        </div>
                    </div>

                    <div 
                    className="row mt-2"
                    >
                        <div className="col-12 col-md-2">
                            <label htmlFor="qualityGrade"
                            className="crops-start-aligned-text col-12 m-0 body-regular primary-text"
                            >
                                Quality Grade
                            </label>
                        </div>

                        <div className="col-12 col-md-10">
                            <Field
                            className="form-control body-regular mb-0"
                            name="qualityGrade" 
                            type="text"
                            placeholder="Grade A"
                            />
                            <div className="text-danger small crops-start-aligned-text col-12 m-0"
                            >
                                <ErrorMessage name="qualityGrade" />
                            </div>
                        </div>
                    </div>

                    <div 
                    className="row mt-2"
                    >
                        <div 
                        className="col-6"
                        >
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <label htmlFor="harvestingDate" 
                                    className="crops-start-aligned-text col-12 m-0 body-regular primary-text">
                                        Harvesting Date
                                    </label>
                                </div>

                                <div className="col-12 col-md-6" >
                                    <DatePicker
                                    className="form-control body-regular mb-0"
                                    name="harvestingDate" 
                                    
                                    dateFormat='MM/dd/yyyy'
                                    minDate={new Date()}

                                    selected={selectedDate}
                                    onChange={date => {setSelectedDate( date );
                                        setFieldValue( "harvestingDate", date);
                                    } }

                                    placeholderText="select harvesting date"

                                    wrapperClassName="w-100"
                                    />

                                    <div className="col-sm-12 text-danger small crops-start-aligned-text">
                                        <ErrorMessage name="harvestingDate" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div 
                        className="col-6"
                        >
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <label htmlFor="harvestingTime" 
                                    className="crops-start-aligned-text col-12 body-regular primary-text"
                                    >
                                        Harvesting Time
                                    </label>
                                </div>

                                <div className="col-12 col-md-6" >
                                    <TimePicker
                                    className="form-control body-regular mb-0"
                                    name="harvestingTime" 
                                    
                                    
                                    value={selectedTime}
                                    onChange={value => {setSelectedTime(value);
                                        setFieldValue("harvestingTime", value);
                                    }}
                                    disableClock={true}
                                    clearIcon={null}
                                    />

                                    <div className="col-sm-12 text-danger small m-0 crops-start-aligned-text" >
                                        <ErrorMessage name="harvestingTime" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div 
                    className="row mt-2"
                    >
                        <div className="col-12 col-md-2">
                            <label htmlFor="uploadCrop" 
                            className="crops-start-aligned-text col-12 m-0  body-regular primary-text"
                            >
                                Upload Crop
                            </label>
                        </div>

                        <div className="col-12 col-md-10"
                        >
                            <div
                            className="col-12 "
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

                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    const file = event.target.files?.[0];

                                    if( file )
                                    {
                                        console.log("Uploaded file: ", file.name );

                                        setPreviewUrl( URL.createObjectURL( file ) );
                                        setFieldValue("previewUrl", file);

                                    }
                                    else{
                                        console.log("failed to upload file!");
                                    }
                                }}

                                style={{display: "none"}}
                                />

                                <div className="col-12 d-flex justify-content-center">
                                    <img src={previewUrl || "/assets/images/upload_photo.svg"} 
                                    className={previewUrl ? "col-sm-8" : "col-sm-1"}
                                    
                                    style={{
                                        maxWidth: previewUrl ? "40%" : "10%",
                                    }}
                                    />
                                </div>
                                <p className="text-center small-regular secondary-text">
                                    Upload Photo of the Product<br/>PDF,PNG,JPG up to 10 MB 
                                </p>
                                <div className="text-danger small harvesting-input-label col-sm-12"
                                style={{margin: "0px", textAlign: "center"}}
                                >
                                    <ErrorMessage name="previewUrl" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div 
                    className="row mt-2"
                    >
                        <div className="col-12 col-md-2">
                            <label htmlFor="additionalNotes" 
                            className="crops-start-aligned-text col-12 m-0 body-regular primary-text"
                            >
                                Additional Notes
                            </label>
                        </div>

                        <div className="col-12 col-md-10">
                            <textarea
                            className="form-control body-regular mb-0"
                            name="additionalNotes" 
                            placeholder="additional notes"

                            style={{height: "88px"}}
                            />
                            <div className="text-danger small harvesting-input-label col-sm-12"
                            style={{margin: "0px"}}
                            >
                                <ErrorMessage name="additionalNotes" />
                            </div>
                        </div>
                    </div>

                    <div className="col-12" >
                        <div className="row">
                            <div className="col-12 col-md-6 mt-2" >
                                <div className="row justify-content-start m-0" >
                                    <button
                                    className="crops-other-button col-12 col-md-4 m-0"
                                    type="submit"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>

                            <div className="col-12 col-md-6 mt-2" >
                                <div className="row justify-content-end m-0" >
                                    <button
                                    className="crops-accept-button col-12 col-md-4 m-0"
                                    onClick={handleContinue}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
    </>);
};

export default ActualYield;