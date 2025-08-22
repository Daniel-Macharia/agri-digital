import { Modal } from "react-bootstrap";
import { AddUserProps, UserModalProps } from "./user-management-models";

import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import { UserFormMode, UserRole } from "./user-management-enums";
import { toast } from "react-toastify";
import { useEffect } from "react";

const initialValues:AddUserProps = {
    name: "",
    email: "",
    role: ""
};

const validationSchema = Yup.object({
    name: Yup.string().required("name is required"),
    email: Yup.string().email().required("email is required"),
    role: Yup.string().required("role must be selected")
});

const PopulateComponentOnMount = (data: UserModalProps) => {

    const {setFieldValue, values} = useFormikContext<AddUserProps>();

    useEffect(() => {
        if( data.mode === UserFormMode.EDIT ){
            if( !values.name )
            {
                setFieldValue( "name", data.userData && data.userData.name || "");
            }

            if( !values.email )
            {
                setFieldValue( "email", data.userData && data.userData.email || "");
            }
            
            if( !values.role )
            {
                setFieldValue( "role", data.userData && data.userData.role || "");
            }
        }
    }, []);

    return null;
}

const AddUserModal: React.FC<UserModalProps> = (data: UserModalProps) => {

    const handleAddUser = (values: AddUserProps) => {
        if( data.mode === UserFormMode.EDIT )
        {
            toast.info(`Editing user: ${values.name}`);
        }
        else
        {
            toast.info(`adding user: ${values.name}`);
        }
        
        data.setShow(false);
    };

    const roles: string[] =[UserRole.EMPLOYEE, UserRole.MANAGER];

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

                    <PopulateComponentOnMount 
                    show={false} 
                    setShow={data.setShow} 
                    mode={data.mode} 
                    userData={data.userData} />

                    <Modal.Header closeButton
                    className="p-0 border-0 mb-3">
                        <Modal.Title
                        className="m-0 p-0 text-start h3-bold primary-text"
                        >
                            {`${data.mode}`}
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
                    className="d-flex m-0 mt-3 p-0 justify-content-start border-0">
                        <button
                        type="submit"
                        className="vendor-accept-button small-semibold p-2 m-0"
                        >
                            {`${(data.mode === UserFormMode.EDIT) ? "Save" : "Add User"}`}
                        </button>
                    </Modal.Footer>
                </Form>
            )}
        </Formik>
    </Modal>
    </>);
}

export default AddUserModal;