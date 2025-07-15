import { Modal } from "react-bootstrap";
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
        activityDescription: Yup.string().required("activity is required"),
        activityDate: Yup.date().required("activity date is required")
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
        setSelectedDate(null);
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
        <div className="col-12 my-1 mb-3">
            <div className="row justify-content-end mx-0">
                <button
                className="col-12 col-md-4 crops-accept-button"
                onClick={()=>{
                    addNewCropModalSetShow(true);
                }}
                >
                    Add a New Crop
                </button>
            </div>
        </div>
        <div className="col-12 crops-container bg-white mx-0"> 
                <div className="col-sm-12">

                    <div className="col-12">
                        <div className="row m-0">
                            <div className="col-11 col-md-10">
                                <div className="row justify-content-start">
                                    <div className="col-2 ">
                                        <div className="row justify-content-start">
                                            <img src="/assets/images/plant_green.svg"
                                            style={{width: "48px"}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-10">
                                        <div className="row justify-content-start align-items-center py-0 my-0" >
                                            <h3 className="h3-bold primary-text col-12 crops-start-aligned-text my-0" >
                                                {details.cropName}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-1 col-md-2 p-0 ">
                                <img src="/assets/images/edit.svg"
                                style={{width: "24px"}}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="row m-0">

                            <div className="col-12 col-md-6 order-1"
                            >
                                <div className="col-12 mt-0 ">
                                    <div className="row mx-0 my-1 crops-container" style={{backgroundColor: "var(--Light-Blue, #E1EEFF)"}}>
                                        <div className="col-2 col-md-1 p-1">
                                            <img src="/assets/images/clock.svg" className="col-12 m-0"/>
                                        </div>
                                        <div className="col-10 col-md-11" >
                                            <div className="row">
                                                <p className="col-12 col-md-6 body-regular primary-text crops-start-aligned-text m-0 my-1">
                                                    Planting Date: 
                                                </p>
                                                <p className="body-bold primary-text col-12 col-md-6 crops-start-aligned-text m-0 my-1">
                                                    {details.plantingDate?.toDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 ">
                                    <div className="row mx-0 my-1 crops-container" style={{backgroundColor: "var(--light-red, #FFF1E9)"}}>
                                        <div className="col-2 col-md-1 p-1">
                                            <img src="/assets/images/sun.svg" className="col-12 m-0"/>
                                        </div>
                                        <div className="col-10 col-md-11" >
                                            <div className="row ">
                                                <p  className="col-12 col-md-6 body-regular primary-text crops-start-aligned-text m-0 my-1">
                                                    Harvesting Date: 
                                                </p>
                                                <p className="body-bold primary-text col-12 col-md-6 crops-start-aligned-text m-0 my-1">
                                                    {details.expectedHarvestingDate?.toDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6 order-2 p-2"
                            style={{ 
                            backgroundColor: "whitesmoke",
                            borderRadius: '4px'
                            }}>
                                <div className="col-12"
                                >
                                    <div className="row">
                                        <div className="col-6 py-0">
                                            <h3 className="small-bold col-12 my-0" style={{
                                            alignSelf: "center"}}>
                                                Activities
                                            </h3>
                                        </div>
                                        <div className="col-6 py-0">
                                            <button 
                                            type="button"
                                            className="small-semibold col-12 my-0 py-0"
                                            onClick={()=>{
                                                console.log("adding activity..");
                                                setShow(true);
                                            }}
                                            style={{
                                                background: 'none', 
                                                borderStyle: 'none', 
                                                color: 'var(--primary)',
                                                minWidth: "max-content"
                                            }}
                                            >
                                                Add Activity
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    {
                                        (activities === null ) ?
                                            (<div className="col-12">
                                                <p className="col-12">
                                                    No activity scheduled yet.
                                                </p>
                                            </div>)
                                            
                                        : (activities.map( (activity) => <div className="col-12" >
                                                <PlantingActivityItem 
                                                activityDate={activity.activityDate} 
                                                activityDescription={activity.activityDescription} />
                                                </div>
                                            ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 my-1" style={{paddingTop: "40vh"}}>
                    <div className="row justify-content-end m-0">
                        <button
                        className="col-12 col-md-4 crops-accept-button"
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

        className="col-12"
        >

         <Formik
         initialValues={initialValues}
         validationSchema={validationSchema}
         onSubmit={handleAddActivity}

         >
            {({setFieldValue})=>(
                <Form className="col-12" >
                    <Modal.Header closeButton className="col-12 p-2">
                        <Modal.Title className="col-8 m-0 " >
                            <p className="h2-bold primary-text my-0">
                                Add Activity
                            </p>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="col-12">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12">
                                    <label className="crops-start-aligned-text body-regular primary-text col-12 m-0">
                                        Activity Description
                                    </label>
                                </div>
                                
                                <div className="col-12 mb-3" >
                                    <Field
                                    className="form-control body-regular col-12 mb-0"
                                    type="text"
                                    name="activityDescription"
                                    placeholder="e.g weeding"
                                    />
                                    <div className="text-danger small col-12">
                                        <ErrorMessage name="activityDescription"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <label className="crops-start-aligned-text body-regular primary-text col-12 mb-0">
                                Activity Date
                            </label>
                            
                            <div className="col-12" >
                                <div className="row">
                                    <div className="col-10">
                                        <DatePicker
                                        className="form-control body-regular mb-0"
                                        name="activityDate"
                                        placeholderText="select activity date"
                                        selected={selectedDate}
                                        onChange={ date => {setSelectedDate(date);
                                            setFieldValue("activityDate", date);
                                        } }

                                        dateFormat={"MM/dd/yyyy"}
                                        minDate={new Date()}

                                        wrapperClassName="w-100"
                                        />
                                        <div className="text-danger small col-sm-12">
                                            <ErrorMessage name="activityDate"/>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <img src="/assets/images/calendar.svg" style={{width: "32px", height: "32px"}}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Modal.Body>

                    <Modal.Footer className="col-12">
                        <div className="col-12">
                            <button
                            className="col-12 crops-accept-button"
                            type="submit"
                            disabled={isSubmitting}
                            >
                                { isSubmitting ? "Adding activity .." : "Add Activity" }
                            </button>
                        </div>
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