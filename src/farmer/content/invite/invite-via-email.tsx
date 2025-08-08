import { useState } from "react";
import { InviteFailedModal, InviteSuccessfulModal } from "./invite-modals";

import * as Yup from "yup";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";


const initialValues = {
    farmerEmails: [''],
};

const validationSchema = Yup.object({
    farmerEmails: Yup.array().of(
        Yup.string().email("enter a valid email").required("email is required")
    )
});

const InviteViaEmail: React.FC = () => {

    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [showFailed, setShowFailed] = useState<boolean>(false);

    const linkToShare = "https://shambabot.com/farmer-username";

    const handleSendInvites = (values: typeof initialValues) => {
        console.log(`sending ${linkToShare}`);
        setShowSuccess(true);
        alert(`Sending invites to: \n${values.farmerEmails.map(email => email.toString())}`);
        console.log(values);
    };

    return (<>
    <div className="col-12">
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSendInvites}
        >
            {({values}) => (
                <Form>
                    <FieldArray name="farmerEmails">
                        {({push, remove}) => (
                            <div>
                                {
                                    values.farmerEmails.map( (_, index) => (
                                        <div key={index} className="col-12 my-1">
                                            <div className="col-12 my-0 d-flex position-relative">
                                                <Field
                                                key={index}
                                                type="text"
                                                className="form-control body-regular my-0"
                                                name={`farmerEmails.${index}`}
                                                placeholder={`example@gmail.com`}
                                                closeButton
                                                />
                                                { 
                                                    index > 0 && <button
                                                    type="button"
                                                    className="translate-middle-y position-absolute top-50 me-2 end-0 btn btn-sm secondary-text"
                                                    onClick={() => remove(index) }
                                                    style={{zIndex: 2}}
                                                    >
                                                        X
                                                    </button>
                                                }
                                            </div>
                                            <div className="text-danger small my-0">
                                                <ErrorMessage name={`farmerEmails.${index}`} />
                                            </div>
                                        </div>
                                    ) )
                                }

                                <div className="row my-2">
                                    <div className="col-12 col-md-8">
                                        <button 
                                        type="button"
                                        className="col-12 d-flex small-medium"
                                        style={{
                                            borderStyle: "none",
                                            backgroundColor: "whitesmoke",
                                            color: "var(--Primary, #457900)",
                                            justifyContent: "flex-start",
                                            alignItems: "center"
                                        }}
                                     onClick={() => push("")}
                                        >
                                            <img src="/assets/images/invite/add_farmer_icon.svg"
                                            style={{width: "16px", height: "16px"}}/>
                                            <p className="col-10 col-md-8">
                                                Add another farmer
                                            </p>
                                        </button>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <button
                                        type="submit"
                                        className="col-12 small-medium invite-accept-button"
                                        style={{backgroundColor: "var(--Primary, #457900)", color: "var(--cards-form-bg, #FFF)"}}
                                        >
                                            Send invites
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </FieldArray>
                </Form>
            )}
        </Formik>
    </div>

    <InviteSuccessfulModal show={showSuccess} setShow={setShowSuccess}/>
    <InviteFailedModal show={showFailed} setShow={setShowFailed}/>
    </>);
};

export default InviteViaEmail;