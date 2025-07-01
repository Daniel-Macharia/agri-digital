import { ErrorMessage, Field, Form, Formik } from "formik";
import "./request-for-testing.css";
import "/src/index.css";

import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";

const RequestForTesting: React.FC = ()=>{

    const inititalValues = {
        farmSize: '',
        soilType: '',
        currentCrop: '',
        dateForTesting: '',
        geoTag: '',
        contactInformation: ''
    };

    const validationSchema = Yup.object({
        farmSize: Yup.number().moreThan(0).required("Required"),
        soilType: Yup.string().required("Required"),
        currentCrop: Yup.string().required("Required"),
        dateForTesting: Yup.date().required("Required"),
        geoTag: Yup.string().required("Required"),
        contactInformation: Yup.string().required("Rquired")
    });

    const navigate = useNavigate();

    const handleRequestForTesting = (data: typeof inititalValues, {} : any) => {
        console.log("requesting..");
        console.log(data);

        navigate("/farmer/projects/crops/select-farming-environment");
    };

    const render = ()=>{
        return (<>
        <div className="">
            <div id="request-for-testing-top-bar">
                <NavLink
                to="#"
                >
                    <img src="/assets/images/back-icon.svg" />
                </NavLink>
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

                            <div className="input-group">
                                <label className="input-label">Farm Size</label>

                                <div className="text-danger small" >
                                    <ErrorMessage name="farmSize"/>
                                </div>
                                <Field
                                className="input-field"
                                type="text"
                                name="farmSize"
                                placeholder="2.5 hectares"
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Soil Type</label>

                                <div className="text-danger small" >
                                    <ErrorMessage name="soilType"/>
                                </div>
                                <Field
                                className="input-field"
                                type="text"
                                name="soilType"
                                placeholder="red soil"
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Current Crop</label>

                                <div className="text-danger small" >
                                    <ErrorMessage name="currentCrop"/>
                                </div>
                                <Field
                                className="input-field"
                                type="text"
                                name="currentCrop"
                                placeholder="Maize"
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Date for Testing</label>

                                <div className="text-danger small" >
                                    <ErrorMessage name="dateForTesting"/>
                                </div>
                                <Field
                                className="input-field"
                                type="date"
                                name="dateForTesting"
                                placeholder="2025/01/29"
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Geo Tag</label>

                                <div className="text-danger small" >
                                    <ErrorMessage name="geoTag"/>
                                </div>
                                <Field
                                className="input-field"
                                type="text"
                                name="geoTag"
                                placeholder="Kiambu"
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Contact Information</label>

                                <div className="text-danger small" >
                                    <ErrorMessage name="contactInformation"/>
                                </div>
                                <Field
                                className="input-field"
                                type="text"
                                name="contactInformation"
                                placeholder="+245 712345678"
                                />
                            </div>

                            <div className="actions-div">
                                <NavLink
                                to="#"
                                >
                                    <button id="cancel-action-button">
                                        Cancel
                                    </button>
                                </NavLink>

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