import { ErrorMessage, Field, Form, Formik } from "formik";
import "./expected-yield.css";

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
        <div id="wrapper" className="row col-sm-12"
        style={{marginBottom: "24px"}}>
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            >
                {({}) => (
                    <Form className="form col-sm-12">
                        <div 
                        className="row col-sm-12"
                        >
                            <label htmlFor="fieldType"
                            className="harvesting-input-label col-md-4 col-sm-12"
                            style={{margin: "0px"}}
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
                        className=" row col-sm-12"
                        >
                            <label htmlFor="quantity"
                            className="harvesting-input-label col-md-4 col-sm-12"
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
                                >
                                    <ErrorMessage name="quantity" />
                                </div>
                            </div>
                        </div>

                        <div 
                        className=" row col-sm-12"
                        >
                            <label htmlFor="qualityGrade"
                            className="harvesting-input-label col-sm-12 col-md-4 "
                            style={{margin: "0px"}}
                             >
                                Quality Grade
                            </label>

                            <div className="col-sm-12 col-md-8"
                            >
                                <Field
                                className="harvesting-input-field col-sm-12"
                                name="qualityGrade" 
                                type="text"
                                placeholder="Grade A"
                                />
                                <div className="text-danger small harvesting-input-label col-sm-12"
                                >
                                    <ErrorMessage name="qualityGrade" />
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
                                className="col-sm-12 col-md-6 harvesting-input-label">
                                    Harvesting Date
                                </label>
                                <div className="row col-sm-12 col-md-6" >
                                    <DatePicker
                                    className="col-sm-12 form-control bg-light"
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

                            <div 
                            className="row col-sm-12 col-md-6"
                            >
                                <label htmlFor="harvestingTime" 
                                    className="col-sm-12 col-md-6 harvesting-input-label"
                                    >
                                        Harvesting Time
                                    </label>
                                <div className="row col-sm-12 col-md-6">
                                    <TimePicker
                                    className="col-sm-12 harvesting-input-field"
                                    name="harvestingTime"
                                    
                                    value={selectedTime}
                                    onChange={value => setSelectedTime(value) }

                                    clearIcon={null}
                                    disableClock={true}
                                    />
                                </div>
                            </div>
                        </div>

                        <div 
                        className=" row col-sm-12"
                        >
                            <label htmlFor="additionalNotes" 
                            className="harvesting-input-label col-sm-12 col-md-4"
                            >
                                Additional Notes
                            </label>

                            <div className="col-sm-12 col-md-8">
                                <textarea
                                className="harvesting-input-field col-sm-12"
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