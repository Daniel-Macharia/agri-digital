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
        plantingDate: new Date( new Date().toDateString() ),
        expectedHarvestingDate: new Date( new Date().toDateString() )
    };

    const validationSchema = Yup.object({
        cropName: Yup.string().required("Required"),
        seedName: Yup.string().required("Required"),
        seedVariety: Yup.string().required("Required"),
        plantingDate: Yup.date().required("Required"),
        expectedHarvestingDate: Yup.date().required("Required"),
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
        onHide={() => props.setShow(false) }
        centered
        
        className="modal-container"
        >
            <Modal.Header closeButton
            className="modal-header">
                <Modal.Title className="modal-title">
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
                            className="modal-input-group"
                            >
                                <label className="modal-label">Crop Name</label>
                                <div className="text-danger small">
                                    <ErrorMessage name="cropName"/>
                                </div>
                                <Field
                                className="modal-input-field"
                                type="text"
                                name="cropName"
                                placeholder="Maize"
                                />
                            </div>

                            <div
                            className="modal-input-group"
                            style={{display: step == 1 ? "none" : "block"}}
                            >
                                <label className="modal-label">Seed Name</label>
                                <div className="text-danger small">
                                    <ErrorMessage name="seedName"/>
                                </div>
                                <Field
                                className="modal-input-field"
                                type="text"
                                name="seedName"
                                placeholder="Maize"
                                />
                            </div>

                            <div className="modal-input-group">
                                <label className="modal-label">Seed Variety</label>
                                <div 
                                className="text-danger small" 
                                style={{display: step == 1 ? "none" : "block"}}>
                                    <ErrorMessage name="seedVariety"/>
                                </div>
                                <Field
                                className="modal-input-field"
                                type="text"
                                name="seedVariety"
                                placeholder="Maize"
                                style={{display: step == 1 ? "none" : "block"}}
                                />
                            </div>

                            <div className="modal-input-group"
                            style={{display: step == 1 ? "none" : "block"}}
                            >
                                <label className="modal-label">Planting Date</label>
                                <div className="text-danger small">
                                    <ErrorMessage name="plantingDate"/>
                                </div>
                                <DatePicker
                                selected={ selectedPlantingDate }
                                onChange={date => setSelectedPlantingDate( date ) }
                                className="modal-input-field"
                                name="plantingDate"
                                placeholderText="select planting date"

                                dateFormat={"MM/dd/yyyy"}
                                minDate={new Date()}

                                />
                            </div>

                            <div className="modal-input-group"
                            style={{display: step == 1 ? "none" : "block"}}
                            >
                                <label className="modal-label">Expected Harvesting Date</label>
                                <div className="text-danger small">
                                    <ErrorMessage name="expectedHarvestingDate"/>
                                </div>
                                <DatePicker
                                className="modal-input-field"
                                name="expectedHarvestingDate"
                                placeholderText="select planting date"
                                dateFormat="MM/dd/yyyy"

                                selected={selectedHarvestingDate}
                                onChange={ date => setSelectedHarvestingDate(date) }
                                minDate={selectedPlantingDate||undefined}
                                />
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
                            className="col-sm-11"
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