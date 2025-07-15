import { ErrorMessage, Field, Form, Formik } from "formik";
import "./request-for-testing.css";
import "/src/index.css";

import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-datepicker";

interface RequestForTestingProps{
    farmSize: string,
    soilType: string,
    currentCrop: string,
    dateForTesting: Date|null,
    geoTag: string,
    contactInformation: string
};

const RequestForTesting: React.FC = ()=>{

    const [selectedDate, setSelectedDate] = useState<Date|null>(null);
    const inititalValues: RequestForTestingProps = {
        farmSize: '',
        soilType: '',
        currentCrop: '',
        dateForTesting: null,
        geoTag: '',
        contactInformation: ''
    };

    const validationSchema = Yup.object({
        farmSize: Yup.number().moreThan(0).required("required").typeError("farm size must be a number"),
        soilType: Yup.string().required("required").typeError("soil type is required e.g red soil"),
        currentCrop: Yup.string().required("required").typeError("current crop is requied e.g maize, beans"),
        dateForTesting: Yup.date().notRequired(),//required("required").typeError("a valid date is required"),
        geoTag: Yup.string().required("required"),
        contactInformation: Yup.string().required("required")
        .typeError("enter a valid contact e.g 0712345678 or +254712345678")
        .test( value => {
            if( value === undefined || value === null )
            {
                return false;
            }

            return /^0[17]{1}[0-9]{8}$/.test(value) || /^\+254[17]{1}[0-9]{8}$/.test(value); //must be a valid kenyan number
        })
    });

    const navigate = useNavigate();

    const handleRequestForTesting = (data: RequestForTestingProps, {} : any) => {
        console.log("requesting..");

        if( selectedDate == null )
        {
            console.log("invalid date");
            
            return;
        }

        data.dateForTesting = selectedDate;

        console.log(data);

        navigate("/farmer/projects/crops/select-farming-environment");
    };

    const render = ()=>{
        return (<>
        <div className="col-sm-12">
            <div id="request-for-testing-top-bar">
                <span
                onClick={() => navigate("#")}
                >
                    <img src="/assets/images/back-icon.svg" />
                </span>
            </div>
            <div className="content card">
                
                <Formik
                initialValues={inititalValues}
                validationSchema={validationSchema}
                onSubmit={handleRequestForTesting}
                >
                    {({}) => (
                        <Form className="request-for-testing-form">
                            <h3 className="h3-medium request-for-testing-form-title" >
                                Request form
                            </h3>

                            <div className="row col-sm-12">
                                <label className="col-sm-12 col-md-4 testing-input-label"
                                style={{margin: "0px"}}
                                >
                                    Farm Size
                                </label>

                                
                                <div className="col-sm-12 col-md-8">
                                    <Field
                                    className="testing-input-field col-sm-12 body-regular"
                                    type="text"
                                    name="farmSize"
                                    placeholder="2.5 hectares"
                                    style={{margin: "0px"}}
                                    />
                                    <div className="text-danger small col-sm-12 testing-input-label" 
                                    style={{margin: "0px"}}>
                                        <ErrorMessage name="farmSize"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row col-sm-12">
                                <label className="col-sm-12 col-md-4 testing-input-label"
                                style={{margin: "0px"}}
                                >
                                    Soil Type

                                </label>

                                
                                <div className="col-sm-12 col-md-8" >
                                    <Field
                                    className="testing-input-field col-sm-12 body-regular"
                                    type="text"
                                    name="soilType"
                                    placeholder="red soil"
                                    style={{margin: "0px"}}
                                    />
                                    <div className="text-danger small testing-input-label col-sm-12" 
                                    style={{margin: "0px"}}>
                                        <ErrorMessage name="soilType"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row col-sm-12">
                                <label className="col-sm-12 col-md-4 testing-input-label"
                                style={{margin: "0px"}}
                                >
                                    Current Crop

                                </label>

                                
                                <div className="col-sm-12 col-md-8" >
                                    <Field
                                    className="testing-input-field col-sm-12 body-regular"
                                    type="text"
                                    name="currentCrop"
                                    placeholder="Maize"
                                    style={{margin: "0px"}}
                                    />
                                    <div className="text-danger small testing-input-label col-sm-12" >
                                        <ErrorMessage name="currentCrop"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row col-sm-12">
                                <label className="col-sm-12 col-md-4 testing-input-label"
                                style={{margin: "0px"}}
                                >
                                    Date for Testing
                                </label>

                                
                                <div className="col-sm-12 col-md-8" >
                                    <DatePicker
                                    className="testing-input-field col-sm-12 body-regular"
                                    name="dateForTesting"

                                    dateFormat="MM/dd/yyyy"
                                    selected={selectedDate}
                                    onChange={ date => setSelectedDate(date) }
                                    
                                    minDate={new Date()}
                                    placeholderText="select date for testing"
                                    />
                                    <div className="text-danger small testing-input-label col-sm-12" >
                                        <ErrorMessage name="dateForTesting"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row col-sm-12">
                                <label className="col-sm-12 col-md-4 testing-input-label"
                                style={{margin: "0px"}}
                                >
                                    Geo Tag
                                </label>

                                
                                <div className="col-sm-12 col-md-8"
                                >
                                    <Field
                                    className="testing-input-field col-sm-12 body-regular"
                                    type="text"
                                    name="geoTag"
                                    placeholder="Kiambu"
                                    style={{margin: "0px"}}
                                    />
                                    <div className="text-danger small col-sm-12 testing-input-label" >
                                        <ErrorMessage name="geoTag"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row col-sm-12">
                                <label className="col-sm-12 col-md-4 testing-input-label"
                                style={{margin: "0px"}}>
                                    Contact Information
                                </label>

                                
                                <div className="col-sm-12 col-md-8"
                                >
                                    <Field
                                    className="testing-input-field col-sm-12 body-regular"
                                    type="text"
                                    name="contactInformation"
                                    placeholder="+245 712345678"

                                    style={{margin: "0px"}}
                                    />
                                    <div className="text-danger small testing-input-label"
                                    
                                    style={{margin: "0px"}}>
                                        <ErrorMessage name="contactInformation"/>
                                    </div>
                                </div>
                            </div>

                            <div className="actions-div">
                                <button id="cancel-action-button"
                                onClick={ () => navigate("#")}
                                >
                                    Cancel
                                </button>

                                <button
                                type="submit"

                                >
                                    Continue
                                </button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
        </>);
    };

    return render();
};

export default RequestForTesting;