import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";

import * as Yup from "yup";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import CropsNotification from "../crops-notification/crops-notification";
import { CROP_ROUTES } from "../crop-routes";

const SoilTesting: React.FC  = ()=>{

    const [show, setShow] = useState<boolean>(false);

    const pHLevel = "Acidic";
    const nutrientLevels = ["Nitroge low",
    "Phosphorous Medium",
    "Potassium High"];

    const recommendations = ["Apply lime(agricultural lime or dolomite) to balance acidity.",
        "Apply composed manure or nitrogen based fertilisers.",
        "Loamy soil (ideal for most crops) suitable for corn, wheat, vegetables and fruits."];

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
        comment: Yup.string().notRequired()//.required("required").typeError("comment is required e.g Your remarks")
    });

    const navigate = useNavigate();

    const handleSoilTesting = (values: typeof initialValues)=>{
        console.log("testing");
        console.log(values);

       setShow(true);
    };

    const handleModalContinueAction = ()=>{
        console.log("continuing with the journey");
        navigate(`..${CROP_ROUTES.CROP_SELECT_FARMING_ENVIRONMENT}`);
        setShow(false);
    };

    const handleModalDownloadAction = () => {
        console.log("Downloading the soil test report");
        setShow(false);
    };

    const handleRequestForTesting = () => {
        navigate(`..${CROP_ROUTES.CROP_REQUEST_FOR_SOIL_TESTING}`);
    };

    const handleCancelSoilTesting = () => {
        console.log("cancelled..");
    };

    return (<>
    <div className="col-12" >

        <div className="col-12 my-3" >
            <CropsNotification 
            iconUrl={"/assets/images/warning.svg"} 
            message={"Low soil moisture detected. Time to irrigate."} />
        </div>
        
        <div className="col-12 crops-container">
            <div className="row m-0 my-2 px-1 justify-content-end">
                <button 
                onClick={handleRequestForTesting}
                className="col-12 col-md-4 m-0 crops-accept-button"
                >
                        Request for Soil Testing
                </button>
            </div>

            <div className=" crops-container bg-white border-radius-3 col-sm-12 mb-4 p-4">
                <div className="col-12">
                    <h3 className="h3-semibold crops-start-aligned-text col-12 py-0 my-3"
                    >
                        Soil Testing
                    </h3>
                </div>
                <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSoilTesting}
                className="col-12"
                
                >
                    {()=>(
                        <Form className="col-12">
                            <div
                            className="row"
                            >
                                <div className="col-12 col-md-4">
                                    <label className="crops-start-aligned-text body-regular primary-text col-12 "
                                    style={{textAlign:  "start"}}>
                                        Farm size
                                    </label>
                                </div>

                                <div className="col-12 col-md-8" 
                                >
                                    <Field
                                    className="form-control col-12 body-regular"
                                    type="text"
                                    name="farmSize"
                                    placeholder="2.5 hectares"
                                    style={{margin: "0px"}}
                                    />
                                    <div className="text-danger small col-12"
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
                            className="row mt-2"
                            >
                                <div className="col-12 col-md-4">
                                    <label className="crops-start-aligned-text body-regular col-12 primary-text"
                                    
                                    >
                                        Soil Texture
                                    </label>
                                </div>

                                <div className="col-12 col-md-8">
                                    
                                    <Field
                                    className="form-control col-12 body-regular"
                                    type="text"
                                    name="soilTexture"
                                    placeholder="medium"
                                    style={{margin: "0px"}}
                                    />
                                    <div className="text-danger small col-12"
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
                            className="row mt-2"
                            >
                                <div className="col-12 col-md-4">
                                    <label className="col-12 crops-start-aligned-text body-regular primary-text"
                                    >
                                        Soil Color
                                    </label>
                                </div>
                                
                                <div className="col-sm-12 col-md-8"
                                >
                                    <Field
                                    className="form-control col-12 body-regular"
                                    type="text"
                                    name="soilColor"
                                    placeholder="Black Cotton"
                                    style={{margin: "0px"}}
                                    />
                                    <div className="text-danger small col-12" 
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
                            className="row mt-2"
                            >
                                <div className="col-12 col-md-4">
                                    <label className="crops-start-aligned-text col-12 body-regular primary-text"
                                    
                                    >
                                        Moisture Level
                                    </label>
                                </div>

                                <div className="col-12 col-md-8"
                                >
                                    <Field
                                    className="form-control col-12 body-regular"
                                    type="text"
                                    name="moistureLevel"
                                    placeholder="Dry"

                                    style={{margin: "0px"}}
                                    />
                                    <div className="text-danger small col-12"
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
                            className="row mt-2"
                            >
                                <div className="col-12 col-md-4">
                                    <label className="crops-start-aligned-text col-12 body-regular primary-text" 
                                    >
                                        Current Crop
                                    </label>
                                </div>
                                
                                <div className="col-12 col-md-8">
                                    <Field
                                    className="form-control col-12 body-regular"
                                    type="text"
                                    name="currentCrop"
                                    placeholder="Maize"
                                    style={{margin: "0px"}}
                                    />
                                    <div className="text-danger small col-12"  
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
                            className="row mt-2"
                            >
                                <div className="col-12 col-md-4">
                                    <label className="crops-start-aligned-text col-12 body-regular primary-text"
                                    style={{ textAlign: "start"}}
                                    >
                                        Nutrient Deficiency
                                    </label>
                                </div>
                                
                                <div className="col-12 col-md-8">
                                    <Field
                                    className="form-control col-12 body-regular"
                                    type="text"
                                    name="nutrientDeficiency"
                                    placeholder="stunted growth"
                                    style={{margin: "0px"}}
                                    />
                                    <div className="text-danger small col-12" 
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
                            className="row mt-2"
                            >
                                <div className="col-12 col-md-4" >
                                    <label className="crops-start-aligned-text col-12 body-regular primary-text"
                                    
                                    >
                                        Irrigation Method
                                    </label>
                                </div>

                                <div className="col-12 col-md-8" >
                                    <Field
                                    className="form-control col-12 body-regular"
                                    type="text"
                                    name="irrigationMethod"
                                    placeholder="surface irrigation"
                                    style={{margin: "0px"}}
                                    />
                                    <div className="text-danger small col-12" 
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
                            className="row mt-2"
                            >
                                <div className="col-12 col-md-4" >
                                    <label className="crops-start-aligned-text col-12 body-regular primary-text"
                                    >
                                        Comments
                                    </label>
                                </div>

                                
                                <div className="col-12 col-md-8" >
                                    <textarea
                                    className="form-control col-12 body-regular"
                                    name="comment"
                                    placeholder="your comments.."
                                    style={{margin: "0px", height: "88px"}}
                                    />
                                    <div className="text-danger small col-12"
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
                            className="row mt-4"
                            
                            >
                                <div className="col-12 col-md-6 mt-1" >
                                    <div className="row m-0 p-0 justify-content-start">
                                        <button 
                                        className="col-12 col-md-8 m-0 crops-other-button"
                                        type="button"
                                        onClick={handleCancelSoilTesting}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>

                                <div className="col-12 col-md-6 mt-1" >
                                    <div className="row m-0 p-0 justify-content-end">
                                        <button 
                                        type="submit"
                                        className="col-12 col-md-8 m-0 crops-accept-button"
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
    </div>

    <Modal
    show={show}
    onHide={() => setShow(false)}

    centered={true}

    dialogClassName="mx-auto"

    className="col-12"
    >
            <Modal.Header closeButton>
                <Modal.Title className="body-bold primary-text my-0" >
                    Soil Test Results
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="col-12">
                    <div className="row">
                        <div className="col-6">
                            <label className="col-12 crops-start-aligned-text body-regular secondary-text">
                                pH level
                            </label>
                        </div>
                        <div className="col-6" >
                            <label className="col-12 crops-end-aligned-text body-bold primary-text">
                                {pHLevel}
                            </label>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="row">
                        <div className="col-6">
                            <label className="col-6 body-regular secondary-text">
                                Nutrients levels
                            </label>
                        </div>
                        <div className="col-6">
                            {
                                nutrientLevels.map(nutrient => <label className="col-12 crops-end-aligned-text body-bold primary-text" >
                                    {nutrient}
                                </label>)
                            }
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <p className="col-12 body-bold mt-0 primary-text">
                        Recommendations
                    </p>
                    <div className="col-12">
                        {recommendations.map( (recommendation: string, i: number) => <label className="col-12 crops-start-aligned-text body-regular primary-text">{i + 1}. {recommendation}</label>)}
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer className="col-12">
                <div className="col-12 px-0">
                    <div className="row mx-0" >
                        <div className="col-12 col-md-6">
                            <div className="row mx-0 justify-content-start">
                                <button
                                className="col-12 col-md-8 mx-0 crops-other-button"
                                onClick={handleModalDownloadAction}
                                >
                                    Download
                                </button>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 ">
                            <div className="row px-0 justify-content-end">
                                <button 
                                className="col-12 col-md-8 mx-0 crops-accept-button"
                                onClick={handleModalContinueAction}>
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    </>);
};

export default SoilTesting;