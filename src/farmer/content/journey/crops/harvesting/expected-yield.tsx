import { Field, Form, Formik } from "formik";
import "./expected-yield.css";

import * as Yup from "yup";

const ExpectedYield: React.FC = ()=>{

    const initialValues = {

    };

    const validationSchema = Yup.object({

    });

    const handleSubmit = ()=>{
        console.log("submitting");
    };


    const render = ()=>{
        return (<>
        <div id="wrapper" className="row">
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            >
                {({}) => (
                    <Form className="form">
                        <div 
                        className="input-group row"
                        >
                            <label htmlFor="fieldType"
                            className="input-label col-md-4 col-sm-12 order-sm-1"
                             >
                                Environment
                            </label>

                            <Field
                            className="input-field col-md-8 col-sm-12 order-sm-2"
                            name="fieldType" 
                            type="text"
                            placeholder="Open Field"
                            />
                        </div>

                        <div 
                        className="input-group row"
                        >
                            <label htmlFor="quantity"
                            className="input-label col-md-4 col-sm-12 order-sm-1"
                             >
                                Quantity
                            </label>

                            <Field
                            className="input-field col-md-8 col-sm-12 order-sm-2"
                            name="quantity" 
                            type="text"
                            placeholder="80Kg"
                            />
                        </div>

                        <div 
                        className="input-group row"
                        >
                            <label htmlFor="qualityGrade"
                            className="input-label col-md-4 col-sm-12 order-sm-1"
                             >
                                Quality Grade
                            </label>

                            <Field
                            className="input-field col-md-8 col-sm-12 order-sm-2"
                            name="qualityGrade" 
                            type="text"
                            placeholder="Grade A"
                            />
                        </div>

                        <div 
                        className="col-sm-12"
                        >
                            <div className="row">
                                <div 
                                className="col-sm-6"
                                >
                                    <div className="row" >
                                        <label htmlFor="harvestingDate" 
                                        className="col-sm-4 order-sm-1">
                                            Harvesting Date
                                        </label>

                                        <Field
                                        className="col-sm-6 order-sm-2"
                                        name="harvestingDate" 
                                        type="date"
                                        />
                                    </div>
                                </div>

                                <div 
                                className="col-sm-6"
                                >
                                    <div className="row">
                                        <label htmlFor="harvestingTime" 
                                        className="col-sm-4 order-sm-1"
                                        >
                                            Harvesting Time
                                        </label>

                                        <Field
                                        className="col-sm-6 order-sm-2"
                                        name="harvestingTime" 
                                        type="time"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div 
                        className="input-group row"
                        >
                            <label htmlFor="additionalNotes" 
                            className="input-label col-md-4 col-sm-12 order-sm-1"
                            >
                                Additional Notes
                            </label>

                            <textarea
                            className="input-field col-md-8 col-sm-12 order-sm-2"
                            name="additionalNotes" 
                            placeholder="additional notes"
                            />
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