import { Button, Modal } from "react-bootstrap";
import "./display-crop-details.css";
import "/src/index.css";
import { CropDetails, PlantingActivity } from "../crops-models";
import PlantingActivityItem from "./planting-activity-item";
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";

import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import AddNewCropModal from "./add-new-crop-modal";
import { storageGet, storagePut } from "../../../../../auth/sign-in/utils/StorageUtils";

const DisplayCropDetails: React.FC = ()=>{

    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState<Date|null>(null);

    const [show, setShow] = useState<boolean>(false);
    const [addNewCropModalShow, addNewCropModalSetShow] = useState<boolean>(false);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


    let details: CropDetails = useLocation().state;

    let activities: PlantingActivity[] | null = storageGet<PlantingActivity[]>("plantingActivity");

    const initialValues: PlantingActivity = {
        activityDescription: '',
        activityDate: new Date()
    };

    const validationSchema = Yup.object({
        activityDescription: Yup.string().required("Required"),
        activityDate: Yup.date().required("Required")
    });


    const handleAddActivity = ( data: PlantingActivity, {} : any)=>{
        console.log("adding activity");
        console.log(data);

        if( activities === null )
            activities = [];

        activities[activities.length] = data;

        storagePut("plantingActivity", activities);

        setIsSubmitting(false);
        setShow(false);
    };
    
    const handleContinueAction = () => {
        navigate("/farmer/projects/crops/management");
    };

    const render = ()=>{
        console.log("received");
        console.log(details);
        return (<>
        <div className="col-sm-12"
        style={{height: '100vh'}}> 
            
            <div className="col-sm-12">
                <Button
                className="col-sm-4 offset-8"
                variant="primary"
                onClick={()=>{
                    addNewCropModalSetShow(true);
                }}
                >
                    Add a New Crop
                </Button>
            </div>

            <div className="crop-details-main-content col-sm-12"
            style={{backgroundColor: 'white', borderRadius: "20px", height: "80%",
                display: "flex", flexDirection: 'column', justifyContent: 'space-between'
            }}
            >
                <div>
                    <div className="row-sm-12 crop-details-top-bar">
                        <img src="/assets/images/plant.svg" className="crop-icon crop-details-top-bar-item"/>
                        <h3 className="body-semibold col-sm-11 crop-label crop-details-top-bar-item" >
                            {details.cropName}
                        </h3>
                        <img src="/assets/images/edit.svg" className="crop-icon crop-details-top-bar-item" />
                    </div>

                    <div className="col-sm-12 crop-details-content-div" 
                    >

                        <div className="col-sm-12 col-md-6 order-1"
                        >
                            <div className="row-sm-12 crop-details-date-container">
                                <img src="/assets/images/bank.svg" className="crop-details-date-icon" />
                                <div className="row col-sm-10 crop-details-date-label">
                                    <p className="col-sm-5 small-regular crop-details-date-label">
                                        Planting Date: 
                                    </p>
                                    <p className="small-bold col-sm-5 crop-details-date-label"> {details.plantingDate.toDateString()}</p>
                                </div>
                            </div>

                            <div className="row-sm-12 crop-details-date-container">
                                <img src="/assets/images/bank.svg" className="crop-details-date-icon"/>
                                <div className="row col-sm-10 crop-details-date-label">
                                    <p className="col-sm-5 small-regular crop-details-date-label">
                                        Harvesting Date: 
                                    </p>
                                    <p className="small-bold col-sm-5 crop-details-date-label"> {details.expectedHarvestingDate.toDateString()}</p>
                                </div>
                            </div>

                        </div>

                        <div className="col-sm-12 col-md-6 order-2"
                        style={{ 
                        padding: '10px', 
                        backgroundColor: "whitesmoke",
                        borderRadius: '4px',
                        }}>
                            <div className="row col-sm-12 display-crops-activities-review-top-bar">
                                <h3 className="body-semibold col-sm-3" style={{margin: '0px'}}>
                                    Activities
                                </h3>
                                <button 
                                type="button"
                                className="col-sm-3 offset-6"
                                onClick={()=>{
                                    console.log("adding activity..");
                                    setShow(true);
                                }}
                                style={{
                                    background: 'none', 
                                    borderStyle: 'none', 
                                    margin: '0px', 
                                    padding: '0px', 
                                    color: 'var(--primary)'}}
                                >
                                    Add Activity
                                </button>
                            </div>
                            <div className="col-sm-12" style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap:'10px',
                                
                                }}>
                                {
                                    //( activities.length === 0 ) ?
                                    (activities === null ) ?
                                        (<div>
                                            <p>
                                                No activity scheduled yet.
                                            </p>
                                        </div>)
                                        
                                    : (activities.map( (activity) => 
                                            <PlantingActivityItem 
                                            activityDate={activity.activityDate} 
                                            activityDescription={activity.activityDescription} />
                                        ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12"
                style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', 
                justifySelf: 'end'}}>
                    <button
                    style={{width: 'fit-content'}}
                    onClick={handleContinueAction}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>

        <AddNewCropModal show={addNewCropModalShow} setShow={addNewCropModalSetShow} />

        <Modal
        show={show}
        onHide={()=> setShow(false) }
        centered
        className="modal-container"
        >

         <Formik
         initialValues={initialValues}
         validationSchema={validationSchema}
         onSubmit={handleAddActivity}

         >
            {({})=>(
                <Form>
                    <Modal.Header closeButton className="modal-header">
                        <Modal.Title className="modal-title">
                            <p className="h3-semibold">Add Activity</p>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="modal-input-group">
                            <label className="modal-input-label">Activity Description</label>
                        
                            <div className="text-danger small">
                                <ErrorMessage name="activityDescription"/>
                            </div>
                            <Field
                            className="modal-input-field"
                            type="text"
                            name="activityDescription"
                            placeholder="e.g weeding"
                            />
                        </div>

                        <div className="modal-input-group">
                            <label className="modal-input-label">Activity Date</label>
                        
                            <div className="text-danger small">
                                <ErrorMessage name="activityDate"/>
                            </div>
                            <DatePicker
                            className="modal-input-field"
                            name="activityDate"
                            placeholderText="select activity date"
                            selected={selectedDate}
                            onChange={ date => setSelectedDate(date) }

                            dateFormat={"MM/dd/yyyy"}
                            minDate={new Date()}
                            />
                        </div>

                    </Modal.Body>

                    <Modal.Footer className="modal-footer"
                    style={{padding: '4px'}}>
                        <Button
                        className="col-sm-12"
                        variant="primary"
                        type="submit"
                        disabled={isSubmitting}
                        
                        >
                            { isSubmitting ? "Adding activity .." : "Add Activity" }
                        </Button>
                    </Modal.Footer>
                </Form>
            )}

         </Formik>

        </Modal>

        </>)
    };

    return render();
};

export default DisplayCropDetails;