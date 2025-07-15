import { ErrorMessage, Field, Form, Formik } from "formik";

import "../index.css";

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
        dateForTesting: Yup.date().required("date is required"),
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
        <div className="col-12">

            <div className="row justify-content-start">
                <div className="col-2 col-md-1 px-0 mx-0"
                >
                    <div className="row justify-content-start px-0 mx-0">
                        <img src="/assets/images/back-icon.svg" 
                        onClick={() => navigate("/farmer/projects/crops/soil-testing")}
                        />
                    </div>
                </div>
            </div>

            <div className="col-12 crops-container bg-white p-4">
                
                <Formik
                initialValues={inititalValues}
                validationSchema={validationSchema}
                onSubmit={handleRequestForTesting}
                >
                    {({setFieldValue}) => (
                        <Form className="col-12">
                            <div className="row p-0">
                                <h3 className="h3-semibold primary-text col-12 m-0 my-3 crops-start-aligned-text">
                                    Request form
                                </h3>
                            </div>

                            <div className="row ">
                                <div className="col-12 col-md-4">
                                    <label className="col-12 m-0 primary-text crops-start-aligned-text body-regular"
                                    >
                                        Farm Size
                                    </label>
                                </div>

                                
                                <div className="col-12 col-md-8">
                                    <Field
                                    className="form-control col-12 m-0 body-regular"
                                    type="text"
                                    name="farmSize"
                                    placeholder="2.5 hectares"
                                    />
                                    <div className="text-danger small col-12 m-0 crops-start-aligned-text" 
                                    >
                                        <ErrorMessage name="farmSize"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col-12 col-md-4">
                                    <label className="col-12 m-0 crops-start-aligned-text body-regular primary-text"
                                    >
                                        Soil Type

                                    </label>
                                </div>

                                
                                <div className="col-12 col-md-8" >
                                    <Field
                                    className="form-control col-12 m-0 body-regular"
                                    type="text"
                                    name="soilType"
                                    placeholder="red soil"
                                    />
                                    <div className="text-danger small crops-start-aligned-text col-12 m-0" >
                                        <ErrorMessage name="soilType"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col-12 col-md-4" >
                                    <label className="col-12 m-0 crops-start-aligned-text body-regular primary-text"
                                    >
                                        Current Crop

                                    </label>
                                </div>

                                
                                <div className="col-12 col-md-8" >
                                    <Field
                                    className="form-control col-12 m-0 body-regular"
                                    type="text"
                                    name="currentCrop"
                                    placeholder="Maize"
                                    />
                                    <div className="text-danger small crops-start-aligned-text col-12 m-0" >
                                        <ErrorMessage name="currentCrop"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-2 py-1" >
                                <div className="col-12 col-md-4">
                                    <label className="col-12 m-0 crops-start-aligned-text body-regular primary-text"
                                    >
                                        Date for Testing
                                    </label>
                                </div>

                                
                                <div className="col-12 col-md-8" >
                                    <DatePicker
                                    className="form-control bg-light col-12 body-regular mb-0 ps-2"
                                    name="dateForTesting"
                                    dateFormat="MM/dd/yyyy"
                                    selected={selectedDate}
                                    onChange={ date => {setSelectedDate(date);
                                        setFieldValue( "dateForTesting", date);
                                    } }
                                    minDate={new Date()}

                                    wrapperClassName="w-100"

                                    placeholderText="select date for testing"
                                    />
                                    <div className="text-danger small crops-start-aligned-text col-12" >
                                        <ErrorMessage name="dateForTesting"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col-12 col-md-4" >
                                    <label className="col-12 m-0 crops-start-aligned-text body-regular primary-text"
                                    >
                                        Geo Tag
                                    </label>
                                </div>
                                
                                <div className="col-12 col-md-8"
                                >
                                    <Field
                                    className="form-control col-12 m-0 body-regular"
                                    type="text"
                                    name="geoTag"
                                    placeholder="Kiambu"
                                    />
                                    <div className="text-danger small col-12 crops-start-aligned-text" >
                                        <ErrorMessage name="geoTag"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col-12 col-md-4" >
                                    <label className="col-12 m-0 crops-start-aligned-text body-regular primary-text">
                                        Contact Information
                                    </label>
                                </div>
                                
                                <div className="col-12 col-md-8"
                                >
                                    <Field
                                    className="form-control col-12 m-0 body-regular"
                                    type="text"
                                    name="contactInformation"
                                    placeholder="+245 712345678"
                                    />
                                    <div className="text-danger small crops-start-aligned-text m-0">
                                        <ErrorMessage name="contactInformation"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row  px-2" style={{marginTop: "221px"}}>
                                <div className="col-12 col-md-6 mt-1">
                                    <div className="row justify-content-start">
                                        <button 
                                        className="crops-other-button col-12 col-md-8 mx-0"
                                        onClick={ () => navigate("/farmer/projects/crops/soil-testing")}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>

                                <div className="col-12 col-md-6 mt-1">
                                    <div className="row justify-content-end">
                                        <button
                                        type="submit"
                                        className="col-12 col-md-8 crops-accept-button mx-0"
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
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