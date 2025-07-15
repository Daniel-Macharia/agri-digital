import { Modal } from "react-bootstrap";
import { ErrorMessage, Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";

import * as Yup from "yup";
import { CropDetails } from "../crops-models";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface AddNewCropModalProps{
    show: boolean,
    setShow: Function
};

const AddNewCropModal: React.FC<AddNewCropModalProps> = (props: AddNewCropModalProps) => {

    const [step, setStep] = useState<number>(1);

    const navigate = useNavigate();

    const [selectedPlantingDate, setSelectedPlantingDate] = useState<Date | null>(null);
    const [selectedHarvestingDate, setSelectedHarvestingDate] = useState<Date | null>( null );
    
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const initialValues: CropDetails = {
        cropName: '',
        seedName: '',
        seedVariety: '',
        plantingDate: null,
        expectedHarvestingDate: null
    };

    const validationSchema = Yup.object({
        cropName: Yup.string().required("Crop name is required"),
        seedName: Yup.string().required("seed name is required"),
        seedVariety: Yup.string().required("seed variety is required"),
        plantingDate: Yup.date().required("planting date is required"),
        expectedHarvestingDate: Yup.date().required("harvesting date is required")
    });

    const handleHasSeeds = () => {
        console.log("Farmer has seeds");
        setStep(2);
    };

    const handleRequestForSeeds = () => {
        console.log("Farmer requesting for seeds");
        setStep(2)
    };

    const handleAddCrop = (data: CropDetails, {}:any)=>{

        if( selectedPlantingDate == null )
        {
            console.log("select a date for planting");
            return;
        }

        if( selectedHarvestingDate == null )
        {
            console.log("select a date for harvesting");
            return;
        }

        data.plantingDate = selectedPlantingDate;
        data.expectedHarvestingDate = selectedHarvestingDate;

        setIsSubmitting(true);
        if( !isSubmitting )
        {
            console.log(data);
            props.setShow(false);
            setIsSubmitting(false);
            navigate("/farmer/projects/crops/display-crop-details", {state: data});
        }
        else{
            console.log("not submitting");
            setIsSubmitting(false);
        }
    };

    const render = () => {
        return (<>
        <Modal 
        show={props.show}
        onHide={() => {props.setShow(false); setStep(1);} }
        centered
        
        dialogClassName="mx-auto"
        className="col-sm-12"
        >
            <Modal.Header closeButton
            className="modal-header">
                <Modal.Title className="h2-bold primary-text my-0" 
                >
                    Add New Crop
                </Modal.Title>
            </Modal.Header>

            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleAddCrop}
            
            >
                {({setFieldValue}) => (
                    <Form className="col-12">
                        <Modal.Body>
                            <div 
                            className="col-sm-12"
                            style={{marginBottom: "10px"}}
                            >
                                <label className="col-sm-12 body-regular primary-text my-0">
                                    Crop Name
                                </label>
                                
                                <div className="col-sm-12" >
                                    <Field
                                    className="form-control body-regular col-sm-12 mb-0"
                                    type="text"
                                    name="cropName"
                                    placeholder="Maize"
                                    />
                                    <div className="text-danger small col-sm-12" style={{margin: "0px"}}>
                                        <ErrorMessage name="cropName"/>
                                    </div>
                                </div>
                            </div>

                            <div
                            className="col-sm-12 modal-input-group"
                            style={{display: step == 1 ? "none" : "block", marginBottom: "10px"}}
                            >
                                <label className="col-sm-12 body-regular primary-text my-0" style={{margin: "0px"}}>Seed Name</label>
                                
                                <div className="col-sm-12" >
                                    <Field
                                    className="form-control body-regular col-sm-12 mb-0"
                                    type="text"
                                    name="seedName"
                                    placeholder="Maize"
                                    />
                                    <div className="text-danger small col-sm-12" style={{margin: "0px"}}>
                                        <ErrorMessage name="seedName"/>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-input-group" style={{ marginBottom: "10px"}}>
                                <label className="body-regular primary-text my-0" style={{margin: "0px"}}>Seed Variety</label>
                                

                                <div className="col-sm-12"
                                style={{display: step == 1 ? "none" : "block"}}
                                >
                                    <select
                                    className="form-control body-regular col-sm-12 mb-0"
                                    name="seedVariety"

                                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                        const value = event.target?.value;

                                        if( value === "select variety")
                                            return;

                                        console.log("selected: ", value);
                                        setFieldValue("seedVariety", value);
                                    }}
                                    >
                                        <option selected>select variety</option>
                                        <option>variety one</option>
                                        <option>variety two</option>
                                        <option>variety three</option>
                                        <option>variety four</option>
                                    </select>
                                    <div 
                                    className="text-danger small col-sm-12" 
                                    >
                                        <ErrorMessage name="seedVariety"/>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-input-group"
                            style={{display: step == 1 ? "none" : "block", marginBottom: "10px"}}
                            >
                                <label className="body-regular primary-text my-0 col-sm-12" style={{margin: "0px"}}>Planting Date</label>
                                
                                <div className="col-sm-12">
                                    <DatePicker
                                    selected={ selectedPlantingDate }
                                    onChange={date => {setSelectedPlantingDate( date );
                                        setFieldValue("plantingDate", date);
                                    } }
                                    className="form-control body-regular col-sm-12 bg-light px-2 mb-0"
                                    name="plantingDate"
                                    placeholderText="select planting date"

                                    dateFormat={"MM/dd/yyyy"}
                                    minDate={new Date()}
                                    wrapperClassName="w-100"

                                    />
                                    <div className="text-danger small col-sm-12" style={{margin: "0px", textAlign: "start"}}>
                                        <ErrorMessage name="plantingDate"/>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-input-group"
                            style={{display: step == 1 ? "none" : "block", marginBottom: "10px"}}
                            >
                                <label className="body-regular primary-text my-0 col-sm-12" style={{margin: "0px"}}>Expected Harvesting Date</label>
                                
                                <div className="col-sm-12" >
                                    <DatePicker
                                    className="form-control body-regular col-sm-12 mb-0"
                                    name="expectedHarvestingDate"
                                    placeholderText="select planting date"
                                    dateFormat="MM/dd/yyyy"

                                    selected={selectedHarvestingDate}
                                    onChange={ date => {setSelectedHarvestingDate(date);
                                        setFieldValue("expectedHarvestingDate", date);
                                    } }
                                    minDate={selectedPlantingDate||undefined}

                                    wrapperClassName="w-100"
                                    />

                                    <div className="text-danger small col-sm-12" style={{margin: "0px", textAlign: "start"}}>
                                        <ErrorMessage name="expectedHarvestingDate"/>
                                    </div>
                                </div>

                            </div>

                        </Modal.Body>

                        <Modal.Footer
                        className="col-12"
                        >
                            {
                                ((step == 1) ? (<>
                                <div 
                                className="col-12"
                                >
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="row px-3">
                                                <button
                                                className="col-12 crops-other-button"
                                                disabled={isSubmitting}
                                                onClick={handleHasSeeds}
                                                type="submit"
                                                >
                                                    I have seeds
                                                </button>
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="row px-3">
                                                <button
                                                className="col-12 crops-accept-button"
                                                disabled={isSubmitting}
                                                onClick={handleRequestForSeeds}
                                                type="submit"
                                                >
                                                    Request for seeds
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </>) :(<>
                                <div className="col-12">
                                    <button
                                    className="col-12 crops-accept-button"
                                    type="submit"
                                    disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Adding crop ..." : "Add Crop"}
                                    </button>
                                </div>
                                </>))
                            }
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>

        </Modal>
        </>);
    };
    return render();
}

export default AddNewCropModal;