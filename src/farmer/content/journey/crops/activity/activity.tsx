import { ErrorMessage, Field, Form, Formik } from "formik";

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
    activityDescription: string|null
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

    const handleAddActivity = ( data: AddActivityProps ) => {
        console.log("adding activity");
        console.log(data);
    };

    const handleUploadImageAction = () => {
        fileInputRef.current?.click();
    };

    const initialValues: AddActivityProps = {
        activityType: '',
        activityDate: null,
        activityTime: null,
        previewUrl: null,
        activityDescription: null
    };

    const validationSchema = Yup.object({
        activityType: Yup.string().required("activity type is required").typeError("activity type required"),
        activityDate: Yup.date().required("date is required"),
        activityTime: Yup.string().required("select time"),
        previewUrl: Yup.string().required("select image"),
        activityDescription: Yup.string().nullable()
    });

    return (<>
        <div className="row p-2" style={{backgroundColor: "white", borderRadius: "8px"}}>

            <div className="col-12 col-md-6 pe-md-4">
                <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleAddActivity}
                >
                    {({setFieldValue}) => (
                        <Form className="col-12">
                            <div className="row">
                                <h3
                                className="h3-bold primary-text crops-start-aligned-text col-12">
                                    Add New Activity
                                </h3>
                            </div>
                            
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="activityType" 
                                        className="crops-start-aligned-text body-regular primary-text col-12 m-0">
                                            Activity Type
                                        </label>
                                    </div>

                                    <div className="col-12" >
                                        <Field
                                        name="activityType"
                                        className="form-control body-regular col-12 mb-0"
                                        type="text"
                                        placeholder="activity type here"

                                        />

                                        <div className="col-12 text-danger small" 
                                        style={{textAlign: "start"}}>
                                            <ErrorMessage name="activityType" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <div className="col-12 ">
                                        <label htmlFor="activityDate" 
                                        className="crops-start-aligned-text body-regular primary-text col-12 m-0">
                                            Date
                                        </label>
                                    </div>

                                    <div className="col-12">
                                        <DatePicker
                                        className="form-control body-regular bg-light col-12 mb-0 p-1 px-2"
                                        name="activityDate"
                                        dateFormat={"MM/dd/yyyy"}
                                        selected={selectedDate}
                                        onChange={date => {setSelectedDate( date );
                                            setFieldValue( "activityDate", date);
                                        } }
                                        minDate={new Date()}
                                        placeholderText="select activity date"
                                        wrapperClassName="w-100"
                                        />

                                        <div className="col-12 m-0 text-danger small crops-start-aligned-text"
                                        >
                                            <ErrorMessage name="activityDate" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <div className="col-12">
                                        <label htmlFor="activityTime" 
                                        className="crops-start-aligned-text body-regular primary-text col-12 m-0">
                                            Time
                                        </label>
                                    </div>

                                    <div className="col-12">
                                        <TimePicker
                                        className="form-control body-regular col-12 mb-0"
                                        name="activityTime"
                                        value={selectedTime}
                                        onChange={time => {setSelectedTime(time); console.log("Selected time: ", time);
                                            setFieldValue("activityTime", time);
                                        }}
                                        disableClock={true}
                                        clearIcon={null}
                                        
                                        />

                                        <div className="col-12 m-0 text-danger small" 
                                        style={{ textAlign: "start"}}>
                                            <ErrorMessage name="activityTime" />
                                        </div>
                                    </div>
                                    
                                </div>

                                <div className="row mt-2">
                                    <div className="col-12">
                                        <label htmlFor="activityImage" 
                                        className="crops-start-aligned-text body-regular primary-text col-12 m-0">
                                            Upload Image
                                        </label>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-control col-12"
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
                                            name="previewUrl"
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            style={{display: "none"}}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                const file = event.target.files?.[0];

                                                if( file )
                                                {
                                                    console.log("loaded file: ", file.name);

                                                    setPreviewUrl( URL.createObjectURL(file) );
                                                    setFieldValue("previewUrl", file.name);
                                                }
                                                else{
                                                    console.log("File upload failed !");
                                                }
                                            }}
                                            />

                                            <img src={previewUrl||"/assets/images/upload_photo.svg"}
                                            className={previewUrl ? 'col-4' : "col-1"}
                                            />
                                            <p>Upload Photo of the Product<br/>PDF,PNG,JPG up to 10 MB </p>
                                            <div className="text-danger small">
                                                <ErrorMessage name="previewUrl" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <div className="col-12">
                                        <label htmlFor="activityDescription" 
                                        className="crops-start-aligned-text body-regular primary-text col-12 m-0">
                                            Description
                                        </label>
                                    </div>

                                    <div className="col-12" >
                                        <textarea
                                        className="form-control body-regular col-12"
                                        name="activityDescription"

                                        style={{height: "88px"}}
                                        placeholder="activity description"

                                        onChange={(event) => {
                                            //setFieldValue('activityDescription', value);
                                            const value = event.target?.value;
                                            console.log(value);
                                            setFieldValue("activityDescription", value);
                                        }}
                                        />
                                        <div className="col-12 text-danger small m-0" style={{textAlign: "start"}}>
                                            <ErrorMessage name="activityDescription" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mx-0 px-0" >
                                <div className="row justify-content-start">
                                    <button
                                    type="submit"
                                    className="col-12 col-md-4 mx-0 crops-accept-button"
                                    >
                                        Add Activity
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

            <div className="col-12 col-md-6 ps-md-4">
                <h3 className="h3-bold primary-text crops-start-aligned-text">Upcoming Activities</h3>

                <div className="row ps-md-3" >
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
        </div>
    </>);
};

// export default ActivityAddAndReview;