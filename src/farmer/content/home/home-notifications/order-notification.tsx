import { Modal } from "react-bootstrap";
import { MakeOfferProps, OrdertNotificationItemProps } from "./home-notifications-models";
import { ErrorMessage, Field, Form, Formik } from "formik";

import * as Yup from "yup";
import { useState } from "react";

const initialValues: MakeOfferProps = {
    proposedPrice: "",
    response: ""
};

const validationSchema = Yup.object({
    proposedPrice: Yup.number().required("enter proposed price").typeError("price can only be a number"),
    response: Yup.string().required("enter response")
});

function OrderNotificationItem({data} : {data: OrdertNotificationItemProps}) {

    const [show, setShow] = useState<boolean>(false);

    const handleMakeOfferAction = () => {
        setShow(true);
        console.log("making offer");
    };

    const handleAcceptOrderAction = () => {
        console.log("Accepting Order");
    };

    const handleDeclineOrderAction = () => {
        console.log("Declining Order");
    };

    const handleSubmitOffer = (data: MakeOfferProps) => {
        console.log(`Proposed price: ${data.proposedPrice}\nResponse: ${data.response}`);
        setShow(false);
    };

    return (<>
    <div className="col-12">
        <div className="col-12 farmer-home-container bg-white my-4">
            <div className="row">
                <div className="col-12 col-sm-2 col-md-1 align-content-start">
                    <img src="/assets/images/home/avatar.svg" 
                    alt="sponsor"
                    className=""
                    style={{width: "50px", height: "50px"}}
                    />
                </div>

                <div className="col-12 col-sm-10 col-md-11">
                    <div className="col-12 d-flex">
                        <p className="col-6 my-0 col-md-10 h3-semibold primary-text">
                            {data.username}
                        </p>
                        <div className="col-6 col-md-2 my-0 d-flex justify-content-end  ">
                            <span className="caption-regular end-aligned-text m-2 p-1" >
                                {data.orderStatus}
                            </span>
                        </div>
                    </div>

                    <div className="col-12 d-flex pb-0">
                            <img src="/assets/images/home/home_clock.svg"
                            alt="time"
                            style={{width: "14px", height: "14px"}}
                            />
                        <p className="col-10 my-0 small-regular start-aligned-text"
                        style={{color: "var(--Primary, #457900)"}}>
                            {`${data.receivedAt}`}
                        </p>
                    </div>

                    <div className="col-12 d-flex mt-2 ">
                        <span className="body-medium primary-text my-0">
                            Looking for: 
                        </span>
                        <p className="col-6 my-0 body-medium primary-text">
                            <span 
                            className="body-medium my-0 primary-text"
                            style={{color: "var(--Primary, #457900)"}}>
                                {data.orderItemName}
                            </span>
                            {` ${data.orderUnitCount} ${data.orderUnitName}`}
                        </p>
                    </div>

                    <div className="col-12 ">
                        <p className="col-12 my-0 small-regular secondary-text">
                            {data.notificationDesc}
                        </p>
                    </div>

                    <div className="col-12">
                        <p className="col-12 small-semibold primary-text">
                            Budget: {`KES ${data.orderBudget} per ${data.orderUnitName}`}
                        </p>
                    </div>

                    <div className="col-12 m-0 py-3">
                        {
                            (data.orderStatus === "new") ? <>
                            <button
                            className="col-12 col-md-2 farmer-home-accept-button"
                            onClick={handleMakeOfferAction}
                            >
                                Make Offer
                            </button>
                            </>

                            : ( (data.orderStatus === "negotiating" ) ? 
                                <>
                                    <button
                                    className="col-12 col-md-2 farmer-home-accept-button"
                                    onClick={handleAcceptOrderAction}
                                    >
                                        Accept Order
                                    </button>
                                    <button
                                    className="col-12 col-md-2 farmer-home-other-button mt-2 mt-md-0 ms-0 ms-md-4"
                                    onClick={handleDeclineOrderAction}
                                    >
                                        Decline
                                    </button>
                                </>
                                : <></>)
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>


    <Modal
    show={show}
    onHide={() => setShow(false)}
    centered
    dialogClassName="mx-auto"
    >
        <Modal.Body className="col-12">
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmitOffer}
            >
               {({setFieldValue}) => (
                 <Form className="col-12">
                    <div className="col-12">
                        <p className="h3-semibold primary-text">
                            Make offer
                        </p>
                        <div className="col-12 mb-2">
                            <label htmlFor="proposedPrice"
                            className="col-12 body-regular primary-text mb-0">
                                Proposed Price
                            </label>
                            <div className="col-12 my-0">
                                <Field
                                className="form-control body-regular mb-0"
                                name="proposedPrice"
                                placeholder={`KES ${data.orderBudget} per ${data.orderUnitName}`}
                                />
                                <div className="text-danger small my-0">
                                    <ErrorMessage name="proposedPrice"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mb-2">
                            <label htmlFor="response"
                            className="col-12 body-regular primary-text mb-0">
                                Respond to {data.username}
                            </label>
                            <div className="col-12 my-0">
                                <textarea
                                placeholder="make your offer to the buyer"
                                className="form-control body-regular mb-0"
                                name="response"
                                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    const value = event.target?.value;
                                    console.log(`value: ${value}`);
                                    setFieldValue("response", value);
                                }}
                                style={{height: "143px"}}
                                />
                                <div className="text-danger small my-0">
                                    <ErrorMessage name="response"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 mt-3">
                            <button
                            className="col-12 farmer-home-accept-button"
                            type="submit"
                            >
                                Send response
                            </button>
                        </div>
                    </div>
                </Form>
               )}
            </Formik>
        </Modal.Body>
    </Modal>
    </>);
};

export default OrderNotificationItem;