import { ErrorMessage, Field, Form, Formik } from "formik";
import "./activity.css";

import * as Yup from "yup";
import { ManagementActivityProps } from "../crops-models";
import ManagementActivity from "./management-activity";
import DatePicker from "react-datepicker";
import React, { useRef, useState } from "react";
import TimePicker from "react-time-picker";

interface AddActivityProps{
    activityType: string,
    activityDate: Date|null,
    activityTime: string|null,
    previewUrl: string|null,
    activityDescription: string
};

export default function ActivityAddAndReview() {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string|null>(null);

    const [selectedDate, setSelectedDate] = useState<Date|null>(null);
    const [selectedTime, setSelectedTime] = useState<string|null>(null);

    let managementActivities: ManagementActivityProps[] = [
        {"activityName" : "Weed the vegetables",
            "activityDescription": "Apply herbicides", 
            "activityCompletionDate": (new Date()).toDateString(),
            "activityCompletionTime": "",
            "activityCompleted": false
        },
        {"activityName" : "Irrigate the farm",
            "activityDescription": "Use overhead irrigation", 
            "activityCompletionDate": (new Date()).toDateString(),
            "activityCompletionTime": "",
            "activityCompleted": true
        },
        {"activityName" : "Apply composed manure",
            "activityDescription": "Apply composed manure to the farm.", 
            "activityCompletionDate": (new Date()).toDateString(),
            "activityCompletionTime": "",
            "activityCompleted": true
        },
        {"activityName" : "Check moisture content",
            "activityDescription": "check soil moisture content",
            "activityCompletionDate": (new Date()).toDateString(),
            "activityCompletionTime": "",
            "activityCompleted": true
        }
    ];

    const handleAddActivity = () => {
        console.log("adding activity");
    };

    const handleUploadImageAction = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = ( event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if( file )
        {
            console.log("loaded file: ", file.name);

            setPreviewUrl( URL.createObjectURL(file) );
        }
        else{
            console.log("File upload failed !");
        }
    };

    const initialValues: AddActivityProps = {
        activityType: '',
        activityDate: null,
        activityTime: null,
        previewUrl: null,
        activityDescription: ''
    };

    const validationSchema = Yup.object({
        activityType: Yup.string().required("required").typeError("activity type required"),
        activityDate: Yup.date().notRequired(),
        activityTime: Yup.string().notRequired(),
        previewUrl: Yup.string().notRequired(),
        activityDescription: Yup.string().required().test( desc => desc?.length > 0 )
    });

    const render = () => {
        return (<>
        <div 
            className="row col-sm-12" 
            id="management-activity-div"
            >

                <div id="add-management-activity-div"
                className="col-sm-10 col-md-6">
                    <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleAddActivity}
                    >
                        {({}) => (
                            <Form id="management-form"
                            >
                                <h3
                                className="h3-regular">
                                    Add New Activity
                                </h3>
                                
                                <div id="add-management-activity-form-body"
                                className="col-sm-12">
                                    <div className="management-input-group col-sm-12">
                                        <label htmlFor="activityType" className="management-input-label col-sm-12">
                                            Activity Type
                                        </label>

                                        <div className="col-sm-12" >
                                            <Field
                                            name="activityType"
                                            className="activity-input-field body-regular col-sm-12"
                                            type="text"
                                            placeholder="activity type here"

                                            />

                                            <div className="col-sm-12 text-danger small" style={{textAlign: "start"}}>
                                                <ErrorMessage name="activityType" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="management-input-group ">
                                        <label htmlFor="activityDate" className="management-input-label ">
                                            Date
                                        </label>

                                        <DatePicker
                                        className="activity-input-field body-regular"
                                        name="activityDate"
                                        dateFormat={"MM/dd/yyyy"}

                                        selected={selectedDate}
                                        onChange={date => setSelectedDate( date ) }

                                        minDate={new Date()}

                                        />
                                    </div>

                                    <div className="management-input-group col-sm-12">
                                        <label htmlFor="activityTime" className="management-input-label col-sm-12">
                                            Time
                                        </label>

                                        <TimePicker
                                        className="activity-input-field body-regular col-sm-12"
                                        name="activityTime"
                                        value={selectedTime}
                                        onChange={time => {setSelectedTime(time); console.log("Selected time: ", time)}}
                                        disableClock={true}
                                        clearIcon={null}
                                        />
                                    </div>

                                    <div className="management-input-group col-sm-12">
                                        <label htmlFor="activityImage" className="management-input-label col-sm-12">
                                            Upload Image
                                        </label>

                                        <div className="management-input-field col-sm-12"
                                        onClick={handleUploadImageAction}
                                        style={{borderStyle: "dashed",
                                            borderWidth: "1px",
                                                display:"flex",
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <input
                                            name="activityImage"
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            style={{display: "none"}}
                                            onChange={handleFileChange}
                                            />

                                            <img src={previewUrl||"/assets/images/upload_photo.svg"}
                                            className={previewUrl ? 'col-sm-8' : "col-sm-1"}
                                            />
                                            <p>Upload Photo of the Product<br/>PDF,PNG,JPG up to 10 MB </p>
                                        </div>
                                    </div>

                                    <div className="management-input-group col-sm-12">
                                        <label htmlFor="activityDescription" className="management-input-label col-sm-12">
                                            Description
                                        </label>

                                        <div className="col-sm-12" >
                                            <textarea
                                            className="activity-input-field body-regular col-sm-12"
                                            name="activityDescription"

                                            />
                                            <div className="col-sm-12 text-danger small" style={{textAlign: "start"}}>
                                                <ErrorMessage name="activityType" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="actions-div"
                                className="col-sm-12" >
                                    <button
                                    type="submit"
                                    className="col-sm-12"
                                    >
                                        Add Activity
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>

                <div id="review-management-activity-div"
                className="col-sm-10 col-md-6">
                    <h3>Upcoming Activities</h3>

                    {
                        
                        managementActivities.map( activity => <ManagementActivity 
                            activityName={activity.activityName} 
                            activityDescription={activity.activityDescription} 
                            activityCompletionDate={activity.activityCompleted ? "DONE" : activity.activityCompletionDate} 
                            activityCompletionTime={activity.activityCompleted ? "" : activity.activityCompletionTime} 
                            activityCompleted={activity.activityCompleted} />)
                    }
                </div>
            </div>
        </>);
    };

    return render();
};

// export default ActivityAddAndReview;