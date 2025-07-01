import { NavLink, useNavigate } from "react-router-dom";
import "./index.css";
import "/src/index.css";
import { ErrorMessage, Field, Form, Formik } from "formik";

import * as Yup from "yup";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

const SoilTesting: React.FC  = ()=>{

    const [show, setShow] = useState<boolean>(false);

    const pHLevel = (<>Acidic</>);
    const nutrientLevels = (<>Nitroge low
    <br/>
    Phosphorous Medium
    <br/>
    Potassium High
    </>);
    const recommendations = (<p>1. Apply lime(agricultural lime or dolomite) to balance acidity.
        <br/>
        2. Apply composed manure or nitrogen based fertilisers.
        <br/>
        3. Loamy soil (ideal for most crops) suitable for corn, wheat, vegetables and fruits.
    </p>);

    const initialValues = {
        farmSize: '',
        soilTexture: '',
        soilColor: '',
        moistureLevel: '',
        currentCrop: '',
        nutrientDeficiency: '',
        irrigationMethod: '',
        comment: ''
    };

    const validationSchema = Yup.object({
        farmSize: Yup.number().moreThan(0).required("required"),
        soilTexture: Yup.string().required(""),
        soilColor: Yup.string().required(""),
        moistureLevel: Yup.string().required(""),
        currentCrop: Yup.string().required(""),
        nutrientDeficiency: Yup.string().required(""),
        irrigationMethod: Yup.string().required(""),
        comment: Yup.string()
    });

    const navigate = useNavigate();

    const handleSoilTesting = (values: typeof initialValues, {} : any )=>{
        console.log("testing");
        console.log(values);

       setShow(true);
    };

    const handleModalContinueAction = ()=>{
        console.log("continuing with the journey");
        navigate("/farmer/projects/crops/select-farming-environment");
        setShow(false);
    };

    const handleModalDownloadAction = () => {
        console.log("Downloading the soil test report");
        setShow(false);
    };

    const render = ()=>{
        return (<>
        <div >
            <div className="request-for-soil-testing-div">
                <NavLink 
                to={"/farmer/projects/crops/request-for-soil-testing"}
                >
                    <button id="request-for-soil-testing">
                        Request for Soil Testing
                    </button>
                </NavLink>
            </div>
            <div className="container">
                <h3 className="h3-medium" >Soil Testing</h3>
                <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSoilTesting}
                >
                    {({})=>(
                        <Form className="soil-testing-form">
                            <div
                             className="input-group"
                            >
                                <label className="input-field-label">Farm size</label>

                                <div className="text-danger small">
                                    <ErrorMessage name="farmSize"/>
                                </div>
                                <Field
                                className="input-field"
                                type="text"
                                name="farmSize"
                                placeholder="2.5 hectares"
                                />
                            </div>

                            <div
                             className="input-group"
                            >
                                <label className="input-field-label">Soil Texture</label>

                                <div className="text-danger small">
                                    <ErrorMessage name="soilTexture"/>
                                </div>
                                <Field
                                className="input-field"
                                type="text"
                                name="soilTexture"
                                placeholder="medium"
                                />
                            </div>

                            <div
                             className="input-group"
                            >
                                <label className="input-field-label">Soil Color</label>

                                <div className="text-danger small">
                                    <ErrorMessage name="soilColor"/>
                                </div>
                                <Field
                                className="input-field"
                                type="text"
                                name="soilColor"
                                placeholder="Black Cotton"
                                />
                            </div>

                            <div
                             className="input-group"
                            >
                                <label className="input-field-label">Moisture Level</label>

                                <div className="text-danger small">
                                    <ErrorMessage name="moistureLevel"/>
                                </div>
                                <Field
                                className="input-field"
                                type="text"
                                name="moistureLevel"
                                placeholder="Dry"
                                />
                            </div>

                            <div
                             className="input-group"
                            >
                                <label className="input-field-label">Current Crop</label>

                                <div className="text-danger small">
                                    <ErrorMessage name="currentCrop"/>
                                </div>
                                <Field
                                className="input-field"
                                type="text"
                                name="currentCrop"
                                placeholder="Maize"
                                />
                            </div>

                            <div
                             className="input-group"
                            >
                                <label className="input-field-label">Nutrient Deficiency</label>

                                <div className="text-danger small">
                                    <ErrorMessage name="nutrientDeficiency"/>
                                </div>
                                <Field
                                className="input-field"
                                type="text"
                                name="nutrientDeficiency"
                                placeholder="stunted growth"
                                />
                            </div>

                            <div
                             className="input-group"
                            >
                                <label className="input-field-label">Irrigation Method</label>

                                <div className="text-danger small">
                                    <ErrorMessage name="irrigationMethod"/>
                                </div>
                                <Field
                                className="input-field"
                                type="text"
                                name="irrigationMethod"
                                placeholder="surface irrigation"
                                />
                            </div>

                            <div
                             className="input-group"
                            >
                                <label className="input-field-label">Comments</label>

                                <div className="text-danger small">
                                    <ErrorMessage name="comment"/>
                                </div>
                                <Field
                                className="input-field"
                                type="textarea"
                                name="comment"
                                placeholder="your comments.."
                                />
                            </div>

                            <div
                            className="actions-div"
                            >
                                <NavLink 
                                to={"#"}
                                >
                                    <button id="back-button">
                                        Cancel
                                    </button>
                                </NavLink>

                                <button 
                                id="submit-button"
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

        <Modal
        show={show}
        onHide={() => setShow(false)}

        centered
        >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Soil Test Results
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>
                        <label>pH level </label>
                        <label>{pHLevel}</label>
                    </div>

                    <div>
                        <label>Nutrients levels </label>
                        <label>{nutrientLevels}</label>
                    </div>

                    <div>
                        <h3>
                            Recommendations
                        </h3>
                        {recommendations}
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                    onClick={handleModalDownloadAction}
                    >
                        Download
                    </Button>
                    
                    <Button onClick={handleModalContinueAction}>
                        Continue
                    </Button>
                </Modal.Footer>
            </Modal>
        </>);
    };

    return render();
};

export default SoilTesting;