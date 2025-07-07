import { Button, Modal } from "react-bootstrap";
import "./add-new-crop-modal.css";
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
        plantingDate: Yup.date().notRequired(),//.nullable().required("planting date is required"),
        expectedHarvestingDate: Yup.date().notRequired()//.nullable().required("harvesting date is required")
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
        
        className="modal-container"
        >
            <Modal.Header closeButton
            className="modal-header">
                <Modal.Title className="h3-semibold" style={{
                    margin: "0px"
                }}>
                    Add Crop
                </Modal.Title>
            </Modal.Header>

            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleAddCrop}
            
            >
                {({}) => (
                    <Form>
                        <Modal.Body>
                            <div 
                            className="col-sm-12"
                            style={{marginBottom: "10px"}}
                            >
                                <label className="col-sm-12 form-label" style={{margin: "0px"}}>Crop Name</label>
                                
                                <div className="col-sm-12" >
                                    <Field
                                    className="form-control col-sm-12"
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
                                <label className="col-sm-12 form-label" style={{margin: "0px"}}>Seed Name</label>
                                
                                <div className="col-sm-12" >
                                    <Field
                                    className="form-control col-sm-12"
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
                                <label className="form-label" style={{margin: "0px"}}>Seed Variety</label>
                                

                                <div className="col-sm-12"
                                style={{display: step == 1 ? "none" : "block"}}
                                >
                                    <Field
                                    className="form-control col-sm-12"
                                    type="text"
                                    name="seedVariety"
                                    placeholder="Maize"
                                    />
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
                                <label className="form-label col-sm-12" style={{margin: "0px"}}>Planting Date</label>
                                
                                <div className="col-sm-12">
                                    <DatePicker
                                    selected={ selectedPlantingDate }
                                    onChange={date => setSelectedPlantingDate( date ) }
                                    className="form-control col-sm-12 bg-light"
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
                                <label className="form-label col-sm-12" style={{margin: "0px"}}>Expected Harvesting Date</label>
                                
                                <div className="col-sm-12" >
                                    <DatePicker
                                    className="form-control col-sm-12"
                                    name="expectedHarvestingDate"
                                    placeholderText="select planting date"
                                    dateFormat="MM/dd/yyyy"

                                    selected={selectedHarvestingDate}
                                    onChange={ date => setSelectedHarvestingDate(date) }
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
                        className="col-sm-12"
                        >
                            <div 
                            className="row col-sm-12"
                            style={{display: step == 1 ? "flex" : "none",
                                flexDirection: 'row',
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                            >
                                <button
                                className="col-sm-5 other-button"
                                id="add-crop-buttons"
                                disabled={isSubmitting}
                                onClick={handleHasSeeds}
                                type="button"

                                style={{
                                    borderStyle: 'solid',
                                    borderWidth: '1px',
                                    borderColor: 'orange'
                                }}
                                >
                                    I have seeds
                                </button>

                                <button
                                className="col-sm-5"
                                disabled={isSubmitting}
                                onClick={handleRequestForSeeds}
                                type="button"
                                >
                                    Request for seeds
                                </button>
                            </div>

                            <Button
                            className="col-sm-12"
                            type="submit"
                            variant="primary"
                            disabled={isSubmitting}
                            style={{margin: "2px 0px",
                                display: step == 1 ? "none" : "block"}}
                            >
                                {isSubmitting ? "Adding crop ..." : "Add Crop"}
                            </Button>
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