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
        farmSize: Yup.number().moreThan(0).required("required").typeError("farm size must be a number"),
        soilTexture: Yup.string().required("required").typeError("soil texture is required e.g medium, large"),
        soilColor: Yup.string().required("required").typeError("soil color is required e.g black cotton, red volcanic"),
        moistureLevel: Yup.string().required("required").typeError("moisture level is required e.g dry, wet"),
        currentCrop: Yup.string().required("required").typeError("current crop is required e.g maize, beans"),
        nutrientDeficiency: Yup.string().required("required").typeError("nutrient deficiency is required e.g stunted growth, withered leaves"),
        irrigationMethod: Yup.string().required("required").typeError("irrigation method is required e.g sprinkler, drip"),
        comment: Yup.string().required("required").typeError("comment is required e.g Your remarks")
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

    const handleRequestForTesting = () => {
        navigate("/farmer/projects/crops/request-for-soil-testing");
    }

    const render = ()=>{
        return (<>
        <div className="col-sm-12" >
            <div className="request-for-soil-testing-div">
                <Button 
                onClick={handleRequestForTesting}
                id="request-for-soil-testing"
                className="col-sm-4  offset-8"
                >
                        Request for Soil Testing
                </Button>
            </div>
            <div className="container col-sm-12">
                <h3 className="h3-medium" >Soil Testing</h3>
                <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSoilTesting}
                className="col-sm-12"
                
                >
                    {({})=>(
                        <Form className="soil-testing-form col-sm-12">
                            <div
                             className="input-grousp row col-sm-12"
                            >
                                <label className="input-field-labesl col-sm-12 col-md-4 "
                                style={{backgroundColor: "", textAlign:  "start"}}>
                                    Farm size
                                </label>
                                <div className="co-l-sm-12 col-md-8" 
                                style={{marginBottom: "8px"}}>
                                    <Field
                                    className="testing-input-field col-sm-12 body-regular"
                                    type="text"
                                    name="farmSize"
                                    placeholder="2.5 hectares"
                                    style={{margin: "0px"}}
                                    />
                                    <div className="text-danger small col-sm-12"
                                    style={{padding: "0px", 
                                        margin: "0px", 
                                        display: "flex", 
                                        flexDirection: "row", 
                                        justifyContent: "start"}}
                                    >
                                        <ErrorMessage name="farmSize"/>
                                    </div>
                                </div>
                            </div>

                            <div
                             className="input-groups row col-sm-12"
                            >
                                <label className="input-field-labelk col-sm-12 col-md-4"
                                style={{textAlign: "start"}}
                                >
                                    Soil Texture

                                </label>

                                <div className="col-sm-12 col-md-8"
                                style={{marginBottom: "8px"}}>
                                    
                                    <Field
                                    className="testing-input-field col-sm-12 body-regular"
                                    type="text"
                                    name="soilTexture"
                                    placeholder="medium"
                                    style={{margin: "0px"}}
                                    />
                                    <div className="text-danger small col-sm-12"
                                    style={{padding: "0px", 
                                        margin: "0px", 
                                        display: "flex", 
                                        flexDirection: "row", 
                                        justifyContent: "start"}}>
                                        <ErrorMessage name="soilTexture"/>
                                    </div>
                                </div>
                            </div>

                            <div
                             className="input-groups row col-sm-12"
                            >
                                <label className="input-field-labelk col-sm-12 col-md-4"
                                style={{textAlign: "start"}}>
                                    Soil Color

                                </label>
                                
                                <div className="col-sm-12 col-md-8"
                                style={{marginBottom: "8px"}}
                                >
                                    <Field
                                    className="testing-input-field col-sm-12 body-regular"
                                    type="text"
                                    name="soilColor"
                                    placeholder="Black Cotton"
                                    style={{margin: "0px"}}
                                    />
                                    <div className="text-danger small" 
                                    style={{padding: "0px", 
                                        margin: "0px", 
                                        display: "flex", 
                                        flexDirection: "row", 
                                        justifyContent: "start"}}>
                                        <ErrorMessage name="soilColor"/>
                                    </div>
                                </div>
                            </div>

                            <div
                             className="input-groups row col-sm-12"
                            >
                                <label className="input-field-labesl col-sm-12 col-md-4"
                                style={{textAlign: "start"}}
                                >
                                    Moisture Level
                                </label>
                                <div className="col-sm-12 col-md-8"
                                style={{marginBottom: "8px"}}
                                >
                                    <Field
                                    className="testing-input-field col-sm-12 body-regular"
                                    type="text"
                                    name="moistureLevel"
                                    placeholder="Dry"

                                    style={{margin: "0px"}}
                                    />
                                    <div className="text-danger small col-sm-12"
                                    style={{padding: "0px", 
                                        margin: "0px", 
                                        display: "flex", 
                                        flexDirection: "row", 
                                        justifyContent: "start"}}>
                                        <ErrorMessage name="moistureLevel"/>
                                    </div>
                                </div>
                            </div>

                            <div
                             className="input-groupd row col-sm-12"
                            >
                                <label className="input-field-labeld col-sm-12 col-md-4" style={{margin: "0px", textAlign: "start"}}>
                                    Current Crop
                                </label>
                                
                                <div className="col-sm-12 col-md-8" style={{marginBottom: "8px"}}>
                                    <Field
                                    className="testing-input-field col-sm-12 body-regular"
                                    type="text"
                                    name="currentCrop"
                                    placeholder="Maize"
                                    style={{margin: "0px"}}
                                    />
                                    <div className="text-danger small col-sm-12"  
                                    style={{padding: "0px", 
                                        margin: "0px", 
                                        display: "flex", 
                                        flexDirection: "row", 
                                        justifyContent: "start"}}>
                                        <ErrorMessage name="currentCrop"/>
                                    </div>
                                </div>
                            </div>

                            <div
                             className="input-groupds row col-sm-12"
                            >
                                <label className="input-field-labels col-sm-12 col-md-4"
                                style={{margin: "0px", textAlign: "start"}}
                                >
                                    Nutrient Deficiency

                                </label>

                                
                                <div className="col-sm-12 col-md-8"
                                style={{marginBottom: "8px"}}>
                                    <Field
                                    className="testing-input-field col-sm-12 body-regular"
                                    type="text"
                                    name="nutrientDeficiency"
                                    placeholder="stunted growth"
                                    style={{margin: "0px"}}
                                    />
                                    <div className="text-danger small" 
                                    style={{padding: "0px", 
                                        margin: "0px", 
                                        display: "flex", 
                                        flexDirection: "row", 
                                        justifyContent: "start"}}>
                                        <ErrorMessage name="nutrientDeficiency"/>
                                    </div>
                                </div>
                            </div>

                            <div
                             className="input-groupsa row col-sm-12"
                            >
                                <label className="input-field-labelsda col-sm-12 col-md-4"
                                style={{margin: "0px", textAlign: "start"}}
                                >
                                    Irrigation Method

                                </label>

                                <div className="col-sm-12 col-md-8" 
                                style={{marginBottom: "8px"}}>
                                    <Field
                                    className="testing-input-field col-sm-12 body-regular"
                                    type="text"
                                    name="irrigationMethod"
                                    placeholder="surface irrigation"
                                    />
                                    <div className="text-danger small col-sm-12" 
                                    style={{padding: "0px", 
                                        margin: "0px", 
                                        display: "flex", 
                                        flexDirection: "row", 
                                        justifyContent: "start"}}>
                                        <ErrorMessage name="irrigationMethod"/>
                                    </div>
                                </div>
                            </div>

                            <div
                             className="input-groups row col-sm-12"
                            >
                                <label className="input-field-labelsacsd col-sm-12 col-md-4"
                                
                                style={{margin: "0px", textAlign: "start"}}>
                                    Comments

                                </label>

                                
                                <div className="col-sm-12 col-md-8" 
                                style={{marginBottom: "8px"}}>
                                    <Field
                                    className="testing-input-field col-sm-12 body-regular"
                                    type="textarea"
                                    name="comment"
                                    placeholder="your comments.."
                                    style={{margin: "0px"}}
                                    />
                                    <div className="text-danger small col-sm-12"
                                    style={{padding: "0px", 
                                        margin: "0px", 
                                        display: "flex", 
                                        flexDirection: "row", 
                                        justifyContent: "start"}}>
                                        <ErrorMessage name="comment"/>
                                    </div>
                                </div>
                            </div>

                            <div
                            className="actions-div row nowrap col-sm-12"
                            
                            >
                                <Button 
                                id="back-buttons"
                                className="col-sm-4 other-button"
                                style={{margin: "0px"}}
                                >
                                    Cancel
                                </Button>

                                <Button 
                                id="submit-buttosn"
                                type="submit"
                                className="col-sm-4 offset-4"
                                style={{margin: '0px'}}
                                >
                                    Continue
                                </Button>
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