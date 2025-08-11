import { Modal } from "react-bootstrap";
import { AddUserProps, ModalProps } from "./user-management-models";

import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

const initialValues: AddUserProps = {
    name: "",
    email: "",
    role: ""
};

const validationSchema = Yup.object({
    name: Yup.string().required("name is required"),
    email: Yup.string().email().required("email is required"),
    role: Yup.string().required("role must be selected")
});

const AddUserModal: React.FC<ModalProps> = (data: ModalProps) => {

    const handleAddUser = (data: AddUserProps) => {
        console.log(`adding user: ${data.name}`);
    };

    const roles: string[] =["manager", "employee"];

    return (<>
    <Modal
    show={data.show}
    onHide={() => data.setShow(false)}
    className="p-0"
    >
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleAddUser}
        >
            {({setFieldValue}) => (
                <Form className="p-3">
                    <Modal.Header closeButton
                    className="p-0">
                        <Modal.Title
                        className="m-0 p-0 text-start h3-bold primary-text"
                        >
                            Add User
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="m-0 p-0">
                        <div className="col-12">
                            <label htmlFor="name" 
                            className="col-12 m-0 p-0 body-regular primary-text">
                                Name *
                            </label>
                            <div className="col-12 m-0 p-0 mb-2">
                                <Field
                                name="name"
                                className="form-control body-regular m-0"
                                placeholder="Kelvin Kimani"

                                />
                                <div className="col-12 m-0 p-0 text-danger small">
                                    <ErrorMessage name="name" />
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <label htmlFor="email" 
                            className="col-12 m-0 p-0 body-regular primary-text">
                                Email *
                            </label>
                            <div className="col-12 m-0 p-0 mb-2">
                                <Field
                                name="email"
                                className="form-control body-regular m-0"
                                placeholder="kimani@shambabot.com"

                                />
                                <div className="col-12 m-0 p-0 text-danger small">
                                    <ErrorMessage name="email" />
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <label htmlFor="role" 
                            className="col-12 m-0 p-0 body-regular primary-text">
                                Role *
                            </label>
                            <div className="col-12 m-0 p-0 mb-2">
                                <select
                                name="role"
                                className="form-control body-regular m-0"
                                
                                onChange={(event) => {
                                    const val = event.target?.value;

                                    setFieldValue( "role", val);
                                }}
                                
                                >
                                    <option  className="secondary-text" value={""}>select role</option>

                                    {
                                        roles.map((role) => <option
                                        className="m-0 p-0" 
                                        value={role}>
                                            {role}
                                        </option>)
                                    }

                                </select>
                                <div className="col-12 m-0 p-0 text-danger small">
                                    <ErrorMessage name="role" />
                                </div>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer
                    className="d-flex m-0 p-0 justify-content-start">
                        <button
                        type="submit"
                        className="vendor-accept-button small-semibold p-2"
                        >
                            Add User
                        </button>
                    </Modal.Footer>
                </Form>
            )}
        </Formik>
    </Modal>
    </>);
}

export default AddUserModal;