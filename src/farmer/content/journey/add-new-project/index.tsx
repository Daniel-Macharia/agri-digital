import { Button, Modal } from "react-bootstrap";
import "./index.css";
import { Field, Form, Formik } from "formik";

import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface StartProjectProps{
    show:boolean,
    setShow: Function
};

export default function StartNewProjectModal( props: StartProjectProps){

    const [livestockSelected, setLivestockSelected] = useState<boolean>(false);
    const [cropSelected, setCropSelected] = useState<boolean>(false);

    const [livestockName, setLivestockName] = useState<string|null>(null);

    const navigate = useNavigate();

    const handleStartCropProject = () => {
        console.log("Starting crop project");
        //props.setShow(false);
        setCropSelected(true);
    };

    const handleStartLivestockProject = () => {
        console.log("Starting livestock project");
        //props.setShow(false);
        setLivestockSelected(true);
    };

    const cropInitialValues = {
        cropName: ''
    };

    const livestockInitialValues = {
        livestockProjectName: ''
    };

    const cropValidationSchema = Yup.object({
        cropName: Yup.string().required("")
    });

    const livestockValidationSchema = Yup.object({
        livestockProjectName: Yup.string().required("")
    });


    const handleCropSubmitAction = (data: typeof cropInitialValues) => {
        const cropName = data.cropName;
        console.log("Crop selected: ", cropName);

        setCropSelected(false);
        props.setShow(false);

        navigate("/farmer/projects/crops/assessment")
    };

    const handleLivestockSubmitAction = (data: typeof livestockInitialValues) => {
        
        if( livestockName == null )
        {
            console.log("Livestock not selected!");
            return;
        }

        const livestockProjectName = data.livestockProjectName;
        console.log("Livestock selected: ", livestockName);
        console.log("Livestock project: ", livestockProjectName);
        
        setLivestockSelected(false);
        props.setShow(false);

        navigate("/farmer/projects/livestock/typebreed");
    };

    const handleLivestockValueChange = ( event: React.ChangeEvent<HTMLSelectElement>) => {
        const livestockChosen: string = event.target?.value;
        console.log(livestockChosen);
        setLivestockName( livestockChosen );
    };

    
    
    return (<>
    <Modal
        show={props.show}
        onHide={() => {
            props.setShow(false);
            setCropSelected(false);
            setLivestockSelected(false);
        } }
        centered
        className="modal-container"
        >

            <Modal.Header className="modal-header">
                <Modal.Title className="modal-title col-sm-12"
                style={{display: "flex", flexDirection: "column", alignItems: "center"}}
                >
                    <img src="/assets/images/question.svg" />
                    <p className="body-semibold">Project</p>
                </Modal.Title>
                
            </Modal.Header>

            <Modal.Body className="modal-body">
                <div id="step-one" 
                style={
                    (cropSelected || livestockSelected) ?({ display: "none" }): ( {display: 'flex', flexDirection: "column", alignItems: "center"})}>
                    <p>Ready to start your farming adventure ?</p>
                    <p>Choose your journey</p>
                </div>

                
                <div id="step-two-crops"
                style={{display: cropSelected ? "flex" : "none"}}
                >
                    <Formik
                    initialValues={cropInitialValues}
                    validationSchema={cropValidationSchema}
                    onSubmit={handleCropSubmitAction}
                    >
                    {({}) => (
                        <Form>
                            <div className="modal-input-group" >
                                <label className="modal-label" htmlFor="cropName" >
                                    Crop Name
                                </label>

                                <Field
                                placeholder="Maize"
                                type="text"
                                name="cropName"
                                />
                            </div>
                            
                            <div id="step-two" className="row col-sm-12"
                            >
                                <div className="col-sm-12">
                                    <Button
                                    type="submit"
                                    className="col-sm-12"

                                    style={{margin: "opx"}}
                                    >
                                        Start Journey
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
                            </div>
                

                <div id="step-two-livestock"
                style={{display: livestockSelected ? "flex" : "none"}}
                >
                    <Formik
                    initialValues={livestockInitialValues}
                    validationSchema={livestockValidationSchema}
                    onSubmit={handleLivestockSubmitAction}
                    >
                    {({}) => (
                        <Form>

                            <div className="modal-input-group">
                                <label className="modal-input-label" htmlFor="livestockProjectName">
                                    Project Name
                                </label>
                                <Field
                                type="text"
                                placeholder="livetock name here"
                                name="livestockProjectName"
                                />
                            </div>
                        <div className="modal-input-group" >

                            <label className="modal-label" htmlFor="livestockName" >
                                Select Livestock
                            </label>


                            <select
                            name="livestockName"
                            className="modal-input-field"
                            onChange={handleLivestockValueChange}
                            >
                                <option>SELECT</option>
                                <option>Cattle</option>
                                <option>Sheep</option>
                            </select>
                        </div>

                        <div id="step-two" className="row col-sm-12"
                        >
                            <div className="col-sm-12">
                                <Button
                                type="submit"
                                className="col-sm-12"

                                style={{margin: "opx"}}
                                >
                                    Start Journey
                                </Button>
                            </div>
                        </div>
                        </Form>
                        )}
                    </Formik>
                </div>
            </Modal.Body>

            <Modal.Footer className="modal-footer col-sm-12">
                <div id="step-one" className="col-sm-12"
                style={{ padding: '8px',
                    display: (cropSelected || livestockSelected) ? "none" : 'flex', 
                    flexDirection: 'row'}}
                >
                    <div className="col-sm-4"
                    >
                        <Button
                        type="button"
                        onClick={handleStartCropProject}
                        className="col-sm-12"
                        
                        style={{margin: '0px'}}
                        >
                            Crops
                        </Button>
                    </div>

                    <div className="col-sm-4 offset-4"
                    >
                        <Button
                        type="button"
                        onClick={handleStartLivestockProject}
                        className="col-sm-12"

                        style={{margin: '0px'}}
                        >
                            Livestock
                        </Button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    </>);
}
