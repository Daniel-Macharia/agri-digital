import { Modal } from "react-bootstrap";

import * as Yup from "yup";
import { SalesNegotiationProductProps } from "../crops-models";
import { ErrorMessage, Field, Form, Formik } from "formik";


interface NegotiateOfferProps{
proposedPrice: number|null,
message: string
};

const NegotiateOfferModal: React.FC<SalesNegotiationProductProps> = ( props: SalesNegotiationProductProps ) => {
    const initialValues: NegotiateOfferProps = {
        proposedPrice: null,
        message: ''
    };

    const validationSchema = Yup.object({
        proposedPrice: Yup.number().required("price is required").typeError("price must be a number"),
        message: Yup.string().notRequired()//.required("message is required")
    });

    const handleSubmitOffer = (data: NegotiateOfferProps) => {
        console.log(data);
        props.setShow(false);
    };

    return (<>
    <Modal
    show={props.show}
    onHide={() => props.setShow(false) }

    centered

    dialogClassName="mx-auto"
    >
        {/* <Modal.Header>
            <Modal.Title>
                <p className="h3-semibold">Suggested Offer</p>
            </Modal.Title>
        </Modal.Header> */}

        <Modal.Body>

            <p className="h3-semibold">Suggested Offer</p>

            <div className="row col-sm-12" >
                <div className="col-sm-5">
                    <img 
                    src={props.productImageUrl}
                    className="col-sm-12"

                    />
                </div>

                <div className="col-sm-7" >
                    <p className="body-semibold my-1">
                        {props.productName}
                    </p>

                    <p className="small-regular my-1" style={{color: "var(--primary)"}}>
                        {props.productSeller}
                    </p>

                    <p className="body-regular col-sm-12 my-1" style={{padding: "0px"}}>
                        Current Price: 
                        <span className="h3-semibold" style={{color: "var(--primary)"}}> KES {props.productUnitPrice}</span>
                        <span className="body-regular" style={{color: "var(--primary)"}}> per {props.productUnitName}</span>
                    </p>
                </div>
            </div>

            <div className="col-sm-12">
                <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmitOffer}

                >
                    {() => (
                        <Form className="col-sm-12">
                            <div className="col-sm-12">
                                <div className="col-sm-12">
                                    <label 
                                    className="form-label col-sm-12"
                                    htmlFor="proposedPrice" 
                                    style={{margin: "0px"}} >
                                        Proposed price
                                    </label>

                                    <div 
                                    className="col-sm-12" 
                                    style={{
                                        margin: "0px", 
                                        padding: "0px"
                                    }}>
                                        <Field
                                        name="proposedPrice"
                                        className="form-control col-sm-12"
                                        
                                        placeholder="KES 120 PER KG"
                                        />
                                        <div className="col-sm-12 text-danger small" 
                                        style={{margin: "0px",
                                            textAlign: "start"
                                        }}
                                        >
                                            <ErrorMessage name="proposedPrice" />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-12">
                                    <label 
                                    className="form-label col-sm-12"
                                    htmlFor="message" 
                                    style={{margin: "0px"}} >
                                        Message
                                    </label>

                                    <div 
                                    className="col-sm-12" 
                                    style={{
                                        margin: "0px", 
                                        padding: "0px"
                                    }}>
                                        <textarea
                                        name="message"
                                        className="form-control col-sm-12" 
                                        
                                        placeholder="make your offer to the seller..."
                                        style={{height: "88px"}}
                                        />
                                        <div className="col-sm-12 text-danger small" 
                                        style={{margin: "0px",
                                            textAlign: "start"
                                        }}
                                        >
                                            <ErrorMessage name="message" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <button
                                className="crops-other-button col-sm-12 mx-0"
                                type="submit"
                                >
                                    Submit Offer
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

        </Modal.Body>

        {/* <Modal.Footer className="col-sm-12">
            nothing here for now
        </Modal.Footer> */}
    </Modal>
    </>);
};

export default NegotiateOfferModal;