import { ErrorMessage, Field, Form, Formik } from "formik";
import "./index.css";
import "/src/index.css";
import { NavLink, useNavigate } from "react-router-dom";

import * as Yup from "yup";

const ProjectAssessment: React.FC = ()=>{

    const initialValues = {
        expectedRevenue: '',
        expectedExpenditure: '',
        seedCost: '',
        seedCostDescription: '',
        laborCost: '',
        laborCostDescription: '',
        fertilizerCost: '',
        fertilizerCostDescription: '',
        equipmentCost: '',
        equipmentCostDescription: '',
        otherCost: '',
        otherCostDescription: ''
    };

    const validationSchema = Yup.object({
        expectedRevenue: Yup.number().moreThan(0).required("Required"),
        expectedExpenditure: Yup.number().moreThan(0).required("Required"),
        seedCost: Yup.number().moreThan(0).required("Required"),
        seedCostDescription: Yup.string(),
        laborCost: Yup.number().moreThan(0).required("Required"),
        laborCostDescription: Yup.string(),
        fertilizerCost: Yup.number().moreThan(0).required("Required"),
        fertilizerCostDescription: Yup.string(),
        equipmentCost: Yup.number().moreThan(0).required("Required"),
        equipmentCostDescription: Yup.string(),
        otherCost: Yup.number().moreThan(0).required("Required"),
        otherCostDescription: Yup.string()
    });

    const navigate = useNavigate();

    const handleProjectAssessment = (data: typeof initialValues, {}: any ) => {
        console.log('assessing project..');
        console.log(data);
        navigate("/farmer/projects/crops/soil-testing")
    };

    const render = ()=>{
        return (<>
            <div className="container">
                <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleProjectAssessment}
                >
                    {({})=>(
                        <Form className="form-content">
                            <div className="project-assessment-title">
                                <h3 className="h3-medium">
                                    Here is the project assessment.
                                </h3>
                                <p className="body-regular">
                                    Let's assess the financial aspects of your project.
                                </p>
                            </div>

                            <div className="text-danger small">
                                <ErrorMessage name="expectedRevenue"/>
                            </div>
                            <div className="revenue-div">
                                <label>Expected revenue</label>
                                <Field
                                className="price-input-field"
                                type="text"
                                name="expectedRevenue"

                                placeholder="ksh 250,000.00"

                                />
                            </div>

                            <div className="text-danger small">
                                <ErrorMessage name="expectedExpenditure"/>
                            </div>
                            <div className="expenses">
                                <div className="total-expense-div">
                                    <label>Total Expected expense</label>
                                    <Field
                                    type="text"
                                    name="expectedExpenditure"

                                    className="price-input-field"

                                    placeholder="ksh 250,000.00"

                                    />
                                </div>

                                <label>
                                    Expense breakdown
                                </label>


                                <div className="text-danger small">
                                    <ErrorMessage name="seedCost"/>
                                </div>
                                <div className="other-expenses-div">
                                    <div 
                                    className="input-group"
                                    >
                                        <label className="input-label">
                                            Seeds
                                        </label>

                                        <div className="input-fields">
                                            <Field
                                            className="cost-input-field"
                                            type="text"
                                            name="seedCost"

                                            placeholder="ksh 250,000.00"

                                            />

                                            <Field
                                            className="description-input-field"
                                            type="text"
                                            name="seedCostDescription"

                                            placeholder="Description(optional)"

                                            />
                                        </div>
                                    </div>


                                    <div className="text-danger small">
                                        <ErrorMessage name="laborCost"/>
                                    </div>
                                    <div
                                    className="input-group"
                                    >
                                        <label className="input-label">
                                            Labor
                                        </label>

                                        <div className="input-fields">
                                            <Field
                                            className="cost-input-field"
                                            type="text"
                                            name="laborCost"

                                            placeholder="ksh 250,000.00"

                                            />

                                            <Field
                                            className="description-input-field"
                                            type="text"
                                            name="laborCostDescription"

                                            placeholder="Description(optional)"

                                        />
                                        </div>
                                        
                                    </div>


                                    <div className="text-danger small">
                                        <ErrorMessage name="fertilizerCost"/>
                                    </div>
                                    <div
                                    className="input-group"
                                    >
                                        <label className="input-label">
                                            Fertilizers
                                        </label>

                                        <div className="input-fields">
                                            <Field
                                            className="cost-input-field"
                                            type="text"
                                            name="fertilizerCost"

                                            placeholder="ksh 250,000.00"

                                            />

                                            <Field
                                            className="description-input-field"
                                            type="text"
                                            name="fertilizerCostDescription"

                                            placeholder="Description(optional)"

                                            />
                                        </div>
                                    </div>


                                    <div className="text-danger small">
                                        <ErrorMessage name="equipmentCost"/>
                                    </div>
                                    <div
                                    className="input-group"
                                    >
                                        <label className="input-label">
                                            Equipments
                                        </label>

                                        <div className="input-fields">
                                            <Field
                                            className="cost-input-field"
                                            type="text"
                                            name="equipmentCost"

                                            placeholder="ksh 250,000.00"

                                            />

                                            <Field
                                            className="description-input-field"
                                            type="text"
                                            name="equipmentCostDescription"

                                            placeholder="Description(optional)"

                                            />
                                        </div>
                                    </div>


                                    <div className="text-danger small">
                                        <ErrorMessage name="otherCost"/>
                                    </div>
                                    <div
                                    className="input-group"
                                    >
                                        <label className="input-label">
                                            Other
                                        </label>

                                        <div className="input-fields">
                                            <Field
                                            className="cost-input-field"
                                            type="text"
                                            name="otherCost"

                                            placeholder="ksh 250,000.00"

                                            />

                                            <Field
                                            className="description-input-field"
                                            type="text"
                                            name="otherCostDescription"

                                            placeholder="Description(optional)"

                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="button-div">
                                <NavLink
                                to={"#"}
                                className="back-button"
                                >
                                    Back
                                </NavLink>

                                <button
                                type="submit"
                                name="start"
                                >Start Journey</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>)};

    return render();
}

export default ProjectAssessment;