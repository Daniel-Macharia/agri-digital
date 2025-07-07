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
import { storageDelete, storageGet, storagePut } from "../../../../../auth/sign-in/utils/StorageUtils";

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
        activityDate: null
    };

    const validationSchema = Yup.object({
        activityDescription: Yup.string().required("Required"),
        activityDate: Yup.date().notRequired()//.required("Required")
    });


    const handleAddActivity = ( data: PlantingActivity, {} : any)=>{

        if( selectedDate == null )
        {
            console.log("invalid date!");
            return;
        }

        data.activityDate = selectedDate;
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
        
        storageDelete("plantingActivity");
    };

    const render = ()=>{
        console.log("received");
        console.log(details);
        return (<>
        <div className="col-sm-12"
        style={{minHeight: '100vh'}}> 
            
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
            style={{backgroundColor: 'white', borderRadius: "8px", height: "80%",
                display: "flex", flexDirection: 'column', justifyContent: 'space-between'
            }}
            >
                <div className="col-sm-12">
                    <div className="row col-sm-12"
                    style={{display: "flex",
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        alignItems: "start",
                        paddingTop: "10px",
                        marginBottom: "0px"
                    }}>
                        <div className="row col-sm-8"
                        style={{display: "flex", flexDirection: "row", alignItems: "start",
                            paddingLeft: "26px"
                        }}>
                            <img src="/assets/images/plant_green.svg"
                            style={{width: "max-content"}}
                            />
                            <h3 className="body-semibold col-sm-8 crop-label" 
                            style={{
                                alignSelf: "center",
                            }}>
                                {details.cropName}
                            </h3>
                        </div>
                        <img src="/assets/images/edit.svg"
                        style={{width: "max-content"}}
                        />
                    </div>

                    <div className="row col-sm-12"
                    style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "flex-start"
                    }} 
                    >

                        <div className="col-sm-12 col-md-6 order-1"
                        style={{marginTop: "0px", paddingTop: "0px"}}
                        >
                            <div className="row col-sm-12 crop-details-date-container" style={{marginTop: "0px"}}>
                                <img src="/assets/images/bank.svg" className="crop-details-date-icon"
                                style={{alignSelf: "start"}} />
                                <div className="row col-sm-10 crop-details-date-label">
                                    <p className="col-sm-5 small-regular crop-details-date-label">
                                        Planting Date: 
                                    </p>
                                    <p className="small-bold col-sm-5 crop-details-date-label"> {details.plantingDate?.toDateString()}</p>
                                </div>
                            </div>

                            <div className="row col-sm-12 crop-details-date-container">
                                <img src="/assets/images/bank.svg" className="crop-details-date-icon"
                                style={{alignSelf: "flex-start"}}/>
                                <div className="row col-sm-10 crop-details-date-label">
                                    <p className="col-sm-5 small-regular crop-details-date-label">
                                        Harvesting Date: 
                                    </p>
                                    <p className="small-bold col-sm-5 crop-details-date-label"> {details.expectedHarvestingDate?.toDateString()}</p>
                                </div>
                            </div>

                        </div>

                        <div className="col-sm-12 col-md-6 order-2"
                        style={{ 
                        backgroundColor: "whitesmoke",
                        borderRadius: '4px',
                        padding: "10px"
                        }}>
                            <div className="row col-sm-12"
                            style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <h3 className="small-bold col-sm-4" style={{margin: '0px', 
                                    paddingLeft: "0px",
                                    alignSelf: "center"}}>
                                    Activities
                                </h3>
                                <button 
                                type="button"
                                className="small-semibold"
                                onClick={()=>{
                                    console.log("adding activity..");
                                    setShow(true);
                                }}
                                style={{
                                    background: 'none', 
                                    borderStyle: 'none', 
                                    margin: '0px', 
                                    padding: '0px', 
                                    color: 'var(--primary)',
                                    width: "max-content"
                                }}
                                >
                                    Add Activity
                                </button>
                            </div>
                            <div className="col-sm-12" style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap:'10px',
                                paddingBottom: "10px"
                                
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
                style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginBottom: "20px"}}>
                    <button
                    style={{width: 'fit-content', marginRight: "20px"}}
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

        dialogClassName="mx-auto"

        className="col-sm-12"
        >

         <Formik
         initialValues={initialValues}
         validationSchema={validationSchema}
         onSubmit={handleAddActivity}

         >
            {({})=>(
                <Form className="col-sm-12" >
                    <Modal.Header closeButton className="col-sm-12" style={{padding: "10px"}}>
                        <Modal.Title className="col-sm-8 "
                        style={{margin: "0px"}}>
                            <p className="h3-semibold" style={{margin: "0px"}}>Add Activity</p>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="col-sm-12">
                            <label className="form-label" style={{margin: "0px"}}>Activity Description</label>
                            
                            <div className="col-sm-12" >
                                <Field
                                className="form-control col-sm-12"
                                type="text"
                                name="activityDescription"
                                placeholder="e.g weeding"
                                />
                                <div className="text-danger small col-sm-12">
                                    <ErrorMessage name="activityDescription"/>
                                </div>
                            </div>
                        </div>

                        <div className="cocl-sm-12">
                            <label className="form-label col-sm-12">Activity Date</label>
                        
                            
                            <div className="col-sm-12" >
                                <DatePicker
                                className="form-control"
                                name="activityDate"
                                placeholderText="select activity date"
                                selected={selectedDate}
                                onChange={ date => setSelectedDate(date) }

                                dateFormat={"MM/dd/yyyy"}
                                minDate={new Date()}

                                wrapperClassName="w-100"
                                />
                                <div className="text-danger small col-sm-12">
                                    <ErrorMessage name="activityDate"/>
                                </div>
                            </div>
                        </div>

                    </Modal.Body>

                    <Modal.Footer className="col-sm-12">
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