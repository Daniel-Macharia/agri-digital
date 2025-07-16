import { ErrorMessage, Field, Form, Formik } from "formik";

import * as Yup from "yup";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import { useState } from "react";

const ExpectedYield: React.FC = ()=>{;

    const [selectedDate, setSelectedDate] = useState<Date|null>(null);
    const [selectedTime, setSelectedTime] = useState<string|null>(null)

    const initialValues = {

    };

    const validationSchema = Yup.object({

    });

    const handleSubmit = ()=>{
        console.log("submitting");
    };


    const render = ()=>{
        return (<>
        <div className=" col-12 mb-4">
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            >
                {({}) => (
                    <Form className="col-12">
                        <div 
                        className="row"
                        >
                            <div className="col-12 col-md-2">
                                <label htmlFor="fieldType"
                                className="col-12 m-0 crops-start-aligned-text body-regular primary-text"
                                >
                                    Environment
                                </label>
                            </div>

                            <div className="col-12 col-md-10" >
                                <Field
                                className="form-control body-regular"
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
                        className=" row mt-2"
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
                                className="form-control body-regular"
                                name="quantity" 
                                type="text"
                                placeholder="80Kg"
                                />
                                <div className="text-danger small crops-start-aligned-text col-12"
                                >
                                    <ErrorMessage name="quantity" />
                                </div>
                            </div>
                        </div>

                        <div 
                        className=" row mt-2"
                        >
                            <div className="col-12 col-md-2">
                                <label htmlFor="qualityGrade"
                                className="crops-start-aligned-text col-12 m-0 body-regular primary-text"
                                >
                                    Quality Grade
                                </label>
                            </div>

                            <div className="col-12 col-md-10"
                            >
                                <Field
                                className="form-control body-regular"
                                name="qualityGrade" 
                                type="text"
                                placeholder="Grade A"
                                />
                                <div className="text-danger small crops-start-aligned-text col-12 body-regular"
                                >
                                    <ErrorMessage name="qualityGrade" />
                                </div>
                            </div>
                        </div>

                        <div 
                        className="row mt-2"
                        >
                            <div 
                            className="col-6 "
                            >
                                <div className="row">
                                    <div className="col-12 col-md-4">
                                        <label htmlFor="harvestingDate" 
                                        className="col-12 m-0 crops-start-aligned-text body-regular primary-text">
                                            Harvesting Date
                                        </label>
                                    </div>

                                    <div className="col-12 col-md-6" >
                                        <DatePicker
                                        className="form-control bg-light ps-2 body-regular"
                                        name="harvestingDate" 
                                        placeholderText="selected harvesting date"
                                        dateFormat="MM/dd/yyyy"
                                        selected={selectedDate}
                                        onChange={ date => setSelectedDate(date) }
                                        minDate={new Date()}

                                        wrapperClassName="w-100"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div 
                            className="col-6"
                            >
                                <div className="row">
                                    <div className="col-12 col-md-4">
                                        <label htmlFor="harvestingTime" 
                                        className="col-12 crops-start-aligned-text body-regular primary-text"
                                        >
                                            Harvesting Time
                                        </label>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <TimePicker
                                        className="form-control body-regular"
                                        name="harvestingTime"
                                        
                                        value={selectedTime}
                                        onChange={value => setSelectedTime(value) }

                                        clearIcon={null}
                                        disableClock={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div 
                        className=" row mt-2"
                        >
                            <div className="col-12 col-md-2">
                                <label htmlFor="additionalNotes" 
                                className="col-12 m-0 crops-start-aligned-text body-regular primary-text"
                                >
                                    Additional Notes
                                </label>
                            </div>

                            <div className="col-12 col-md-10">
                                <textarea
                                className="form-control body-regular"
                                name="additionalNotes" 
                                placeholder="additional notes"

                                style={{height: "88px"}}
                                />
                            </div>
                            
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
        </>);
    };

    return render();
};


export default ExpectedYield;